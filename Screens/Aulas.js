import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Alert
} from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, orderBy, updateDoc } from 'firebase/firestore';

export default function Aulas({ navigation }) {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState('');
  const [aulasConcluidas, setAulasConcluidas] = useState([]);
  const [aulasCompletadas, setAulasCompletadas] = useState(0);
  const [todasConcluidas, setTodasConcluidas] = useState(false);

  useEffect(() => {
    fetchAulas();
  }, []);

  useEffect(() => {
    // Verifica se todas as aulas foram concluídas
    if (aulas.length > 0 && aulasCompletadas >= aulas.length) {
      setTodasConcluidas(true);
    } else {
      setTodasConcluidas(false);
    }
  }, [aulas, aulasCompletadas]);

  const fetchAulas = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Buscar dados do usuário
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const nivel = userData?.nivel || 'iniciante';
        
        // Buscar progresso específico do nível atual
        let completadas = 0;
        if (userData?.progresso) {
          // Nova estrutura com progresso por nível
          if (userData.progresso[nivel]) {
            completadas = userData.progresso[nivel].aulasCompletadas || 0;
          }
          // Fallback para estrutura antiga (migração automática)
          else if (typeof userData.progresso.aulasCompletadas === 'number') {
            completadas = userData.progresso.aulasCompletadas || 0;
          }
        }
        
        setUserLevel(nivel);
        setAulasCompletadas(completadas);
        
        // Buscar aulas do nível do usuário
        const q = query(
          collection(db, 'aulas'), 
          where('nivel', '==', nivel),
          where('ativa', '==', true),
          orderBy('ordem', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const aulasData = [];
        querySnapshot.forEach((doc) => {
          aulasData.push({ id: doc.id, ...doc.data() });
        });
        
        setAulas(aulasData);
        
        // Criar array de aulas concluídas baseado no número
        const concluidas = [];
        for (let i = 0; i < Math.min(completadas, aulasData.length); i++) {
          if (aulasData[i]) {
            concluidas.push(aulasData[i].id);
          }
        }
        setAulasConcluidas(concluidas);
      }
    } catch (error) {
      console.log('Erro ao buscar aulas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as aulas');
    }
    setLoading(false);
  };

  const handleAvancarNivel = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const proximoNivel = userLevel === 'iniciante' ? 'intermediário' : 
                           userLevel === 'intermediário' ? 'avançado' : 'avançado';
        
        // Atualizar nível do usuário no Firebase
        await updateDoc(doc(db, 'users', user.uid), {
          nivel: proximoNivel,
          ultimaAtualizacao: new Date().toISOString()
          // NÃO limpar progresso - cada nível mantém seu próprio progresso
        });
        
        Alert.alert(
          'Parabéns! 🎉',
          `Você foi promovido para o nível ${proximoNivel}!`,
          [
            {
              text: 'Continuar',
              onPress: () => {
                setUserLevel(proximoNivel);
                setAulasConcluidas([]);
                setAulasCompletadas(0); // Será definido corretamente no fetchAulas
                setTodasConcluidas(false);
                fetchAulas();
              }
            }
          ]
        );
      }
    } catch (error) {
      console.log('Erro ao avançar nível:', error);
      Alert.alert('Erro', 'Não foi possível avançar de nível');
    }
  };

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#2196F3';
    }
  };

  const isAulaConcluida = (aulaId, index) => {
    // Verifica se a aula está entre as completadas baseado no índice
    return index < aulasCompletadas;
  };

  const renderAula = ({ item, index }) => (
    <TouchableOpacity
      style={styles.aulaCard}
      onPress={() => navigation.navigate('AulaDetalhes', { 
        aula: item, 
        aulaIndex: index,
        aulasCompletadas: aulasCompletadas,
        onAulaCompleted: fetchAulas 
      })}
    >
      <View style={styles.aulaHeader}>
        <View style={[
          styles.aulaNumero, 
          { backgroundColor: isAulaConcluida(item.id, index) ? '#4CAF50' : '#FF6B6B' }
        ]}>
          {isAulaConcluida(item.id, index) ? (
            <Text style={styles.aulaNumeroText}>✓</Text>
          ) : (
            <Text style={styles.aulaNumeroText}>{index + 1}</Text>
          )}
        </View>
        <View style={styles.aulaInfo}>
          <Text style={styles.aulaTitulo}>{item.titulo}</Text>
          <Text style={styles.aulaDescricao}>{item.descricao}</Text>
        </View>
        <View style={styles.aulaDuracao}>
          <Text style={styles.aulaTempoText}>{item.duracao}min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando aulas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Minhas Aulas</Text>
          <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(userLevel) }]}>
            <Text style={styles.nivelBadgeText}>
              {userLevel?.charAt(0).toUpperCase() + userLevel?.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      {/* Botão de Avançar Nível */}
      {todasConcluidas && userLevel !== 'avançado' && (
        <View style={styles.levelUpContainer}>
          <TouchableOpacity
            style={styles.levelUpButton}
            onPress={handleAvancarNivel}
          >
            <Text style={styles.levelUpButtonText}>
              🎓 Avançar para {userLevel === 'iniciante' ? 'Intermediário' : 'Avançado'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Progresso */}
      {aulas.length > 0 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Progresso: {aulasCompletadas}/{aulas.length} aulas concluídas
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(aulasCompletadas / aulas.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
      )}

      {aulas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>Nenhuma aula encontrada</Text>
          <Text style={styles.emptyText}>
            Parece que ainda não há aulas disponíveis para o seu nível.
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchAulas}
          >
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={aulas}
          renderItem={renderAula}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.aulasList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nivelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  nivelBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelUpContainer: {
    padding: 20,
    backgroundColor: '#333',
  },
  levelUpButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  levelUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  aulasList: {
    padding: 20,
  },
  aulaCard: {
    backgroundColor: '#333',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  aulaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  aulaNumero: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  aulaNumeroText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aulaInfo: {
    flex: 1,
  },
  aulaTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aulaDescricao: {
    color: '#888',
    fontSize: 14,
  },
  aulaDuracao: {
    alignItems: 'center',
  },
  aulaTempoText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  refreshButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
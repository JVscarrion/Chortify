import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Alert
} from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';

export default function Aulas({ navigation }) {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState('');

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Buscar nível do usuário
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const nivel = userData?.nivel || 'iniciante';
        setUserLevel(nivel);
        
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
      }
    } catch (error) {
      console.log('Erro ao buscar aulas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as aulas');
    }
    setLoading(false);
  };

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#2196F3';
    }
  };

  const renderAula = ({ item, index }) => (
    <TouchableOpacity
      style={styles.aulaCard}
      onPress={() => navigation.navigate('AulaDetalhes', { aula: item })}
    >
      <View style={styles.aulaHeader}>
        <View style={styles.aulaNumero}>
          <Text style={styles.aulaNumeroText}>{index + 1}</Text>
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
    backgroundColor: '#FF6B6B',
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
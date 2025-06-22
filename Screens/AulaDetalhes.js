import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Modal
} from 'react-native';

export default function AulaDetalhes({ route, navigation }) {
  const { aula } = route.params;
  const [showCongrats, setShowCongrats] = useState(false);

  const handleCompleteAula = () => {
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
      navigation.goBack();
    }, 2000);
  };

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        
        <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(aula.nivel) }]}>
          <Text style={styles.nivelBadgeText}>
            {aula.nivel?.charAt(0).toUpperCase() + aula.nivel?.slice(1)}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.aulaHeader}>
          <Text style={styles.aulaTitle}>{aula.titulo}</Text>
          <Text style={styles.aulaDescricao}>{aula.descricao}</Text>
          <View style={styles.aulaStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duração</Text>
              <Text style={styles.statValue}>{aula.duracao} min</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Nível</Text>
              <Text style={[styles.statValue, { color: getNivelColor(aula.nivel) }]}>
                {aula.nivel?.charAt(0).toUpperCase() + aula.nivel?.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.conteudoContainer}>
          <Text style={styles.conteudoTitle}>📋 Conteúdo da Aula</Text>
          <Text style={styles.conteudoText}>{aula.conteudo}</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dicas Importantes</Text>
          <Text style={styles.tipsText}>
            • Pratique devagar no início{'\n'}
            • Mantenha boa postura{'\n'}
            • Faça pausas se sentir dor{'\n'}
            • Seja paciente consigo mesmo
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteAula}
        >
          <Text style={styles.completeButtonText}>✓ Marcar como Concluída</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCongrats}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.congratsCard}>
            <Text style={styles.congratsIcon}>🎉</Text>
            <Text style={styles.congratsTitle}>Parabéns!</Text>
            <Text style={styles.congratsText}>Aula concluída com sucesso!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {},
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
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
  content: {
    flex: 1,
  },
  aulaHeader: {
    padding: 20,
    backgroundColor: '#333',
  },
  aulaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aulaDescricao: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  aulaStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conteudoContainer: {
    margin: 20,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
  },
  conteudoTitle: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  conteudoText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  tipsContainer: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
  },
  tipsTitle: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipsText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    backgroundColor: '#333',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsCard: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  congratsIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  congratsTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  congratsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
});

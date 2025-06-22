import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert
} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.log('Erro ao buscar dados do usuário:', error);
        }
      } else {
        navigation.replace('Login');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          onPress: () => signOut(auth),
          style: 'destructive'
        }
      ]
    );
  };

  const getNivelIcon = (nivel) => {
    switch(nivel) {
      case 'iniciante': return '🌱';
      case 'intermediário': return '🎸';
      case 'avançado': return '🎵';
      default: return '🎼';
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Chortify {userData?.nome}! 🎸</Text>
          <View style={styles.nivelBadge}>
            <Text style={styles.nivelIcon}>
              {getNivelIcon(userData?.nivel)}
            </Text>
            <Text style={[
              styles.nivelText,
              { color: getNivelColor(userData?.nivel) }
            ]}>
              {userData?.nivel?.charAt(0).toUpperCase() + userData?.nivel?.slice(1)}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você quer fazer hoje?</Text>

        <View style={styles.menuGrid}>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: '#4CAF50' }]}
            onPress={() => navigation.navigate('Aulas')}
          >
            <Text style={styles.menuIcon}>📚</Text>
            <Text style={styles.menuTitle}>Minhas Aulas</Text>
            <Text style={styles.menuSubtitle}>Continue aprendendo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: '#2196F3' }]}
            onPress={() => navigation.navigate('Acordes')}
          >
            <Text style={styles.menuIcon}>🎸</Text>
            <Text style={styles.menuTitle}>Biblioteca de Acordes</Text>
            <Text style={styles.menuSubtitle}>Consulte acordes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: '#FF9800' }]}
            onPress={() => navigation.navigate('Afinador')}
          >
            <Text style={styles.menuIcon}>🎵</Text>
            <Text style={styles.menuTitle}>Afinador</Text>
            <Text style={styles.menuSubtitle}>Afine seu violão</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: '#9C27B0' }]}
            onPress={() => navigation.navigate('Progresso')}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuTitle}>Meu Progresso</Text>
            <Text style={styles.menuSubtitle}>Veja sua evolução</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dica do Dia</Text>
          <Text style={styles.tipsText}>
            "Pratique todos os dias, mesmo que sejam apenas 10 minutos. 
            A consistência é mais importante que a duração!"
          </Text>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nivelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nivelIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  nivelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  menuSubtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
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
    lineHeight: 20,
  },
});
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert
} from 'react-native';

  export default function Afinador({ navigation }) {
  const [selectedString, setSelectedString] = useState(null);

  const cordas = [
    { numero: 6, nota: 'E', nome: 'Mi Grave', frequencia: '82.4 Hz' },
    { numero: 5, nota: 'A', nome: 'Lá', frequencia: '110 Hz' },
    { numero: 4, nota: 'D', nome: 'Ré', frequencia: '146.8 Hz' },
    { numero: 3, nota: 'G', nome: 'Sol', frequencia: '196 Hz' },
    { numero: 2, nota: 'B', nome: 'Si', frequencia: '246.9 Hz' },
    { numero: 1, nota: 'E', nome: 'Mi Agudo', frequencia: '329.6 Hz' },
  ];

  const handlePlaySound = (corda) => {
    setSelectedString(corda.numero);
    Alert.alert('Som da corda', `Emitindo som da corda ${corda.nome} (${corda.nota})`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎵 Afinador de Violão</Text>
      <Text style={styles.subtitle}>Toque na corda para ouvir o som</Text>

      {cordas.map((corda) => (
        <TouchableOpacity
          key={corda.numero}
          style={[styles.stringButton, selectedString === corda.numero && styles.selected]}
          onPress={() => handlePlaySound(corda)}
        >
          <Text style={styles.stringText}>Corda {corda.numero} - {corda.nome} ({corda.nota})</Text>
          <Text style={styles.freqText}>{corda.frequencia}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  title: {
    color: '#FF6B6B',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
  },
  stringButton: {
    backgroundColor: '#333',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#FF6B6B',
  },
  stringText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  freqText: {
    color: '#aaa',
    fontSize: 14,
  },
  backButton: {
    marginTop: 30,
  },
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

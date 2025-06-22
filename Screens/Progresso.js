import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput
} from 'react-native';

export default function Progresso({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const acordesData = [
    // ACORDES MAIORES
    {
      nome: 'C',
      nomeCompleto: 'Dó Maior',
      categoria: 'maior',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '1ª casa: 2ª corda\n2ª casa: 4ª corda\n3ª casa: 5ª corda',
      dicas: 'Acorde básico, mantenha os dedos curvados'
    },
    {
      nome: 'G',
      nomeCompleto: 'Sol Maior',
      categoria: 'maior',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '2ª casa: 5ª corda\n3ª casa: 6ª corda\n3ª casa: 1ª corda',
      dicas: 'Deixe as cordas 2, 3 e 4 soltas'
    },
    {
      nome: 'D',
      nomeCompleto: 'Ré Maior',
      categoria: 'maior',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '2ª casa: 1ª corda\n2ª casa: 3ª corda\n3ª casa: 2ª corda',
      dicas: 'Não toque as cordas 5 e 6'
    },
    {
      nome: 'F',
      nomeCompleto: 'Fá Maior',
      categoria: 'maior',
      nivel: 'intermediário',
      pestana: true,
      posicoes: 'Pestana 1ª casa\n2ª casa: 3ª corda\n3ª casa: 4ª e 5ª cordas',
      dicas: 'Primeiro acorde com pestana, pratique a força'
    },

    // ACORDES MENORES
    {
      nome: 'Am',
      nomeCompleto: 'Lá menor',
      categoria: 'menor',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '1ª casa: 2ª corda\n2ª casa: 3ª e 4ª cordas',
      dicas: 'Acorde básico, similar ao C mas mais simples'
    },
    {
      nome: 'Em',
      nomeCompleto: 'Mi menor',
      categoria: 'menor',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '2ª casa: 4ª e 5ª cordas',
      dicas: 'Um dos acordes mais fáceis'
    },
    {
      nome: 'Dm',
      nomeCompleto: 'Ré menor',
      categoria: 'menor',
      nivel: 'iniciante',
      pestana: false,
      posicoes: '1ª casa: 1ª corda\n2ª casa: 3ª corda\n3ª casa: 2ª corda',
      dicas: 'Não toque as cordas 5 e 6'
    },

    // ACORDES COM SÉTIMA
    {
      nome: 'G7',
      nomeCompleto: 'Sol com Sétima',
      categoria: 'setima',
      nivel: 'intermediário',
      pestana: false,
      posicoes: '1ª casa: 1ª corda\n2ª casa: 5ª corda\n3ª casa: 6ª corda',
      dicas: 'Variação do G, adiciona tensão harmônica'
    },
    {
      nome: 'C7',
      nomeCompleto: 'Dó com Sétima',
      categoria: 'setima',
      nivel: 'intermediário',
      pestana: false,
      posicoes: '1ª casa: 2ª corda\n2ª casa: 4ª corda\n3ª casa: 3ª e 5ª cordas',
      dicas: 'Baseado no C, adiciona o dedo na 3ª corda'
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todos', cor: '#666' },
    { id: 'maior', nome: 'Maiores', cor: '#4CAF50' },
    { id: 'menor', nome: 'Menores', cor: '#2196F3' },
    { id: 'setima', nome: 'Sétimas', cor: '#FF9800' }
  ];

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#2196F3';
    }
  };

  const filteredAcordes = acordesData.filter(acorde => {
    const matchesSearch = acorde.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         acorde.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || acorde.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderAcorde = (acorde) => (
    <TouchableOpacity key={acorde.nome} style={styles.acordeCard}>
      <View style={styles.acordeHeader}>
        <View style={styles.acordeInfo}>
          <Text style={styles.acordeNome}>{acorde.nome}</Text>
          <Text style={styles.acordeNomeCompleto}>{acorde.nomeCompleto}</Text>
        </View>
        <View style={styles.acordeBadges}>
          {acorde.pestana && (
            <View style={styles.pestanaBadge}>
              <Text style={styles.pestanaText}>PESTANA</Text>
            </View>
          )}
          <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(acorde.nivel) }]}>
            <Text style={styles.nivelText}>{acorde.nivel}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.acordeContent}>
        <Text style={styles.posicoesTitle}>📍 Posições dos Dedos:</Text>
        <Text style={styles.posicoesText}>{acorde.posicoes}</Text>
        
        <Text style={styles.dicasTitle}>💡 Dica:</Text>
        <Text style={styles.dicasText}>{acorde.dicas}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Progresso</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar acorde..."
            placeholderTextColor="#666"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <ScrollView 
          horizontal 
          style={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
        >
          {categorias.map(categoria => (
            <TouchableOpacity
              key={categoria.id}
              style={[
                styles.categoryButton,
                { backgroundColor: selectedCategory === categoria.id ? categoria.cor : '#333' }
              ]}
              onPress={() => setSelectedCategory(categoria.id)}
            >
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === categoria.id ? '#fff' : '#888' }
              ]}>
                {categoria.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.acordesList}>
          {filteredAcordes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🎸</Text>
              <Text style={styles.emptyTitle}>Nenhum acorde encontrado</Text>
              <Text style={styles.emptyText}>
                Tente buscar por outro termo ou categoria.
              </Text>
            </View>
          ) : (
            filteredAcordes.map(renderAcorde)
          )}
        </View>
      </ScrollView>
    </View>
  );
}

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
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  acordesList: {
    flex: 1,
  },
  acordeCard: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  acordeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  acordeInfo: {
    flex: 1,
  },
  acordeNome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  acordeNomeCompleto: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  acordeBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pestanaBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  pestanaText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nivelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nivelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  acordeContent: {
    marginTop: 10,
  },
  posicoesTitle: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  posicoesText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  dicasTitle: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dicasText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
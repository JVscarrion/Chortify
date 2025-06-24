import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  // Cria uma animação de opacidade começando de 0 (invisível)
  const scaleAnim = new Animated.Value(0.3);
  // Cria uma animação de escala começando bem pequena (0.3)


  useEffect(() => {
     // Executa duas animações em paralelo ao abrir a tela:
    Animated.parallel([
      // Animação de fade (transparente -> visível)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
       // Animação de escala (crescendo até tamanho normal)
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
     // Timer que espera 2,5 segundos antes de navegar automaticamente para o Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
     // Limpa o timer se o componente desmontar antes do tempo
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>🎸</Text>
        </View>
        <Text style={styles.title}>Chortify</Text>
        <Text style={styles.subtitle}>Aprenda violão do zero</Text>
      </Animated.View>
      
      <View style={styles.decorativeElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 20,
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  logo: {
    fontSize: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 107, 107, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 1,
    opacity: 0.9,
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: '10%',
    right: '-10%',
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: '15%',
    left: '-8%',
    backgroundColor: 'rgba(255, 107, 107, 0.08)',
  },
  circle3: {
    width: 100,
    height: 100,
    top: '20%',
    left: '15%',
    backgroundColor: 'rgba(255, 107, 107, 0.06)',
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  acordesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  acordeCard: {
    backgroundColor: '#333',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  acordeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  acordeInfo: {
    flex: 1,
  },
  acordeNome: {
    color: '#FF6B6B',
    fontSize: 24,
    fontWeight: 'bold',
  },
  acordeNomeCompleto: {
    color: '#888',
    fontSize: 16,
  },
  acordeBadges: {
    alignItems: 'flex-end',
  },
  pestanaBadge: {
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  pestanaText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nivelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  nivelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  acordeContent: {
    padding: 20,
    paddingTop: 0,
  },
  posicoesTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  posicoesText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
    fontFamily: 'monospace',
  },
  dicasTitle: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dicasText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
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
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
});
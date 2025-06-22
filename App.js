// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeAulas } from './initFirestore';
import { db } from './firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';

// Importando as telas
import SplashScreen from './Screens/SplashScreen';
import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import Aulas from './Screens/Aulas';
import AulaDetalhes from './Screens/AulaDetalhes';
import Acordes from './Screens/Acordes';
import Afinador from './Screens/Afinador';
import Progresso from './Screens/Progresso';

// Firebase init
import './firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeAppData();
  }, []);

  const initializeAppData = async () => {
    try {
      // Verificar se já existem aulas no banco
      const aulasQuery = query(collection(db, 'aulas'), limit(1));
      const aulasSnapshot = await getDocs(aulasQuery);
      
      if (aulasSnapshot.empty) {
        console.log('🚀 Primeira execução - Inicializando aulas...');
        await initializeAulas();
        console.log('✅ Aulas inicializadas com sucesso!');
      } else {
        console.log('✅ Aulas já existem no banco de dados');
      }
      
      setIsInitialized(true);
      
    } catch (error) {
      console.error('❌ Erro na inicialização:', error);
      // Mesmo com erro, permite que o app continue
      setIsInitialized(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Aulas" component={Aulas} />
        <Stack.Screen name="AulaDetalhes" component={AulaDetalhes} />
        <Stack.Screen name="Acordes" component={Acordes} />
        <Stack.Screen name="Afinador" component={Afinador} />
        <Stack.Screen name="Progresso" component={Progresso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
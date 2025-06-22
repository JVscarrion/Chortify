// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { initializeAulas } from './initFirestore';

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
import './firebaseConfig'; // Já inicializa o Firebase


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // aqui está ok
  }, []);

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


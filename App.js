// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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


function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator screenOptions={{
      headerStyle:{backgroundColor: '#1a1a1a'},
      headerTintColor: 'white',
      tabBarActiveBackgroundColor: '#1a1a1a',
      tabBarInactiveBackgroundColor: '#1a1a1a',
      tabBarActiveTintColor: 'black'
    }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Aulas" component={Aulas} />
      <Tab.Screen name="Acordes" component={Acordes} />
      <Tab.Screen name="Afinador" component={Afinador} />
      <Tab.Screen name="Progresso" component={Progresso} />
    </Tab.Navigator>
  )
}


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeAppData(); // Chamada para inicializar os dados do app
    forceReinitialize(); // Chamada para forçar reinicialização, remover em produção
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

  // função para forçar reinicialização
const forceReinitialize = async () => {
  try {
    // Deletar todas as aulas existentes
    const aulasSnapshot = await getDocs(collection(db, 'aulas'));
    const deletePromises = aulasSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Reinicializar com todas as aulas
    await initializeAulas();
    console.log('✅ Aulas reinicializadas!');
  } catch (error) {
    console.error('❌ Erro na reinicialização:', error);
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
        <Stack.Screen name="AulaDetalhes" component={AulaDetalhes} />
        <Stack.Screen options={{headerShown:false}} name='Home' component={BottomTabs}/>
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Aulas" component={Aulas} />
        <Stack.Screen name="Acordes" component={Acordes} />
        <Stack.Screen name="Afinador" component={Afinador} />
        <Stack.Screen name="Progresso" component={Progresso} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );


}
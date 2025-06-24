import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeAulas } from './initFirestore';
import { db } from './firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';


import SplashScreen from './Screens/SplashScreen';
import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import Aulas from './Screens/Aulas';
import AulaDetalhes from './Screens/AulaDetalhes';
import Acordes from './Screens/Acordes';
import Afinador from './Screens/Afinador';
import Progresso from './Screens/Progresso';

// Inicialização do Firebase (importação para garantir inicialização)
import './firebaseConfig';

// Criando o stack navigator para navegação em pilha
const Stack = createNativeStackNavigator();

/**
 * Componente que define as abas inferiores do aplicativo.
 * Contém as principais telas acessíveis via abas.
 */
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
      {/* Definição das telas nas abas */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Aulas" component={Aulas} />
      <Tab.Screen name="Acordes" component={Acordes} />
      <Tab.Screen name="Afinador" component={Afinador} />
      <Tab.Screen name="Progresso" component={Progresso} />
    </Tab.Navigator>
  )
}

/**
 * Componente principal do aplicativo.
 * Gerencia o estado de inicialização e a navegação entre telas.
 */
export default function App() {
  // Estado para controlar se os dados foram inicializados
  const [isInitialized, setIsInitialized] = useState(false);

  // useEffect para executar a inicialização dos dados ao montar o componente
  useEffect(() => {
    initializeAppData(); // Inicializa os dados do app (aulas)
    forceReinitialize(); // Força reinicialização (deve ser removido em produção)
  }, []);

  /**
   * Função para inicializar os dados do aplicativo.
   * Verifica se já existem aulas no Firestore e inicializa se necessário.
   */
  const initializeAppData = async () => {
    try {
      // Consulta para verificar se existem aulas no banco
      const aulasQuery = query(collection(db, 'aulas'), limit(1));
      const aulasSnapshot = await getDocs(aulasQuery);
      
      if (aulasSnapshot.empty) {
        // Se não houver aulas, inicializa as aulas padrão
        console.log('🚀 Primeira execução - Inicializando aulas...');
        await initializeAulas();
        console.log('✅ Aulas inicializadas com sucesso!');
      } else {
        // Caso aulas já existam, apenas loga a informação
        console.log('✅ Aulas já existem no banco de dados');
      }
      
      // Atualiza o estado para indicar que a inicialização terminou
      setIsInitialized(true);
      
    } catch (error) {
      // Em caso de erro, loga e permite que o app continue
      console.error('❌ Erro na inicialização:', error);
      setIsInitialized(true);
    }
  };

  /**
   * Função para forçar a reinicialização das aulas.
   * Usada para desenvolvimento/testes para limpar e reiniciar as aulas.
   */
  const forceReinitialize = async () => {
    try {
      // Busca todas as aulas existentes
      const aulasSnapshot = await getDocs(collection(db, 'aulas'));
      // Cria promessas para deletar cada aula
      const deletePromises = aulasSnapshot.docs.map(doc => deleteDoc(doc.ref));
      // Aguarda todas as deleções
      await Promise.all(deletePromises);
      
      // Inicializa novamente as aulas
      await initializeAulas();
      console.log('✅ Aulas reinicializadas!');
    } catch (error) {
      // Loga erro caso ocorra
      console.error('❌ Erro na reinicialização:', error);
    }
  };

  // Renderiza o container de navegação com as telas definidas
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // Tela inicial do app
        screenOptions={{ headerShown: false }} // Oculta cabeçalho padrão
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="AulaDetalhes" component={AulaDetalhes} />
        <Stack.Screen options={{headerShown:false}} name='Home' component={BottomTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// userSetup.js
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const setupUserProfile = async (user, additionalData = {}) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    // Verificar se o usuário já existe
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Criar novo perfil de usuário
      const userData = {
        nome: additionalData.nome || user.displayName || 'Usuário',
        email: user.email,
        nivel: additionalData.nivel || 'iniciante',
        criadoEm: new Date().toISOString(),
        ultimoAcesso: new Date().toISOString(),
        progresso: {
          aulasCompletadas: 0,
          acordesAprendidos: 0,
          tempoEstudo: 0
        }
      };
      
      await setDoc(userRef, userData);
      console.log('✅ Perfil do usuário criado:', userData);
      return userData;
    } else {
      // Atualizar último acesso
      const existingData = userDoc.data();
      await setDoc(userRef, {
        ...existingData,
        ultimoAcesso: new Date().toISOString()
      }, { merge: true });
      
      console.log('✅ Perfil do usuário atualizado');
      return existingData;
    }
  } catch (error) {
    console.error('❌ Erro ao configurar perfil do usuário:', error);
    throw error;
  }
};

export const updateUserLevel = async (userId, newLevel) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      nivel: newLevel,
      ultimaAtualizacao: new Date().toISOString()
    }, { merge: true });
    
    console.log(`✅ Nível do usuário atualizado para: ${newLevel}`);
  } catch (error) {
    console.error('❌ Erro ao atualizar nível do usuário:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('❌ Perfil do usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao buscar perfil do usuário:', error);
    throw error;
  }
};
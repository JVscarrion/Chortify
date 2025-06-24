// userSetup.js
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const setupUserProfile = async (user, additionalData = {}) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    // Verificar se o usuário já existe
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Criar novo perfil de usuário com progresso específico por nível
      const userData = {
        nome: additionalData.nome || user.displayName || 'Usuário',
        email: user.email,
        nivel: additionalData.nivel || 'iniciante',
        criadoEm: new Date().toISOString(),
        ultimoAcesso: new Date().toISOString(),
        progresso: {
          // Progresso específico por nível
          iniciante: {
            aulasCompletadas: 0,
            ultimaAula: -1
          },
          intermediário: {
            aulasCompletadas: 0,
            ultimaAula: -1
          },
          avançado: {
            aulasCompletadas: 0,
            ultimaAula: -1
          },
          // Stats gerais
          acordesAprendidos: 0,
          tempoEstudo: 0
        }
      };
      
      await setDoc(userRef, userData);
      console.log('✅ Perfil do usuário criado:', userData);
      return userData;
    } else {
      // Atualizar último acesso e verificar se precisa migrar estrutura antiga
      const existingData = userDoc.data();
      
      // Migrar estrutura antiga se necessário
      if (existingData.progresso && typeof existingData.progresso.aulasCompletadas === 'number') {
        console.log('🔄 Migrando estrutura de progresso...');
        const progressoAntigo = existingData.progresso.aulasCompletadas;
        const nivelAtual = existingData.nivel || 'iniciante';
        
        const novoProgresso = {
          iniciante: {
            aulasCompletadas: nivelAtual === 'iniciante' ? progressoAntigo : 0,
            ultimaAula: nivelAtual === 'iniciante' ? progressoAntigo - 1 : -1
          },
          intermediário: {
            aulasCompletadas: nivelAtual === 'intermediário' ? progressoAntigo : 0,
            ultimaAula: nivelAtual === 'intermediário' ? progressoAntigo - 1 : -1
          },
          avançado: {
            aulasCompletadas: nivelAtual === 'avançado' ? progressoAntigo : 0,
            ultimaAula: nivelAtual === 'avançado' ? progressoAntigo - 1 : -1
          },
          acordesAprendidos: existingData.progresso.acordesAprendidos || 0,
          tempoEstudo: existingData.progresso.tempoEstudo || 0
        };
        
        await setDoc(userRef, {
          ...existingData,
          progresso: novoProgresso,
          ultimoAcesso: new Date().toISOString()
        });
        
        return { ...existingData, progresso: novoProgresso };
      }
      
      // Apenas atualizar último acesso se estrutura já está correta
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


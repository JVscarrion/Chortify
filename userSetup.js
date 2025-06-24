// Importa funções específicas do Firestore para manipular documentos
import { doc, setDoc, getDoc } from 'firebase/firestore';
// Importa a conexão com o banco Firestore
import { db } from './firebaseConfig';

/**
 * Função que configura o perfil de um usuário no banco.
 * Cria um novo perfil caso não exista ou atualiza informações se já existir.
 */
export const setupUserProfile = async (user, additionalData = {}) => {
  try {
    // Referência ao documento do usuário no Firestore (coleção 'users' com ID = user.uid)
    const userRef = doc(db, 'users', user.uid);
    
    // Tenta buscar se já existe um documento para esse usuário
    const userDoc = await getDoc(userRef);
    
    // Se o usuário não existe, cria um novo perfil
    if (!userDoc.exists()) {
      const userData = {
        nome: additionalData.nome || user.displayName || 'Usuário', // Usa nome extra, nome do Firebase ou 'Usuário' padrão
        email: user.email,
        nivel: additionalData.nivel || 'iniciante', // Começa no nível 'iniciante' por padrão
        criadoEm: new Date().toISOString(), // Data de criação
        ultimoAcesso: new Date().toISOString(), // Salva também o último acesso
        progresso: {
          // Progresso separado por nível
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
          // Progresso geral
          acordesAprendidos: 0,
          tempoEstudo: 0 // Tempo de estudo em minutos (ou outra métrica)
        }
      };
      
      // Salva o novo documento no Firestore
      await setDoc(userRef, userData);
      console.log('✅ Perfil do usuário criado:', userData);
      return userData;

    } else {
      // Se o usuário já existe, faz uma atualização no último acesso
      const existingData = userDoc.data();
      
      // Verifica se existe uma estrutura antiga de progresso para atualizar
      if (existingData.progresso && typeof existingData.progresso.aulasCompletadas === 'number') {
        console.log('🔄 Migrando estrutura de progresso...');

        const progressoAntigo = existingData.progresso.aulasCompletadas;
        const nivelAtual = existingData.nivel || 'iniciante';

        // Cria uma nova estrutura de progresso adaptada para os níveis
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

        // Atualiza o documento do usuário com o progresso novo e último acesso
        await setDoc(userRef, {
          ...existingData,
          progresso: novoProgresso,
          ultimoAcesso: new Date().toISOString()
        });

        return { ...existingData, progresso: novoProgresso };
      }

      // Se o progresso já está na nova estrutura, apenas atualiza o último acesso
      await setDoc(userRef, {
        ...existingData,
        ultimoAcesso: new Date().toISOString()
      }, { merge: true }); // merge:true garante que apenas o campo 'ultimoAcesso' seja alterado sem apagar outros

      console.log('✅ Perfil do usuário atualizado');
      return existingData;
    }
  } catch (error) {
    console.error('❌ Erro ao configurar perfil do usuário:', error);
    throw error;
  }
};

/**
 * Atualiza o nível do usuário no perfil.
 * Serve quando o usuário muda de nível (ex: de iniciante para intermediário).
 */
export const updateUserLevel = async (userId, newLevel) => {
  try {
    const userRef = doc(db, 'users', userId);

    // Atualiza o campo 'nivel' e salva a data da alteração
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

/**
 * Busca e retorna os dados do perfil de um usuário pelo ID.
 * Retorna os dados se existir, ou null se não existir.
 */
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

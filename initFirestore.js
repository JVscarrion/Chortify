import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const initializeAulas = async () => {
  const aulasIniciais = [
    // INICIANTE
    {
      id: 'aula-01-iniciante',
      titulo: 'Conhecendo o Violão',
      descricao: 'Aprenda as partes básicas do violão e postura correta',
      nivel: 'iniciante',
      conteudo: `🎸 PARTES DO VIOLÃO:
• Corpo, braço e cabeça
• Cordas e trastes
• Cavalete e pestana

🪑 POSTURA CORRETA:
• Sentar com as costas retas
• Apoiar o violão na perna
• Posição dos braços

💡 DICAS IMPORTANTES:
• Sempre afine antes de tocar
• Use palheta ou dedos
• Pratique 15 minutos por dia`,
      duracao: 15,
      ordem: 1,
      ativa: true
    },
    {
      id: 'aula-02-iniciante',
      titulo: 'Primeiros Acordes',
      descricao: 'Acordes básicos: C, G, Am, F',
      nivel: 'iniciante',
      conteudo: `🎵 ACORDES BÁSICOS:

🔵 Acorde C (Dó Maior):
• 1ª casa - 2ª corda (dedo 1)
• 2ª casa - 4ª corda (dedo 2)  
• 3ª casa - 5ª corda (dedo 3)

🔴 Acorde G (Sol Maior):
• 2ª casa - 5ª corda (dedo 1)
• 3ª casa - 6ª corda (dedo 2)
• 3ª casa - 1ª corda (dedo 3)

🟡 Acorde Am (Lá menor):
• 1ª casa - 2ª corda (dedo 1)
• 2ª casa - 3ª corda (dedo 2)
• 2ª casa - 4ª corda (dedo 3)

💪 EXERCÍCIO:
Troque entre C - G - Am por 2 minutos`,
      duracao: 20,
      ordem: 2,
      ativa: true
    },
    {
      id: 'aula-03-iniciante',
      titulo: 'Primeira Música',
      descricao: 'Toque sua primeira música completa',
      nivel: 'iniciante',
      conteudo: `🎶 MÚSICA: "Parabéns pra Você"

📝 SEQUÊNCIA DE ACORDES:
C - C - G - G
C - C - G - G
C - F - C - G
C - F - C - G - C

🎵 LETRA COM ACORDES:
    C
Parabéns pra você
    G
Nesta data querida
    C        F
Muitas felicidades
    G        C
Muitos anos de vida

⏱️ RITMO SIMPLES:
Para baixo, para baixo, para baixo, para baixo
(Uma batida por tempo)`,
      duracao: 25,
      ordem: 3,
      ativa: true
    },

    // INTERMEDIÁRIO
    {
      id: 'aula-01-intermediario',
      titulo: 'Pestana e Acorde F',
      descricao: 'Domine a técnica da pestana com o acorde F',
      nivel: 'intermediário',
      conteudo: `🎸 TÉCNICA DA PESTANA:

🖐️ POSIÇÃO DA MÃO:
• Dedo indicador esticado
• Polegar atrás do braço
• Pressão firme mas não excessiva

🔥 ACORDE F (Fá Maior):
• Pestana na 1ª casa (dedo 1)
• 2ª casa - 3ª corda (dedo 2)
• 3ª casa - 4ª corda (dedo 3)
• 3ª casa - 5ª corda (dedo 4)

💪 EXERCÍCIOS:
1. Pestana simples - 2 minutos
2. F - C - G - Am - F
3. Música: "Wonderwall" - Oasis

⚠️ DICA: Não desista! A pestana é difícil no início.`,
      duracao: 30,
      ordem: 1,
      ativa: true
    },
    {
      id: 'aula-02-intermediario',
      titulo: 'Ritmos Avançados',
      descricao: 'Batidas mais complexas e variações',
      nivel: 'intermediário',
      conteudo: `🥁 RITMOS POPULARES:

🎵 ROCK BÁSICO:
↓ ↑ ↓ ↑ ↓ ↑ ↓ ↑
(Baixo-cima-baixo-cima)

🎶 SAMBA/PAGODE:
↓ ↑ ↓ ↑ ↓ ↑ ↓ ↑
(Acentuar o 2º e 4º tempo)

🎸 COUNTRY:
↓ ↓ ↑ ↓ ↑ ↓ ↑
(Baixo-baixo-cima-baixo-cima)

🎹 BALADA:
↓ _ ↑ _ ↓ ↑ ↓ ↑
(_ = pausa)

🎯 PRÁTICA:
Use os acordes G - Em - C - D
Toque cada ritmo por 5 minutos`,
      duracao: 35,
      ordem: 2,
      ativa: true
    },

    // AVANÇADO
    {
      id: 'aula-01-avancado',
      titulo: 'Dedilhado Fingerstyle',
      descricao: 'Técnica de dedilhado sem palheta',
      nivel: 'avançado',
      conteudo: `🖐️ FINGERSTYLE BÁSICO:

👆 POSIÇÃO DOS DEDOS:
• Polegar (P): Cordas 6, 5, 4
• Indicador (I): Corda 3
• Médio (M): Corda 2  
• Anelar (A): Corda 1

🎵 PADRÃO BÁSICO:
P - I - M - A - M - I
(Repita este padrão)

🎸 EXERCÍCIO EM C:
Corda 6 (P) - Corda 3 (I) - Corda 2 (M) - Corda 1 (A)

🎶 MÚSICA EXEMPLO:
"Tears in Heaven" - Eric Clapton
Padrão: P-I-M-A-M-I

⏱️ TEMPO:
Comece devagar, 60 BPM
Aumente gradualmente`,
      duracao: 40,
      ordem: 1,
      ativa: true
    }
  ];

  try {
    for (const aula of aulasIniciais) {
      await setDoc(doc(db, 'aulas', aula.id), aula);
    }
    console.log('✅ Aulas inicializadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar aulas:', error);
  }
};
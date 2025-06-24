import { db } from './firebaseConfig';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export const initializeAulas = async () => {
  try {
    console.log('🚀 Iniciando processo de criação das aulas...');
    
    const aulas = [
      // ==================== NÍVEL INICIANTE ====================
      {
        id: 'aula-01-iniciante',
        titulo: 'Primeiro Contato com o Violão',
        descricao: 'Aprenda a segurar o violão corretamente e conheça suas partes',
        nivel: 'iniciante',
        duracao: 15,
        ordem: 1,
        ativa: true,
        conteudo: `🎸 SEU PRIMEIRO DIA COM O VIOLÃO!

🤲 COMO SEGURAR O VIOLÃO:
• Apoie o corpo do violão na sua perna direita
• Mantenha as costas retas
• O braço direito deve passar por cima do corpo do violão
• O braço esquerdo segura o braço do violão

🔍 CONHECENDO AS PARTES:
• Corpo: onde o som ressoa
• Braço: onde ficam os trastes
• Cordas: 6 cordas numeradas de baixo para cima
• Cravelhas: para afinar
• Pestana: primeira "casa" do violão

🎯 EXERCÍCIO:
Pratique apenas segurar o violão por 10 minutos, sentindo o peso e se acostumando com a posição.`
      },
      {
        id: 'aula-02-iniciante',
        titulo: 'Primeiros Acordes - Em e Am',
        descricao: 'Aprenda seus dois primeiros acordes básicos',
        nivel: 'iniciante',
        duracao: 20,
        ordem: 2,
        ativa: true,
        conteudo: `🎵 SEUS PRIMEIROS ACORDES!

🔸 ACORDE Em (Mi menor):
• 2ª corda, 2ª casa: dedo médio
• 3ª corda, 2ª casa: dedo anular
• Toque todas as cordas

🔹 ACORDE Am (Lá menor):
• 2ª corda, 1ª casa: dedo indicador
• 3ª corda, 2ª casa: dedo médio
• 4ª corda, 2ª casa: dedo anular

💡 DICAS IMPORTANTES:
• Pressione as cordas próximo aos trastes metálicos
• Cada dedo deve formar um arco
• Pratique a troca entre Em e Am lentamente

🎯 EXERCÍCIO:
Toque Em por 4 tempos, depois Am por 4 tempos. Repita por 10 minutos.`
      },
      {
        id: 'aula-03-iniciante',
        titulo: 'Ritmo Básico - Primeira Batida',
        descricao: 'Aprenda seu primeiro ritmo no violão',
        nivel: 'iniciante',
        duracao: 25,
        ordem: 3,
        ativa: true,
        conteudo: `🥁 SEU PRIMEIRO RITMO!

↓ BATIDA BÁSICA:
• Para baixo, para baixo, para baixo, para baixo
• Use o polegar ou uma palheta
• Mantenha o pulso relaxado

⏱️ TEMPO:
• Conte: 1, 2, 3, 4
• Cada número é uma batida para baixo
• Comece devagar!

🎵 COMBINANDO:
• Em: ↓ ↓ ↓ ↓ (conta 1, 2, 3, 4)
• Am: ↓ ↓ ↓ ↓ (conta 1, 2, 3, 4)

🎯 EXERCÍCIO:
Toque a sequência Em-Am com o ritmo por 15 minutos. Foque na constância do tempo!`
      },

      // ==================== NÍVEL INTERMEDIÁRIO ====================
      {
        id: 'aula-01-intermediario',
        titulo: 'Pestana e Acorde F',
        descricao: 'Domine a técnica da pestana com o acorde F',
        nivel: 'intermediário',
        duracao: 30,
        ordem: 1,
        ativa: true,
        conteudo: `🎸 TÉCNICA DA PESTANA:

🖐️ POSIÇÃO DA MÃO:
• Dedo indicador pressiona todas as cordas na 1ª casa
• Polegar atrás do braço, fazendo pressão
• Outros dedos formam o acorde F

🔸 ACORDE F (Fá maior):
• Pestana na 1ª casa (indicador)
• 3ª corda, 2ª casa: dedo médio
• 4ª corda, 3ª casa: dedo anular
• 5ª corda, 3ª casa: dedo mínimo

💪 EXERCÍCIOS DE FORÇA:
1. Pressione a pestana por 10 segundos, descanse 5
2. Repita 10 vezes
3. Pratique formar o F lentamente

🎯 META:
Conseguir tocar F limpo, sem cordas abafadas.`
      },
      {
        id: 'aula-02-intermediario',
        titulo: 'Acordes com Pestana - Bm e F#m',
        descricao: 'Expand sua técnica de pestana com acordes menores',
        nivel: 'intermediário',
        duracao: 35,
        ordem: 2,
        ativa: true,
        conteudo: `🎵 AMPLIANDO A PESTANA:

🔹 ACORDE Bm (Si menor):
• Pestana na 2ª casa (indicador)
• 2ª corda, 3ª casa: dedo médio
• 3ª corda, 4ª casa: dedo anular
• 4ª corda, 4ª casa: dedo mínimo

🔸 ACORDE F#m (Fá sustenido menor):
• Pestana na 2ª casa (indicador)
• 3ª corda, 4ª casa: dedo anular
• 4ª corda, 4ª casa: dedo mínimo

🔄 SEQUÊNCIA DE PRÁTICA:
• F → Bm → F#m → F
• Comece lento, aumente gradualmente

🎯 OBJETIVO:
Transições limpas entre acordes com pestana.`
      },
      {
        id: 'aula-03-intermediario',
        titulo: 'Ritmo Avançado - Batida Complexa',
        descricao: 'Aprenda ritmos mais elaborados com batidas para cima e baixo',
        nivel: 'intermediário',
        duracao: 25,
        ordem: 3,
        ativa: true,
        conteudo: `🥁 RITMO INTERMEDIÁRIO:

↕️ PADRÃO DE BATIDA:
• ↓ ↓ ↑ ↓ ↑ ↓ ↑
• Conte: 1, 2, e, 3, e, 4, e

📝 NOTAÇÃO:
• ↓ = batida para baixo
• ↑ = batida para cima
• e = subdivisão (entre os tempos)

🎵 APLICAÇÃO:
• Use com acordes G, Em, C, D
• Mantenha o pulso constante
• Batidas para cima são mais suaves

🎯 EXERCÍCIO:
Pratique o padrão com um acorde por 5 minutos, depois combine com mudanças de acordes.`
      },
      {
        id: 'aula-04-intermediario',
        titulo: 'Palhetada Alternada',
        descricao: 'Técnica de palhetada para tocar melodias',
        nivel: 'intermediário',
        duracao: 30,
        ordem: 4,
        ativa: true,
        conteudo: `🎸 PALHETADA ALTERNADA:

🔄 TÉCNICA BÁSICA:
• Movimento alternado: baixo-cima-baixo-cima
• Pulso relaxado, movimento pequeno
• Palheta perpendicular às cordas

🎵 EXERCÍCIO CROMÁTICO:
• 1ª corda: casas 1-2-3-4
• Use palhetada alternada
• Comece lento, aumente gradualmente

📊 PADRÃO:
• Casa 1: ↓
• Casa 2: ↑
• Casa 3: ↓
• Casa 4: ↑

🎯 META:
Palhetada limpa e uniforme em todas as cordas.`
      },
      {
        id: 'aula-05-intermediario',
        titulo: 'Power Chords',
        descricao: 'Aprenda os acordes de força do rock',
        nivel: 'intermediário',
        duracao: 20,
        ordem: 5,
        ativa: true,
        conteudo: `⚡ POWER CHORDS:

🔸 ESTRUTURA BÁSICA:
• Apenas 2 notas: fundamental + quinta
• Som mais "pesado" e potente
• Base do rock e metal

🎸 E5 (Mi power chord):
• 6ª corda casa 0: dedo indicador (ou solta)
• 5ª corda casa 2: dedo anular
• Toque apenas essas 2 cordas

🎸 A5 (Lá power chord):
• 5ª corda casa 0 (solta)
• 4ª corda casa 2: dedo anular

🔄 PROGRESSÃO:
• E5 → A5 → E5 → A5
• Use palhetada forte
• Ritmo: ↓ ↓ ↓ ↓

🎯 OBJETIVO:
Som limpo e potente nos power chords.`
      },

      // ==================== NÍVEL AVANÇADO ====================
      {
        id: 'aula-01-avancado',
        titulo: 'Dedilhado Fingerstyle',
        descricao: 'Técnica de dedilhado sem palheta',
        nivel: 'avançado',
        duracao: 40,
        ordem: 1,
        ativa: true,
        conteudo: `🖐️ FINGERSTYLE BÁSICO:

👆 POSIÇÃO DOS DEDOS:
• Polegar (P): Cordas 4, 5, 6 (graves)
• Indicador (I): 3ª corda
• Médio (M): 2ª corda  
• Anular (A): 1ª corda

🎵 PADRÃO BÁSICO - PIMA:
• P (polegar): 6ª corda
• I (indicador): 3ª corda
• M (médio): 2ª corda
• A (anular): 1ª corda

🎸 EXERCÍCIO EM Am:
• Forme o acorde Am
• Toque P-I-M-A lentamente
• Mantenha o tempo constante

🎯 META:
Independência total dos dedos, som limpo em cada corda.`
      },
      {
        id: 'aula-02-avancado',
        titulo: 'Arpejos Clássicos',
        descricao: 'Padrões de arpejos para música clássica e popular',
        nivel: 'avançado',
        duracao: 35,
        ordem: 2,
        ativa: true,
        conteudo: `🎼 ARPEJOS AVANÇADOS:

🔄 PADRÃO CLÁSSICO:
• P-I-M-A-M-I (repetir)
• Use com acordes C, Am, F, G

🎵 ARPEJO EM C:
• Polegar: 5ª corda (C)
• Indicador: 3ª corda (G)
• Médio: 2ª corda (C)
• Anular: 1ª corda (E)

⚡ VARIAÇÃO RÁPIDA:
• P-I-M-I-A-I-M-I
• Mantenha fluência

🎯 PROGRESSÃO COMPLETA:
C → Am → F → G (com arpejos)

📈 OBJETIVO:
Arpejos fluidos e musicais.`
      },
      {
        id: 'aula-03-avancado',
        titulo: 'Harmônicos Naturais',
        descricao: 'Técnica de harmônicos para sons cristalinos',
        nivel: 'avançado',
        duracao: 30,
        ordem: 3,
        ativa: true,
        conteudo: `✨ HARMÔNICOS NATURAIS:

🎸 TÉCNICA:
• Toque levemente sobre o traste (não pressione)
• Casas 12, 7, 5 produzem harmônicos claros
• Retire o dedo imediatamente após tocar

🔍 POSIÇÕES PRINCIPAIS:
• 12ª casa: oitava (mais fácil)
• 7ª casa: quinta + oitava
• 5ª casa: duas oitavas

🎵 EXERCÍCIO:
• Comece na 12ª casa, 1ª corda
• Toque suavemente, retire o dedo
• Som deve ser cristalino como um sino

🎯 APLICAÇÃO:
Use harmônicos para criar efeitos especiais em suas músicas.`
      },
      {
        id: 'aula-04-avancado',
        titulo: 'Sweep Picking Básico',
        descricao: 'Técnica avançada de palhetada corrida',
        nivel: 'avançado',
        duracao: 45,
        ordem: 4,
        ativa: true,
        conteudo: `⚡ SWEEP PICKING:

🔄 CONCEITO:
• Palhetada "corrida" através das cordas
• Um movimento fluido, não alternado
• Cada nota soa separadamente

🎸 EXERCÍCIO BÁSICO - Arpejo Em:
• 6ª corda, casa 0: ↓
• 5ª corda, casa 2: ↓ (continue o movimento)
• 4ª corda, casa 2: ↓
• 3ª corda, casa 0: ↓
• 2ª corda, casa 0: ↓

⚠️ IMPORTANTE:
• Abafe as cordas anteriores
• Movimento deve ser fluido
• Comece MUITO devagar

🎯 META:
Arpejo limpo com sweep picking.`
      }
    ];

    console.log(`📚 Criando ${aulas.length} aulas...`);
    
    // Criar cada aula individualmente
    for (let i = 0; i < aulas.length; i++) {
      const aula = aulas[i];
      
      try {
        // Usar setDoc para garantir que o ID seja exatamente o que queremos
        await setDoc(doc(db, 'aulas', aula.id), {
          titulo: aula.titulo,
          descricao: aula.descricao,
          nivel: aula.nivel,
          duracao: aula.duracao,
          ordem: aula.ordem,
          ativa: aula.ativa,
          conteudo: aula.conteudo,
          criadoEm: new Date().toISOString()
        });
        
        console.log(`✅ Aula criada: ${aula.titulo} (${aula.nivel})`);
        
      } catch (error) {
        console.error(`❌ Erro ao criar aula ${aula.titulo}:`, error);
      }
    }
    
    console.log('🎉 Todas as aulas foram criadas com sucesso!');
    
    // Resumo final
    const resumo = {
      iniciante: aulas.filter(a => a.nivel === 'iniciante').length,
      intermediário: aulas.filter(a => a.nivel === 'intermediário').length,
      avançado: aulas.filter(a => a.nivel === 'avançado').length,
      total: aulas.length
    };
    
    console.log('📊 RESUMO DAS AULAS CRIADAS:');
    console.log(`• Iniciante: ${resumo.iniciante} aulas`);
    console.log(`• Intermediário: ${resumo.intermediário} aulas`);
    console.log(`• Avançado: ${resumo.avançado} aulas`);
    console.log(`• TOTAL: ${resumo.total} aulas`);
    
  } catch (error) {
    console.error('💥 ERRO GERAL na inicialização das aulas:', error);
    throw error;
  }
};
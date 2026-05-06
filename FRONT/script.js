/**
 * PC Builder — script.js
 *
 * Responsabilidades:
 *  1. Leitura e validação do formulário
 *  2. Montagem do payload para a API
 *  3. Chamada à API REST (mock temporário até o backend estar pronto)
 *  4. Renderização do resultado em cards
 *  5. Controle de estados da UI (formulário / loading / erro / resultado)
 */

'use strict';

// ─── CONFIGURAÇÃO DA API ─────────────────────────────────────────────────────
// Quando o backend Java/Spring Boot estiver pronto, basta trocar esta URL.
const API_URL = 'http://localhost:8080/api/pc-builder';

// Flag: usa mock enquanto o backend não existir
const USAR_MOCK = false;

// ─── MAPA DE COMPONENTES PARA EXIBIÇÃO ───────────────────────────────────────
const COMPONENTES_META = [
  { chave: 'processador',  rotulo: 'Processador',   icone: '⚙️'  },
  { chave: 'placaMae',     rotulo: 'Placa-mãe',     icone: '🖥️'  },
  { chave: 'memoriaRam',   rotulo: 'Memória RAM',   icone: '🧩'  },
  { chave: 'placaVideo',   rotulo: 'Placa de vídeo',icone: '🎮'  },
  { chave: 'armazenamento',rotulo: 'Armazenamento', icone: '💾'  },
  { chave: 'fonte',        rotulo: 'Fonte',         icone: '⚡'  },
  { chave: 'gabinete',     rotulo: 'Gabinete',      icone: '📦'  },
];

// ─── RÓTULOS LEGÍVEIS PARA OS BADGES ─────────────────────────────────────────
const ROTULOS_USO = {
  jogos:       'Jogos',
  estudos:     'Estudos',
  trabalho:    'Trabalho',
  programacao: 'Programação',
  edicao:      'Edição / Design',
  basico:      'Uso básico',
};

const ROTULOS_ORCAMENTO = {
  'custo-beneficio': 'Custo-benefício',
  intermediario:     'Intermediário',
  premium:           'Premium',
};

// ─── RESPOSTAS MOCK ───────────────────────────────────────────────────────────
// Simula o retorno da API para diferentes combinações de uso + orçamento.
// Remover (ou ignorar via USAR_MOCK) quando o backend estiver disponível.
const MOCK_RESPOSTAS = {
  'jogos_custo-beneficio': {
    processador:  'Ryzen 5 5600',
    placaMae:     'B450M Steel Legend',
    memoriaRam:   '16 GB DDR4 3200 MHz',
    placaVideo:   'RX 6600 8 GB',
    armazenamento:'SSD NVMe 1 TB',
    fonte:        '550 W 80 Plus Bronze',
    gabinete:     'Mid Tower ATX',
    precoEstimado: 3400,
  },
  'jogos_intermediario': {
    processador:  'Ryzen 5 7600X',
    placaMae:     'B650M Mortar',
    memoriaRam:   '32 GB DDR5 5200 MHz',
    placaVideo:   'RTX 4070 12 GB',
    armazenamento:'SSD NVMe 1 TB',
    fonte:        '650 W 80 Plus Gold',
    gabinete:     'Mid Tower ATX',
    precoEstimado: 6800,
  },
  'jogos_premium': {
    processador:  'Core i9-14900K',
    placaMae:     'Z790 Aorus Elite',
    memoriaRam:   '32 GB DDR5 6000 MHz',
    placaVideo:   'RTX 4090 24 GB',
    armazenamento:'SSD NVMe 2 TB + SSD SATA 4 TB',
    fonte:        '1000 W 80 Plus Platinum',
    gabinete:     'Full Tower ATX',
    precoEstimado: 18500,
  },
  'programacao_custo-beneficio': {
    processador:  'Ryzen 5 5600G',
    placaMae:     'A520M Pro4',
    memoriaRam:   '32 GB DDR4 3200 MHz',
    placaVideo:   'Integrada (APU)',
    armazenamento:'SSD NVMe 512 GB',
    fonte:        '450 W 80 Plus Bronze',
    gabinete:     'Mid Tower Micro ATX',
    precoEstimado: 2200,
  },
  'programacao_intermediario': {
    processador:  'Ryzen 7 7700',
    placaMae:     'B650 Pro RS',
    memoriaRam:   '32 GB DDR5 4800 MHz',
    placaVideo:   'RTX 3060 12 GB',
    armazenamento:'SSD NVMe 1 TB',
    fonte:        '650 W 80 Plus Gold',
    gabinete:     'Mid Tower ATX',
    precoEstimado: 5500,
  },
  'programacao_premium': {
    processador:  'Ryzen 9 7950X',
    placaMae:     'X670E Extreme',
    memoriaRam:   '64 GB DDR5 5600 MHz',
    placaVideo:   'RTX 4080 16 GB',
    armazenamento:'SSD NVMe 2 TB (2x)',
    fonte:        '850 W 80 Plus Platinum',
    gabinete:     'Full Tower E-ATX',
    precoEstimado: 16000,
  },
  'edicao_custo-beneficio': {
    processador:  'Ryzen 7 5700X',
    placaMae:     'B550 Tomahawk',
    memoriaRam:   '32 GB DDR4 3600 MHz',
    placaVideo:   'RTX 3060 Ti 8 GB',
    armazenamento:'SSD NVMe 1 TB + HD 2 TB',
    fonte:        '650 W 80 Plus Gold',
    gabinete:     'Mid Tower ATX',
    precoEstimado: 4600,
  },
  'edicao_intermediario': {
    processador:  'Ryzen 9 7900X',
    placaMae:     'X670 Carbon',
    memoriaRam:   '64 GB DDR5 5200 MHz',
    placaVideo:   'RTX 4070 Ti 12 GB',
    armazenamento:'SSD NVMe 2 TB',
    fonte:        '850 W 80 Plus Gold',
    gabinete:     'Mid Tower ATX',
    precoEstimado: 10500,
  },
  'edicao_premium': {
    processador:  'Core i9-14900K',
    placaMae:     'Z790 Taichi',
    memoriaRam:   '128 GB DDR5 6000 MHz',
    placaVideo:   'RTX 4090 24 GB',
    armazenamento:'SSD NVMe 4 TB + SSD SATA 8 TB',
    fonte:        '1200 W 80 Plus Titanium',
    gabinete:     'Full Tower E-ATX',
    precoEstimado: 25000,
  },
};

// Resposta genérica como fallback
const MOCK_GENERICO = {
  processador:  'Ryzen 5 5600',
  placaMae:     'B450M DS3H',
  memoriaRam:   '16 GB DDR4 3200 MHz',
  placaVideo:   'RX 6600 8 GB',
  armazenamento:'SSD NVMe 1 TB',
  fonte:        '550 W 80 Plus Bronze',
  gabinete:     'Mid Tower ATX',
  precoEstimado: 3400,
};

// ─── UTILITÁRIOS DE UI ────────────────────────────────────────────────────────

/** Exibe apenas a seção especificada, ocultando as demais. */
function exibirSecao(idSecao) {
  const secoes = ['section-form', 'section-loading', 'section-error', 'section-result'];
  secoes.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = id !== idSecao;
  });
}

/** Define mensagem de erro inline de um campo. */
function definirErro(idElemento, mensagem) {
  const el = document.getElementById(idElemento);
  if (el) el.textContent = mensagem;
}

/** Limpa todos os erros inline do formulário. */
function limparErros() {
  definirErro('error-uso', '');
  definirErro('error-orcamento', '');
}

/** Rola suavemente até o topo da página. */
function rolarParaOTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── LEITURA DO FORMULÁRIO ───────────────────────────────────────────────────

/** Retorna o valor selecionado de um grupo de radio buttons. */
function obterRadioSelecionado(name) {
  const selecionado = document.querySelector(`input[name="${name}"]:checked`);
  return selecionado ? selecionado.value : null;
}

/** Lê e valida todos os campos do formulário.
 *  Retorna o payload ou null se inválido. */
function lerFormulario() {
  limparErros();

  const uso       = obterRadioSelecionado('uso');
  const orcamento = obterRadioSelecionado('orcamento');
  const valorRaw  = document.getElementById('valor-maximo').value.trim();

  let valido = true;

  if (!uso) {
    definirErro('error-uso', '← Selecione o uso principal do computador.');
    valido = false;
  }

  if (!orcamento) {
    definirErro('error-orcamento', '← Selecione o nível de orçamento.');
    valido = false;
  }

  if (!valido) return null;

  // Monta o payload que será enviado ao backend
  const payload = { uso, orcamento };
  if (valorRaw !== '') {
    const valorNumerico = Number(valorRaw);
    if (!isNaN(valorNumerico) && valorNumerico >= 500) {
      payload.valorMaximo = valorNumerico;
    }
  }

  return payload;
}

// ─── COMUNICAÇÃO COM A API ───────────────────────────────────────────────────

/**
 * Chama a API REST real (quando o backend estiver disponível).
 * Envia o payload via POST e retorna a configuração recomendada.
 */
async function chamarApi(payload) {
  const resposta = await fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}: ${resposta.statusText}`);
  }

  return resposta.json();
}

/**
 * Retorna uma resposta mockada, simulando o backend.
 * Seleciona o mock mais adequado com base no uso + orçamento.
 */
async function chamarMock(payload) {
  // Simula latência de rede
  await new Promise(resolve => setTimeout(resolve, 1600));

  const chave = `${payload.uso}_${payload.orcamento}`;
  return MOCK_RESPOSTAS[chave] ?? MOCK_GENERICO;
}

// ─── RENDERIZAÇÃO DO RESULTADO ───────────────────────────────────────────────

/**
 * Cria e insere um card de componente no grid.
 */
function criarCardComponente(icone, rotulo, valor) {
  const card = document.createElement('div');
  card.className = 'component-card';
  card.setAttribute('role', 'listitem');

  card.innerHTML = `
    <span class="component-card__icon" aria-hidden="true">${icone}</span>
    <span class="component-card__category">${rotulo}</span>
    <span class="component-card__name">${valor}</span>
  `;

  return card;
}

/**
 * Renderiza a seção de resultado com os dados recebidos da API.
 */
function renderizarResultado(configuracao, payload) {
  // Título dinâmico
  const rotuloUso = ROTULOS_USO[payload.uso] ?? payload.uso;
  document.getElementById('result-title').textContent = `PC para ${rotuloUso}`;

  // Preço formatado
  const preco = configuracao.precoEstimado ?? 0;
  document.getElementById('result-price').textContent =
    preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Badges de uso e orçamento
  document.getElementById('badge-uso').textContent = rotuloUso;
  document.getElementById('badge-orcamento').textContent =
    ROTULOS_ORCAMENTO[payload.orcamento] ?? payload.orcamento;

  // Limpa o grid e adiciona os cards
  const grid = document.getElementById('components-grid');
  grid.innerHTML = '';
  grid.setAttribute('role', 'list');

  COMPONENTES_META.forEach(({ chave, rotulo, icone }) => {
    const valor = configuracao[chave];
    if (valor) {
      grid.appendChild(criarCardComponente(icone, rotulo, valor));
    }
  });

  exibirSecao('section-result');
  rolarParaOTopo();
}

// ─── FUNÇÃO PRINCIPAL ─────────────────────────────────────────────────────────

/**
 * Ponto de entrada acionado pelo botão "Gerar configuração".
 * Valida o formulário, exibe loading, chama a API (real ou mock)
 * e renderiza o resultado ou exibe o erro.
 */
async function gerarConfiguracao() {
  const payload = lerFormulario();
  if (!payload) return; // Validação falhou

  // Desabilita o botão para evitar cliques duplos
  const botao = document.getElementById('btn-gerar');
  botao.disabled = true;

  exibirSecao('section-loading');
  rolarParaOTopo();

  try {
    // Escolhe entre a API real e o mock temporário
    const configuracao = USAR_MOCK
      ? await chamarMock(payload)
      : await chamarApi(payload);

    renderizarResultado(configuracao, payload);

  } catch (erro) {
    console.error('[PC Builder] Erro ao consultar API:', erro);

    // Exibe mensagem de erro ao usuário
    const mensagem = USAR_MOCK
      ? 'Erro inesperado ao gerar a configuração.'
      : 'Não foi possível conectar ao servidor. Verifique se o backend está rodando em localhost:8080.';

    document.getElementById('error-message').textContent = mensagem;
    exibirSecao('section-error');
    rolarParaOTopo();

  } finally {
    // Reabilita o botão independente do resultado
    botao.disabled = false;
  }
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────────────────

/**
 * Volta para o formulário a partir da tela de erro ou resultado.
 * Mantém os valores já preenchidos.
 */
function voltarFormulario() {
  exibirSecao('section-form');
  rolarParaOTopo();
}

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

(function inicializar() {
  // Garante que apenas o formulário é visível ao carregar
  exibirSecao('section-form');

  // Permite submeter o formulário com Enter no campo de valor
  const inputValor = document.getElementById('valor-maximo');
  if (inputValor) {
    inputValor.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') gerarConfiguracao();
    });
  }
})();

# 🖥️ PC Builder

Aplicação web que recomenda configurações de computador personalizadas com base no uso e orçamento do usuário, utilizando Inteligência Artificial (Groq + LLaMA) para gerar as sugestões.

---

## 📸 Visão Geral

O usuário responde duas perguntas simples — **uso principal** e **nível de orçamento** — e recebe uma configuração completa de PC com processador, placa-mãe, memória RAM, placa de vídeo, armazenamento, fonte e gabinete, junto com o preço estimado.

---

## 🗂️ Estrutura do Projeto

```
PC BUILDER/
├── pc-builder-api/          # Backend — Java + Spring Boot
│   └── src/main/java/com/pedroeng/pc_builder_api/
│       ├── config/
│       │   └── CorsConfig.java
│       ├── controller/
│       │   └── PcBuilderController.java
│       ├── service/
│       │   ├── PcBuilderService.java
│       │   └── GroqService.java
│       └── PcBuilderApiApplication.java
│
└── frontend/                # Frontend — HTML + CSS + JS puro
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 Tecnologias

### Frontend
| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura da interface |
| CSS3 | Estilização (tema dark/neon green) |
| JavaScript puro (ES2020+) | Lógica, validação e chamada à API |

### Backend
| Tecnologia | Uso |
|---|---|
| Java 25 | Linguagem principal |
| Spring Boot 4.x | Framework web |
| Spring Web (MVC) | Exposição da API REST |
| Spring Validation | Validação dos dados de entrada |
| Lombok | Redução de boilerplate |
| Groq API | IA para geração das configurações |
| LLaMA 3.1 (via Groq) | Modelo de linguagem utilizado |

---

## ⚙️ Como Rodar

### Pré-requisitos

- Java 17+ instalado
- Maven instalado
- Chave de API da [Groq](https://console.groq.com)
- Navegador moderno (para o frontend)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/pc-builder.git
cd pc-builder
```

### 2. Configurar a chave da Groq

No arquivo `src/main/resources/application.properties`, adicione:

```properties
groq.api.key=SUA_CHAVE_AQUI
groq.api.url=https://api.groq.com/openai/v1/chat/completions
groq.model=llama-3.1-8b-instant
```

### 3. Rodar o backend

```bash
cd pc-builder-api
mvn spring-boot:run
```

O servidor sobe em `http://localhost:8080`.

### 4. Abrir o frontend

Basta abrir o arquivo `frontend/index.html` diretamente no navegador.

> ⚠️ Certifique-se de que o backend está rodando antes de usar o frontend.

---

## 🔌 API REST

### `POST /api/pc-builder`

Recebe as preferências do usuário e retorna uma configuração de PC gerada por IA.

**Request Body:**
```json
{
  "uso": "jogos",
  "orcamento": "intermediario",
  "valorMaximo": 6000
}
```

**Campos de `uso`:** `jogos` · `estudos` · `trabalho` · `programacao` · `edicao` · `basico`

**Campos de `orcamento`:** `custo-beneficio` · `intermediario` · `premium`

**`valorMaximo`:** opcional — valor em reais.

---

**Response Body:**
```json
{
  "processador": "Ryzen 5 7600X",
  "placaMae": "B650M Mortar",
  "memoriaRam": "32 GB DDR5 5200 MHz",
  "placaVideo": "RTX 4070 12 GB",
  "armazenamento": "SSD NVMe 1 TB",
  "fonte": "650 W 80 Plus Gold",
  "gabinete": "Mid Tower ATX",
  "precoEstimado": 6800
}
```

---

## 🤖 Como a IA Funciona

1. O frontend envia o payload com uso, orçamento e valor máximo
2. O `PcBuilderService` monta um prompt detalhado em português
3. O `GroqService` envia o prompt para a API da Groq usando o modelo **LLaMA 3.1**
4. A resposta da IA é parseada e convertida para o objeto `PcBuilderResponse`
5. O backend retorna o JSON para o frontend
6. O frontend renderiza os cards com cada componente

---

## 🎨 Interface

- Tema **dark** com fundo preto e acento **verde neon**
- Grade sutil no fundo com efeito tech
- Cards com animação em cascata na tela de resultado
- Estados de **loading**, **erro** e **resultado** independentes
- Totalmente **responsivo** para desktop e mobile
- Fontes: `Syne` (display) + `JetBrains Mono` (código/valores)

---

## 🐛 Problemas Conhecidos e Soluções

**Erro de CORS ao conectar frontend com backend:**
Certifique-se de que a classe `CorsConfig.java` está presente no pacote `config`. Ela libera requisições de qualquer origem para todos os endpoints.

**Erro `model_decommissioned` na Groq:**
O modelo `llama3-8b-8192` foi descontinuado. Use `llama-3.1-8b-instant` ou `llama-3.3-70b-versatile` no `application.properties`.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por **Pedro Eng** 🚀

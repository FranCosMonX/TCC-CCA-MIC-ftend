<div align="justify">

# CCA MIC — Construtor de Códigos Automáticos para Microcontroladores

O **CCA MIC** (Construtor de Códigos Automáticos para Microcontroladores) é uma aplicação desenvolvida com o objetivo de auxiliar usuários no desenvolvimento de sistemas embarcados utilizando Inteligência Artificial. A proposta do projeto é reduzir a complexidade envolvida na criação, compilação e gravação de códigos para microcontroladores, permitindo que tanto iniciantes quanto profissionais da área possam desenvolver soluções de forma mais prática e eficiente.

Atualmente, muitas ferramentas voltadas para sistemas embarcados exigem conhecimentos avançados em programação, eletrônica e configuração de ambientes de desenvolvimento. Isso acaba dificultando o acesso de usuários que desejam apenas automatizar tarefas do cotidiano ou criar aplicações específicas para casa, estudos ou trabalho.

Nesse contexto, o CCA MIC atua como uma camada intermediária entre o usuário e os serviços de Inteligência Artificial, automatizando etapas repetitivas do desenvolvimento e simplificando o fluxo de criação de projetos embarcados.

Vale citar um tutorial alterativo em [francosmonx.github.io/#/projetos/tutorial_cca_mic](https://francosmonx.github.io/#/projetos/tutorial_cca_mic)

---

# Inteligência Artificial

A Inteligência Artificial (IA) é um campo da Ciência da Computação voltado para o desenvolvimento de sistemas capazes de executar tarefas que normalmente exigiriam inteligência humana. Entre essas tarefas estão:

- Reconhecimento de padrões;
- Aprendizado com dados (*Machine Learning*);
- Processamento de linguagem natural;
- Tomada de decisões;
- Automação de processos.

Nos últimos anos, a IA passou a fazer parte de diversos aplicativos e plataformas, sendo utilizada para aumentar produtividade, automatizar tarefas e auxiliar usuários em diferentes contextos.

No desenvolvimento de software, a IA pode ser uma ferramenta extremamente útil para:

- Gerar trechos de código;
- Detectar vulnerabilidades;
- Automatizar tarefas repetitivas;
- Acelerar processos de desenvolvimento;
- Organizar estruturas de projetos.

Entretanto, o uso excessivo ou inadequado dessas ferramentas pode gerar dependência tecnológica e dificultar a compreensão do código produzido. Além disso, algumas plataformas de IA utilizam informações fornecidas pelos usuários para treinamento de modelos, o que pode representar riscos quando dados pessoais ou sensíveis estão envolvidos.

O CCA MIC busca justamente minimizar esses problemas ao atuar como intermediário entre o usuário e os serviços de IA, proporcionando um ambiente mais controlado para geração de aplicações embarcadas.

---

# Aplicação

A aplicação possui uma interface simples e objetiva, desenvolvida para facilitar a interação do usuário sem armazenar informações pessoais.

O frontend foi desenvolvido utilizando:

- React;
- Vite;
- Material UI;
- React Hook Form;
- Zod.

A interface é responsável por permitir que o usuário configure parâmetros do projeto, selecione a Inteligência Artificial desejada e acompanhe o desenvolvimento do código gerado.

> O backend pode ser encontrado em [https://github.com/FranCosMonX/TCC-CCA-MIC-BKend](https://github.com/FranCosMonX/TCC-CCA-MIC-BKend)

---

# Requisitos Mínimos

Para executar corretamente a aplicação, é necessário possuir:

- Node.js v22 ou superior instalado;
- Gerenciador de pacotes `pnpm` na versão 10.17 ou superior;
- Backend do CCA MIC configurado e em execução;
- Conta em um dos serviços de IA suportados: Gemini ou ChatGPT;
- Chave de API válida para acesso ao serviço escolhido.

## Checklist Inicial

Antes de utilizar o sistema, certifique-se de que:

1. O backend do CCA MIC está baixado, configurado e em execução;
2. O frontend deste repositório foi baixado corretamente;
3. O Node.js v22+ e o `pnpm` v10.17+ estão instalados;
4. Existe uma conta ativa em um serviço de IA compatível: IA (Google/OpenAI) e AssemblyAI;
5. A chave de API do serviço escolhido está configurada.

---

# Sistemas Operacionais Suportados

Atualmente, as primeiras versões do sistema CCA Mic possuem suporte oficial apenas para:

- Windows 10 versão 1809 (build 17763) ou posterior;
- Windows 11.

Essa limitação existe devido às configurações simplificadas utilizadas pelo backend durante o desenvolvimento do protótipo acadêmico, como a instalação do *arduino-cli* caso o mesmo não exista na máquina do usuário que está executando o backend. Para mais informações, visite a documentação do repositório do backend.

---

# Funcionalidades

Entre as principais funcionalidades da aplicação, destacam-se:

- Comunicação entre usuário e Inteligência Artificial;
- Geração automática de código para microcontroladores;
- Preparação do ambiente de desenvolvimento;
- Geração de arquivos de configuração;
- Compilação automatizada do projeto;
- Gravação do código no microcontrolador via USB;
- Interface simplificada para interação com IA.

---

# Limitações

Por se tratar de um protótipo acadêmico, algumas limitações ainda estão presentes:

- Não existem mecanismos robustos de segurança implementados;
- O sistema depende de serviços externos de IA;
- O suporte oficial está limitado ao Windows devido ao uso do Winget;
  > Para funcionar em maquinas com S.O. Windows mais antigos, é necessário que as ferramentas sejam instaladas manualmente pelo usuário.
- Perda do projeto criado **com o mesmo nome** do gerado posteriormente.

---

# Configuração do Ambiente

## Instalação das Dependências

Com o `Node.js` v22+ e o `pnpm` v10.17+ instalados, abra o terminal no diretório do projeto — onde se encontra o arquivo `index.html` — e execute:

```console
pnpm install
```

> Caso o **pnpm** não esteja instalado, instale usando o comando `npm install -g pnpm`.

Caso haja uma mensagem informando `ERR_PNPM_IGNORED_BUILDS`, use o comando `pnpm approve-builds`, selecione a opção com a tecla *space* e prima Enter.

---

# Configuração do Arquivo `.env`

Antes de iniciar a aplicação, é necessário configurar as variáveis de ambiente.

1. Copie o arquivo `.env-example`;
2. Cole o arquivo no mesmo diretório;
3. Renomeie a cópia para `.env`.

Depois disso, configure:

- A URL da API do backend do CCA MIC;
- A chave da API da AssemblyAI utilizada para transcrição de áudio.

Em .env-example contém 2 variáveis: `VITE_API_URL` usada para armazenar a URL em que o Backend está rodando e `VITE_KEY_ASSEMBLY_AI` para ter acesso à funcionalidade de transcrição de áudio.

```txt
VITE_API_URL=http://{ip}:{porta}/api
VITE_KEY_ASSEMBLY_AI=API_KEY
```

Ao incluir a URL, em que o backend está sendo executado, entre **VITE_API_URL=** e **/api**, o conteúdo do arquivo *.env* ficará semelhante ao visto logo a seguir.

```txt
VITE_API_URL=http://127.0.0.1:5000/api
VITE_KEY_ASSEMBLY_AI=API_KEY
```

Ao terminar, salve as alterações e feche o aplicatiivo de usado para o editar.

---

# Execução da Aplicação

Após concluir as etapas anteriores, execute o seguinte comando para iniciar o frontend em modo de desenvolvimento:

```console
pnpm run dev
```

O modo de desenvolvimento é recomendado para testes e utilização durante o desenvolvimento da aplicação.

> Note que no backend, quando usar uma funcionalidade, irá chamar um mesmo backend 2 vezes devido ao uso do vite. Isso só acontece em modo de desenvolvimento.

</div>
<div align='justify'>

# CCA MIC - Construtor de Códigos para Microcontroladores

Na busca por ferramentas, várias pessoas procuram meios de conseguir construir uma aplicação direcionada para seus problemas pessoais, sejam eles voltados para casa ou trabalho. Entretanto, as ferramentas encontradas são mais direcionadas para quem tem estudo na área, principalmente quando se fala em construir sistemas embarcados usando microcontroladores para serviços repetidos ou inteligentes (uso de AI ou vários sensores) que não precisam de interação com seres humanos.

O Construtor de Códigos Automáticos para Microcontroladores (CCA MIC) não só atende essas pessoas, como, também, profissionais da área. Isso porque a aplicação pode construir códigos que o programador já sabe fazer mas que demanda muito tempo ferindo seus planos de negócios ou atrasando features. Isso, para muitos é desnecessário, pois teria uma InteligÊncia Artigicial (AI) para gerar o código, mas ela não compilará e gravará no microcontrolador que estaria conectado ao computador local do usuário.

## Inteligência Artificial

...

### O uso de Inteligência Artificial no dia a dia das pessoas

...

### O uso de Inteligência Artificial no trabalho

...

### O uso de Inteligência Artificial na programação

...

### A importância de um intermediário entre o Usuário e a Inteligência Artificial

...

## Aplicação

A aplicação conta com uma interface simples para os usuários de forma a não guardar dados pessoais dos mesmos. Tal interface foi desenvolvida usando React + vite com componentes da MaterialUI e validação de campos usando HookForms + Zod.

### Requisitos Mínimos

A preparação do ambiente de execução da aplicação depende muito do `Node.js` e da aplicação `backend` responsável por atender os pedidos do usuário, ser o intermediário entre o usuário e outros serviços de terceiros como a Google ou OpenAI (Germini, ChatGPT) e compilar e gravar o código fonte no microcontrolador do usuário.

Dessa forma, o usuário deve fazer o seguinte checklist para poder usar esta aplicação:

1. Estar com backend baixado e configurado;
2. Estar com o frontend (este repositório) baixado e configurado;
    > Instalar o Node.js e gerenciador de pacotes PNPM
3. Ter uma conta criada no serviço de terceiros suportados até a versão atual da aplicação;
4. Ter uma chave de acesso para o uso da API da aplicação de terceiros.

#### Sistema Operacional (SO) suportado

Nessas primeiras versões, a aplicação só terá suporte para S.O. do Windows 10 e 11 devido a configurações do backend simplificado.

### Uso da aplicação

Para utilizar a aplicação, deve-se definir alguns parâmetros, como a AI a ser utilizada e chave para acessar seus serviços e configurações do microcontrolador.

#### Limitações

A aplicação não será responsável por salvar as interações com o usuário. Ou seja, é bom anotar bem o que foi mencionado durante a conversa e aprender já que a aplicação foi desenvolvida para auxiliar o ser humano, sendo este capaz de manipular qualquer informação construída ou desenvolvida durante as conversas.

</div>
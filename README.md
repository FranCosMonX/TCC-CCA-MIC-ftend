<div align='justify'>

# CCA MIC - Construtor de Códigos para Microcontroladores

Na busca por ferramentas, várias pessoas procuram meios de conseguir construir uma aplicação direcionada para seus problemas pessoais, sejam eles voltados para casa ou trabalho. Entretanto, as ferramentas encontradas são mais direcionadas para quem tem estudo na área, principalmente quando se fala em construir sistemas embarcados usando microcontroladores para serviços repetidos ou inteligentes (uso de AI ou vários sensores) que não precisam de interação com seres humanos.

O Construtor de Códigos Automáticos para Microcontroladores (CCA MIC) não só atende essas pessoas, como, também, profissionais da área. Isso porque a aplicação pode construir códigos que o programador já sabe fazer mas que demanda muito tempo ferindo seus planos de negócios ou atrasando features. Isso, para muitos é desnecessário, pois teria uma InteligÊncia Artigicial (AI) para gerar o código, mas ela não compilará e gravará no microcontrolador que estaria conectado ao computador local do usuário.

## Inteligência Artificial

A Inteligência Artificial (IA) é um campo da ciência da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana. Isso inclui o reconhecimento de padrões, a aprendizagem com dados (machine learning), a tomada de decisões, a geração de linguagem natural e a automação de processos. Em outras palavras, a IA busca criar máquinas que pensem, aprendam e ajam de forma autônoma ou assistida, simulando aspectos do raciocínio humano.

Notoriamente, o uso de IA tem se destacado nos últimos anos. A cada novo aplicativo ou site lançado, é comum haver alguma integração com essa tecnologia — seja para otimizar tarefas, automatizar processos ou oferecer respostas rápidas ao usuário, evitando longas pesquisas em navegadores. No ambiente de trabalho, a IA desempenha um papel fundamental quando o tema é agilidade e produtividade. Dependendo da área, é possível utilizá-la para gerar resultados mais elaborados e eficientes. No entanto, em algumas profissões, o uso irrestrito de IA pode ser problemático, especialmente quando envolve dados pessoais ou informações sensíveis, já que muitas ferramentas utilizam esses dados para o próprio treinamento — algo previsto em seus termos de uso e muitas vezes ignorado pelos usuários. Profissões como advocacia, consultoria autônoma ou gestão de dados exigem cuidado redobrado nesse aspecto. Para desenvolvedores de software, a IA representa uma ferramenta de apoio valiosa, desde que usada com discernimento. Ela pode ajudar a otimizar o tempo, organizar códigos e detectar vulnerabilidades, mas não deve substituir o conhecimento técnico do profissional. Quando usada de forma excessiva ou incorreta, pode gerar dependência e prejudicar o aprendizado.

Atualmente, muitos desenvolvedores têm recorrido à IA para gerar aplicações completas, em vez de utilizá-la como instrumento de aprendizado. Isso acaba criando um efeito colateral: o tempo de consolidação dos projetos aumenta, e a correção de erros se torna mais difícil, especialmente quando ocorrem após a entrega ao cliente — já que o programador pode não compreender a fundo o código produzido pela IA. Diante desse cenário, torna-se evidente a necessidade de um intermediário entre o desenvolvedor e a IA — uma espécie de agente ou camada de mediação capaz de facilitar o desenvolvimento, reduzir a complexidade de projetos e garantir um uso mais seguro e eficaz da tecnologia. Esse intermediário pode assumir diversas formas: desde uma interface inteligente que traduza comandos humanos em instruções técnicas, até políticas e práticas que assegurem o uso ético e consciente das inteligências artificiais no processo de criação.
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
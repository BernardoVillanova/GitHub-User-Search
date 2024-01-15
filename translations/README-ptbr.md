# GitHub Search

Uma aplicação para procurar usuários do GitHub.

- Primeiro de tudo, isto é uma aplicação que está consumindo a <a href="https://docs.github.com/en/rest?apiVersion=2022-11-28">API do GitHub</a>;

<details>
<summary>Traduções:</summary>

- [English](../README.md)

</details>

# Sumário
- [GitHub Search](#github-search)
- [Sumário](#sumário)
    - [Pré-Requisito para Rodar:](#pré-requisito-para-rodar)
    - [Rode a Aplicação](#rode-a-aplicação)
    - [Ambiente de Setup](#ambiente-de-setup)
      - [Observação:](#observação)
    - [Estrutura do código](#estrutura-do-código)

### Pré-Requisito para Rodar:

- Instale <a href="https://docs.docker.com/engine/install/">Docker 🐳</a>;

### Rode a Aplicação

- <a href="https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository">Clone o repositório</a>;
- Rode os seguintes comandos:

$ ```docker build .``` or ```docker build -t nameapp .```

$ ```docker run -d -p 8080:80 --name nameapp nameapp```

- - E assim a instalação do projeto está completa, agora basta acessar o <a href="http://localhost:8080">Local Host</a> na porta 8080;

### Ambiente de Setup

- <a href="https://vuejs.org/guide/introduction.html">VueJS</a>
  - <a href="https://br.vuejs.org/v2/guide/installation.html">Guia de Instalação</a>
- <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap</a>
- <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">FontAwesome</a>
- <a href="https://axios-http.com/ptbr/docs/intro">Axios</a>

#### Observação:

- Todos os frameworks acima foram adicionados via CDN;
  - Com exceção do FontAwesome, que foi inserido com a seu link de KitTool;
  - Podem ser encontradas no arquivo index.html;
- Optei por usar o FontAwesome separadamente do BootsTrap 5, mas se quiser usar a nova unificação de ambos também funcionará;

### Estrutura do código

- O arquivo html (index.html) é onde inseri os links da CDN e do ToolKit e o Header padrão;
- Foi criada uma div, identificada como 'content', onde será inserido o conteúdo do VueJs;
- O arquivo main.js está estruturado da seguinte forma:
  - ```el``` -> É aqui que o DOM tem lugar, para modelar o HTML ;
  - ```template``` -> Onde é inserido o código HTML, optei por codificar desta forma para facilitar o uso do VueJS em comandos posteriores;
  - ```data()``` -> Declaração de dados;
    - A variável ```selectedRepoType: 'repos'```, tem essa declaração para que quando o Usuário for pesquisado, a parte Repos seja marcada no css;
    - ```showInput: true```, esta tem a função de esconder e mostrar a entrada de busca e visualizar os repos, construí desta forma para ser página única;
    - ```originalRepos[]``` é utilizado para fazer uma cópia dos repositórios para que a filtragem possa ser feita e a lista de repositórios esteja disponível
      - ```...this.repo``` garante que é uma cópia independente e não uma referência
- A função do ```axios```, um framework js, no código que você forneceu é fazer requisições HTTP para a API do GitHub.
- ```methods```:
  - Há um total de 5 funções, a primeira delas é: 
    - ```enviar()```: A função enviar(), cujo papel é enviar o nome procurado no input principal {{ user }}
      - Neste caso, logo após a chamada da promessa (promise) para exibir os repositórios, é feita outra chamada para verificar os repositórios com estrela do usuário;
    - A função ```mostrarInput()``` está alocada ao Botão Return, para que seja possível retornar à tela inicial e buscar outro Usuário;
    - As funções ```exibirRepo()``` e ```exibirEstrela()```, tem o papel de exibir os Repos e Estrelas do usuário, contudo a função ```enviar()``` já faz o papel de verificar os Repos do usuário, apenas fiz uma segunda chamada quando cliquei no Trigger dela; (Dry)
    - E a função ```filtrarRepos()``` faz a conversão para letra minúsculas (lowercase) para verificar sua semelhança com o repo e o que foi digitado no filtro;

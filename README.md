# GitHub Search

An application to search for GitHub Users

- First of all, this is an application that is consuming the <a href="https://docs.github.com/en/rest?apiVersion=2022-11-28">GitHub API</a>;

<details>
<summary>Translations:</summary>

- [Português Brasileiro](translations/README-ptbr.md)

</details>



# Summary 
- [GitHub Search](#github-search)
- [Summary](#summary)
    - [Prerequisite to Run:](#prerequisite-to-run)
    - [Run Application](#run-application)
    - [Setup Environment](#setup-environment)
      - [Observation:](#observation)
    - [Code Structure](#code-structure)

### Prerequisite to Run:

- Install <a href="https://docs.docker.com/engine/install/">Docker 🐳</a>;

### Run Application

- <a href="https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository">Clone the repository</a>;
- Run the following commands:

$ ```docker build .``` or ```docker build -t nameapp .```

$ ```docker run -d -p 8080:80 --name nameapp nameapp```

- And so the installation of the project is complete, now all you have to do is access the <a href="http://localhost:8080">Local Host</a> on port 8080;

### Setup Environment

- <a href="https://vuejs.org/guide/introduction.html">VueJS</a>
  - <a href="https://br.vuejs.org/v2/guide/installation.html">Installation Guide</a>
- <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap</a>
- <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">FontAwesome</a>
- <a href="https://axios-http.com/ptbr/docs/intro">Axios</a>

#### Observation:

- All of the above frameworks were added via CDN;
  - With the exception of FontAwesome, which was inserted with its KitTool link;
  - You can find them in the index.html file;
- I've chosen to use FontAwesome separately from BootsTrap 5, but if you want to use the new unification of both it will work too;

### Code Structure

- The html file is where I inserted the CDN and ToolKit links and the standard Header;
- A div has been created, identified as 'content', where the VueJs content will be inserted;
- The main.js file is structured as follows:
  - ```el``` -> This is where the DOM takes place, to model the HTML ;
  - ```template``` -> Where the HTML code is inserted, I chose to code it this way to make it easier for VueJS to use later commands;
  - ```data()``` -> Data Declaration;
    - The variable ```selectedRepoType: 'repos'```, has this declaration so that when the User is searched, the Repos part is marked in the css;
    - ```showInput: true```, this has the function of hiding and showing the search input and visualizing the repos, I built it this way to be single page;
    - ```originalRepos[]``` is used to make a copy of the repositories so that filtering can be done and the list of repositories is available
      - ```...this.repo``` ensuring that it is an independent copy and not a reference
- The function of ```axios```, a js framework, in the code you've provided is to make HTTP requests to the GitHub API.
- ```methods```:
  - There are a total of 5 functions, the first of which is: 
    - ```enviar()```: The enviar() function, whose role is to send the name searched for in the main Input {{ user }}
      - In this case, right after the promise call to display the repositories, another call is made to check the repositories with the user's star;
    - The ```mostrarInput()``` function is allocated to the Return Button, so that you can return to the start screen and search for another User;
    - The functions ```exibirRepo()``` and ```exibirStar()```, have the role of displaying the user's Repos and Starred, since the function ```enviar()``` already does the role of checking the user's Repos, I just made a second call when I clicked on its Trigger;
    - And the ```filtrarRepos()``` function performs the lowercase conversion to check its similarity to what was typed in the filter;
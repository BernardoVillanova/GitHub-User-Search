new Vue({
    el: '#content',
    template: `
    <div>
        <template v-if="showInput">
            <div class="search">
                <input v-model="user" v-on:keyup.enter="enviar" placeholder="Search a Username"> 
                <button v-on:click="enviar"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </template>
        <template v-else>
        <nav>
            <strong v-on:click="exibirRepo">Repos <i class="numRepo">{{ numRepo }}</i></strong>
            <strong v-on:click="exibirStar">Starred <i class="numRepo">{{ numStar }}</i></strong> 
            <button id="back" v-on:click="mostrarInput">Return</button>
        </nav>
        </template>
        <div v-if="!showInput">
            <h2>{{ userName }}</h2>
            <img v-bind:src="avatar" alt="User Avatar"/>
        </div>
        <div v-for="repo in repos" :key="repo.id">
            <h3><a :href="repo.html_url" target="_blank">{{ repo.name }}</a></h3>
            <p>{{ repo.description }}</p>
            <p><i class="fa-solid fa-code"></i>: {{ repo.language }}</p>
            <a :href="repo.html_url" target="_blank"></a>
            <hr/>
        </div>
    </div>
    `,
    data() {
        return {
            userName: '',
            avatar: '',
            showInput: true,
            user: '',
            userName: '',
            avatar: '',
            bio: '',
            numRepo: '',
            numStar: '',
            repos: []
        }
    },
    methods: {
        enviar() {
            axios
                .get("https://api.github.com/users/" + this.user)
                .then(response => {
                    this.userName = response.data.name;
                    this.avatar = response.data.avatar_url;
                    this.bio = response.data.bio;
                    this.numRepo = response.data.public_repos; 

                    return axios.get(response.data.repos_url)
                })

                .then(response => {                    
                    this.repos = response.data;

                    this.repos.forEach(repo => {
                        axios.get(repo.url) 
                            .then(repoResponse => {
                                repo.description = repoResponse.data.description;
                                repo.language = repoResponse.data.language;
                            })
                            .catch(error => console.error('Erro ao obter informações do repositório:', error));
                    });
                    this.showInput = false;
                })
                .catch(error => {
                    window.alert('Não foi possível encontrar o usuário. Por favor, insira um nome de usuário válido.');
                    console.error('Erro ao fazer a requisição:', error);
                });
        },
        mostrarInput() {
            location.reload();
        },
        exibirRepo() {
            axios
                .get(`https://api.github.com/users/${this.user}/repos`)
                .then((response) => {
                    this.repos = response.data;
                    this.showInput = false;
                })
                .catch((error) => {
                    console.error('Erro ao buscar repositórios:', error);
                });
        },
        exibirStar() {
            axios
                .get(`https://api.github.com/users/${this.user}/starred`)
                .then((response) => {
                    this.repos = response.data;
                    this.showInput = false;
                })
                .catch((error) => {
                    console.error('Erro ao buscar repositórios favoritos:', error);
                });
        }
}})
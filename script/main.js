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
                <strong :class="{ 'selected': selectedRepoType === 'repos' }" v-on:click="exibirRepo">Repos <i class="numRepo">{{ numRepo }}</i></strong>
                <strong :class="{ 'selected': selectedRepoType === 'starred' }" v-on:click="exibirStar">Starred <i class="numRepo">{{ numStar }}</i></strong> 
                <button id="back" v-on:click="mostrarInput">Return</button>
            </nav>
        </template>
        <div class="profile-container" v-if="!showInput">
            <div class="profile">
            <div class="profile-image">
                <img v-bind:src="avatar" alt="User Avatar" />
            </div>
            <div class="profile-info">
                <span class="userName">{{ userName }}</span>
                <span class="bioUser">{{ bio }}</span>
            </div>
            </div>
        </div>
        <div class="search" v-if="!showInput">
                <input v-model="filter" placeholder="Filter by Name">
                <button v-on:click="enviar"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div v-for="repo in filteredRepos" :key="repo.id" id="repo">
            <h3><a :href="repo.html_url" target="_blank">{{ repo.name }}</a></h3>
            <p>{{ repo.description }}</p>
            <p><i class="fa-solid fa-code"></i>: {{ repo.language }}</p>
            <a :href="repo.html_url" target="_blank"></a>
        </div>
    </div>

    `,
    data() {
        return {
            showInput: true,
            filter: '',
            user: '',
            userName: '',
            avatar: '',
            bio: '',
            numRepo: '',
            numStar: '',
            repos: [],
            originalRepos: [],
            selectedRepoType: 'repos'
        }
    },
    computed: {
        filteredRepos() {
            return this.repos.filter(repo =>
                repo.name.toLowerCase().includes(this.filter.toLowerCase())
            );
        },
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
                    this.followers = response.data.followers;
                    this.selectedRepoType = 'repos';

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
                    this.originalRepos = [...this.repos];
                    this.showInput = false;
                    
                    return axios.get(`https://api.github.com/users/${this.user}/starred`)
                })
                .then(response => {
                    this.numStar = response.data.length;
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
                this.enviar(response);
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
                this.originalRepos = [...this.repos];
                this.showInput = false;
                this.selectedRepoType = 'starred';
            })
            .catch((error) => {
                console.error('Erro ao buscar repositórios favoritos:', error);
            })
        },
        filtrarRepos() {
            this.repos = this.originalRepos.filter(repo =>
              repo.name.toLowerCase().includes(this.filter.toLowerCase())
            );
        },
    },
});

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
            <button v-on:click="mostrarInput">Voltar</button>
        </template>
        <hr/>
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
        }
    }
})
new Vue({
    el: '#content',
    template: `
    <div>
        <div class="search">
            <input v-model="user" v-on:keyup.enter="enviar" placeholder="Search a Username"> 
            <button v-on:click="enviar"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <hr/>
        <h2>{{userName}}</h2>
        <img v-bind:src="avatar"/>
    </div>
    `,
    data() {
        return {
            userName: '',
            avatar: '',
        }
    },
    methods: {
        enviar() {
                axios
                    .get("https://api.github.com/users/" + this.user)

                    .then(response => (this.info = response,
                        this.userName = response.data.name,
                        this.avatar = response.data.avatar_url))
    }
}})
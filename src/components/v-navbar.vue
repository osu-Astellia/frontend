<template>
    <div class="topPanel">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand to="/">Astellia</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/leaderboard">Leaderboard</router-link></b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown v-if="data" right >
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content v-if="data.username">
                            <em>{{ data.username }}</em>
                        </template>
                        <b-dropdown-item :to="data.url">Profile</b-dropdown-item>
                        <b-dropdown-item to="/profile/settings">Settings</b-dropdown-item>
                        <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else style="padding: 0 !important;">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content >
                                Guest
                            </template>
                            <b-dropdown-item v-b-modal.LoginModal class="black-link">
                                Login

                            </b-dropdown-item>

                            <b-modal id="LoginModal" hide-footer title="Log In">
                                <Login />
                            </b-modal>


                            <b-dropdown-item v-b-modal.registerModal class="black-link">Register</b-dropdown-item>

                            <b-modal id="registerModal" hide-footer title="Register an Account">
                                <modal-register />
                            </b-modal>
                        </b-nav-item-dropdown>

                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'
    import Login from "../modals/modal-login";
    import ModalRegister from "../modals/modal-register";



    export default {
        ...mapActions(['logout']),
        ...mapState(['token']),
        name: "v-navbar",
        components: {ModalRegister, Login},
        data(){
            return {
                token: this.$store.state.token,
                settings: null,
                data: null
            }
        },
        methods: {
//s
            logout(){
                this.$store.dispatch('logout')
            },
            async fetchUserData(){
                this.userdata = await this.axios.get('https://astellia.club/frontend/api/v1/user/@me', {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    this.user = res.data;

                });
                this.data = {
                    url: `/u/${this.user[0].id}`,
                    username: this.user[0].username,
                    id: this.user[0].id
                }


            },

            getUsername(){
                if(!this.userdata) return this.fetchUserData().then(r => this.userdata.username);
                return this.userdata.username;
            }
        },
        watch: {

        },

        async mounted() {
            await this.fetchUserData();
        }
    }
</script>

<style scoped>


.dropdown-menu {
    transition: 0.4s;
}
    a.black-link {
        color: black !important;
        transition: 0.4s;
        text-decoration: none;
    }

    a.black-link:hover {
        color: burlywood;
        text-decoration: none;
    }

    .navbar {
        background-color: #21263e;
    }

    a {

        text-decoration: none;
        color: white;
        transition: 0.4s;
    }

    a:hover {
        color: #869aff;
        text-decoration: none;
    }

    .nav-link {
        padding: 0 !important;
    }

    .avatar {
        width: 48px;
        height: 48px;
        padding: 0;
    }
.navbar-brand {
    color: black;
}
</style>
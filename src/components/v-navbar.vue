<template>
    <div>
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand href="#">Astellia</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/leaderbard">Leaderboard</router-link></b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown v-if="token" right >
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else style="padding: 0 !important;">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content >
                                Guest
                            </template>
                            <b-dropdown-item to="/login" class="black-link">Login</b-dropdown-item>
                            <b-dropdown-item to="/register" class="black-link">Register</b-dropdown-item>
                        </b-nav-item-dropdown>

                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'



    export default {
        ...mapState(['token']),
        name: "v-navbar",
        data(){
            return {
                token: this.$store.token
            }
        }
    }
</script>

<style scoped>

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
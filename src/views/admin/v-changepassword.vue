<template>
    <div class="box" v-if="mounted">
        <form>
            <div class="DataGroup">
                <div class="DataGroupTitle">
                    Security
                </div>

                <div class="DataInputs">
                    <div class="DataInput">
                        <span>ID<input v-model="data.username"></span><br>
                        <span>New password<input v-model="data.newpassword"></span><br>
                        <button @click.prevent="send">Save</button>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "v-changepassword",
        data(){
            return {
                data: {
                    username: '',
                    newpassword: '',
                },
                mounted: false

            }
        },
        mounted(){

            if(!this.$store.state.token) return this.$router.push({path: '/404'});
            //let token = this.$store.state.token;
            //this.$store.dispatch('getUser', token);
            //if(((this.$store.state.user[0].privileges >> 16) & 1) < 1) return this.$router.push({path: '/404'});
            this.mounted = true;
        },
        methods: {
            async send(){
                console.log('a')
                let a = await fetch(`/frontend/api/v1/users/password_reset?u=${this.data.username}&p=${this.data.newpassword}`, {
                    headers: {
                        'Authorization': this.$store.state.token
                    }
                }).then(res => {
                    alert('OK')
                }).catch(e => {
                    alert('Error, check network tab in inspector')
                })
            }
        }
    }
</script>

<style scoped>
    .settings {
        background-color: #302E38;
    }
    .view {
        width: 70%;
        margin: 0 auto;
    }

    .settings {
        border-radius: 30px;
        margin: 30px;
    }
    .DataGroupTitle {
        font-size: 32px;
        padding: 1.5rem;
    }
    span input {
        margin: 0 10px;
        transition: 0.4s;
    }
    span {
        display: inline-flex;
        justify-content: space-between;
        width: 400px;
    }

    span:not(:first-child) {
        margin-top: 10px;
    }
    button {
        outline: none;
        background-color: #5639AC;
        border: 1px solid #5639AC;
        color: white;
        margin-top: 15px;
        width: 100px;
        height: 40px;
        border-radius: 10px;
        transition: 0.2s;
    }

    button:hover {
        background-color: #5639D5;
        border: 1px solid #5639D5;
    }
</style>
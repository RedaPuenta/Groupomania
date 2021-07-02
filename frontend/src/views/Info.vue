<template>
  <div class="info">

        <h1 class="info__titre">Compléter vos informations</h1>

        <div class="info__avatar">
            <div class="info__avatar__list">
                <div v-for="(item, index) in list_avatar" :key="index" class="info__avatar__list__item">
                    <img :src="item" alt="Avatar">
                    <div @click="getAvatar" :data-avatar="item" name="focus" class="info__avatar__list__item__shadow"></div>
                </div>
            </div>
        </div>

        <div class="info__details">

            <div class="info__details__name">
                <input type="text" placeholder="Prénom" v-model="firstName">

                <div class="info__details__name__avatar">
                    <img :src="avatar" alt="Avatar par défaut">
                    <div class="info__details__name__avatar__shadow"></div>
                </div>
                <input type="text" placeholder="Nom" v-model="lastName">
            </div>

            <input type="text" placeholder="Biographie" v-model="bio">

            <button @click="updateInfo">{{buttonText}}</button>
        </div>

        <Error/>
        
        <router-link class="info__after" :to="{name: 'Multimedia'}">
            <span>Je ferais ça plus tard</span>
        </router-link>
    
    </div>
</template>

<script>
import Error from '@/components/Error.vue'

export default {
    name: "Info",

    components: {
        Error
    },

    data: function(){
        return {
            list_avatar: [],
            bio: "",
            firstName: "",
            lastName: "",  
            avatar: "",
            buttonText: "Enrengistrer et continuer"
        }
    },  

    methods: {
        getAvatar: function(event){
            this.avatar = event.target.dataset.avatar
        },
        updateInfo: function(){

            const avatar = this.avatar
            const bio = this.bio
            const firstName = this.firstName
            const lastName = this.lastName
            const userId = localStorage.getItem("userId")

            this.$axios.put(`/user/${userId}`, {avatar: avatar, bio: bio, firstName: firstName, lastName: lastName})
            .then(() => {

                this.$store.commit("DESACTIVE_ERROR")
                this.buttonText = "Enrengistrement en cours ..."
                
                setTimeout(function(){

                    this.$router.push({name: 'Multimedia'})

                }.bind(this), 2000)

            })
            .catch((error) => {
                
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
                
            })
        }
    },

    beforeCreate: function(){
        this.$store.dispatch('accessPage')
    },

    mounted: function(){
        this.$store.dispatch('neo')

        this.$axios.get(`/asset/avatar`)
        .then((response) => {
            console.log(response)
            this.list_avatar = response.data

            const userId = localStorage.getItem("userId")

            this.$axios.get(`user/info/${userId}`)
            .then((response) => {
                
                this.firstName = response.data[0].firstName
                this.lastName = response.data[0].lastName
                this.bio = response.data[0].bio
                this.avatar = response.data[0].avatar

            })  
            .catch((error) => {
                console.log(error)
            })

        })
        .catch((error) => {
            console.log(error)
        })
    },

    updated: function(){
        this.$store.dispatch('neo')
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";

    .info{
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__titre{
            padding: 15px;
            margin-bottom: 40px;
            font-size: rem(30px);
            font-weight: bold;
            color: black;
            position: relative;
        }

        
        &__titre::before{
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgb(59, 59, 59);
            width: 70%;
            height: 2px;
            margin: auto;
        }
        
        &__avatar{
            width: 70%;
            height: 130px;
            overflow-x: scroll;

            &__list{
                padding: 15px;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;

                &__item:hover{
                    transform: scale(1.2);
                    filter: brightness(1.5)
                }

                &__item{
                    border-radius: 100%;
                    position: relative;
                    height: 80px;
                    width: 80px;
                    margin: 0 10px;
                    cursor: pointer;
                    transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;

                    img{
                        height: 80px;
                        width: 80px;
                        border-radius: 100%;
                    }

                    &__shadow{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: $box-shadow-inner;
                    }
                }
            }
        }

        &__details{
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 40px;

            &__name{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                input{
                    width: 35%;
                }

                &__avatar{
                    border-radius: 100%;
                    position: relative;
                    width: 120px;
                    height: 120px;

                    img{
                        width: 120px;
                        height: 120px;
                        border-radius: 100%;
                    }

                    &__shadow{
                        border-radius: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: $box-shadow-inner;
                    }

                }

            }

            button{
                border-radius: 30px;
                color: white;
                background-color: $button-action;
                height: 50px;
                width: 100%;
                margin: 20px 0;
                box-shadow: $box-shadow-button;
                cursor: pointer;
            }
        }

        &__after {
            margin-top: 10px;

            span{ 
                font-size: rem(17px);
                color: black;
                text-decoration: underline;
            }
        }
        
    }

    input{
        margin: 20px 0;
        background-color: white;
        text-align: center;
        border-radius: 30px;
        box-shadow: $box-shadow-inner;
        width: 100%;
        height: 50px;
    }

    ::-webkit-scrollbar{
        width: 5px;
        height: 8px;
    }

    ::-webkit-scrollbar-track{
        background-color: rgba(255, 255, 255, 0.445);
    }

    ::-webkit-scrollbar-thumb{
        background-color: rgb(0, 0, 0);
    }

</style>
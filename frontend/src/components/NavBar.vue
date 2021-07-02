<template>
    <nav class="neo navbar">
        <img class="navbar__logo" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo de groupomania">
        <div v-if="mode == 'accueil'" class="navbar__explorer">
            <ul class="navbar__explorer__list">
                <li><router-link to="/Multimedia">Multimedia</router-link></li>
                <li><router-link to="/Friends">Mes collègues</router-link></li>
            </ul>
        </div>
        <div v-if="mode == 'accueil'" class="navbar__account">
            <div class="navbar__account__avatar">
                <div class="navbar__account__avatar__case">
                    <button @click="toggleControl" class="navbar__account__avatar__case__button">
                        <img :src="avatar" alt="Avatar de profil">
                        <span>{{firstName}}</span>
                    </button>
                </div>
            </div>
            <div id="more" class="navbar__account__active">
                <router-link :to="{name: 'Profil', params: {id: userId}}">
                    <div class="navbar__account__active__item">
                        <span>Mon compte</span>
                    </div>
                </router-link>
                <div @click="deconnect" class="navbar__account__active__item">
                    <span>Déconnexion</span>
                </div>
            </div>
        </div>
        <div @click="deleteUser" class="navbar__profil" v-if="mode == 'account' && us == true">
            <span class="navbar__profil__text">Supprimer mon compte</span>
            <i class="navbar__profil__icon fas fa-trash fa-lg"></i>
        </div>
        <div class="navbar__profil" v-if="mode == 'account' && us == true">
            <router-link :to="{name: 'Info'}">
                <span class="navbar__profil__text">Modifier mes informations</span>
                <i class="navbar__profil__icon fas fa-user-edit fa-lg"></i>
            </router-link>
        </div>
        <div class="navbar__back" v-if="mode == 'account'">
            <router-link :to="{name: 'Multimedia'}">
                <span class="navbar__back__text">Retour à l'accueil</span>
                <i class="navbar__back__icon fas fa-long-arrow-alt-right fa-lg"></i>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    
    props: {
        mode: {type: String, required: true}
    },

    data: function(){
        return {
            avatar: "",
            firstName: "",
            userId: "",
            us: false,
            toggle: false
        }
    },

    methods: {
        toggleControl: function(){
            
            var more = document.getElementById("more")

            if(this.toggle == false) {
                more.style.display = "block"
                this.toggle = true
            } else {
                more.style.display = "none"
                this.toggle = false
            }
        },
        deconnect: function(){

            localStorage.clear()
            this.$router.push({name: 'Connexion'})
        },
        deleteUser: function(){

            const userId = localStorage.getItem('userId')

            this.$axios.delete(`/user/${userId}`)
            .then(() => {

                localStorage.clear()
                this.$router.push({name: 'Connexion'})

            })
            .catch((error) => {
                console.log(error)
            })

        }
    },

    beforeMount: function(){

        const userId = localStorage.getItem("userId")
        this.userId = userId

        if(userId == this.$route.params.id){
            this.us = true
        }

        this.$axios.get(`user/info/${userId}`)
        .then((response) => {
            this.avatar = response.data[0].avatar
            this.firstName = response.data[0].firstName
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";

    .router-link-active{
        font-weight: bold;
        font-size: rem(17px);
    }

    .navbar{
        border-radius: 0px!important;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;

        &__logo{
            width: 200px;
        }

        &__explorer{
            padding: 0 50px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &__list{
                display: flex;
                list-style-type: none;

                &__active{
                    background-color: blue;
                    font-weight: bold;
                }

                li{
                    padding: 0 10px;
                    letter-spacing: 2px;
                    cursor: pointer;

                    a{
                        color: black;
                        transition: color 0.3s ease-in-out;
                    }

                    a:hover{
                        color: rgb(180, 180, 180);
                    }

                }
            
            }
        }

        &__account{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: relative;
            height: 100%;

            &__avatar{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 100%;
                position: relative;
               

                &__case{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    

                    &__button{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        background-color: $color-secondary;

                        img {
                            border-radius: 100%;
                            width: 55px;
                            transition: filter 0.4s ease-in-out;
                        }                         
                    
                        span{
                            font-weight: 900;
                            font-size: rem(15px);
                            margin-top: 6px;
                            letter-spacing: 1.5px;
                            text-shadow: 0.5px 0.5px rgb(0, 0, 0), -0.5px -0.5px rgb(255, 255, 255);
                            color: darken($color-secondary, 15);
                        }
                    }

                    &__button:hover img{
                        filter: brightness(1.5);
                    }
                    
                }
            }

            &__active{
                background-color: $button-action;
                border-radius: 15px;
                position: absolute;
                top: 110px;
                display: none;
                box-shadow: $box-shadow-button;
                overflow: hidden;

                &__item{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 180px;
                    height: 40px;
                    color: rgb(255, 255, 255);
                    cursor: pointer;
                }

                &__item:hover{
                    transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
                    color: black;
                    background-color: white;
                }

                &__item:nth-child(1){
                    border-bottom: 1px solid rgb(255, 255, 255);
                }
            }
        }

        &__profil{
            padding: 10px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $button-action;
            border-radius: 10px;
            box-shadow: $box-shadow-button;
            color: white;
            cursor: pointer;

            &__text{
                margin-right: 10px;
                color: white;
            }

            &__icon{
                font-size: rem(15px);
                color: white;
            }
        }

        &__back{
            padding: 10px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            &__text{
                margin-right: 8px;
                color: rgb(0, 0, 0);
            }

            &__icon{
                font-size: rem(15px);
                color: rgb(0, 0, 0);
            }
        }
    }

    .focus{
        color: black;
        font-weight: bold;
    }
</style>
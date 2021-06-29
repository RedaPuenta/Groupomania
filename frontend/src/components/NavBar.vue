<template>
    <nav class="neo navbar">
        <img class="navbar__logo" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo de groupomania">
        <div class="navbar__explorer">
            <ul class="navbar__explorer__list">
                <li><router-link to="/Actuality">Fil d'actualité</router-link></li>
                <li><router-link to="/Friends">Mes collègues</router-link></li>
            </ul>
        </div>
        <div class="navbar__account">
            <router-link to="/Account" class="navbar__account__case">
                <img src="https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png" alt="Avatar de profil">
            </router-link>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'NavBar',
    mounted: function(){
        this.$store.dispatch('neo')
    },
    updated: function(){
        this.$store.dispatch('neo')
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
            justify-content: center;
            width: 230px;

            &__case{
                border-radius:  100%;
                width: 50px;
                height: 50px;
                
                img {
                    width: 50px;
                }
            }
        }
    }

    .focus{
        color: black;
        font-weight: bold;
    }
</style>
<template>
    <div>
        <NavBar mode="account"/>
        <div class="neo neo-relax profil">
            <div class="profil__info">
                <div class="profil__info__avatar">   
                    <img :src="data.avatar" alt="Avatar">
                    <div class="profil__info__avatar__shadow"></div>
                </div>
                <div class="profil__info__user">
                    <div class="profil__info__user__name">
                        <div class="profil__info__user__name__cache">
                            <span>{{data.firstName}} {{data.lastName}}</span>
                        </div>
                    </div>
                    <div class="profil__info__user__bio">
                        <div class="profil__info__user__bio__cache">
                            <span>{{data.bio}}</span>
                        </div>
                    </div>
                </div>
                <div class="profil__info__total">
                    <div class="profil__info__total__focus">
                        <div class="profil__info__total__focus__note">
                            <span>{{data.multimedia}}</span>
                            <div class="profil__info__total__focus__note__shadow"></div>
                        </div>
                        <span>Multimédia</span>
                    </div>
                    <div class="profil__info__total__focus">
                        <div class="profil__info__total__focus__note">
                            <span>{{data.agora}}</span>
                            <div class="profil__info__total__focus__note__shadow"></div>
                        </div>
                        <span>Agora</span>
                    </div>
                </div>
            </div>
            <div class="profil__score">
                <div class="profil__score__glass"></div>
                <div class="profil__score__item">
                    <span>{{data.score_reaction}}</span>
                    <span>Score de réactions</span>
                </div>
                <div class="profil__score__item">
                    <span>{{data.score_participation}}</span>
                    <span>Score de participations</span>
                </div>
            </div>
            
        </div>       
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: "Profil",

    components: {
        NavBar
    },

    data: function(){
        return {
            data: []
        }
    },

    beforeCreate: function(){
        this.$store.dispatch('accessPage')
    },
    
    mounted: function(){
        this.$store.dispatch('neo')

        const userIdSearch = this.$route.params.id

        this.$axios.get(`user/profil/${userIdSearch}`)
        .then((response) => {
            this.data = response.data
        })  
        .catch((error) =>{
            console.log(JSON.parse(error.request.response).message)
        })
    },

    updated: function(){
        this.$store.dispatch('neo')
    }

}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";


    .profil{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 70px auto 0 auto;
        width: 80%;
        padding: 30px;
        overflow: hidden;
        border-radius: 30px!important;
        

        &__info{
            width: 100%;
            height: 280px;
            padding: 0 40px 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            

            &__avatar{
                width: 100px;
                height: 100px;
                border-radius: 100%;
                position: relative;
                overflow: hidden;

                img{
                    width: 100px;
                    height: 100px;
                }

                &__shadow{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                    box-shadow: $box-shadow-image;
                    background: center / 135%  no-repeat url("../assets/glass.png");
                }
            }

            &__user{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 60%;

                &__name{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &__cache{
                        margin-bottom: 50px;
                        border-radius: 10px!important;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        span{
                            font-weight: 900;
                            padding: 10px;
                            font-size: rem(35px);
                            letter-spacing: 2px;
                            @include gravure()
                        }

                    }

                }

                &__bio{
                    width: 100%;

                    &__cache{
                        padding: 5px;
                        width: 100%;
                        height: 100px;
                        overflow: hidden;
                        text-align: center;
                        position: relative;
                        z-index: 2;

                        span{
                            top: 0;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            margin: 0 auto;
                            width: 98%;
                            height: 90px;
                            position: absolute;
                            background-color: rgb(255, 255, 255);
                            border-radius: 0 0 10px 10px;
                            padding: 15px 0 0 0;
                            z-index: 1;
                            transition: transform 0.8s ease-in-out;
                        }
                    }

                    &__cache::before{
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        background-color: rgb(151, 151, 151);
                        height: 5px;
                        z-index: 2;
                        border-radius: 5px;
                        box-shadow: 0px 0px 10px gray;
                    }

                }
            }

            &__total{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;

                &__focus{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    &__note{
                        position: relative;
                        height: 40px;
                        width: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: black;
                        font-weight: bold;
                        margin-bottom: 5px;

                        &__shadow{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                            box-shadow: $box-shadow-image;
                            background: center / 135%  no-repeat url("../assets/glass.png");
                        }
                    }
                }
            }
        }

        &__score{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            box-shadow: inset 4px 4px 20px rgb(136, 136, 136), inset -4px -4px 20px rgb(136, 136, 136);
            position: relative;

            &__glass{
                background: center / 175%  no-repeat url("../assets/glass.png");
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            &__item{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: black;
                font-weight: bold;

                span:first-child{
                    font-size: rem(30px);
                    margin-bottom: 10px;
                }

                span:last-child{
                    font-size: rem(19px);
                }
            }
        }

    }

</style>
<template>
    <div class="portrait">

        <!---- Message qui indique qu'il n'y a pas de post (camarade) ---->
        <div class="no-post" v-if="noPost == true">
            <span class="no-post__text">{{noPostText}}</span>
            <i class="no-post__icon far fa-grin-beam-sweat"></i>
        </div>

        <!----- Un Item ----->
        <div v-for="(item, index) in user" :key="index" :class="{user_big: profil}" class="neo portrait__user">

            <router-link v-if="mode == 'Friends'" class="link" :to="{name: 'Profil', params: {id: item.userId}}"></router-link>

            <div class="portrait__user__main">
                <!----- Avatar (Profil/Friends) [Desktop] ----->
                <div class="portrait__user__main__image">
                    <div class="portrait__user__main__image__shadow"></div>
                    <img class="portrait__user__main__image__avatar" :src="item.avatar" alt="avatar de profil">
                </div>
                    
                <!----- Bio (Profil/Friends) [Desktop/Mobile] ----->
                <div class="portrait__user__main__info">

                    <div class=" portrait__user__main__info__name">
                        <div class=" portrait__user__main__info__name__cache">
                            <span>{{item.firstName}} {{item.lastName}}</span>
                        </div>
                    </div>

                    <div class="portrait__user__main__info__bio">
                        <div class="portrait__user__main__info__bio__cache">
                            <span :class="{text_friends: friends}" class="portrait__user__main__info__bio__cache__text">{{item.bio}}</span>
                        </div>
                    </div>

                </div>

                <!----- Total Multimédia et Agora (Profil/Friends) [Desktop] ----->
                <div class="portrait__user__main__note">

                    <div class="portrait__user__main__note__focus">
                        <div class="portrait__user__main__note__focus__elements">
                            <span>{{item.multimedia}}</span>
                            <div class="portrait__user__main__note__focus__elements__shadow"></div>
                        </div>
                        <span class="portrait__user__main__note__focus__type">Multimédia</span>
                    </div>

                    <div class="portrait__user__main__note__image">
                        <div class="portrait__user__main__note__image__shadow"></div>
                        <img class="portrait__user__main__note__image__avatar" :src="item.avatar" alt="avatar de profil">
                    </div>

                    <div class="portrait__user__main__note__focus">
                        <div class="portrait__user__main__note__focus__elements">
                            <span>{{item.forum}}</span>
                            <div class="portrait__user__main__note__focus__elements__shadow"></div>
                        </div>
                        <span class="portrait__user__main__note__focus__type">Agora</span>
                    </div>

                </div>
            </div>

            <!----- Score de réactions et de participation (Profil) [Desktop/Mobile] ----->
            <div v-if="mode == 'Profil'" class="neo-inverse portrait__user__score">

                <div class="portrait__user__score__glass"></div>

                <div class="portrait__user__score__item">
                    <span>{{item.score_reaction}}</span>
                    <span>Score de réactions</span>
                </div>

                <div class="portrait__user__score__item">
                    <span>{{item.score_participation}}</span>
                    <span>Score de participations</span>
                </div>

            </div>

            <div class="portrait__user__date" v-if="mode == 'Profil'">
                <span>Inscrit depuis {{item.dateCreation}}</span>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    name: 'Portrait',

    data: function(){
        return{
            //! Variable qui contient l'ensemble des items
            user: [],
            //! Ensemble de variables qui décide du type d'affichage (Profil et Friends)
            profil: false,
            friends: false,
            //! Variable qui permet d'activer/désactiver le message indiquant qu'il n'y a pas de publication (camarade)
            noPost: false,
            //! Variable qui vont constituer le texte à l'intérieur du message
            noPostText: "Pour l'instant, vous êtes le seul inscrit ..."

        }
    },
   
    props: {
        //! Propriété qui permet de décidé du type d'affichage (Profil/Friends)
        mode: {type: String, required: true}
    },

    methods: {

        //! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props FOCUS)
        adresseAPI: function(){

            const userIdLocal = localStorage.getItem("userId")
            const userIdUrl = this.$route.params.id

            if(this.mode == 'Friends'){

                return `user/friends/${userIdLocal}`

            } else if (this.mode == 'Profil') {

                return `user/profil/${userIdUrl}`

            }
        },
        //! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props FOCUS)
        buildClass: function(){

            if(this.mode == 'Friends'){

                this.friends = true

            } else if (this.mode == 'Profil') {

                this.profil = true

            }
        }
    },

    //! Une fois que la page est monté ...
    mounted: function(){
        //! On exécute la fonction Neo
        this.$store.dispatch('neo')

        //! On applique le rendu de l'affichage des items
        const adresse = this.adresseAPI()

        this.$axios.get(adresse)
        .then((response) => {
            this.user = response.data
        })  
        .then(() => {
            this.buildClass()
        })
        .catch(() =>{
            
            if(this.mode == 'Friends'){
                this.noPost = true
            }

        })
    },

    updated: function(){
        this.$store.dispatch('neo')
    }
}   
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";
    
    // Check-point @media
    $step-1: 1000px;
    $step-2: 730px;

    .no-post{
        height: calc(100vh - 300px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__text{
            text-align: center;
            width: 90%;
            font-weight: bold;
            font-size: rem(25px);
        }

        &__icon{
            margin-top: 30px;
            font-size: rem(100px);
        }
    }

    .portrait__user:hover .portrait__user__main__info__bio__cache__text{
        transform: translateY(0px);
        @media screen and (max-width: $step-2){
            transform: none;
        }
    }

    .link{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 30px;
        z-index: 2;
    }

    .portrait{
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;

        .user_big{
            height: 400px;
            justify-content: space-evenly;
        }

        &__user{
            width: 70%;
            padding: 0 30px;
            margin-bottom: 50px;
            cursor: pointer;
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            @media screen and(max-width: $step-1){
                width: 90%;
            }
            @media screen and(max-width: $step-2){
                padding: 0;
            }

            &__main{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media screen and(max-width: $step-2){
                    flex-direction: column;
                }

                &__image{
                    position: relative;
                    border-radius: 100%;
                    overflow: hidden;
                    @media screen and(max-width: $step-2){
                        display: none;
                    }
                    
                    &__shadow{
                        border-radius: 100%;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        width: 100%;
                        box-shadow: $box-shadow-image;
                        background: center / 135%  no-repeat url("../assets/glass.png");
                    }

                    &__avatar{
                        width: 100px;
                    }
                }

                &__info{
                    height: 100%;
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    position: relative;
                    @media screen and(max-width: $step-2){
                        width: 90%;
                        order: 2;
                    }
                    
                    &__name{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &__cache{
                            margin: 30px 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            @media screen and (max-width: $step-2){
                                margin: 10px 0 10px 0;
                            }
                    
                            span{
                                text-align: center;
                                font-weight: 900;
                                padding: 10px;
                                letter-spacing: 2px;
                                font-size: rem(30px);
                                @include gravure();
                                @media screen and (max-width: $step-2){
                                    font-size: rem(25px);
                                }
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
                            @media screen and(max-width: $step-2){
                                height: 70px;
                                overflow: initial;
                            }

                            .text_friends{
                                transform: translateY(-100px);
                                @media screen and (max-width: $step-2){
                                    transform: translateY(0px);
                                }
                            }

                            &__text{
                                top: 0;
                                bottom: 0;
                                right: 0;
                                left: 0;
                                overflow: hidden;
                                word-break: break-all;
                                margin: 0 auto;
                                width: 98%;
                                height: 90px;
                                position: absolute;
                                background-color: rgb(255, 255, 255);
                                border-radius: 0 0 10px 10px;
                                padding: 15px 8px 0 8px;
                                z-index: 1;
                                transition: transform 0.8s ease-in-out;
                                color: $color-primary;
                                @media screen and(max-width: $step-2){
                                    transition: none;
                                    transform: none;
                                }
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

                &__note{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    @media screen and(max-width: $step-2){
                        margin-top: 20px;
                        flex-direction: row;
                        justify-content: space-evenly;
                        order: 1;
                        width: 100%;
                    }

                    &__image{
                        position: relative;
                        border-radius: 100%;
                        overflow: hidden;
                        display: none;
                        @media screen and(max-width: $step-2){
                            display: block;
                        }
                        
                        &__shadow{
                            border-radius: 100%;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: 100%;
                            width: 100%;
                            box-shadow: $box-shadow-image;
                            background: center / 135%  no-repeat url("../assets/glass.png");
                        }

                        &__avatar{
                            width: 100px;
                            @media screen and(max-width: $step-2){
                                width: 80px;
                            }
                        }
                    
                    }

                    &__focus{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 5px;
                        @media screen and(max-width: $step-2){
                            width: 70px;
                        }

                        &__elements{
                            position: relative;
                            overflow: hidden;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            font-weight: bold;
                            
                            span{
                                color: black;
                            }

                            &__shadow{
                                border-radius: 100%;
                                position: absolute;
                                height: 100%;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                box-shadow: $box-shadow-image;
                                background: center / 135%  no-repeat url("../assets/glass.png");
                            }
                        }

                        &__type{
                            margin-top: 2px;
                            color: $color-primary;
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
                position: relative;
                margin-bottom: 20px;
                @media screen and(max-width: $step-2){
                    width: 90%;
                    height: 70px;
                    margin: 40px 0 20px 0;
                }

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
                        @media screen and(max-width: $step-2){
                            font-size: rem(21px);
                            margin-bottom: 5px;
                        }
                    }

                    span:last-child{
                        font-size: rem(19px);
                        @media screen and(max-width: $step-2){
                            font-size: rem(12px);
                        }
                    }
                }
            }

            &__date{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 5px;

                span{
                    font-weight: bold;
                    font-size: rem(14px);
                }
                
            }
        }
    }
    

</style>
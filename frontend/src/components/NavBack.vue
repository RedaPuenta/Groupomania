<template>
    <nav class="nav">
        <!--- Bouton "Retour en arrière" --->
        <router-link :to="{name: direction, query: {history: history, preference: preference}}" class="neo nav__back">
            <i class=" nav__back__icon fas fa-long-arrow-alt-left fa-lg"></i>
            <span class="nav__back__text">Revenir en arrière</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "NavJuge",

    props: {
        //! Propriété qui permet de connaître l'ID du post sur lequelle l'utilisaateur à précédemment cliqué
        history: {type: String, required: true},
        //! Propriété qui permet de donner des adresses aux différents liens (AgoraID ou MultimediaID)
        direction: {type: String, required: true},
        //! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus" 
        preference: {type: Number, required: true}
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss"; 

    $step-1: 680px;

    .nav{
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
        margin: 30px 0 20px 0;

        &__back{
            background-color: $button-action;
            box-shadow: $box-shadow-button;
            cursor: pointer;
            padding: 10px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 8;
            color: $button-action-inner;
            border-radius: 20px;
            @media screen and (max-width: $step-1){
                padding: 5px 40px;
            }    

            &__icon{
                margin-right: 10px;
                @media screen and (max-width: $step-1){
                    margin: 0;
                    font-size: rem(30px);
                }   
            }

            &__text{
                @media screen and (max-width: $step-1){
                    display: none;
                }   
            }
        }
    }
    
</style>
<template>
    <div class="agora">
        <!--- Composant NavBar (Navigation Principale) --->
        <NavBar class="agora__navbar" mode='accueil'/>
        <!--- Composant Publication --->
        <Publication :mode="'Agora'" @blur-control="updateBlur"/>
        <div class="agora__contain" :class="{shadow: blur}">
            <!--- Composant NavBack (Navigation Secondaire) --->
            <NavBack class="agora__contain__nav" :history="await_HistoryPostID" :preference="take_Preference" direction="Agora"/>
            <!--- Composant Forum --->
            <Forum class="agora__contain__media"  @preference="give_Preference" @history="update_HistoryPostID" :direction="'Agora'" :focus="true"/>
        </div>
    </div>
</template>

<script>
import NavBack from '../components/NavBack.vue'
import NavBar from '../components/NavBar.vue'
import Publication from '../components/Publication.vue'
import Forum from '../components/Forum.vue'

export default {
    name: "AgoraID",

    components: {
        NavBack, NavBar, Publication,Forum
    },

    data: function(){
        return {
            //! Variable qui contient l'ID du post sur lequelle l'utilisateur à précédemment cliqué
            await_HistoryPostID: "",
            //! Variable qui contient la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés)
            take_Preference: 1,
            //! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
            blur: false
        }
    },

    methods: {
        //! Fonction qui permet de mettre à jour le postID qui a précédemment été ciblé par l'utilisateur
        update_HistoryPostID: function(payload){
            this.await_HistoryPostID = payload.history
        },
        //! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
        updateBlur: function(payload){
            this.blur = payload.blur
        },
        ///! Fonction qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité, Mes publications, Mes préférés)
        give_Preference: function(payload){
            this.take_Preference = payload.prefer
        }
    },

    //! Avant la création de la page ...
    beforeCreate: function(){
        //! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
        this.$store.dispatch('accessPage')
    },

    //! Quand la page est monté ...
    mounted: function(){

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    },

    //! Quand la  page est mise à jour ...
    updated: function(){

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    .shadow{
        filter: blur(20px);
    }

    .agora{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        &__navbar{
            position: relative;
            z-index: 2;
        }

        &__contain{ 
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 1;

            &__nav{
                position: relative;
                z-index: 2;
            }

            &__media{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                position: relative;
                z-index: 1;
            }
        }
    }

</style>
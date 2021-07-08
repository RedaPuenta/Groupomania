<template>
  <div class="agora">
        <!--- Composant NavBar (Navigation Principale) --->
        <NavBar class="agora__navbar" mode='accueil'/>
        <!--- Composant Publication --->
        <Publication class="agora__publication" :mode="'Agora'" @blur-control="updateBlur"/>
        <div class="agora__contain" :class="{shadow: blur}">
            <!--- Composant NavJuge (Navigation Secondaire) --->
            <NavJuge class="agora__contain__nav" @navChoice="get_Preference" :preference="choice" :direction="'Agora'"/>
            <!--- Composant Forum --->
            <Forum class="agora__contain__media" :preference="choice" :direction="'AgoraID'" :focus="false"/>
        </div>
    </div>
</template>

<script>
import NavJuge from '../components/NavJuge.vue'
import NavBar from '../components/NavBar.vue'
import Publication from '../components/Publication.vue'
import Forum from '../components/Forum.vue'

export default {
    name: "Agora",

    components: {
        NavJuge, NavBar, Publication, Forum
    },

    data: function(){
        return {
            //! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
            blur: false,
            //! Variable qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés)
            choice: 1
        }
    },

    methods: {
        //! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
        updateBlur: function(payload){
            this.blur = payload.blur
        },
        //! Fonction qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité, Mes publications, Mes préférés)
        get_Preference: function(payload){
            this.choice = payload.choice
        }
    },

    //! Avant la création de la page ...
    beforeCreate: function(){
        //! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
        this.$store.dispatch('accessPage')
    },

    //! Avant que la page soit monté ...
    beforeMount: function(){

        //* On récupère le paramètre préférence de l'utilisateur
        let params = (new URL(document.location)).searchParams
        let IdSearch = params.get("preference")

        //* Si la préférence est déjà marqué ...
        if(IdSearch !== null) {
            //* On met à jour la variable qui se charge des préférences
            this.choice = parseInt(IdSearch)
        }

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
        width: 100%;

        &__navbar{
            position: relative;
            z-index: 3;
        }

        &__publication{
            position: relative;
            z-index: 2;
        }

        &__contain{
            position: relative;
            z-index: 1;
            width: 100%;

            &__nav{
                position: relative;
                z-index: 2;
            }

            &__media{ 
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                position: relative;
                z-index: 1;
            }
        }
    }

</style>
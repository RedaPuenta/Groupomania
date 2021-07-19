<template>
    <div class="friends">
        <!--- Composant NavBar (Navigation Principale) --->
        <NavBar class="friends__navbar" :mode="'accueil'"/>
        <div class="friends__contain">
            <!--- Composant Portrait --->
            <Portrait :mode="'Friends'"/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Portrait from '../components/Portrait.vue'

export default {
    name: "Friends",

    components: {
        Portrait, NavBar
    },

    //! Avant la création de la page ...
    beforeCreate: function(){
        //! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
        this.$store.dispatch('accessPage')
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    .friends{
        width: 100%;

        &__navbar{
            position: -webkit-sticky;
            position: sticky;
            top: 0px;
            z-index: 3;
        }

        &__contain{
            position: relative;
            z-index: 1;
        }
    }

</style>
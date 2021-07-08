<template>
    <div class="profil">
        <!--- Composant NavBar (Navigation Principale) --->
        <NavBar class="profil__navbar" :mode="'account'"/>
        <div class="profil__contain">
            <!--- Composant Portrait --->
            <Portrait :mode="'Profil'"/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Portrait from '../components/Portrait.vue'

export default {
    name: "Profil",

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

    .profil{
        width: 100%;

        &__navbar{
            position: relative;
            z-index: 2;
        }

        &__contain{
            padding-top: 30px;
            position: relative;
            z-index: 1;
        }
    }

</style>
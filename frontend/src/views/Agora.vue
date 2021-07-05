<template>
  <div class="agora">
        <NavBar class="agora__navbar" mode='accueil'/>
        <Publication :mode="'Agora'" @blur-control="updateBlur"/>
        <div class="agora__contain" :class="{shadow: blur}">
            <NavJuge class="agora__contain__nav" @navChoice="get_Preference" :preference="choice" :direction="'Agora'"/>
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
            blur: false,
            choice: 1
        }
    },

    methods: {
        updateBlur: function(payload){
            this.blur = payload.blur
        },
        get_Preference: function(payload){
            this.choice = payload.choice
        }
    },

    beforeCreate: function(){
        this.$store.dispatch('accessPage')
    },

    beforeMount: function(){
        
        let params = (new URL(document.location)).searchParams
        let IdSearch = params.get("preference")

        if(IdSearch !== null) {
            this.choice = parseInt(IdSearch)
        }

    },

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
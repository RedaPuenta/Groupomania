<template>
    <div class="multimedia">
        <NavBar mode='accueil'/>
        <Publication @blur-control="updateBlur"/>
        <div class="multimedia__contain" :class="{shadow: blur}">
            <NavJuge class="multimedia__contain__nav" @navChoice="get_Preference" :preference="choice" :direction="'Multimedia'"/>
            <Media class="multimedia__contain__media" :preference="choice" :direction="'MultimediaID'" :focus="false"/>
        </div>
    </div>
</template>

<script>
import NavJuge from '../components/NavJuge.vue'
import Media from '../components/Media.vue'
import NavBar from '../components/NavBar.vue'
import Publication from '../components/Publication.vue'

export default {
    name: "Multimedia",

    components: {
        Media, NavJuge, NavBar, Publication
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

    .multimedia{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;

        &__contain{
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
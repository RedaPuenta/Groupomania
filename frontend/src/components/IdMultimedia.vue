<template>
    <div class="multimedia">
        <nav class="multimedia__nav">
            <router-link :to="{name: 'Multimedia', query: {history: history}}" class="neo multimedia__nav__back" tag="button">
                <i class=" multimedia__nav__back__icon fas fa-long-arrow-alt-left fa-lg"></i>
                <span>Revenir en arrière</span>
            </router-link>
        </nav>
        <Media @history="getHistory"  class="multimedia__contenu" :api="'recoverOne'" :direction="'Multimedia'" :focus="true"/>
    </div>
</template>

<script>
import Media from './Media.vue'

export default {
    name: "IDMultimedia",
    components: {
        Media
    },
    data: function(){
        return {
            history: ""
        }
    },
    methods: {

        getHistory: function(payload){
            this.history = payload.history
        },
    },
    mounted: function(){
        this.$store.dispatch('neo')
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";

    .multimedia{

        &__nav{
            display: flex;
            justify-content: center;
            position: relative;
            z-index: 2;
            margin: 30px 0 20px 0;

            &__back{
                background-color: $button-action!important;
                box-shadow: $box-shadow-button;
                cursor: pointer;
                padding: 10px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 8;
                color: white;

                &__icon{
                    margin-right: 10px;
                }
            }
        }

        &__contenu{ 
            display: flex;
            justify-content: center;
            position: relative;
            z-index: 1;
        }
    }

</style>
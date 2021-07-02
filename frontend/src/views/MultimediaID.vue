<template>
    <div class="multimedia">
        <NavBar mode='accueil'/>
        <Publication @blur-control="updateBlur"/>
        <div class="multimedia__contain" :class="{shadow: blur}">
            <NavBack class="multimedia__contain__nav" :history="await_HistoryPostID" :preference="take_Preference" direction="Multimedia"/>
            <Media class="multimedia__contain__media"  @preference="give_Preference" @history="update_HistoryPostID" :direction="'Multimedia'" :focus="true"/>
        </div>
    </div>
</template>

<script>
import NavBack from '../components/NavBack.vue'
import Media from '../components/Media.vue'
import NavBar from '../components/NavBar.vue'
import Publication from '../components/Publication.vue'

export default {
    name: "MultimediaID",

    components: {
        Media, NavBack, NavBar, Publication
    },

    data: function(){
        return {
            await_HistoryPostID: "",
            take_Preference: 1,
            blur: false
        }
    },

    methods: {
        update_HistoryPostID: function(payload){
            this.await_HistoryPostID = payload.history
        },
        updateBlur: function(payload){
            this.blur = payload.blur
        },
        give_Preference: function(payload){
            this.take_Preference = payload.prefer
        }
    },

    beforeCreate: function(){
        this.$store.dispatch('accessPage')
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

        &__contain{ 
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 1;

            &__nav{
                position: relative;
                z-index: 2;
            }

            &__media{
                position: relative;
                z-index: 1;
            }
        }
    }

</style>
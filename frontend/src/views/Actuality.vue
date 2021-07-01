<template>
    <div class="actuality">
        <NavBar mode='accueil'/>
        <Publication @blur-control="updateBlur"/>
        <div :class="{shadow: blur}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '@/components/Publication.vue'

export default {
    name: 'Actuality',
    components: {
        NavBar, Publication
    },
    data: function(){
        return {
            blur: false
        }
    },
    methods: {
         updateBlur: function(payload){
            this.blur = payload.blur
        },
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
    
    .actuality{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .shadow{
            filter: blur(20px);
        }

    }

    /*::after
    .switch-enter-active,
    .switch-leave-active{
        transition: opacity 1s, transform 1s;
    }

    .switch-enter,
    .switch-leave-to{
        opacity: 0;
        transform: translateX(-50%);
    }*/
</style>    
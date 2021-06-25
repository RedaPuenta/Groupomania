<template>
    <div class="mypost">
        <NavBar/>
        <Publication/>
        <div :class="{shadow: blur}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '../components/Publication.vue'

export default {
    name: 'Mypost',
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
    
</style>    
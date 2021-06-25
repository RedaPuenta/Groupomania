<template>
    <ul class="nav">
        <router-link :to="{name: 'Multimedia'}"><li class="neo">Multimédia</li></router-link>
        <router-link :to="{name: 'Agora'}"><li class="neo">Agora</li></router-link>
    </ul>
</template>

<script>
export default {
    name: "NavActuality",
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

    .nav{
        height: 40px;
        margin: 30px 0 20px 0;
        display: flex;
        justify-content: center;

        li{
            cursor: pointer;
            font-size: rem(20px);
            padding: 10px 20px;
            margin: 0 15px;
            background-color: $button-action!important;
            color: white;
        }
    }
    
</style>
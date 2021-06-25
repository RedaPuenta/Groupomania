<template>
    <div class="multimedia">
        <NavLink class="multimedia__nav"/>
        <Media class="multimedia__contenu" :api="'recover'" :direction="'IDMultimedia'" :focus="false"/>
    </div>
</template>

<script>
import NavLink from './NavLink.vue'
import Media from './Media.vue'

export default {
    name: "Multimedia",
    components: {
        Media, NavLink
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
            position: relative;
            z-index: 2;
        }

        &__contenu{ 
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            position: relative;
            z-index: 1;
        }
    }

</style>
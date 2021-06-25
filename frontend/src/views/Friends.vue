<template>
    <div class="friends">
        <NavBar/>
        <Publication/>
        <p>Je viens de la views FRIENDS</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '../components/Publication.vue'

export default {
    name: 'Friends',
    components: {
        NavBar, Publication
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";
    
</style>    
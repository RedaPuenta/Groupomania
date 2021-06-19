<template>
    <div class="favory">
        <NavBar/>
        <Publication/>
        <p>Je viens de la views FAVORY</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '@/components/Publication.vue'

export default {
    name: 'Favory',
    components: {
        NavBar, Publication
    }
}
</script>

<style lang="scss" scoped>
    .favory{
        height: 6000px;
    }
</style>    
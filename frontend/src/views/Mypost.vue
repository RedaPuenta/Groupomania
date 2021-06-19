<template>
    <div class="mypost">
        <NavBar/>
        <Publication/>
        <p>Je viens de la views MYPOST</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '../components/Publication.vue'

export default {
    name: 'Mypost',
    components: {
        NavBar, Publication
    }
}
</script>

<style lang="scss" scoped>
    
</style>    
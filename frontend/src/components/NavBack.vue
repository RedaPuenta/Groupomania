<template>
    <nav class="nav">
        <router-link :to="{name: direction, query: {history: history, preference: preference}}" class="neo nav__back">
            <i class=" nav__back__icon fas fa-long-arrow-alt-left fa-lg"></i>
            <span>Revenir en arrière</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "NavJuge",
    props: {
        history: {type: String, required: true},
        direction: {type: String, required: true},
        preference: {type: Number, required: true}
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss"; 

    .nav{
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
    
</style>
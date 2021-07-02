<template>
    <ul class="nav">
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li name="choice" data-id="1" @click="choice" class="no_active">Le fil d'actualité</li>
        </router-link>
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li name="choice" data-id="2" @click="choice" class="no_active">Mes publications</li>
        </router-link>
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li name="choice" data-id="3" @click="choice" class="no_active">Mes préférés</li>
        </router-link>
    </ul>
</template>

<script>
export default {
    name: "NavJuge",
    props: {
        preference: {type: Number, required: true},
        direction: {type: String, required: true}
    },
    methods: {
        choice: function(event){
            this.$emit('navChoice', {choice: parseInt(event.target.dataset.id)})

            let choice = document.getElementsByName("choice")

            for (let i = 0; i < choice.length; i++) {
                choice[i].classList.remove("active")
                choice[i].classList.add("no_active")
            }
            
            event.target.classList.remove("no_active")
            event.target.classList.add("active")

        }
    },

    mounted: function(){
        
        let choice = document.getElementsByName("choice")

        choice[this.preference - 1].classList.remove("no_active")
        choice[this.preference - 1].classList.add("active")
    
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss"; 

    .active{
        background-color: white;
        color: rgb(0, 0, 0);
    }

    .no_active{
        background-color: $button-action;
        color: white;
    }

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
            box-shadow: $box-shadow-button;
            border-radius: 20px;
        }
    }
    
</style>
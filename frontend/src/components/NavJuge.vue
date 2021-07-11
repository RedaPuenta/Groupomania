<template>
    <ul class="nav">

        <!--- Lien (Le fil d'actualité) --->
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li class="choice">
                <!--- Button Desktop --->
                <span name="choice" data-id="1" @click.self="choice" class="choice__text no_active">Le fil d'actualité</span>
                <!--- Button Mobile --->
                <span name="choice-mobile" class="choice__icon no_active">
                    <div data-id="1" @click.self="choiceMobile" class="choice__icon__self" data-self="true"></div>
                    <i class="fas fa-newspaper fa-lg"></i>
                </span>  
            </li>
        </router-link>

        <!--- Lien (Mes publications) --->
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li class="choice">
                <!--- Button Desktop --->
                <span name="choice" data-id="2" @click.self="choice" class="choice__text no_active">Mes publications</span> 
                <!--- Button Mobile --->
                <span name="choice-mobile" class="choice__icon no_active">
                    <div data-id="2" @click.self="choiceMobile" class="choice__icon__self" data-self="true"></div>
                    <i class="fas fa-home fa-lg"></i>
                </span> 
            </li>
        </router-link>

        <!--- Lien (Mes préférés) --->
        <router-link :to="{name: direction, query: {preference: preference}}">
            <li class="choice">
                <!--- Button Desktop --->
                <span name="choice" data-id="3" @click.self="choice" class="choice__text no_active">Mes préférés</span>
                <!--- Button Mobile --->
                <span name="choice-mobile" class="choice__icon no_active">
                    <div data-id="3" @click.self="choiceMobile" class="choice__icon__self" data-self="true"></div>
                    <i class="fas fa-crown fa-lg"></i>
                </span> 
            </li>
        </router-link>

    </ul>
</template>

<script>
export default {
    name: "NavJuge",

    props: {
        //! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus"
        preference: {type: Number, required: true},
        //! Propriété qui permet de donner des adresses aux différents liens (Agora ou Multimédia)
        direction: {type: String, required: true}
    },

    methods: {
        //! Fonction qui met à jour la préférence de l'utilisateur et le bouton focus (Fil d'actualité, Mes Publications, Mes préférées) [Desktop]
        choice: function(event){

            this.$emit('navChoice', {choice: parseInt(event.target.dataset.id)})

            let choice = document.getElementsByName("choice")

            for (let i = 0; i < choice.length; i++) {
                choice[i].classList.remove("active")
                choice[i].classList.add("no_active")
            }
            
            if(event.target.dataset.self){
                event.target.classList.remove("no_active")
                event.target.classList.add("active")
            }  else{
                event.target.classList.remove("no_active")
                event.target.classList.add("active")
            }
            

        },
        //! Fonction qui met à jour la préférence de l'utilisateur et le bouton focus (Fil d'actualité, Mes Publications, Mes préférées) [Mobile]
        choiceMobile: function(event){

            this.$emit('navChoice', {choice: parseInt(event.target.dataset.id)})

            let choice = document.getElementsByName("choice-mobile")

            for (let i = 0; i < choice.length; i++) {
                choice[i].classList.remove("active")
                choice[i].classList.add("no_active")
            }
            
            if(event.target.dataset.self){
                event.target.parentElement.classList.remove("no_active")
                event.target.parentElement.classList.add("active")
            }  else{
                event.target.parentElement.classList.remove("no_active")
                event.target.parentElement.classList.add("active")
            }
            

        },
    },

    //! Une fois que la pge est monté ...
    mounted: function(){
        
        //! On met à jour le bouton focus [Desktop]
        let choice = document.getElementsByName("choice")
        choice[this.preference - 1].classList.remove("no_active")
        choice[this.preference - 1].classList.add("active")

        //! On met à jour le bouton focus [Mobile]
        let choice_mobile = document.getElementsByName("choice-mobile")
        choice_mobile[this.preference - 1].classList.remove("no_active")
        choice_mobile[this.preference - 1].classList.add("active")
    
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss"; 

    // Check-point @media
    $step-1: 680px;

    .active{
        background-color: white;
        color: rgb(0, 0, 0);
    }

    .no_active{
        background-color: $button-action;
        color: $button-action-inner;
    }

    .nav{
        height: 40px;
        margin: 30px 0 20px 0;
        display: flex;
        justify-content: center;

        .choice{
            margin: 0 15px;
            display: flex;
            justify-content: center;
            align-items: center;

            &__text{
                padding: 10px 20px;
                text-align: center;
                cursor: pointer;
                font-size: rem(20px);
                border-radius: 20px;
                box-shadow: $box-shadow-button;
                @media screen and (max-width: $step-1) {
                    display: none;
                }
            }

            &__icon{
                text-align: center;
                box-shadow: $box-shadow-button;
                border-radius: 20px;
                height: 100%;
                width: 100%;
                font-size: rem(20px);
                padding: 10px 40px;
                display: none;
                position: relative;

                @media screen and (max-width: $step-1) {
                    display: block;
                }
                @media screen and (max-width: $step-0){
                    padding: 10px 30px;
                }

                &__self{
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

            }
        }
    }
    
</style>
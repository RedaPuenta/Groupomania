<template>
    <div class="error" v-if="errorAlert == true">
        <div class="error_restrict">
            <!---- Bouton pour masquer l'erreur ----->
            <div @click="quitError" class="error__restrict__icon">
                <i class="error__restrict__icon--croix fas fa-times"></i>
            </div> 
        </div>
        <!---- Message d'erreur ----->
        <span class="error__text">{{errorText}}</span>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Error",

    computed: {
        ...mapState({
            errorAlert: "errorAlert",
            errorText: "errorText"
        })
    },
    
    methods: {
        //! Fonction qui permet de masquer l'erreur
        quitError: function(){
            this.$store.commit("DESACTIVE_ERROR")
        }
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";
    
    .error{
        font-size: rem(16px);
        color: $color-error;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        filter: brightness(1.1);

        &__restrict{

            &__icon{
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 23px;
                width: 23px;
                background-color: $color-error;
                margin-right: 8px;
                box-shadow: 
                1px 1px 2px white, 
                -1px -1px 2px white, 
                inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.5), 
                inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.5);
                cursor: pointer;

                &--croix{
                    color: white;
                }
            }
        }

        &__text{
            text-shadow: 0.5px 0.5px rgb(255, 255, 255), -0.5px -0.5px rgb(255, 255, 255);
        }
    }

</style>
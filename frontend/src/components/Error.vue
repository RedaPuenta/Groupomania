<template>
    <div class="error" v-if="errorAlert == true">
        <div class="error_restrict">
            <div @click="quitError" class="error__restrict__icon">
                <i class="error__restrict__icon--croix fas fa-times"></i>
            </div> 
        </div>
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
                box-shadow: $box-shadow-button;
                cursor: pointer;

                &--croix{
                    color: white;
                }
            }
        }
    }

</style>
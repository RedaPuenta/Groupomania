<template>
    <div class="friends">
        <NavBar/>
        <div class="friends__list">
            <div v-for="(item, index) in user" :key="index" class="neo neo-relax friends__list__user">
                <div>
                    <div class="friends__list__user__image">
                        <div class="friends__list__user__image__shadow"></div>
                        <img class="friends__list__user__image__avatar" :src="item.avatar" alt="avatar de profil">
                    </div>
                </div>
                <div class="friends__list__user__info">
                    <div class=" friends__list__user__info__name">
                        <div class=" friends__list__user__info__name__cache">
                            <span>{{item.firstName}} {{item.lastName}}</span>
                        </div>
                    </div>
                    <div class="friends__list__user__info__bio">
                        <div class="friends__list__user__info__bio__cache">
                            <span class="friends__list__user__info__bio__cache__text">{{item.bio}}</span>
                        </div>
                    </div>
                </div>
                <div class="friends__list__user__score">
                    <div class="friends__list__user__score__focus">
                        <div class="friends__list__user__score__focus__elements">
                            <span>{{item.multimedia}}</span>
                            <div class="friends__list__user__score__focus__elements__shadow"></div>
                        </div>
                        <span>Multimédia</span>
                    </div>
                    <div class="friends__list__user__score__focus">
                        <div class="friends__list__user__score__focus__elements">
                            <span>{{item.forum}}</span>
                            <div class="friends__list__user__score__focus__elements__shadow"></div>
                        </div>
                        <span>Agora</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: "Friends",
    data: function(){
        return{
            user: []
        }
    },
    components: {
        NavBar
    },
    beforeCreate: function(){
        this.$store.dispatch('accessPage')
    },
    mounted: function(){
        this.$store.dispatch('neo')

        this.$axios.post('user/recover')
        .then((response) => {
            this.user = response.data
        })  
        .catch((error) =>{
            console.log(JSON.parse(error.request.response).message)
        })
    }, 
    updated: function(){
        this.$store.dispatch('neo')
    }
}   
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";


    .friends__list__user:hover .friends__list__user__info__bio__cache__text{
        transform: translateY(0px);
    }

    .friends{ 

        &__list{
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &__user{
                width: 70%;
                height: 150px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30px;
                margin-bottom: 50px;
                cursor: pointer;

                &__image{
                    position: relative;
                    border-radius: 100%;
                    overflow: hidden;
                   
                    &__shadow{
                        border-radius: 100%;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        width: 100%;
                        box-shadow: $box-shadow-image;
                        background: center / 135%  no-repeat url("../assets/glass.png");
                    }

                    &__avatar{
                        width: 100px;
                        
                    }
                }

                &__info{
                    height: 100%;
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    position: relative;
                    
                    &__name{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &__cache{
                            margin: 30px 0 20px 0;
                            border-radius: 10px!important;
                            background-color: black;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                    
                            span{
                                font-weight: bold;
                                text-shadow: 0px 0px 8px rgb(255, 255, 255);
                                color: rgb(255, 255, 255);
                                padding: 10px;
                                font-size: rem(19px);
                            }
                        }

                    }

                    &__bio{
                        width: 100%;
                    
                        &__cache{
                            padding: 5px;
                            width: 100%;
                            height: 100px;
                            overflow: hidden;
                            text-align: center;
                            position: relative;
                            z-index: 2;

                            span{
                                top: 0;
                                bottom: 0;
                                right: 0;
                                left: 0;
                                margin: 0 auto;
                                width: 98%;
                                height: 90px;
                                position: absolute;
                                background-color: rgb(255, 255, 255);
                                border-radius: 0 0 10px 10px;
                                padding: 15px 0 0 0;
                                transform: translateY(-100px);
                                z-index: 1;
                                transition: transform 0.8s ease-in-out;
                            }
                        }

                        &__cache::before{
                            content: "";
                            position: absolute;
                            top: 0;
                            right: 0;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            background-color: rgb(151, 151, 151);
                            height: 5px;
                            z-index: 2;
                            border-radius: 5px;
                            box-shadow: 0px 0px 10px gray;
                        }
                    }
                }

                &__score{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;

                    &__focus{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 5px;

                        &__elements{
                            position: relative;
                            overflow: hidden;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            font-weight: bold;
                            color: black;

                            &__shadow{
                                border-radius: 100%;
                                position: absolute;
                                height: 100%;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                box-shadow: $box-shadow-image;
                                background: center / 135%  no-repeat url("../assets/glass.png");
                            }
                        }
                    }
                }
                
            }
        }
    }

</style>
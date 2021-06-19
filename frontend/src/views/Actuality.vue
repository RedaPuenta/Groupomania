<template>
    <div class="actuality">
        <NavBar/>
        <Publication @blur-control="updateBlur"/>
        <div :class="{shadow: blur}">
            <ul class="actuality__choice">
                <li class="neo">Multimédia</li>
                <li class="neo">Agora</li>
                <li class="neo">Les deux</li>
            </ul>
            <div class="range">
                <div v-for="(item, index) in post" :key="index" class="neo neo-press actuality__post">
                    <div class="actuality__post__image">
                        <div class="actuality__post__image__shadow"></div>
                        <img :src="item.media" alt="">
                    </div>
                    <div class="actuality__post__influence">
                        <div>
                            <button :id="item.my_like" type="button" class="actuality__post__influence__button button-like">
                                <div @click.self="likePost" :id="item.post" class="actuality__post__influence__button__self"></div>
                                <i class="fas fa-hand-spock fa-lg"></i> 
                            </button>
                            <button @click="commentsPost" class="actuality__post__influence__button">
                                <i class="fas fa-comment fa-lg"></i>  
                            </button>
                        </div>
                        <div class="actuality__post__influence__author">
                            <img class="avatar" :src="item.avatar" alt="Avatar de profil">
                            <span class="actuality__post__influence__author__name">{{item.firstName}}.{{item.lastName}}</span>
                        </div>
                        <div class="actuality__post__influence__note">
                            <div>
                                <span>{{item.likes}}</span> 
                                <span> appréciations</span>
                            </div>
                            <span>{{item.comments}} commentaires</span>
                        </div>
                    </div>
                    <div class="actuality__post__legend">
                        <span class="actuality__post__author__text">{{item.legend}}</span>
                    </div>
                    <div class="actuality__post__titre">Commentaires</div>
                    <div class="actuality__post__reaction">
                        <div class="actuality__post__reaction__comments">
                            <div class="actuality__post__reaction__comments__name">
                                <img class="avatar" src="https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png" alt="Avatar de profil">
                                <span class="actuality__post__reaction__comments__name--user">Zack :</span>
                            </div>
                            <span class="actuality__post__reaction__comments__phrase">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis ipsam quos unde error omnis amet fuga, saepe ducimus rem corporis, vel rerum ad nesciunt quis minima nulla eos adipisci.</span>
                        </div>
                        <div class="actuality__post__reaction__comments">
                            <div class="actuality__post__reaction__comments__name">
                                <img class="avatar" src="https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png" alt="Avatar de profil">
                                <span class="actuality__post__reaction__comments__name--user">Zack :</span>
                            </div>
                            <span class="actuality__post__reaction__comments__phrase">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quae accusantium laboriosam, similique voluptatibus soluta reiciendis nemo, consequuntur, fugit quos libero sint quisquam qui consequatur quas totam. Nostrum, laboriosam laborum!</span>
                        </div>
                        <span class="actuality__post__reaction__more">
                            <button @click="commentsPost" class="actuality__post__reaction__more__button">
                                <i class="fas fa-caret-down"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Publication from '@/components/Publication.vue'

export default {
    name: 'Actuality',
    components: {
        NavBar, Publication
    },
    data: function(){
        return {
            blur: false,
            post: [],
            likes: []
        }
    },
    methods : {
        updateBlur: function(payload){
            this.blur = payload.blur
        },

        likePost:  function(event){
            const userId = localStorage.getItem("userId")
            const postId = event.target.id

            this.$axios.post('/publication/like', {postId: postId, userId: userId})
            .then((response) => {

                let icon_likes = event.target.parentElement.children[1]
                let nombre_likes = event.target.parentElement.parentElement.parentElement.children[2].children[0].children[0]
                let likes = JSON.parse(response.request.response).likes
                
                if(likes == 1) {
                    icon_likes.classList.add("actuality__post__influence__button__liked")
                    nombre_likes.textContent = `${parseInt(nombre_likes.textContent) + 1}`
                } else {
                    icon_likes.classList.remove("actuality__post__influence__button__liked")
                    nombre_likes.textContent = `${parseInt(nombre_likes.textContent) - 1}`
                }
                
            })
            .catch((error) => {
                console.log(JSON.parse(error.request.response).message)
            })
        },

        commentsPost: function(){
            console.log("comments")
        }
    },
    beforeCreate: function(){
        this.$store.dispatch('accessPage')
    },
    mounted: function(){
        this.$store.dispatch('neo')

        const userId = localStorage.getItem("userId")
        this.$axios.post('/publication/recover', {userId: userId})
        .then((response) => {

            this.post = response.data       
            
        })
        .then(()=> {

            var buttonLike = document.querySelectorAll(".button-like")
            
            for (let i = 0; i < buttonLike.length; i++) {
                if(buttonLike[i].id == 1){
                    buttonLike[i].children[1].classList.add("actuality__post__influence__button__liked")
                } else {
                    buttonLike[i].children[1].classList.remove("actuality__post__influence__button__liked")
                }
            }

        })
        .catch((error) => {
            console.log(error)
        })
    }, 
    updated: function(){
        this.$store.dispatch('neo')
    }
}
</script>

<style lang="scss" scoped>

    $box-shadow-image: inset 2px 2px 9px rgb(92, 92, 92);
    $box-shadow-inner: inset 1px 1px 6px rgb(136, 136, 136);
    $box-shadow-button: 1px 1px 6px rgb(136, 136, 136);

    .actuality{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .shadow{
            filter: blur(20px);
        }

        &__choice{
            margin: 30px 0 20px 0;
            display: flex;
            justify-content: center;

            li{
                cursor: pointer;
                font-size: 20px;
                padding: 10px 20px;
                margin: 0 15px;
                background-color: black!important;
                color: white;
            }
        }

        .range{
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }

        &__post{
            margin: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 500px;
            border-radius: 30px!important;
            padding: 8px;
            

            &__image{
                width: 100%;
                height: 200px;
                overflow: hidden;
                border-radius: 30px 30px 0 0;
                position: relative;
                
                &__shadow{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-color: transparent;
                    border-radius: 30px 30px 0 0;
                    box-shadow: $box-shadow-image;
                }
               
                img{
                    object-fit: cover;
                    object-position: 50% 50%;
                    width: 100%;
                    height: 100%;
                }
            }

            &__influence{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 10px 15px 5px;

                &__button{
                    background-color: black;
                    border-radius: 10px;
                    padding: 10px;
                    cursor: pointer;
                    box-shadow: $box-shadow-button;
                    margin: 0 5px;
                    position: relative;
                    color: white!important;

                    &__liked{
                        color: rgb(0, 255, 0)!important;
                    }

                    &__self{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                    }
                }

                &__author{
                    padding: 5px 10px;
                    border-radius: 20px;
                    box-shadow: $box-shadow-button;
                    display: flex;
                    align-items: center;
                    background-color: black;
                    
                    &__name{
                        color: white;
                        font-weight: bold;
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }

                &__note{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    span{
                        font-size: 12px;
                    }
                }
            }

            &__legend{
                width: 100%;
                background-color: var(--color-third);
                box-shadow: $box-shadow-inner;
                padding: 10px;
                text-align: center;

                &__text{
                    font-size: 12px;
                }
            }

            &__titre{
                text-transform: uppercase;
                letter-spacing: 4px;
                font-size: 10px;
                padding: 5px 0;
            }

            &__reaction{
                width: 100%;
                background-color: var(--color-third);
                border-radius: 0 0 30px 30px;
                box-shadow: $box-shadow-inner;
                padding: 10px 10px 0 10px;

                &__comments{
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 5px;

                    &__name{
                        display: flex;
                        align-items: center;
                        padding: 0 5px;

                        &--user{
                            font-size: 13px;
                            font-weight: bold;
                            padding-left: 5px;
                            white-space: nowrap;
                        }
                    }

                    &__phrase{
                        margin-top: 2px;
                        font-size: 13px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }

                &__more{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    

                    &__button{
                        cursor: pointer;
                        background-color: black;
                        border-radius: 20px;
                        padding: 0px 20px; 
                        color: white;
                        font-size: 12px;
                        box-shadow: $box-shadow-button;
                        margin-bottom: 10px;
                    }
                }
            }
        }

        .avatar{
            border-radius: 100%;
            width: 20px;
            height: 20px;
        }
    }

</style>    
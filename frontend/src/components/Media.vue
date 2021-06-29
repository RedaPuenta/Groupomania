<template>
    <div>
        <div :class="{media_small: small, media_big: big}" v-for="(item, index) in data" :key="index" :id="item.post" class="neo neo-press media">
            
            <div :class="{post_small: small, post_big: big}" name="mediaBlock" class="media__post">
                <div class="media__post__shadow"></div>
            </div>

            <div class="media__influence">

                <div>
                    <button :class="{button_small: small, button_big: big}" name="buttonLikes" class="media__influence__button" :data-position="position = position + 1" :data-like="item.my_like" :data-id="item.post">
                        <div @click.self="likePost"  class="media__influence__button__self"></div>
                        <i class="fas fa-hand-spock fa-lg"></i> 
                    </button>
                    <router-link :class="{button_small: small}" v-if="focus == false" :to="{name: direction, params: {id: item.post}, query: {focus: true}}">
                        <button name="buttonComments" :data-comments="item.my_comments" class="media__influence__button">
                            <i class="fas fa-comment fa-lg"></i> 
                        </button>
                    </router-link>
                </div>

                <div class="media__influence__author">
                    <img class="avatar" :src="item.avatar" alt="Avatar de profil">
                    <span class="media__influence__author__name">{{item.firstName}}.{{item.lastName}}</span>
                </div>

                <div class="media__influence__note">
                    <div>
                        <span name="totalLikes">{{item.likes}}</span> 
                        <span> appréciations</span>
                    </div>
                    <span>{{item.comments}} commentaires</span>
                </div>

            </div>

            <div class="media__legend">
                <span class="media__author__text">{{item.legend}}</span>
            </div>

            <div class="media__titre">Commentaires</div>

            <div :class="{reaction_small: small, reaction_big: big}" class="media__reaction">

                <div id="reaction" name="reactionBlock">
                    <div name="comments" v-for="(comments, indexList) in item.commentsList" :key="indexList" :data-commentsId="comments.commentsId" :data-myComments="comments.my_comments" class="media__reaction__view">
                        <div :class="{comments_small: small, comments_big: big}" class="media__reaction__view__comments">   
                            <div class="media__reaction__view__comments__name">
                                <img class="avatar" :src="comments.avatar" alt="Avatar de profil">
                                <span class="media__reaction__view__comments__name--user">{{comments.firstName}}.{{comments.lastName}} :</span>
                            </div>
                            <span :class="{phrase_small: small}" class="media__reaction__view__comments__phrase">{{comments.reaction}}</span>
                        </div>
                        <div>
                            <button class="media__reaction__view__delete">
                                <div @click="deleteComments" class="media__reaction__view__delete__self"></div>
                                <i class="media__reaction__view__delete__icon fas fa-trash-alt fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <router-link v-if="focus == false" :to="{name: direction, params: {id: item.post}, query: {focus: false}}" class="media__reaction__more">
                    <button class="media__reaction__more__button">
                        <i class="fas fa-caret-down"></i>
                    </button>
                </router-link>
                
            </div>

            <div v-if="focus == true" class="media__titre">Mon commentaire</div>

            <form v-if="focus == true" @submit.prevent="commentPost" class="media__write">
                <textarea name="textArea" v-model="comments" rows="2"></textarea>
                <button type="submit">
                    <i class="fas fa-seedling fa-lg"></i>
                </button>
            </form>

            <div v-if="focus == true && errorAlert == true" @click="quitError" class="media__error">
                <div class="media__error__icon">
                    <i class="media__error__icon--croix fas fa-times"></i>
                </div>
                <span class="media__error__text">{{errorText}}</span>
            </div>  

        </div>
    </div>
</template>

<script>

export default {
    name: 'Media',
    data: function(){
        return{
            data: {},
            position: -1,
            small: false,
            big: false,
            comments: "",
            errorAlert: false,
            errorText: ""
        }
    },
    props: {
        direction : {type: String, required: true},
        api: {type: String, required: true},
        focus: {type: Boolean, required: true}

    },
    methods: {

        quitError: function(){
            this.errorAlert = false
            this.errorText = ""
        },
        
        likePost: function(event){

            const userId = localStorage.getItem("userId")
            const postId = event.target.parentElement.dataset.id
            
            this.$axios.post('/multimedia/like', {postId: postId, userId: userId})
            .then((response) => {

                const position = event.target.parentElement.dataset.position.substr(-1)
                let likes = JSON.parse(response.request.response).likes
                let buttonLikes = document.getElementsByName("buttonLikes")[position]
                let totalLikes = document.getElementsByName("totalLikes")[position]
                
                if(likes == 1) {
                    buttonLikes.classList.add("true-action")
                    buttonLikes.classList.remove("false-action")
                    totalLikes.textContent = `${parseInt(totalLikes.textContent) + 1}`
                } else {
                    buttonLikes.classList.remove("true-action")
                    buttonLikes.classList.add("false-action")
                    totalLikes.textContent = `${parseInt(totalLikes.textContent) - 1}`
                }
                
            })
            .catch((error) => {
                console.log(JSON.parse(error.request.response).message)
            })
        },

        commentPost: function(){
            this.errorAlert = false
            this.errorText = ""

            const postId = this.$route.params.id
            const userId = localStorage.getItem("userId")
            const comments = this.comments

            this.$axios.post('/multimedia/comment', {postId: postId, userId: userId, reaction: comments})
            .then(() => {

                document.location.reload()

            })
            .catch((error) => {
            
                this.errorAlert = true
                this.errorText = JSON.parse(error.request.response).message

            })
        },

        deleteComments: function(event){

            this.errorAlert = false
            this.errorText = ""

            const userId = localStorage.getItem("userId")
            const commentsId = event.target.parentElement.parentElement.parentElement.dataset.commentsid

            this.$axios.post('/multimedia/deleteComment', {userId: userId, commentsId: commentsId})
            .then(() => {

                document.location.reload()
            })
            .catch((error) => {

                this.errorAlert = true
                this.errorText = JSON.parse(error.request.response).message
            })
        }
    
    },   
    
    beforeMount: function(){

        const userId = localStorage.getItem("userId")
        const postId = this.$route.params.id
        
        this.$axios.post(`/multimedia/${this.api}`, {userId: userId, postId: postId})
        .then((response) => {
            this.data = response.data
            console.log(response.data)
            if(this.focus === true) {
                this.big = true
            } else {
                this.small = true
            }
        })
        .then(() => {
            
            var buttonLikes = document.getElementsByName("buttonLikes")
        
            for (let i = 0; i < buttonLikes.length; i++) {
                
                if(buttonLikes[i].dataset.like == 1){

                    buttonLikes[i].classList.add("true-action")
                    buttonLikes[i].classList.remove("false-action")

                } else {

                    buttonLikes[i].classList.remove("true-action")
                    buttonLikes[i].classList.add("false-action")

                }
                
            }
        })
        .then(() => {

            var buttonComments = document.getElementsByName("buttonComments")
        
            for (let i = 0; i < buttonComments.length; i++) {
            
                if(parseInt(buttonComments[i].dataset.comments) > 0) {

                    buttonComments[i].classList.add("true-action")
                    buttonComments[i].classList.remove("false-action")

                    let nombreComments = document.createElement("div")
                    nombreComments.setAttribute("class", "media__influence__button__my-comments")
                    nombreComments.setAttribute("style", "top: -8px; right: -8px; height: 20px;width: 20px;background-color: rgb(0, 0, 0);position: absolute;color: rgb(255, 255, 255);display: flex;justify-content: center;align-items: center;border-radius: 100%;font-weight: bold;font-size: 10px;")
                    nombreComments.textContent = parseInt(buttonComments[i].dataset.comments)
                    buttonComments[i].appendChild(nombreComments)

                } else {

                    buttonComments[i].classList.remove("true-action")
                    buttonComments[i].classList.add("false-action")
                }
            }

        })
        .then(() => {

            let comments = document.getElementsByName("comments")
            
            for (let i = 0; i < comments.length; i++) {
                
                if(parseInt(comments[i].dataset.mycomments) == 0){

                    comments[i].removeChild(comments[i].children[1])

                }
                
            }
        })
        .then(() => {

            const typeImage = ["jpg", "png", "gif"]
            const typeVideo = ["mp4"]

            var data = this.data
            var mediaBlock = document.getElementsByName("mediaBlock")

            for (let i = 0; i < data.length; i++) {

                if(typeImage.includes(data[i].media.substr(-3)) == true){
                
                    let img = document.createElement("img")
                    img.setAttribute("alt", "Image de publication")
                    img.setAttribute("style", `object-fit: cover; object-position: 50% 50%; width: 100%; height: 100%;`)
                    img.setAttribute("src", data[i].media)
                    mediaBlock[i].appendChild(img)

                }  else if (typeVideo.includes(data[i].media.substr(-3)) == true) {
                    let video = document.createElement("video")
                    video.setAttribute("style", `object-fit: cover; object-position: 50% 50%; width: 100%; height: 100%;`)
                    video.setAttribute("src", data[i].media)
                    video.setAttribute("controls", "controls")
                    video.setAttribute("preload", "metadata")
                    mediaBlock[i].appendChild(video)
                }
                
            }
        })
        .then(() => {
            var reactionBlock = document.getElementsByName("reactionBlock")

            for (let i = 0; i < reactionBlock.length; i++) {

                if(reactionBlock[i].children.length == 0){

                    let noComments = document.createElement("span")
                    noComments.textContent = "Absence de commentaires"
                    reactionBlock[i].appendChild(noComments)
                    
                    reactionBlock[i].classList.add("no-comments")

                    if(this.focus == false) {
                        reactionBlock[i].parentElement.lastChild.style.display = "none"
                    }   
                    
                }

            }
        })
        .then(() => {
            
            if(this.focus == true) {

                const focusGen = this.$router.history.current.query.focus
        
                if(focusGen == true) {
                    document.getElementsByName("textArea")[0].focus()
                } else if(focusGen == false) {
                    window.location.hash = "#reaction"
                }

                this.$emit('history', {history: this.$route.params.id})

            } else {

                var history = this.$router.history.current.query.history
                window.location.hash = `#${history}`
            }
        
        })
        .catch((error) => {
            console.log(error)
        })

        
    }
}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";

    .avatar{
        border-radius: 100%;
        width: 20px;
        height: 20px;
    }

    .true-action{
        color: $button-action-true;
    }

    .false-action{
        color: $button-action-false;
    }

    .no-comments{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
        height: 100%;
    }

    // Partie Media //

    .media_small{
        width: 500px;
    }

    .media_big{
        width: 60vw;
    }

    .media-style{
        object-fit: cover; 
        object-position: 50% 50%; 
        width: 100%; 
        height: 100%;
    }

    .media{
        margin: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 30px!important;
        padding: 8px;
        z-index: 1;

        &__titre{
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: rem(10px);
            padding: 5px 0;
        }

        // Partie Post //

        .post_small{
            height: 200px;
        }

        .post_big{
            height: 400px
        }
        
        &__post{
            width: 100%;
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

        }

        // Partie Influence //

        &__influence{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px 15px 5px;

            // Partie Button //

            .button_small{
                margin: 0 5px;
            }

            .button_big{
                margin-right: 40px;
            }

            &__button{
                background-color: $button-action;
                border-radius: 10px;
                padding: 10px;
                cursor: pointer;
                box-shadow: $box-shadow-button;
                position: relative;

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

            // Partie Author //

            &__author{
                padding: 5px 10px;
                border-radius: 20px;
                box-shadow: $box-shadow-button;
                display: flex;
                align-items: center;
                background-color: $button-action;
                
                &__name{
                    color: $button-action-false;
                    font-weight: bold;
                    font-size: rem(14px);
                    margin-left: 5px;
                }
            }

            // Partie Note //

            &__note{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                span{
                    font-size: rem(12px);
                }
            }
        }

        // Partie Legend //

        &__legend{
            width: 100%;
            background-color: $color-third;
            box-shadow: $box-shadow-inner;
            padding: 10px;
            text-align: center;

            &__text{
                font-size: rem(12px);
            }
        }

        // Partie Réaction //

        .reaction_small{
            height: 130px;
            border-radius: 0 0 30px 30px;
        }

        .reaction_big{
            height: 200px;
        }

        &__reaction{
            width: 100%;
            background-color: $color-third;
            box-shadow: $box-shadow-inner;
            padding: 10px 10px 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-x: scroll;

            &__view{
                display: flex;
                justify-content: space-between;
                align-items: center;

                // Partie Comments //

                .comments_small{
                    display: flex;
                    align-items: center;
                }

                .comments_big{
                    display: flex;
                    align-items: flex-start;
                }

                &__comments{
                    margin-bottom: 5px;
                    overflow: hidden;
                    
                    &__name{
                        display: flex;
                        align-items: center;
                        padding: 0 5px;

                        &--user{
                            font-size: rem(13px);
                            font-weight: bold;
                            padding-left: 5px;
                            white-space: nowrap;
                            line-height: 20px;
                        }
                    }

                    // Partie Phrase //

                    .phrase_small{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    &__phrase{
                        font-size: rem(13px);
                        line-height: 20px;
                    }

                }

                &__delete{
                    height: 20px;
                    width: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: $button-action;
                    margin: 0 5px;
                    color: rgb(255, 255, 255);
                    border-radius: 100%;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    box-shadow: $box-shadow-button;

                    &__self{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }

                    &__icon{
                        height: 11px;
                        width: 11px;
                    }
                }
            }

            &__more{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                
                &__button{
                    cursor: pointer;
                    background-color: $button-action;
                    border-radius: 20px;
                    padding: 0px 20px; 
                    color: $button-action-false;
                    font-size: rem(12px);
                    box-shadow: $box-shadow-button;
                }
            }
        }

        // Partie Write

        &__write{
            display: flex;
            align-items: center;
            width: 100%;

            textarea{
                resize: none;
                width: 100%;
                padding: 10px 15px 15px 15px;
                box-shadow: $box-shadow-inner;
                border-radius: 0 0 0 20px;
                background-color: $color-third;
            }

            button{
                cursor: pointer;
                padding: 10px;
                border-radius: 10px;
                margin-left: 10px;
                box-shadow: $box-shadow-button;
                background-color: $button-action;
                color: white;
            }
        }

        &__error{
            margin-top: 10px;
            padding: 5px;
            font-weight: bold;
            color: $color-error;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;

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

    ::-webkit-scrollbar{
        width: 5px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: rgb(0, 0, 0);
    }
    

</style>
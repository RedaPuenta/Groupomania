<template>
    <div> 
        <div :class="{media_small: small, media_big: big}" v-for="(item, index) in data" :key="index" :id="item.post" class="neo neo-press media">

            <div :class="{post_small: small, post_big: big}" name="mediaBlock" class="media__post">
                <div class="media__post__shadow"></div>
            </div>

            <div class="media__influence">

                <div class="media__influence__button">
                    <button :class="{button_small: small, button_big: big}" name="buttonLikes" class="media__influence__button__item" :data-like="item.my_like" :data-id="item.post">
                        <div @click.self="likePost" class="media__influence__button__item__self" :data-position="item.position"></div>
                        <i class="fas fa-hand-spock fa-lg"></i> 
                    </button>
                    <router-link :class="{button_small: small}" v-if="focus == false" :to="{name: direction, params: {id: item.post}, query: {comments: true, preference: preference}}">
                        <button name="buttonComments" :data-comments="item.my_comments" class="media__influence__button__item">
                            <i class="fas fa-comment fa-lg"></i> 
                        </button>
                    </router-link>
                    <div name="deletePost" :data-mypost="item.my_post" class="media__influence__button__delete">
                        <div @click.self="deletePost" :data-id="item.post" class="media__influence__button__delete__self"></div>
                        <i class="media__influence__button__delete__icon fas fa-trash-alt fa-lg"></i>
                    </div>
                </div>
                
                <router-link :to="{name: 'Profil', params: {id: item.userId}}">
                    <div class="media__influence__author">
                        <img class="avatar" :src="item.avatar" alt="Avatar de profil">
                        <span class="media__influence__author__name">{{item.firstName}}.{{item.lastName}}</span>
                    </div>
                </router-link>

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
                                <div @click="deleteComments" class="media__reaction__view__delete__self" :data-commentsId="comments.commentsId"></div>
                                <i class="media__reaction__view__delete__icon fas fa-trash-alt fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <router-link v-if="focus == false" :to="{name: direction, params: {id: item.post}, query: {comments: false, preference: preference}}" class="media__reaction__more">
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

            <div v-if="focus == true" class="media__error">
                <Error/>
            </div>  


        </div>
    </div>
</template>

<script>
import Error from './Error.vue'

export default {
    name: 'Media',

    components: {
        Error
    },

    data: function(){
        return{
            data: [],
            small: false,
            big: false,
            comments: ""
        }
    },

    props: {
        direction : {type: String, required: true},
        focus: {type: Boolean, required: true},
        preference: {type: Number}
    },

    methods: {
        //! Fonction qui permet de supprimer un post
        deletePost: function(event){
            
            const postId = event.target.dataset.id
            
            this.$axios.delete(`/multimedia/post/${postId}`)
            .then(() => {
                document.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })

        },
        //! Fonction qui permet de liker un post
        likePost: function(event){
            
            const userId = localStorage.getItem("userId")
            const postId = event.target.parentElement.dataset.id
            
            this.$axios.post('/multimedia/like', {postId: postId, userId: userId})
            .then((response) => {
                
                const position = event.target.dataset.position
                const likes = response.data.likes

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
                console.log(error)
            })
        },
        //! Fonction qui permet de commenter un post
        commentPost: function(){
            this.$store.commit("DESACTIVE_ERROR")

            const postId = this.$route.params.id
            const userId = localStorage.getItem("userId")
            const comments = this.comments

            this.$axios.post('/multimedia/comment', {postId: postId, userId: userId, reaction: comments})
            .then(() => {

                document.location.reload()

            })
            .catch((error) => {
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
            })
        },
        //! Fonction qui permet de supprimer un commentaire de post
        deleteComments: function(event){

            this.$store.commit("DESACTIVE_ERROR")

            const commentsId = event.target.dataset.commentsid
            
            this.$axios.delete(`/multimedia/comments/${commentsId}`)
            .then(() => {

                document.location.reload()
            })
            .catch((error) => {
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
            })
        },
        //! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props)
        apiAdresse: function(){
            const focus = this.focus

            if(focus == false){
                return `/multimedia/recoverAll`
            } else {
                return `/multimedia/recoverOne`
            }

        },
        //! Fonction qui permet de changer le corps des requêtes (selon la view --> props)
        apiBody: function(){

            const focus = this.focus
            const userId = localStorage.getItem("userId")
            const preference = this.preference
            const postId = this.$route.params.id

            if(focus == false) {
                return {userId: userId, preference: preference}
            } else {
                return {userId: userId, postId: postId}
            }

        },
        //! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props)
        buildClass: function(){
            const focus = this.focus

            if(focus == false) {
                this.small = true
            } else {
                this.big = true
            }
        },
        //! Fonction qui permet de rendre les boutons "likes" actif/désactif grâce aux keys "my_likes" de la réponse API
        buildMyLike: function(){

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

        },
        //! Fonction qui permet de rendre les boutons "comments" actif/désactif grâce aux keys "my_comments" de la réponse API
        buildMyComments: function(){

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

        },
        //! Fonction qui permet de faire apparaître les boutons de suppression de post
        buildButtonDeletePost: function(){
            
            let button = document.getElementsByName("deletePost")
            
            for (let i = 0; i < button.length; i++) {
                
                if(parseInt(button[i].dataset.mypost) == 0){
                    button[i].style.display = "none"
                }
                
            }

        },
        //! Fonction qui permet de faire apparaître les boutons de suppression de commentaire
        buildButtonDeleteComments: function(){
            
            let comments = document.getElementsByName("comments")
            
            for (let i = 0; i < comments.length; i++) {
                
                if(parseInt(comments[i].dataset.mycomments) == 0){

                    comments[i].removeChild(comments[i].children[1])

                }
                
            }

        },
        //! Fonction qui permet de choisir les balises de fichiers <img> ou <vidéo> grâce aux keys "media" de la réponse API
        buildBlockMedia: function(){

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

        },
        //! Fonction qui permet d'inscrire un message dans la partie "réaction" et retirer le bouton "more" quand celle-ci est vide
        buildBlockReaction: function(){
            
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

        },
        //! Fonction qui permet d'utiliser des comportements de direction par rapport aux paramètres des url (selon la view --> props)
        buildHistory: function(){
            const focus = this.focus
            
            if(focus == true) {

                const comments = this.$router.history.current.query.comments
        
                if(comments == true) {
                    document.getElementsByName("textArea")[0].focus()
                } else if(comments == false) {
                    window.location.hash = "#reaction"
                }
                
                if(this.$route.params.id){
                    this.$emit('history', {history: this.$route.params.id})
                }

                let params = (new URL(document.location)).searchParams
                let IdSearch = params.get("preference")

                if(IdSearch !== null) {
                
                    this.$emit('preference', {prefer: parseInt(IdSearch)})
                }
                

            } else {

                if(this.$router.history.current.query.history) {
                    var history = this.$router.history.current.query.history
                    window.location.hash = `#${history}`
                }
                
            }

        },
        //! Fonction qui contient toute la logique de rendu
        RENDU_MONTAGE_FONCTION: function(){
            const adresse = this.apiAdresse()
            const body = this.apiBody()

            this.$axios.post(adresse, body)
            .then((response) => {

                this.data = response.data
            })
            .then(() => {
                this.buildClass()
            })
            .then(() => {
                this.buildMyLike()
            })
            .then(() => {
                this.buildMyComments()
            })
            .then(() => {
                this.buildButtonDeletePost()
            })
            .then(() => {
                this.buildButtonDeleteComments()
            })
            .then(() => {
                this.buildBlockMedia()
            })
            .then(() => {
                this.buildBlockReaction()
            })
            .then(() => {
                this.buildHistory()
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },   

    watch: {
        preference: function(){
            this.data = []
            this.RENDU_MONTAGE_FONCTION()
        }
    },
    
    mounted: function(){
        this.RENDU_MONTAGE_FONCTION()
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
        padding: 10px;
        position: relative;
        z-index: 1;
        overflow: hidden;

        &__titre{
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: rem(10px);
            padding: 5px 0;
        }

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

        &__influence{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px 15px 5px;
            

            .button_small{
                margin: 0 5px;
            }

            .button_big{
                margin-right: 40px;
            }


            &__button{ 
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            
                &__item{
                    background-color: $button-action;
                    border-radius: 10px;
                    height: 40px;
                    width: 40px;
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

                &__delete{
                    position: absolute;
                    height: 40px;
                    width: 40px;
                    right: -45px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    box-shadow: $box-shadow-button;
                    border-radius: 10px;

                    &__self{
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        z-index: 2;
                    }

                    &__icon{
                        z-index: 0;
                        position: relative;
                        color: red;
                    }
                }
            }

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
                    border-radius: 5px;
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
                        color: red;
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
        }

    }

    ::-webkit-scrollbar{
        width: 5px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: rgb(0, 0, 0);
    }
    

</style>
<template>
    <div> 
        <!---- Un post ---->
        <div :class="{media_small: small, media_big: big}" v-for="(item, index) in data" :key="index" :id="item.postId" class="neo media">

            <!---- Bouton "Supprimer le post" (Scroll/Focus) ---->
            <div class="media__edit">
                <div class="media__edit__more" name="deletePost" :data-mypost="item.my_post"></div>
                <div class="media__edit__self" name="deletePost" :data-mypost="item.my_post" data-active="false" @click.self="toggleButtonDelete"></div>
                <div class="media__edit__delete">
                    <div @click.self="deletePost" :data-id="item.postId" class="media__edit__delete__self"></div>
                    <i class="fas fa-trash-alt fa-lg"></i>
                </div>
            </div>
            
            <!---- Partie Titre (Scroll/Focus) ---->
            <div class="media__question">
                <span>{{item.titre}}</span>
            </div>

            <div class="media__influence">

                <div class="media__influence__button">

                    <!---- Bouton "Like" (Scroll/Focus) ---->
                    <button :class="{button_small: small, button_big: big}" name="buttonLikes" class="media__influence__button__item" :data-like="item.my_like" :data-id="item.postId">
                        <div @click.self="likePost" class="media__influence__button__item__self" :data-position="item.position"></div>
                        <i class="media__influence__button__item__icon fas fa-satellite fa-lg"></i> 
                    </button>

                    <!---- Bouton "Commenter" (Scroll) ---->
                    <router-link :class="{button_small: small}" v-if="focus == false" :to="{name: direction, params: {id: item.postId}, query: {comments: true, preference: preference}}">
                        <button name="buttonComments" :data-comments="item.my_comments" class="media__influence__button__item">
                            <i class="media__influence__button__item__icon fas fa-comments fa-lg"></i> 
                        </button>
                    </router-link>

                </div>

                <!---- Bouton "Voir le profil de l'auteur" (Scroll/Focus) ---->
                <router-link :to="{name: 'Profil', params: {id: item.userId}}">
                    <div class="media__influence__author">
                        <img class="avatar" :src="item.avatar" alt="Avatar de profil">
                        <span class="media__influence__author__name">{{item.firstName}}.{{item.lastName}}</span>
                    </div>
                </router-link>

                <!---- Les scores du post (Scroll/Focus) ---->
                <div class="media__influence__note">
                    <div class="media__influence__note__item">
                        <div class="media__influence__note__item__text">
                            <span name="totalLikes">{{item.likes}}</span> 
                            <span> engouements</span>
                        </div>
                        <span class="media__influence__note__item__text">{{item.comments}} réactions</span>
                    </div>
                    
                </div>

            </div>

            <div :class="{reaction_small: small, reaction_big: big}" class="media__reaction">

                <div id="reaction" name="reactionBlock">

                     <!---- Un commentaire ---->
                    <div name="comments" v-for="(comments, indexList) in item.commentsList" :key="indexList" :data-commentsId="comments.commentsId" :data-myComments="comments.my_comments" class="media__reaction__view">
                        <div :class="{comments_small: small, comments_big: big}" class="media__reaction__view__comments">  
                            <!---- Auteur ----> 
                            <div class="media__reaction__view__comments__name">
                                <img class="avatar" :src="comments.avatar" alt="Avatar de profil">
                                <span class="media__reaction__view__comments__name--user">{{comments.firstName}}.{{comments.lastName}} :</span>
                            </div>
                            <!---- Message ---->
                            <span :class="{phrase_small: small}" class="media__reaction__view__comments__phrase">{{comments.reaction}}</span>
                        </div>
                        <div>
                            <!---- Bouton "supprimer commentaire" ---->
                            <button class="media__reaction__view__delete">
                                <div @click="deleteComments" class="media__reaction__view__delete__self" :data-commentsId="comments.commentsId"></div>
                                <i class="media__reaction__view__delete__icon fas fa-trash-alt fa-sm"></i>
                            </button>
                        </div>
                    </div>

                </div>
                
                <!---- Bouton "Voir plus" (Scroll) ---->
                <router-link v-if="focus == false" :to="{name: direction, params: {id: item.postId}, query: {comments: false, preference: preference}}" class="media__reaction__more">
                    <button class="media__reaction__more__button">
                        <i class="fas fa-caret-down"></i>
                    </button>
                </router-link>
                
            </div>

            <div v-if="focus == true" class="media__titre">Mon commentaire</div>

            <!---- Partie "Ecrire un commentaire" (Focus) ---->
            <form v-if="focus == true" @submit.prevent="commentPost" class="media__write">
                <textarea name="textArea" v-model="comments" rows="2"></textarea>
                <button type="submit">
                    <i class="fas fa-seedling fa-lg"></i>
                </button>
            </form>

            <!--- Composant Error (pour les erreurs) --->
            <Error v-if="focus == true" class="media__error"></Error>
             
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
            //! Variable qui contient l'ensemble des posts
            data: [],
            //! Ensemble de variables qui décide du type d'affichage (Scroll et Focus)
            small: false,
            big: false,
            //! Variable qui contient le commentaire du visiteur dans le formulaire
            comments: ""
        }
    },

    props: {
        //! Propriété qui permet de donner des adresses aux différents liens (AgoraID ou MultimédiaID)
        direction : {type: String, required: true},
        //! Propriété qui permet de déterminer la requête API dans la récupération des posts et le type d'affichage du post
        focus: {type: Boolean, required: true},
        //! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus"
        preference: {type: Number}
    },

    methods: {
        //! Fonction qui permet de faire apparaître/disparaître le toggle du bouton de suppression de post
        toggleButtonDelete: function(event){
        
            if(event.target.dataset.active == "false"){
                event.target.parentElement.children[2].style.display = "flex"
                event.target.dataset.active = "true"
            } else if(event.target.dataset.active == "true"){
                event.target.parentElement.children[2].style.display = "none"
                event.target.dataset.active = "false"
            }
            
        },
        //! Fonction qui permet de supprimer un post
        deletePost: function(event){
            
            const postId = event.target.dataset.id
            
            this.$axios.delete(`/agora/post/${postId}`)
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
            
            this.$axios.post('/action/like', {postId: postId, userId: userId})
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

            this.$axios.post('/action/', {postId: postId, userId: userId, reaction: comments})
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
            
            this.$axios.delete(`/action/${commentsId}`)
            .then(() => {

                document.location.reload()
            })
            .catch((error) => {
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
            })
        },
        //! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props FOCUS)
        apiAdresse: function(){
            const focus = this.focus

            if(focus == false){
                return `/agora/recoverAll`
            } else {
                return `/agora/recoverOne`
            }

        },
        //! Fonction qui permet de changer le corps des requêtes (selon la view --> props FOCUS)
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
        //! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props FOCUS)
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
        //! Fonction qui permet de faire apparaître les boutons de suppression de post (ADMIN ALL ACCESS)
        buildButtonDeletePost: function(privilege){
            
            if(privilege !== 2){

                let button = document.getElementsByName("deletePost")
            
                for (let i = 0; i < button.length; i++) {
                    
                    if(parseInt(button[i].dataset.mypost) == 0){
                        button[i].style.display = "none"
                    }
                    
                }
            }

        },
        //! Fonction qui permet de faire apparaître les boutons de suppression de commentaire (ADMIN ALL ACCESS)
        buildButtonDeleteComments: function(privilege){
            
            if(privilege !== 2){

                let comments = document.getElementsByName("comments")
                
                for (let i = 0; i < comments.length; i++) {
                    
                    if(parseInt(comments[i].dataset.mycomments) == 0){

                        comments[i].removeChild(comments[i].children[1])

                    }
                    
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
        //! Fonction qui permet d'utiliser des comportements de direction par rapport aux paramètres des url (selon la view --> props FOCUS)
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
                this.data = response.data.posts
                return response.data.privilege
            })
            .then((privilege) => {
                this.buildClass()
                return privilege
            })
            .then((privilege) => {
                this.buildMyLike()
                return privilege
            })
            .then((privilege) => {
                this.buildMyComments()
                return privilege
            })
            .then((privilege) => {
                this.buildButtonDeletePost(privilege)
                return privilege
            })
            .then((privilege) => {
                this.buildButtonDeleteComments(privilege)
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

    //! Quand la propriété  ...
    watch: {
        //! "Préférence" change ...
        preference: function(){

            //! On supprime tout les posts
            this.data = []
        
            //! On applique le rendu de l'affichage des posts
            this.RENDU_MONTAGE_FONCTION()
        }
    },
    
    //! Quand la page est monté ...
    mounted: function(){

        //! On applique le rendu de l'affichage des posts
        this.RENDU_MONTAGE_FONCTION()

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    },

    //! Quand la  page est mise à jour ...
    updated: function(){

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    $step-1: 1100px;

    .media__edit:hover .media__edit__more{
        background-color: white;
    }

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
        width: 70%;
        margin: 40px;
        padding: 0 10px 10px 10px;
        @media screen and (max-width: $step-0) {
            margin: 40px 10px;
            width: 100%;
        }
    }

    .media_big{
        margin: 40px;
        width: 70%;
        padding: 0 10px 10px 10px;
        @media screen and (max-width: $step-1) {
            width: 100%;
            margin: 40px 30px 60px 30px;
        }
        @media screen and (max-width: $step-0) {
            width: 100%;
            margin: 40px 10px 60px 10px;
        }
    }

    .media-style{
        object-fit: cover; 
        object-position: 50% 50%; 
        width: 100%; 
        height: 100%;
    }

    .media{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 30px;
        position: relative;
        z-index: 1;
        overflow: hidden;

        &__edit{
            height: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: relative;
            z-index: 2;

            &__more{
                background-color: rgba(0, 0, 0, 0.65);
                height: 6px;
                width: 100px;
                border-radius: 5px;
                margin-top: 1px;
                transition: background-color 0.6s ease-in-out;
            }

            &__self{
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            &__delete{
                display: none;
                position: absolute;
                top: 15px;
                right: auto;
                left: auto;
                background-color: rgb(0, 0, 0);
                color: rgb(255, 0, 0);
                border-radius: 10px;
                padding: 6px 15px;
                text-align: center;
                box-shadow: $box-shadow-button;
                cursor: pointer;
                overflow: hidden;

                &__self{
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    height: 100%;
                    width: 100%;
                }
            }
        }

        &__question{
            width: 100%;
            padding: 40px 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            @media screen and (max-width: $step-1) {
                padding: 20px;
            }

            span{
                line-height: 1.2;
                text-align: center;
                width: 100%;
                color: $color-primary;
                text-shadow: 1px 1px black, -1px -1px white;
                font-size: rem(23px);
                font-weight: 900;
            }
        }

        .post_small{
            height: 200px;
        }

        .post_big{
            height: 400px
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
                justify-content: flex-start;
                align-items: center;
                position: relative;
                flex: 1;
            
                &__item{
                    background-color: $button-action;
                    border-radius: 10px;
                    height: 40px;
                    width: 40px;
                    cursor: pointer;
                    box-shadow: $box-shadow-button;
                    position: relative;
                    @media screen and(max-width: $step-0){
                        height: 35px;
                        width: 35px;
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

                    &__icon{
                        @media screen and (max-width: $step-0){
                            font-size: rem(20px);
                        }
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
                    @media screen and(max-width: $step-0){
                        height: 35px;
                        width: 35px;
                        right: -40px;
                    }

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
                        @media screen and (max-width: $step-0){
                            font-size: rem(20px);
                        }
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
                flex: 1;
                
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
                align-items: flex-end;
                flex: 1;

                &__item{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    &__text:nth-child(1){
                        margin-bottom: 1px;
                    }

                    span{
                        font-size: rem(12px);
                    }
                }
            }
        }

        .reaction_small{
            height: 135px;
            border-radius: 0 0 30px 30px;
        }

        .reaction_big{
            height: 180px;
            overflow-x: scroll;
        }

        &__reaction{
            width: 100%;
            background-color: $color-third;
            box-shadow: $box-shadow-inner;
            padding: 10px 10px 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            

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
                    color: $button-action-inner;
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
                margin-bottom: 10px;
                
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

        &__titre{
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: rem(10px);
            padding: 5px 0;
        }

        &__write{
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            width: 100%;

            textarea{
                resize: none;
                width: 100%;
                padding: 10px 15px 15px 15px;
                box-shadow: $box-shadow-inner;
                border-radius: 0 0 20px 0;
                background-color: $color-third;
            }

            button{
                cursor: pointer;
                padding: 10px;
                border-radius: 10px;
                margin-right: 10px;
                box-shadow: $box-shadow-button;
                background-color: $button-action;
                color: $button-action-inner;
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
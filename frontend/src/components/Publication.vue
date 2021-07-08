<template>
  <div class="media">

        <!--- Bouton "Sortir" (Multimdédia/Agora) --->
        <div @click="toWrite" v-if="new_write == false" :class="{bg_multimedia: multimedia, bg_agora: agora}" class="neo media__new"></div>
        
        <!--- Bouton "Ecrire" (Multimédia/Agora) --->
        <div @click="toExit" v-if="new_write == true" class="neo media__exit"></div>
        
        <!--- Partie Construction du Post --->
        <div :class="{post_active: new_write}" class="media__post">
            <form v-if="new_write == true" class="neo neo-relax media__post__write" enctype="multipart/form-data"> 
                
                <!--- Image/Vidéo (Multimédia) --->
                <div v-if="multimedia == true" class="media__post__write__view">
                    <div class="media__post__write__view__shadow"></div>
                    <img v-if="fileExe == false" class="media__post__write__view__default" src="../assets/upload.png" alt="Image de téléchargement"/>
                    <img v-if="fileExe == true && fileExeType == 'image'" class="media__post__write__view__file" ref="mediaImage" src="#" alt="Votre fichier"/>
                    <video v-if="fileExe == true && fileExeType == 'video'" class="media__post__write__view__file" ref="mediaVideo" autoplay muted loop src="#"></video>
                    <img v-if="fileExe == true && fileExeType == 'loading'" class="media__post__write__view__file" src="../assets/loading.gif" alt="Votre fichier"/>
                </div>

                <!--- Bouton "Charger le fichier" (Multimédia) --->
                <div v-if="multimedia == true" class="media__post__write__control">
                    <div v-if="fileExe == false" class="media__post__write__control__upload"> 
                        <label class="media__post__write__control__upload--label" for="file">Choisir un fichier</label>
                        <input class="media__post__write__control__upload--input" type="file" ref="fileMedia" @change="controlFile" id="file" name="file">
                    </div>
                    <button v-if="fileExe == true" @click="cancelUpload">Changer de fichier</button>
                </div>
                
                <!--- Champ "Ecrire une légende" (Multimédia) --->
                <textarea v-if="multimedia == true" v-model="legend" class="media__post__write__publication" name="legend" rows="3" placeholder="Ecrivez votre légende ..."></textarea>
                
                <!--- Champ "Ecrire un titre" (Agora) --->
                <textarea v-if="agora == true" v-model="titre" class="media__post__write__publication publication-agora" name="titre" rows="5" placeholder="Ecrivez votre sujet ..."></textarea>
                
                <!--- Bouton de soumission (Multimédia/Agora) --->
                <button @click="newPost" v-if="stopSend == false" class="media__post__write__submit" type="button">{{textButton}}</button>
                <button v-if="stopSend == true" class="media__post__write__submit" type="button">{{textButton}}</button>
                
                <!--- Partie Erreur (Multimédia/Agora) --->
                <div class="media__post__write__error">
                    <!--- Composant Error (pour les erreurs) --->
                    <Error/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Error from './Error.vue'

export default {
    name: "Media",

    components: {
        Error
    },

    props: {
        //! Propriété qui permet de décidé du type d'affichage (Multimédia/Agora)
        mode: {type: String, required: true}
    }, 

    data: function(){
        return{
            //! Variable qui indique si la fenêtre de publication a été ouverte par l'utilisateur
            new_write: false,
            //! Emsemble de variable qui contiennent les informations du visiteur dans le formulaire
            file: "",
            legend: "",
            titre: "",
            //! Variable qui contient le texte du bouton de publication (par défaut = "Publier")
            textButton: "Publier",
            //! Variable qui indique si un fichier a été chargée par l'utilisateur
            fileExe: false,
            //! Variable qui indique le type de fichier qui a été chargée par l'utilisateur
            fileExeType: "",
            //! Variable qui permet d'ajouter ou d'enlever l'évènement de soumission du formulaire (Sécurité)
            stopSend: false,
            //! Ensemble de variable qui permet de contrôler l'affichage
            multimedia: false, 
            agora: false
        }
    },

    methods: {
        //! Fonction qui réinitialise toutes les variables
        dataReset: function(){
            this.$store.commit("DESACTIVE_ERROR")
            this.stopSend = false
            this.textButton = "Publier"
            this.fileExe = false
            this.file = ""
            this.legend = ""
            this.titre = ""
        },
        //! Fonction qui réinitialise toutes les variables et passe en mode "écriture"
        toWrite: function(){
            this.dataReset()
            this.new_write = true
            this.$emit('blur-control', {blur: true})
        },
        //! Fonction qui réinitialise toutes les variables et passe en mode "sortie"
        toExit: function(){
            this.dataReset()
            this.new_write = false
            this.$emit('blur-control', {blur: false})
        },
        //! Fonction qui permet de pré-afficher le fichier qui a été chargé
        controlFile: async function(event){

            const typeValid = ["image/jpeg", "image/jpg", "image/png", "image/gif", "video/mp4"]

            if(typeValid.indexOf(event.target.files[0].type) == -1) {

                await this.$store.commit("ACTIVE_ERROR", "Le format du fichier n'est pas autorisé")

            } else { 
                
                await this.$store.commit("DESACTIVE_ERROR")
                this.fileExe = await true

                if (typeValid.indexOf(event.target.files[0].type) < 4) {
                    
                    this.fileExeType = await 'image'

                    this.file = await event.target.files[0]
                    const fileMedia = await event.target.files[0]
                    const blockMedia = await this.$refs.mediaImage
                    blockMedia.src = await URL.createObjectURL(fileMedia)
                    
                } else {

                    this.fileExeType = await 'video'

                    this.file = await event.target.files[0]
                    const fileMedia = await event.target.files[0]
                    const blockMedia = await this.$refs.mediaVideo
                    blockMedia.src = await URL.createObjectURL(fileMedia)

                }
            }
        },
        //! Fonction qui permet de réinitialiser certaines variables quand le bouton "changer le fichier" a été engagé
        cancelUpload: function(){
            this.upload = false
            this.fileExe = false
            this.file = ""
        },
        //! Fonction qui permet de changer l'adresse des requêtes (selon la view --> Props MODE)
        getApi: function(){

            if(this.multimedia == true) {

                return '/multimedia/post'

            } else if(this.agora == true) {

                return '/agora/post'
            }

        },
        //! Fonction qui permet de changer le corps des requêtes (selon la view --> props MODE)
        getBody: function(){

            const userId = localStorage.getItem("userId")

            if(this.multimedia == true) {

                let formData = new FormData()
                formData.append('file', this.file)
                formData.append('legend', this.legend)
                formData.append('userId', userId)
        
               return formData

            } else if (this.agora == true) {

                return {userId: userId, titre: this.titre}

            }

        },
        //! Fonction qui permet de changer l'en tête des requêtes (selon la view --> props FOCUS)
        getHeaders: function(){

            if(this.multimedia == true) {

                return {headers: {'Content-Type': 'multipart/form-data'}}

            } else if(this.agora == true) {

                return {}

            }

        },
        //! Fonction qui permet de publier un contenu
        newPost: function(){
            
            if(localStorage.getItem("token") !== null && localStorage.getItem("userId") !== null){

                const adresse = this.getApi()
                const body = this.getBody()
                const headers = this.getHeaders()
                
                this.$axios.post(adresse, body, headers)
                .then((response) => {
                    this.stopSend =  true
                    this.$store.commit("DESACTIVE_ERROR")
                    this.fileExeType = "loading"
                    this.textButton = "Votre publication est en cours d'enrengistrement ..." 

                    setTimeout(function(){

                        this.textButton = JSON.parse(response.request.response).message

                        setTimeout(function(){

                            this.file = ""
                            this.new_write = false
                            this.$emit('blur-control', {blur: false})
                            document.location.reload()

                        }.bind(this), 1500)
        

                    }.bind(this), 1500)

                })  
                .catch((error) => {
                    this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
                })

            } else {

                localStorage.clear()
                this.$router.push({name: 'Connexion'})
            }
        
        }
    },

    //! Une fois que la page est monté ...
    mounted: function(){
    
        //! On change l'état des variables responsables de l'affichage
        if(this.mode == 'Agora') {
            this.agora = true
        } else if(this.mode == 'Multimedia'){
            this.multimedia = true
        }

    }

}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    $step-1: 1000px;

    .media{ 
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 5;

        .bg_agora{
            background: no-repeat center/40% url("../assets/new-forum.svg") rgb(0, 0, 0);
        }

        .bg_multimedia{
            background: no-repeat center/40% url("../assets/new-multimedia.svg") rgb(0, 0, 0);
        }
        
        &__new{
            height: 70px;
            width: 70px;
            cursor: pointer;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 3;
            border-radius: 20px;
            @media screen and (max-width: $step-1) {
                height: 65px;
                width: 65px;
                right: 20px;
                bottom: 20px;
                border-radius: 15px;
            }
            @media screen and (max-width: $step-0) {
                height: 55px;
                width: 55px;
                border-radius: 10px;
            }
        }

        &__exit{
            height: 70px;
            width: 70px;
            background: no-repeat center/40% url("../assets/croix.svg") white;
            cursor: pointer;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 3;
            border-radius: 20px;
            @media screen and (max-width: $step-1) {
                height: 65px;
                width: 65px;
                right: 20px;
                bottom: 20px;
                border-radius: 15px;
            }
            @media screen and (max-width: $step-0) {
                height: 55px;
                width: 55px;
                border-radius: 10px;
            }
        }

        .post_active{
            height: calc(100vh - 130px);
        }   

        &__post{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            z-index: 2;
            
            &__write{
                padding: 10px;
                display: block;
                width: 500px;
                overflow: hidden;
                border-radius: 30px!important;
                @media screen and (max-width: $step-0) {
                    width: 90%;
                    padding: 5px;
                }

                &__view{
                    height: 250px;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @media screen and (max-width: $step-0) {
                        height: 180px;
                    }

                    &__shadow{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        background-color: transparent;
                        border-radius: 30px 30px 0 0;
                        box-shadow: $box-shadow-image;
                        z-index: 5;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }

                    &__default{
                        width: 40%;
                    }

                    &__file{
                        object-fit: cover;
                        object-position: 50% 50%;
                        width: 100%;
                        height: 100%;
                        border-radius: 30px 30px 0 0;
                    }
                }

                &__control{
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    padding: 10px 0;
                    height: 50px;

                    button{
                        cursor: pointer;
                        border-radius: 10px;
                        width: 130px;
                        height: 30px;
                        font-size: rem(12px);
                        background-color: $button-action;
                        color: $button-action-inner;
                        box-shadow: $box-shadow-button;
                        overflow: hidden;
                    }

                    &__upload{
                        border-radius: 10px;
                        width: 130px;
                        height: 30px;
                        box-shadow: $box-shadow-button;
                        overflow: hidden;
                        position: relative;

                        &--label{
                            color: white;
                            cursor: pointer;
                            width: 100%;
                            height: 100%;
                            background-color: $button-action;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            font-size: rem(12px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }   

                        &--input{
                            display: none;
                        }
                    }

                }

                .publication-agora{
                    border-radius: 30px 30px 0 0;
                }
            
                &__publication{
                    resize: none;
                    width: 100%;
                    padding: 10px 10px;
                    background-color: $color-third;
                    text-align: center;
                    box-shadow: $box-shadow-inner;
                }

                &__submit{
                    margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    background-color: $button-action;
                    color: $button-action-inner;
                    cursor: pointer;
                    border-radius: 20px!important;
                    box-shadow: $box-shadow-button;
                }

                &__error{
                    margin-top: 10px;
                }
            }
        }
    }


</style>
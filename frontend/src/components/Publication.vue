<template>
  <div class="media">
        <div @click="toWrite" v-if="new_write == false" class="neo media__new"></div>
        <div @click="toExit" v-if="new_write == true" class="neo media__exit"></div>
        <div class="media__post">
            <form @submit.prevent="newPost" v-if="new_write == true" class="neo neo-relax media__post__write" enctype="multipart/form-data"> 
                <div class="media__post__write__view">
                    <div class="media__post__write__view__shadow"></div>
                    <img v-if="fileExe == false" class="media__post__write__view__default" src="../assets/upload.png" alt="Image de téléchargement"/>
                    <img v-if="fileExe == true && fileExeType == 'image'" class="media__post__write__view__file" ref="mediaImage" src="#" alt="Votre fichier"/>
                    <video v-if="fileExe == true && fileExeType == 'video'" class="media__post__write__view__file" ref="mediaVideo" autoplay muted loop src="#"></video>
                    <img v-if="fileExe == true && fileExeType == 'loading'" class="media__post__write__view__file" src="../assets/loading.gif" alt="Votre fichier"/>
                </div>
                <div class="media__post__write__control">
                    <div v-if="upload == false" class="media__post__write__control__upload"> 
                        <label class="media__post__write__control__upload--label" for="file">Choisir un fichier</label>
                        <input class="media__post__write__control__upload--input" type="file" ref="fileMedia" @change="controlFile" id="file" name="file">
                    </div>
                    <button v-if="upload == true" @click="cancelUpload">Changer de fichier</button>
                </div>
                <textarea v-model="legend" class="media__post__write__publication" name="legend" rows="3" placeholder="Ecrivez votre légende ..."></textarea>
                <button class="media__post__write__submit" type="submit">{{textButton}}</button>
                <div class="media__post__write__error">
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
    data: function(){
        return{
            new_write: false,
            file: "",
            legend: "",
            textButton: "Publier",
            upload: false,
            fileExe: false,
            fileExeType: ""
        }
    },
    methods: {

        toWrite: function(){
            this.$store.commit("DESACTIVE_ERROR")
            this.new_write = true
            this.textButton = "Publier"
            this.upload = false
            this.fileExe = false
            this.file = ""
            this.legend = ""
            this.$emit('blur-control', {blur: true})
        },

        toExit: function(){
            this.$store.commit("DESACTIVE_ERROR")
            this.new_write = false
            this.textButton = "Publier"
            this.upload = false
            this.fileExe = false
            this.file = ""
            this.legend = ""
            this.$emit('blur-control', {blur: false})
        },

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
                    
                    this.upload = await true

                } else {

                    this.fileExeType = await 'video'

                    this.file = await event.target.files[0]
                    const fileMedia = await event.target.files[0]
                    const blockMedia = await this.$refs.mediaVideo
                    blockMedia.src = await URL.createObjectURL(fileMedia)
                    
                    this.upload = await true

                }
            }
        },

        cancelUpload: function(){
            this.upload = false
            this.fileExe = false
            this.file = ""
        },

        newPost: function(){
            
            if(localStorage.getItem("token") !== null && localStorage.getItem("userId") !== null){

                const userId = localStorage.getItem("userId")

                let formData = new FormData()
                formData.append('file', this.file)
                formData.append('legend', this.legend)
                formData.append('userId', userId)

                this.$axios.post('multimedia/create', formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {

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
    mounted: function(){
        this.$store.dispatch('neo')
    },
    updated: function(){
        this.$store.dispatch('neo')
    }

}
</script>

<style lang="scss" scoped>

    @import "../sass/global.scss";

    .media{ 
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 5;
        
        &__new{
            height: 70px;
            width: 70px;
            background: no-repeat center/40% url("../assets/new-media.svg") black;
            cursor: pointer;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 3;
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
        }

        &__post{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            z-index: 3;

            &__write{
                padding: 10px;
                display: block;
                margin-top: 70px;
                width: 500px;
                overflow: hidden;
                border-radius: 20px!important;

                &__view{
                    height: 250px;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;

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
                        color: white;
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
                    color: white;
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
(function(t){function e(e){for(var s,o,r=e[0],c=e[1],l=e[2],_=0,m=[];_<r.length;_++)o=r[_],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&m.push(i[o][0]),i[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,r=1;r<a.length;r++){var c=a[r];0!==i[c]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},i={app:0},n=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/Groupomania/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0842":function(t,e,a){},"0882":function(t,e,a){"use strict";a("21c8")},"08b2":function(t,e,a){t.exports=a.p+"img/icon-left-font-monochrome-black.e0c03c97.svg"},"0924":function(t,e,a){"use strict";a("f806")},"0bc3":function(t,e,a){"use strict";a("5f77")},"156b":function(t,e,a){"use strict";a("6921")},"1f43":function(t,e,a){},"21c8":function(t,e,a){},"2d3a":function(t,e,a){"use strict";a("7bf4")},"2fb2":function(t,e,a){"use strict";a("86fd")},"36f9":function(t,e,a){},"3f48":function(t,e,a){"use strict";a("ecc7")},"4a31":function(t,e,a){"use strict";a("cb2e")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],o={name:"App"},r=o,c=(a("5c0b"),a("2877")),l=Object(c["a"])(r,i,n,!1,null,null,null),u=l.exports,_=(a("99af"),a("2f62")),m=a("bc3a"),d=a.n(m),f=a("8c4f"),p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"connexion"}},[t._m(0),s("div",{staticClass:"body"},[s("form",{staticClass:"formulaire"},["register"==t.mode?s("h2",{staticClass:"formulaire__titre"},[t._v("Inscription")]):t._e(),"register"==t.mode?s("p",{staticClass:"formulaire__question"},[t._v("Vous avez déjà un compte ? "),s("span",{staticClass:"formulaire__question--change",on:{click:t.switchConnexion}},[t._v("Se connecter")])]):t._e(),"connexion"==t.mode?s("h2",{staticClass:"formulaire__titre"},[t._v("Connexion")]):t._e(),"connexion"==t.mode?s("p",{staticClass:"formulaire__question"},[t._v("Vous n'êtes pas inscrit ? "),s("span",{staticClass:"formulaire__question--change",on:{click:t.switchRegister}},[t._v("Créer un compte")])]):t._e(),"register"==t.mode?s("div",{staticClass:"formulaire__name"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.prenom,expression:"prenom"}],staticClass:"neo-inverse input",attrs:{required:"",type:"text",placeholder:"Prénom"},domProps:{value:t.prenom},on:{input:function(e){e.target.composing||(t.prenom=e.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.nom,expression:"nom"}],staticClass:"neo-inverse input",attrs:{required:"",type:"text",placeholder:"Nom"},domProps:{value:t.nom},on:{input:function(e){e.target.composing||(t.nom=e.target.value)}}})]):t._e(),s("div",{staticClass:"formulaire__identifiant"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"neo-inverse input",attrs:{required:"",type:"mail",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("div",{staticClass:"formulaire__identifiant__password"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],ref:"inputPassword",staticClass:"neo-inverse input",attrs:{required:"",type:"password",placeholder:"Mot de passe"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("div",{staticClass:"formulaire__identifiant__password__eye"},[0==t.showPasswordIcon?s("div",{staticClass:"formulaire__identifiant__password__eye__icon",on:{click:t.showPassword}},[s("img",{staticClass:"formulaire__identifiant__password__eye__icon--close",attrs:{src:a("b675"),alt:""}})]):t._e(),1==t.showPasswordIcon?s("div",{staticClass:"formulaire__identifiant__password__eye__icon",on:{click:t.maskPassword}},[s("img",{staticClass:"formulaire__identifiant__password__eye__icon--open",attrs:{src:a("95c6"),alt:""}})]):t._e()])]),"register"==t.mode?s("button",{staticClass:"formulaire__identifiant__submit",attrs:{id:"neoButton",type:"button",value:"S'inscrire"}},[s("div",{staticClass:"formulaire__identifiant__submit__self",on:{click:function(e){return e.target!==e.currentTarget?null:t.toRegister.apply(null,arguments)}}}),"loading"==t.status?s("span",[t._v("Inscription en cours ...")]):t._e(),"normal"==t.status?s("span",[t._v("S'inscrire")]):t._e(),"create"==t.status?s("span",[t._v("Votre compte à été crée !")]):t._e()]):t._e(),"connexion"==t.mode?s("button",{staticClass:"formulaire__identifiant__submit",attrs:{id:"neoButton",type:"button",value:"Se connecter"}},[s("div",{staticClass:"formulaire__identifiant__submit__self",on:{click:function(e){return e.target!==e.currentTarget?null:t.toConnect.apply(null,arguments)}}}),"loading"==t.status?s("span",[t._v("Connexion en cours ...")]):t._e(),"normal"==t.status?s("span",[t._v("Se connecter")]):t._e()]):t._e(),"connexion"==t.mode?s("div",{staticClass:"formulaire__identifiant__auto"},[s("input",{staticClass:"neo formulaire__identifiant__auto__checkbox",attrs:{name:"autoConnect",id:"autoConnect",type:"checkbox"},on:{change:t.longConnexion}}),s("label",{staticClass:"formulaire__identifiant__auto__label",attrs:{for:"autoConnect"}},[t._v("Maintenir la connexion")])]):t._e()]),s("Error",{class:{marge:"connexion"==t.mode}})],1)])])},h=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"top"},[s("img",{staticClass:"top__logo",attrs:{src:a("08b2"),alt:"Logo de Groupomania"}}),s("div",{staticClass:"top__separateur neo-inverse neo-press"})])}],v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1==t.errorAlert?a("div",{staticClass:"error"},[a("div",{staticClass:"error_restrict"},[a("div",{staticClass:"error__restrict__icon",on:{click:t.quitError}},[a("i",{staticClass:"error__restrict__icon--croix fas fa-times"})])]),a("span",{staticClass:"error__text"},[t._v(t._s(t.errorText))])]):t._e()},g=[],C=a("5530"),b={name:"Error",computed:Object(C["a"])({},Object(_["b"])({errorAlert:"errorAlert",errorText:"errorText"})),methods:{
//! Fonction qui permet de masquer l'erreur
quitError:function(){this.$store.commit("DESACTIVE_ERROR")}}},x=b,y=(a("81ab"),Object(c["a"])(x,v,g,!1,null,"3d07ab7a",null)),E=y.exports,I={name:"Home",components:{Error:E},data:function(){return{
//! Variable qui décide du type d'affichage (inscription ou connexion)
mode:"connexion",
//! Variable qui décide du message inscrit dans le bouton (normal, loading, create)
status:"normal",
//! Emsemble de variable qui contiennent les informations du visiteur dans le formulaire
prenom:"",nom:"",email:"",password:"",
//! Variable qui témoigne si le bouton "maintenir la connexion" à été cochée
autoConnect:!1,
//! Variable qui décide du type d'affichage de l'icône (voir le mot de passe)
showPasswordIcon:!1}},methods:{
//! Fonction de mettre à jour un témoin (maintien de la connexion)
longConnexion:function(t){this.autoConnect=t.target.checked},
//! Fonction qui permet d'afficher le mot de passe
showPassword:function(){this.$refs.inputPassword.type="text",this.showPasswordIcon=!0},
//! Fonction qui permet de masquer le mot de passe
maskPassword:function(){this.$refs.inputPassword.type="password",this.showPasswordIcon=!1},
//! Fonction qui permet de se connecter
toConnect:function(){var t=this;this.$axios.post("account/login",{email:this.email,password:this.password}).then((function(e){t.$store.commit("DESACTIVE_ERROR"),t.status="loading";var a=e.data.userId,s=e.data.token,i=e.data.firstConnection;t.$axios.defaults.headers.common["Authorization"]="Bearer "+s,1==t.autoConnect?(localStorage.setItem("userId",a),localStorage.setItem("token",s)):(sessionStorage.setItem("userId",a),sessionStorage.setItem("token",s)),setTimeout(function(){0==i?this.$router.push({name:"Info",params:{id:a}}):this.$router.push({name:"Multimedia"})}.bind(t),3e3)})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))},
//! Fonction qui permet de s'enrengistrer
toRegister:function(){var t=this;this.$axios.post("account/signup",{email:this.email,password:this.password,nom:this.nom,prenom:this.prenom}).then((function(){t.$store.commit("DESACTIVE_ERROR"),t.status="loading",setTimeout(function(){this.status="create",setTimeout(function(){this.status="normal",this.mode="connexion"}.bind(this),2e3)}.bind(t),2e3)})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))},
//! Fonction qui réinitialise toutes les variables
dataReset:function(){this.$store.commit("DESACTIVE_ERROR"),this.status="normal",this.email="",this.password="",this.nom="",this.prenom="",this.email="",this.password=""},
//! Fonction qui réinitialise toutes les variables et passe en mode "inscription"
switchRegister:function(){this.dataReset(),this.mode="register"},
//! Fonction qui réinitialise toutes les variables et passe en mode "connexion"
switchConnexion:function(){this.dataReset(),this.mode="connexion"}},
//! Avant la création de la page, on applique la logique relative au "maintien de connexion"
beforeMount:function(){var t=this;this.$store.dispatch("majUserId").then((function(){var e=t.$store.state.userId;null!==e&&void 0!==e&&""!==e?t.$router.push({name:"Multimedia"}):(localStorage.clear(),sessionStorage.clear())})).catch((function(){localStorage.clear(),sessionStorage.clear()}))},
//! Quand la page est monté ...
mounted:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},w=I,$=(a("2d3a"),Object(c["a"])(w,p,h,!1,null,"64f08726",null)),k=$.exports,P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"center"},[a("div",{staticClass:"info"},[a("h1",{staticClass:"info__titre"},[t._v("Compléter vos informations")]),a("div",{staticClass:"neo-inverse info__avatar"},[a("div",{staticClass:"info__avatar__list"},t._l(t.list_avatar,(function(e,s){return a("div",{key:s,staticClass:"info__avatar__list__item"},[a("img",{attrs:{src:e,alt:"Avatar"}}),a("div",{staticClass:"info__avatar__list__item__shadow",attrs:{"data-avatar":e,name:"focus"},on:{click:t.getAvatar}})])})),0)]),a("div",{staticClass:"info__details"},[a("div",{staticClass:"info__details__name"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.firstName,expression:"firstName"}],staticClass:"neo-inverse",attrs:{type:"text",placeholder:"Prénom"},domProps:{value:t.firstName},on:{input:function(e){e.target.composing||(t.firstName=e.target.value)}}}),a("div",{staticClass:"info__details__name__avatar"},[a("img",{attrs:{src:t.avatar,alt:"Avatar par défaut"}}),a("div",{staticClass:"info__details__name__avatar__shadow"})]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.lastName,expression:"lastName"}],staticClass:"neo-inverse",attrs:{type:"text",placeholder:"Nom"},domProps:{value:t.lastName},on:{input:function(e){e.target.composing||(t.lastName=e.target.value)}}})]),a("div",{staticClass:"info__details__bio"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.bio,expression:"bio"}],staticClass:"neo-inverse",attrs:{name:"textArea",maxlength:"150",rows:"4",placeholder:"Biographie"},domProps:{value:t.bio},on:{input:[function(e){e.target.composing||(t.bio=e.target.value)},t.maxLengthBio]}}),t._m(0)]),0==t.desactiveButton?a("button",{on:{click:t.updateInfo}},[t._v(t._s(t.buttonText))]):t._e(),1==t.desactiveButton?a("button",[t._v(t._s(t.buttonText))]):t._e()]),a("router-link",{staticClass:"info__after",attrs:{to:{name:"Multimedia"}}},[a("span",[t._v("Je ferais ça plus tard")])]),a("Error",{staticClass:"info__erreur"})],1)])},N=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"info__details__bio__counter"},[a("span",{attrs:{name:"textAreaLength"}},[t._v("0")]),a("span",[t._v("/150")]),a("i",{staticClass:"info__details__bio__counter__icon fas fa-text-width fa-sm"})])}],B={name:"Info",components:{Error:E},data:function(){return{
//! Variable qui contient la liste des avatars que l'utilisateur peut choisir
list_avatar:[],
//! Emsemble de variable qui contiennent les informations de l'utilisateur dans le formulaire
bio:"",firstName:"",lastName:"",avatar:"",
//! Variable qui contient le texte du bouton de soumission
buttonText:"Enrengistrer et continuer",
//! Variable qui permet de désactiver l'évènement sur le bouton de soummission
desactiveButton:!1}},methods:{
//! Fonction qui permet de compter et d'indiquer en temps réel le nombre de caractères de la bio
maxLengthBio:function(t){t.target.parentElement.children[1].children[0].textContent=t.target.value.length},
//! Fonction qui pré-affiche l'avatar choisie par l'utilisateur
getAvatar:function(t){this.avatar=t.target.dataset.avatar},
//! Fonction qui permet à l'utilisateur de modifier ses informations
updateInfo:function(){var t=this,e=this.avatar,a=this.bio,s=this.firstName,i=this.lastName,n=this.$route.params.id;this.$axios.put("/user/".concat(n),{avatar:e,bio:a,firstName:s,lastName:i}).then((function(){t.desactiveButton=!0,t.$store.commit("DESACTIVE_ERROR"),t.buttonText="Enrengistrement en cours ...",setTimeout(function(){this.$router.push({name:"Multimedia"})}.bind(t),2e3)})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))}},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))},
//! Une fois que la page est monté ...
beforeMount:function(){var t=this;
//! On exécute la fonction Neo
this.$store.dispatch("neo"),//! On récupère la liste d'avatar et les informations de l'utilisateur
this.$axios.get("/asset/avatar").then((function(e){t.list_avatar=e.data;var a=t.$route.params.id;t.$axios.get("user/info/".concat(a)).then((function(e){t.firstName=e.data.info[0].firstName,t.lastName=e.data.info[0].lastName,t.bio=e.data.info[0].bio,t.avatar=e.data.info[0].avatar})).then((function(){var t=document.getElementsByName("textArea"),e=document.getElementsByName("textAreaLength");e[0].textContent=t[0].value.length})).catch((function(){t.$router.push({name:"Multimedia"})}))})).catch((function(t){console.log(t)}))},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},R=B,T=(a("0882"),Object(c["a"])(R,P,N,!1,null,"5488b75b",null)),A=T.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"profil"},[a("NavBar",{staticClass:"profil__navbar",attrs:{mode:"account"}}),a("div",{staticClass:"profil__contain"},[a("Portrait",{attrs:{mode:"Profil"}})],1)],1)},S=[],L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{attrs:{id:"navbar"}},[s("div",{staticClass:"neo navbar"},[s("img",{staticClass:"navbar__logo",attrs:{src:a("08b2"),alt:"Logo de groupomania"}}),"accueil"==t.mode?s("div",{staticClass:"navbar__explorer"},[s("ul",{staticClass:"navbar__explorer__list"},[s("li",[s("router-link",{attrs:{to:"/Multimedia"}},[t._v("Multimédia")])],1),s("li",[s("router-link",{attrs:{to:"/Agora"}},[t._v("Agora")])],1),s("li",[s("router-link",{attrs:{to:"/Friends"}},[t._v("Camarade")])],1)])]):t._e(),"accueil"==t.mode?s("div",{staticClass:"navbar__account"},[s("div",{staticClass:"navbar__account__avatar"},[s("div",{staticClass:"navbar__account__avatar__case"},[s("button",{staticClass:"navbar__account__avatar__case__button",on:{click:t.toggleControl}},[s("img",{attrs:{src:t.avatar,alt:"Avatar de profil"}}),s("span",[t._v(t._s(t.firstName))])])])]),1==t.toggle?s("div",{staticClass:"navbar__account__active"},[s("router-link",{attrs:{to:{name:"Profil",params:{id:t.userId}}}},[s("div",{staticClass:"navbar__account__active__item"},[s("span",[t._v("Mon compte")])])]),s("div",{staticClass:"navbar__account__active__item",on:{click:t.deconnect}},[s("span",[t._v("Déconnexion")])])],1):t._e()]):t._e(),"accueil"==t.mode?s("div",{staticClass:"navbar__mobile"},[s("div",{staticClass:"navbar__mobile__button"},[s("div",{staticClass:"navbar__mobile__button__self",on:{click:function(e){return e.target!==e.currentTarget?null:t.toggleMobileControl.apply(null,arguments)}}}),s("i",{staticClass:"navbar__mobile__button__icon fas fa-stream fa-lg",attrs:{name:"mobile-desactive"}}),s("i",{staticClass:"navbar__mobile__button__icon fas fa-times fa-lg",staticStyle:{display:"none"},attrs:{name:"mobile-active"}})])]):t._e(),"account"==t.mode&&1==t.us?s("div",{staticClass:"navbar__profil",on:{click:t.deleteUser}},[s("span",{staticClass:"navbar__profil__text"},[t._v(t._s(t.text_delete))]),s("i",{staticClass:"navbar__profil__icon fas fa-trash fa-lg"})]):t._e(),"account"==t.mode&&1==t.us?s("div",{staticClass:"navbar__profil"},[s("router-link",{attrs:{to:{name:"Info",params:{id:t.userId}}}},[s("span",{staticClass:"navbar__profil__text"},[t._v(t._s(t.text_update))]),s("i",{staticClass:"navbar__profil__icon fas fa-user-edit fa-lg"})])],1):t._e(),"account"==t.mode?s("div",{staticClass:"navbar__back"},[s("router-link",{attrs:{to:{name:"Multimedia"}}},[s("span",{staticClass:"navbar__back__text"},[t._v("Retour à l'accueil")]),s("i",{staticClass:"navbar__back__icon fas fa-long-arrow-alt-right fa-lg"})])],1):t._e()]),1==t.toggle_mobile&&"accueil"==t.mode?s("div",{staticClass:"mobile"},[s("div",{staticClass:"mobile__case"},[s("span",[s("router-link",{attrs:{to:"/Multimedia"}},[t._v("Multimédia")])],1),s("span",[s("router-link",{attrs:{to:"/Agora"}},[t._v("Agora")])],1),s("span",[s("router-link",{attrs:{to:"/Friends"}},[t._v("Camarade")])],1)]),s("div",{staticClass:"mobile__case"},[s("span",[s("router-link",{attrs:{to:{name:"Profil",params:{id:t.userId}}}},[t._v("Mon compte")])],1),s("span",{on:{click:t.deconnect}},[t._v("Déconnexion")])])]):t._e(),"account"==t.mode&&1==t.us?s("div",{staticClass:"profil"},["account"==t.mode&&1==t.us?s("div",{staticClass:"profil__item",on:{click:t.deleteUser}},[s("span",{staticClass:"profil__item__text"},[t._v(t._s(t.text_delete))]),s("i",{staticClass:"profil__item__icon fas fa-trash fa-lg"})]):t._e(),"account"==t.mode&&1==t.us?s("div",{staticClass:"profil__item"},[s("router-link",{attrs:{to:{name:"Info",params:{id:t.userId}}}},[s("span",{staticClass:"profil__item__text"},[t._v(t._s(t.text_update))]),s("i",{staticClass:"profil__item__icon fas fa-user-edit fa-lg"})])],1):t._e()]):t._e()])},M=[],D=(a("d3b7"),a("25f0"),{name:"NavBar",props:{
//! Propriété qui permet de décidé du type d'affichage (Accueil/Account)
mode:{type:String,required:!0}},data:function(){return{
//! Ensemble de variables qui contiennent des informations récupérées à partir de l'API sur l'uilisateur
avatar:"",firstName:"",userId:"",
//! Variable qui permet d'afficher les boutons de gestion de compte si la page profil appartient à l'utilisateur
us:!1,
//! Ensemble de variables qui contiennent les textes des boutons de gestion de compte
text_delete:"",text_update:"",
//! Variable qui connaît l'état du bouton "Mon compte" (Accueil)
toggle:!1,
//! Variable qui connaît l'état du bouton "Menu tiroir" (Accueil)
toggle_mobile:!1,
//! Variable qui contient le privilège de l'utilisateur (1 par défaut)
privilege:1}},methods:{
//! Fonction qui met à jour la variable d'état du bouton "Mon compte" (Accueil)
toggleControl:function(){0==this.toggle?this.toggle=!0:this.toggle=!1},
//! Fonction qui met à jour la variable d'état du bouton "Menu tiroir" (Accueil)
toggleMobileControl:function(){var t=document.getElementsByName("mobile-desactive"),e=document.getElementsByName("mobile-active");0==this.toggle_mobile?(this.toggle_mobile=!0,t[0].style.display="none",e[0].style.display="block"):1==this.toggle_mobile&&(this.toggle_mobile=!1,t[0].style.display="block",e[0].style.display="none")},
//! Fonction qui permet de déconnecter un utilisateur
deconnect:function(){var t=this;this.$dialog.confirm("Êtes-vous sûr de vouloir vous déconnecter ?").then((function(e){localStorage.clear(),sessionStorage.clear(),t.$router.push({name:"Connexion"}),e.close()})).catch((function(){t.toggle=!1}))},
//! Fonction qui sert uniquement à la fonction ci dessous !
textConfirmCustom:function(){return this.privilege>1&&this.$route.params.id!==this.$store.state.userId.toString()?"supprimer son compte":"supprimer votre compte"},
//! Fonction qui permet de supprimer un utilisateur
deleteUser:function(){var t=this,e=this.textConfirmCustom();this.$dialog.confirm("Êtes-vous sûr de vouloir ".concat(e," ?")).then((function(e){var a=t.$route.params.id;t.$axios.delete("/user/".concat(a)).then((function(){1==t.privilege||t.$route.params.id==t.$store.state.userId?(localStorage.clear(),sessionStorage.clear(),t.$router.push({name:"Connexion"}),e.close()):(t.$router.push({name:"Friends"}),e.close())})).catch((function(t){console.log(t)}))}))}},
//! Avant que la page soit monté ...
beforeMount:function(){var t=this,e=this.$store.state.userId;//! On récupère les informations de l'utilisateur inscrit dans la barre de navigation
this.$axios.get("user/info/".concat(e)).then((function(e){t.avatar=e.data.info[0].avatar,t.firstName=e.data.info[0].firstName,t.privilege=e.data.privilege})).then((function(){"accueil"==t.mode?t.userId=t.$store.state.userId:"account"==t.mode&&(t.userId=t.$route.params.id)})).then((function(){(e==t.$route.params.id||t.privilege>1)&&(t.us=!0),t.privilege>1&&t.$route.params.id!==t.$store.state.userId.toString()?(t.text_delete="Supprimer son compte",t.text_update="Modifier ses informations"):(t.text_delete="Supprimer mon compte",t.text_update="Modifier mes informations")})).catch((function(t){console.log(t)}))}}),j=D,q=(a("5cd8"),Object(c["a"])(j,L,M,!1,null,"4e6bc520",null)),V=q.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"portrait"},[1==t.noPost?a("div",{staticClass:"no-post"},[a("span",{staticClass:"no-post__text"},[t._v(t._s(t.noPostText))]),a("i",{staticClass:"no-post__icon far fa-grin-beam-sweat"})]):t._e(),t._l(t.user,(function(e,s){return a("div",{key:s,staticClass:"neo portrait__user",class:{user_big:t.profil}},["Friends"==t.mode?a("router-link",{staticClass:"link",attrs:{to:{name:"Profil",params:{id:e.userId}}}}):t._e(),a("div",{staticClass:"portrait__user__main"},[a("div",{staticClass:"portrait__user__main__image"},[a("div",{staticClass:"portrait__user__main__image__shadow"}),a("img",{staticClass:"portrait__user__main__image__avatar",attrs:{src:e.avatar,alt:"avatar de profil"}})]),a("div",{staticClass:"portrait__user__main__info"},[a("div",{staticClass:" portrait__user__main__info__name"},[a("div",{staticClass:" portrait__user__main__info__name__cache"},[a("span",[t._v(t._s(e.firstName)+" "+t._s(e.lastName))])])]),a("div",{staticClass:"portrait__user__main__info__bio"},[a("div",{staticClass:"portrait__user__main__info__bio__cache"},[a("span",{staticClass:"portrait__user__main__info__bio__cache__text",class:{text_friends:t.friends}},[t._v(t._s(e.bio))])])])]),a("div",{staticClass:"portrait__user__main__note"},[a("div",{staticClass:"portrait__user__main__note__focus"},[a("div",{staticClass:"portrait__user__main__note__focus__elements"},[a("span",[t._v(t._s(e.multimedia))]),a("div",{staticClass:"portrait__user__main__note__focus__elements__shadow"})]),a("span",{staticClass:"portrait__user__main__note__focus__type"},[t._v("Multimédia")])]),a("div",{staticClass:"portrait__user__main__note__image"},[a("div",{staticClass:"portrait__user__main__note__image__shadow"}),a("img",{staticClass:"portrait__user__main__note__image__avatar",attrs:{src:e.avatar,alt:"avatar de profil"}})]),a("div",{staticClass:"portrait__user__main__note__focus"},[a("div",{staticClass:"portrait__user__main__note__focus__elements"},[a("span",[t._v(t._s(e.forum))]),a("div",{staticClass:"portrait__user__main__note__focus__elements__shadow"})]),a("span",{staticClass:"portrait__user__main__note__focus__type"},[t._v("Agora")])])])]),"Profil"==t.mode?a("div",{staticClass:"neo-inverse portrait__user__score"},[a("div",{staticClass:"portrait__user__score__glass"}),a("div",{staticClass:"portrait__user__score__item"},[a("span",[t._v(t._s(e.score_reaction))]),a("span",[t._v("Score de réactions")])]),a("div",{staticClass:"portrait__user__score__item"},[a("span",[t._v(t._s(e.score_participation))]),a("span",[t._v("Score de participations")])])]):t._e(),"Profil"==t.mode?a("div",{staticClass:"portrait__user__date"},[a("span",[t._v("Inscrit depuis "+t._s(e.dateCreation))])]):t._e()],1)}))],2)},F=[],H={name:"Portrait",data:function(){return{
//! Variable qui contient l'ensemble des items
user:[],
//! Ensemble de variables qui décide du type d'affichage (Profil et Friends)
profil:!1,friends:!1,
//! Variable qui permet d'activer/désactiver le message indiquant qu'il n'y a pas de publication (camarade)
noPost:!1,
//! Variable qui vont constituer le texte à l'intérieur du message
noPostText:"Pour l'instant, vous êtes le seul inscrit ..."}},props:{
//! Propriété qui permet de décidé du type d'affichage (Profil/Friends)
mode:{type:String,required:!0}},methods:{
//! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props FOCUS)
adresseAPI:function(){var t=this.$store.state.userId,e=this.$route.params.id;return"Friends"==this.mode?"user/friends/".concat(t):"Profil"==this.mode?"user/profil/".concat(e):void 0},
//! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props FOCUS)
buildClass:function(){"Friends"==this.mode?this.friends=!0:"Profil"==this.mode&&(this.profil=!0)}},
//! Une fois que la page est monté ...
mounted:function(){var t=this;
//! On exécute la fonction Neo
this.$store.dispatch("neo");//! On applique le rendu de l'affichage des items
var e=this.adresseAPI();this.$axios.get(e).then((function(e){t.user=e.data})).then((function(){t.buildClass()})).catch((function(){"Friends"==t.mode&&(t.noPost=!0)}))},updated:function(){this.$store.dispatch("neo")}},J=H,z=(a("0924"),Object(c["a"])(J,U,F,!1,null,"781ca9f8",null)),G=z.exports,W={name:"Profil",components:{Portrait:G,NavBar:V},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))}},K=W,Q=(a("2fb2"),Object(c["a"])(K,O,S,!1,null,"de7a9a04",null)),X=Q.exports,Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"friends"},[a("NavBar",{staticClass:"friends__navbar",attrs:{mode:"accueil"}}),a("div",{staticClass:"friends__contain"},[a("Portrait",{attrs:{mode:"Friends"}})],1)],1)},Z=[],tt={name:"Friends",components:{Portrait:G,NavBar:V},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))}},et=tt,at=(a("cd0d"),Object(c["a"])(et,Y,Z,!1,null,"0655e138",null)),st=at.exports,it=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"multimedia"},[a("NavBar",{staticClass:"multimedia__navbar",attrs:{mode:"accueil"}}),a("Publication",{staticClass:"multimedia__publication",attrs:{mode:"Multimedia"},on:{"blur-control":t.updateBlur}}),a("div",{staticClass:"multimedia__contain",class:{shadow:t.blur}},[a("NavJuge",{staticClass:"multimedia__contain__nav",attrs:{preference:t.choice,direction:"Multimedia"},on:{navChoice:t.get_Preference}}),a("Media",{staticClass:"multimedia__contain__media",attrs:{preference:t.choice,direction:"MultimediaID",focus:!1}})],1)],1)},nt=[],ot=(a("3ca3"),a("ddb0"),a("2b3d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"nav"},[a("router-link",{attrs:{to:{name:t.direction,query:{preference:t.preference}}}},[a("li",{staticClass:"choice"},[a("span",{staticClass:"choice__text no_active",attrs:{name:"choice","data-id":"1"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choice.apply(null,arguments)}}},[t._v("Le fil d'actualité")]),a("span",{staticClass:"choice__icon no_active",attrs:{name:"choice-mobile"}},[a("div",{staticClass:"choice__icon__self",attrs:{"data-id":"1","data-self":"true"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choiceMobile.apply(null,arguments)}}}),a("i",{staticClass:"fas fa-newspaper fa-lg"})])])]),a("router-link",{attrs:{to:{name:t.direction,query:{preference:t.preference}}}},[a("li",{staticClass:"choice"},[a("span",{staticClass:"choice__text no_active",attrs:{name:"choice","data-id":"2"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choice.apply(null,arguments)}}},[t._v("Mes publications")]),a("span",{staticClass:"choice__icon no_active",attrs:{name:"choice-mobile"}},[a("div",{staticClass:"choice__icon__self",attrs:{"data-id":"2","data-self":"true"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choiceMobile.apply(null,arguments)}}}),a("i",{staticClass:"fas fa-home fa-lg"})])])]),a("router-link",{attrs:{to:{name:t.direction,query:{preference:t.preference}}}},[a("li",{staticClass:"choice"},[a("span",{staticClass:"choice__text no_active",attrs:{name:"choice","data-id":"3"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choice.apply(null,arguments)}}},[t._v("Mes préférés")]),a("span",{staticClass:"choice__icon no_active",attrs:{name:"choice-mobile"}},[a("div",{staticClass:"choice__icon__self",attrs:{"data-id":"3","data-self":"true"},on:{click:function(e){return e.target!==e.currentTarget?null:t.choiceMobile.apply(null,arguments)}}}),a("i",{staticClass:"fas fa-crown fa-lg"})])])])],1)}),rt=[],ct=(a("a9e3"),{name:"NavJuge",props:{
//! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus"
preference:{type:Number,required:!0},
//! Propriété qui permet de donner des adresses aux différents liens (Agora ou Multimédia)
direction:{type:String,required:!0}},methods:{
//! Fonction qui met à jour la préférence de l'utilisateur et le bouton focus (Fil d'actualité, Mes Publications, Mes préférées) [Desktop]
choice:function(t){this.$emit("navChoice",{choice:parseInt(t.target.dataset.id)});for(var e=document.getElementsByName("choice"),a=0;a<e.length;a++)e[a].classList.remove("active"),e[a].classList.add("no_active");t.target.dataset.self,t.target.classList.remove("no_active"),t.target.classList.add("active")},
//! Fonction qui met à jour la préférence de l'utilisateur et le bouton focus (Fil d'actualité, Mes Publications, Mes préférées) [Mobile]
choiceMobile:function(t){this.$emit("navChoice",{choice:parseInt(t.target.dataset.id)});for(var e=document.getElementsByName("choice-mobile"),a=0;a<e.length;a++)e[a].classList.remove("active"),e[a].classList.add("no_active");t.target.dataset.self,t.target.parentElement.classList.remove("no_active"),t.target.parentElement.classList.add("active")}},
//! Une fois que la pge est monté ...
mounted:function(){
//! On met à jour le bouton focus [Desktop]
var t=document.getElementsByName("choice");t[this.preference-1].classList.remove("no_active"),t[this.preference-1].classList.add("active");//! On met à jour le bouton focus [Mobile]
var e=document.getElementsByName("choice-mobile");e[this.preference-1].classList.remove("no_active"),e[this.preference-1].classList.add("active")}}),lt=ct,ut=(a("d168"),Object(c["a"])(lt,ot,rt,!1,null,"6ed25e8b",null)),_t=ut.exports,mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[1==t.noPost?a("div",{staticClass:"no-post"},[a("span",{staticClass:"no-post__text"},[t._v(t._s(t.noPostText))]),a("i",{staticClass:"no-post__icon far fa-grin-beam-sweat"})]):t._e(),t._l(t.data,(function(e,s){return a("div",{key:s,staticClass:"neo media",class:{media_small:t.small,media_big:t.big},attrs:{name:"media",id:e.postId}},[a("div",{staticClass:"media__edit"},[a("div",{staticClass:"media__edit__more",attrs:{name:"deletePost","data-mypost":e.my_post}}),a("div",{staticClass:"media__edit__self",attrs:{name:"deletePost","data-mypost":e.my_post,"data-active":"false"},on:{click:function(e){return e.target!==e.currentTarget?null:t.toggleButtonDelete.apply(null,arguments)}}}),a("div",{staticClass:"media__edit__delete"},[a("div",{staticClass:"media__edit__delete__self",attrs:{"data-id":e.postId},on:{click:function(e){return e.target!==e.currentTarget?null:t.deletePost.apply(null,arguments)}}}),a("i",{staticClass:"fas fa-trash-alt fa-lg"})])]),a("div",{staticClass:"media__post",class:{post_small:t.small,post_big:t.big},attrs:{name:"mediaBlock"}},[a("div",{staticClass:"media__post__shadow"})]),a("div",{staticClass:"media__influence"},[a("div",{staticClass:"media__influence__button"},[a("button",{staticClass:"media__influence__button__item",class:{button_small:t.small,button_big:t.big},attrs:{name:"buttonLikes","data-like":e.my_like,"data-id":e.postId}},[a("div",{staticClass:"media__influence__button__item__self",attrs:{"data-position":e.position},on:{click:function(e){return e.target!==e.currentTarget?null:t.likePost.apply(null,arguments)}}}),a("i",{staticClass:"media__influence__button__item__icon fas fa-hand-spock fa-lg"})]),0==t.focus?a("router-link",{class:{button_small:t.small},attrs:{to:{name:t.direction,params:{id:e.postId},query:{comments:!0,preference:t.preference}}}},[a("button",{staticClass:"media__influence__button__item",attrs:{name:"buttonComments","data-comments":e.my_comments}},[a("i",{staticClass:"media__influence__button__item__icon fas fa-comment fa-lg"})])]):t._e()],1),a("router-link",{attrs:{to:{name:"Profil",params:{id:e.userId}}}},[a("div",{staticClass:"media__influence__author"},[a("img",{staticClass:"avatar",attrs:{src:e.avatar,alt:"Avatar de profil"}}),a("span",{staticClass:"media__influence__author__name"},[t._v(t._s(e.firstName)+"."+t._s(e.lastName))])])]),a("div",{staticClass:"media__influence__note"},[a("div",{staticClass:"media__influence__note__item"},[a("div",{staticClass:"media__influence__note__item__text"},[a("span",{attrs:{name:"totalLikes"}},[t._v(t._s(e.likes))]),t._m(0,!0)]),a("div",{staticClass:"media__influence__note__item__text"},[a("span",{attrs:{name:"totalComments"}},[t._v(t._s(e.comments))]),t._m(1,!0)])])])],1),a("div",{staticClass:"media__date"},[a("span",[t._v("Il y a "+t._s(e.datePost))])]),a("div",{staticClass:"media__legend"},[a("span",[t._v(t._s(e.legend))])]),a("div",{staticClass:"media__separateur"}),a("div",{staticClass:"media__reaction",class:{reaction_small:t.small,reaction_big:t.big}},[a("div",{attrs:{id:"reaction",name:"reactionBlock"}},t._l(e.commentsList,(function(e,s){return a("div",{key:s,staticClass:"media__reaction__view",attrs:{name:"comments","data-commentsId":e.commentsId,"data-myComments":e.my_comments}},[a("div",{staticClass:"media__reaction__view__comments",class:{comments_small:t.small,comments_big:t.big}},[a("router-link",{staticClass:"media__reaction__view__comments__name",attrs:{to:{name:"Profil",params:{id:e.userId}}}},[a("img",{staticClass:"avatar",attrs:{src:e.avatar,alt:"Avatar de profil"}}),a("span",{staticClass:"media__reaction__view__comments__name--user"},[t._v(t._s(e.firstName)+"."+t._s(e.lastName)+" :")])]),a("span",{staticClass:"media__reaction__view__comments__phrase",class:{phrase_small:t.small}},[t._v(t._s(e.reaction))])],1),a("div",{staticClass:"media__reaction__view__opt"},[a("span",{staticClass:"media__reaction__view__opt__date"},[t._v(t._s(e.dateComments))]),a("button",{staticClass:"media__reaction__view__opt__delete"},[a("div",{staticClass:"media__reaction__view__opt__delete__self",attrs:{"data-commentsId":e.commentsId},on:{click:t.deleteComments}}),a("i",{staticClass:"media__reaction__view__opt__delete__icon fas fa-trash-alt fa-sm"})])])])})),0),0==t.focus?a("router-link",{staticClass:"media__reaction__more",attrs:{to:{name:t.direction,params:{id:e.postId},query:{comments:!1,preference:t.preference}}}},[a("button",{staticClass:"media__reaction__more__button"},[a("i",{staticClass:"fas fa-caret-down"})])]):t._e()],1),1==t.focus?a("div",{staticClass:"media__separateur"}):t._e(),1==t.focus?a("form",{staticClass:"media__write",on:{submit:function(e){return e.preventDefault(),t.commentPost.apply(null,arguments)}}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comments,expression:"comments"}],attrs:{name:"textArea",rows:"2"},domProps:{value:t.comments},on:{input:function(e){e.target.composing||(t.comments=e.target.value)}}}),t._m(2,!0)]):t._e(),1==t.focus?a("Error",{staticClass:"media__error"}):t._e()],1)}))],2)},dt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._v(" appréciation"),a("span",{attrs:{name:"textLikes"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._v(" commentaire"),a("span",{attrs:{name:"textComments"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{attrs:{type:"submit"}},[a("i",{staticClass:"fas fa-seedling fa-lg"})])}],ft=(a("c96a"),a("1393"),a("caad"),{name:"Media",components:{Error:E},data:function(){return{
//! Variable qui contient l'ensemble des posts
data:[],
//! Ensemble de variables qui décide du type d'affichage (Scroll et Focus)
small:!1,big:!1,
//! Variable qui contient le commentaire du visiteur dans le formulaire
comments:"",
//! Variable qui permet d'activer/désactiver le message indiquant qu'il n'y a pas de publication
noPost:!1,
//! Ensemble de variables qui vont constituer le texte à l'intérieur du message
noPostText:"",noPostTextActuality:"Le fil d'actualité est vide ...",noPostTextMyPost:"Vous n'êtes l'auteur d'aucune publication ...",noPostTextFavori:"Vous n'avez malheureusement pas de préférence ..."}},props:{
//! Propriété qui permet de donner des adresses aux différents liens (AgoraID ou MultimediaID)
direction:{type:String,required:!0},
//! Propriété qui permet de déterminer la requête API dans la récupération des posts et le type d'affichage du post
focus:{type:Boolean,required:!0},
//! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus" 
preference:{type:Number}},methods:{
//! Fonction qui permet de faire apparaître/disparaître le toggle du bouton de suppression de post
toggleButtonDelete:function(t){"false"==t.target.dataset.active?(t.target.parentElement.children[2].style.display="flex",t.target.dataset.active="true"):"true"==t.target.dataset.active&&(t.target.parentElement.children[2].style.display="none",t.target.dataset.active="false")},
//! Fonction qui permet de supprimer un post
deletePost:function(t){var e=this;this.$dialog.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?").then((function(a){var s=t.target.dataset.id;e.$axios.delete("/multimedia/post/".concat(s)).then((function(){0==e.focus?(a.close(),document.location.reload()):1==e.focus&&(a.close(),e.$router.push({name:"Multimedia"}))})).catch((function(t){console.log(t)}))})).catch((function(){t.target.parentElement.style.display="none",t.target.parentElement.parentElement.children[1].dataset.active="false"}))},
//! Fonction qui permet de liker un post
likePost:function(t){var e=this.$store.state.userId,a=t.target.parentElement.dataset.id;this.$axios.post("/action/like",{postId:a,userId:e}).then((function(e){var a=t.target.dataset.position,s=e.data.likes,i=document.getElementsByName("buttonLikes")[a],n=document.getElementsByName("totalLikes")[a],o=document.getElementsByName("textLikes")[a];1==s?(i.classList.add("true-action"),i.classList.remove("false-action"),n.textContent="".concat(parseInt(n.textContent)+1)):(i.classList.remove("true-action"),i.classList.add("false-action"),n.textContent="".concat(parseInt(n.textContent)-1)),parseInt(n.textContent)>1?o.textContent="s":o.textContent=""})).catch((function(t){console.log(t)}))},
//! Fonction qui permet de commenter un post
commentPost:function(){var t=this;this.$store.commit("DESACTIVE_ERROR");var e=this.$route.params.id,a=this.$store.state.userId,s=this.comments;this.$axios.post("/action/",{postId:e,userId:a,reaction:s}).then((function(){document.location.reload()})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))},
//! Fonction qui permet de supprimer un commentaire de post
deleteComments:function(t){var e=this;this.$store.commit("DESACTIVE_ERROR");var a=t.target.dataset.commentsid;this.$axios.delete("/action/".concat(a)).then((function(){document.location.reload()})).catch((function(t){e.$store.commit("ACTIVE_ERROR",JSON.parse(t.request.response).message)}))},
//! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props FOCUS)
apiAdresse:function(){var t=this.focus;return 0==t?"/multimedia/recoverAll":"/multimedia/recoverOne"},
//! Fonction qui permet de changer le corps des requêtes (selon la view --> props FOCUS)
apiBody:function(){var t=this.focus,e=this.$store.state.userId,a=this.preference,s=this.$route.params.id;return 0==t?{userId:e,preference:a}:{userId:e,postId:s}},
//! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props FOCUS)
buildClass:function(){var t=this.focus;0==t?this.small=!0:this.big=!0},
//! Fonction qui permet de conjuguer les termes associés aux likes et aux commentaires
buildConjugaison:function(){for(var t=document.getElementsByName("media"),e=document.getElementsByName("totalLikes"),a=document.getElementsByName("textLikes"),s=document.getElementsByName("totalComments"),i=document.getElementsByName("textComments"),n=0;n<t.length;n++)parseInt(s[n].textContent)>1&&(i[n].textContent="s"),parseInt(e[n].textContent)>1&&(a[n].textContent="s")},
//! Fonction qui permet de rendre les boutons "likes" actif/désactif grâce aux keys "my_likes" de la réponse API
buildMyLike:function(){for(var t=document.getElementsByName("buttonLikes"),e=0;e<t.length;e++)1==t[e].dataset.like?(t[e].classList.add("true-action"),t[e].classList.remove("false-action")):(t[e].classList.remove("true-action"),t[e].classList.add("false-action"))},
//! Fonction qui permet de rendre les boutons "comments" actif/désactif grâce aux keys "my_comments" de la réponse API
buildMyComments:function(){for(var t=document.getElementsByName("buttonComments"),e=0;e<t.length;e++)if(parseInt(t[e].dataset.comments)>0){t[e].classList.add("true-action"),t[e].classList.remove("false-action");var a=document.createElement("div");a.setAttribute("class","media__influence__button__my-comments"),a.setAttribute("style","top: -8px; right: -8px; height: 20px;width: 20px;background-color: rgb(0, 0, 0);position: absolute;color: rgb(255, 255, 255);display: flex;justify-content: center;align-items: center;border-radius: 100%;font-weight: bold;font-size: 10px;"),a.textContent=parseInt(t[e].dataset.comments),t[e].appendChild(a)}else t[e].classList.remove("true-action"),t[e].classList.add("false-action")},
//! Fonction qui permet de faire apparaître les boutons de suppression de post (ADMIN ALL ACCESS)
buildButtonDeletePost:function(t){if(2!==t)for(var e=document.getElementsByName("deletePost"),a=0;a<e.length;a++)0==parseInt(e[a].dataset.mypost)&&(e[a].style.display="none")},
//! Fonction qui permet de faire apparaître les boutons de suppression de commentaire (ADMIN ALL ACCESS)
buildButtonDeleteComments:function(t){if(2!==t)for(var e=document.getElementsByName("comments"),a=0;a<e.length;a++)0==parseInt(e[a].dataset.mycomments)&&e[a].children[1].removeChild(e[a].children[1].children[1])},
//! Fonction qui permet de choisir les balises de fichiers <img> ou <vidéo> grâce aux keys "media" de la réponse API
buildBlockMedia:function(){for(var t=["jpg","png","gif"],e=["mp4"],a=this.data,s=document.getElementsByName("mediaBlock"),i=0;i<a.length;i++)if(1==t.includes(a[i].media.substr(-3))){var n=document.createElement("img");n.setAttribute("alt","Image de publication"),n.setAttribute("style","object-fit: cover; object-position: 50% 50%; width: 100%; height: 100%;"),n.setAttribute("src",a[i].media),s[i].appendChild(n)}else if(1==e.includes(a[i].media.substr(-3))){var o=document.createElement("video");o.setAttribute("style","object-fit: cover; object-position: 50% 50%; width: 100%; height: 100%;"),o.setAttribute("src",a[i].media),o.setAttribute("controls","controls"),o.setAttribute("preload","metadata"),s[i].appendChild(o)}},
//! Fonction qui permet d'inscrire un message dans la partie "réaction" et retirer le bouton "more" quand celle-ci est vide
buildBlockReaction:function(){for(var t=document.getElementsByName("reactionBlock"),e=0;e<t.length;e++)if(0==t[e].children.length){var a=document.createElement("span");a.textContent="Absence de commentaires",t[e].appendChild(a),t[e].classList.add("no-comments"),0==this.focus&&(t[e].parentElement.lastChild.style.display="none")}},
//! Fonction qui permet d'utiliser des comportements de direction par rapport aux paramètres des url (selon la view --> props FOCUS)
buildHistory:function(){var t=this.focus;if(1==t){var e=this.$router.history.current.query.comments;1==e?document.getElementsByName("textArea")[0].focus():0==e&&(window.location.hash="#reaction"),this.$route.params.id&&this.$emit("history",{history:this.$route.params.id});var a=new URL(document.location).searchParams,s=a.get("preference");null!==s&&this.$emit("preference",{prefer:parseInt(s)})}else if(this.$router.history.current.query.history){var i=this.$router.history.current.query.history;window.location.hash="#".concat(i)}},
//! Fonction qui entreprend une action en cas d'erreur pendant l'appel à l'API
catchDecision:function(){if(0==this.focus){switch(this.preference){case 1:this.noPostText=this.noPostTextActuality;break;case 2:this.noPostText=this.noPostTextMyPost;break;case 3:this.noPostText=this.noPostTextFavori}this.noPost=!0}else 1==this.focus&&this.$router.push({name:"Multimedia"})},
//! Fonction qui contient toute la logique de rendu
RENDU_MONTAGE_FONCTION:function(){var t=this,e=this.apiAdresse(),a=this.apiBody();this.$axios.post(e,a).then((function(e){return t.data=e.data.posts,e.data.privilege})).then((function(e){return t.buildClass(),e})).then((function(e){return t.buildConjugaison(),e})).then((function(e){return t.buildMyLike(),e})).then((function(e){return t.buildMyComments(),e})).then((function(e){return t.buildButtonDeletePost(e),e})).then((function(e){t.buildButtonDeleteComments(e)})).then((function(){t.buildBlockMedia()})).then((function(){t.buildBlockReaction()})).then((function(){t.buildHistory()})).catch((function(){t.catchDecision()}))}},
//! Quand la propriété  ...
watch:{
//! "Préférence" change ...
preference:function(){
//! On réinitialise la variable indiquant si il y a une/des publications
this.noPost=!1,//! On supprime tout les posts
this.data=[],//! On applique le rendu de l'affichage des posts
this.RENDU_MONTAGE_FONCTION()}},
//! Quand la page est monté ...
mounted:function(){
//! On applique le rendu de l'affichage des posts
this.RENDU_MONTAGE_FONCTION(),//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}}),pt=ft,ht=(a("7eef"),Object(c["a"])(pt,mt,dt,!1,null,"00d1c3cf",null)),vt=ht.exports,gt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"media"},[0==t.new_write?s("div",{staticClass:"neo media__new",class:{bg_multimedia:t.multimedia,bg_agora:t.agora},on:{click:t.toWrite}}):t._e(),1==t.new_write?s("div",{staticClass:"neo media__exit",on:{click:t.toExit}}):t._e(),s("div",{staticClass:"media__post",class:{post_active:t.new_write}},[1==t.new_write?s("form",{staticClass:"neo neo-relax media__post__write",attrs:{enctype:"multipart/form-data"}},[1==t.multimedia?s("div",{staticClass:"media__post__write__view"},[s("div",{staticClass:"media__post__write__view__shadow"}),0==t.fileExe?s("img",{staticClass:"media__post__write__view__default",attrs:{src:a("cf55"),alt:"Image de téléchargement"}}):t._e(),1==t.fileExe&&"image"==t.fileExeType?s("img",{ref:"mediaImage",staticClass:"media__post__write__view__file",attrs:{src:"#",alt:"Votre fichier"}}):t._e(),1==t.fileExe&&"video"==t.fileExeType?s("video",{ref:"mediaVideo",staticClass:"media__post__write__view__file",attrs:{autoplay:"",muted:"",loop:"",src:"#"},domProps:{muted:!0}}):t._e(),1==t.fileExe&&"loading"==t.fileExeType?s("img",{staticClass:"media__post__write__view__file",attrs:{src:a("cf1c"),alt:"Votre fichier"}}):t._e()]):t._e(),1==t.multimedia?s("div",{staticClass:"media__post__write__control"},[0==t.fileExe?s("div",{staticClass:"media__post__write__control__upload"},[s("label",{staticClass:"media__post__write__control__upload--label",attrs:{for:"file"}},[t._v("Choisir un fichier")]),s("input",{ref:"fileMedia",staticClass:"media__post__write__control__upload--input",attrs:{type:"file",id:"file",name:"file"},on:{change:t.controlFile}})]):t._e(),1==t.fileExe?s("button",{on:{click:t.cancelUpload}},[t._v("Changer de fichier")]):t._e()]):t._e(),1==t.multimedia?s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.legend,expression:"legend"}],staticClass:"media__post__write__publication",attrs:{maxlength:"100",name:"legend",rows:"3",placeholder:"Ecrivez votre légende ..."},domProps:{value:t.legend},on:{input:[function(e){e.target.composing||(t.legend=e.target.value)},t.maxLength]}}):t._e(),1==t.agora?s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.titre,expression:"titre"}],staticClass:"media__post__write__publication publication-agora",attrs:{maxlength:"100",name:"titre",rows:"5",placeholder:"Ecrivez votre sujet ..."},domProps:{value:t.titre},on:{input:[function(e){e.target.composing||(t.titre=e.target.value)},t.maxLength]}}):t._e(),t._m(0),0==t.stopSend?s("button",{staticClass:"media__post__write__submit",attrs:{type:"button"},on:{click:t.newPost}},[t._v(t._s(t.textButton))]):t._e(),1==t.stopSend?s("button",{staticClass:"media__post__write__submit",attrs:{type:"button"}},[t._v(t._s(t.textButton))]):t._e(),s("Error",{staticClass:"media__post__write__error"})],1):t._e()])])},Ct=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"max-length"},[a("span",{attrs:{name:"countText"}},[t._v("0")]),a("span",[t._v("/100")])])}],bt=a("1da1"),xt=(a("96cf"),{name:"Media",components:{Error:E},props:{
//! Propriété qui permet de décidé du type d'affichage (Multimédia/Agora)
mode:{type:String,required:!0}},data:function(){return{
//! Variable qui indique si la fenêtre de publication a été ouverte par l'utilisateur
new_write:!1,
//! Emsemble de variable qui contiennent les informations du visiteur dans le formulaire
file:"",legend:"",titre:"",
//! Variable qui contient le texte du bouton de publication (par défaut = "Publier")
textButton:"Publier",
//! Variable qui indique si un fichier a été chargée par l'utilisateur
fileExe:!1,
//! Variable qui indique le type de fichier qui a été chargée par l'utilisateur
fileExeType:"",
//! Variable qui permet d'ajouter ou d'enlever l'évènement de soumission du formulaire (Sécurité)
stopSend:!1,
//! Ensemble de variable qui permet de contrôler l'affichage
multimedia:!1,agora:!1}},methods:{
//! Fonction qui permet de compter et d'indiquer en temps réel le nombre de caractères du champ (légende/titre)
maxLength:function(t){document.getElementsByName("countText")[0].textContent=t.target.value.length},
//! Fonction qui réinitialise toutes les variables
dataReset:function(){this.$store.commit("DESACTIVE_ERROR"),this.stopSend=!1,this.textButton="Publier",this.fileExe=!1,this.file="",this.legend="",this.titre=""},
//! Fonction qui réinitialise toutes les variables et passe en mode "écriture"
toWrite:function(){this.dataReset(),this.new_write=!0,this.$emit("blur-control",{blur:!0})},
//! Fonction qui réinitialise toutes les variables et passe en mode "sortie"
toExit:function(){this.dataReset(),this.new_write=!1,this.$emit("blur-control",{blur:!1})},
//! Fonction qui permet de pré-afficher le fichier qui a été chargé avec quelques vérification
controlFile:function(){var t=Object(bt["a"])(regeneratorRuntime.mark((function t(e){var a,s,i,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=["image/jpeg","image/jpg","image/png","image/gif","video/mp4"],-1!=a.indexOf(e.target.files[0].type)){t.next=7;break}return t.next=4,this.$store.commit("ACTIVE_ERROR","Le format du fichier n'est pas autorisé");case 4:this.cancelUpload(),t.next=56;break;case 7:return t.next=9,this.$store.commit("DESACTIVE_ERROR");case 9:return t.next=11,!0;case 11:if(this.fileExe=t.sent,!(a.indexOf(e.target.files[0].type)<4)){t.next=35;break}if(!(e.target.files[0].size/1024/1024>10)){t.next=18;break}this.$store.commit("ACTIVE_ERROR","Le fichier est trop lourd (max 10MB pour jpg, png, gif)"),this.cancelUpload(),t.next=33;break;case 18:return t.next=20,"image";case 20:return this.fileExeType=t.sent,t.next=23,e.target.files[0];case 23:return this.file=t.sent,t.next=26,e.target.files[0];case 26:return s=t.sent,t.next=29,this.$refs.mediaImage;case 29:return i=t.sent,t.next=32,URL.createObjectURL(s);case 32:i.src=t.sent;case 33:t.next=56;break;case 35:if(4!=a.indexOf(e.target.files[0].type)){t.next=56;break}if(!(e.target.files[0].size/1024/1024>50)){t.next=41;break}this.$store.commit("ACTIVE_ERROR","Le fichier est trop lourd (max 50MB pour mp4)"),this.cancelUpload(),t.next=56;break;case 41:return t.next=43,"video";case 43:return this.fileExeType=t.sent,t.next=46,e.target.files[0];case 46:return this.file=t.sent,t.next=49,e.target.files[0];case 49:return n=t.sent,t.next=52,this.$refs.mediaVideo;case 52:return o=t.sent,t.next=55,URL.createObjectURL(n);case 55:o.src=t.sent;case 56:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),
//! Fonction qui permet de réinitialiser certaines variables quand le bouton "changer le fichier" a été engagé
cancelUpload:function(){this.upload=!1,this.fileExe=!1,this.file=""},
//! Fonction qui permet de changer l'adresse des requêtes (selon la view --> Props MODE)
getApi:function(){return 1==this.multimedia?"/multimedia/post":1==this.agora?"/agora/post":void 0},
//! Fonction qui permet de changer le corps des requêtes (selon la view --> props MODE)
getBody:function(){var t=this.$store.state.userId;if(1==this.multimedia){var e=new FormData;return e.append("file",this.file),e.append("legend",this.legend),e.append("userId",t),e}if(1==this.agora)return{userId:t,titre:this.titre}},
//! Fonction qui permet de changer l'en tête des requêtes (selon la view --> props FOCUS)
getHeaders:function(){return 1==this.multimedia?{headers:{"Content-Type":"multipart/form-data"}}:1==this.agora?{}:void 0},
//! Fonction qui permet de publier un contenu
newPost:function(){var t=this,e=this.getApi(),a=this.getBody(),s=this.getHeaders();this.$axios.post(e,a,s).then((function(e){t.stopSend=!0,t.$store.commit("DESACTIVE_ERROR"),t.fileExeType="loading",t.textButton="Votre publication est en cours d'enrengistrement ...",setTimeout(function(){this.textButton=JSON.parse(e.request.response).message,setTimeout(function(){this.file="",this.new_write=!1,this.$emit("blur-control",{blur:!1}),document.location.reload()}.bind(this),1500)}.bind(t),1500)})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))}},
//! Une fois que la page est monté ...
mounted:function(){
//! On change l'état des variables responsables de l'affichage
"Agora"==this.mode?this.agora=!0:"Multimedia"==this.mode&&(this.multimedia=!0)}}),yt=xt,Et=(a("4a31"),Object(c["a"])(yt,gt,Ct,!1,null,"18c9068a",null)),It=Et.exports,wt={name:"Multimedia",components:{Media:vt,NavJuge:_t,NavBar:V,Publication:It},data:function(){return{
//! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
blur:!1,
//! Variable qui contient la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés) 
choice:1}},methods:{
//! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
updateBlur:function(t){this.blur=t.blur},
//! Fonction qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité, Mes publications, Mes préférés)
get_Preference:function(t){this.choice=t.choice}},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))},
//! Avant que la page soit monté ...
beforeMount:function(){var t=new URL(document.location).searchParams,e=t.get("preference");null!==e&&(this.choice=parseInt(e))},
//! Quand la page est monté ...
mounted:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},$t=wt,kt=(a("e19c"),Object(c["a"])($t,it,nt,!1,null,"36515879",null)),Pt=kt.exports,Nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"multimedia"},[a("NavBar",{staticClass:"multimedia__navbar",attrs:{mode:"accueil"}}),a("Publication",{attrs:{mode:"Multimedia"},on:{"blur-control":t.updateBlur}}),a("div",{staticClass:"multimedia__contain",class:{shadow:t.blur}},[a("NavBack",{staticClass:"multimedia__contain__nav",attrs:{history:t.await_HistoryPostID,preference:t.take_Preference,direction:"Multimedia"}}),a("Media",{staticClass:"multimedia__contain__media",attrs:{direction:"Multimedia",focus:!0},on:{preference:t.give_Preference,history:t.update_HistoryPostID}})],1)],1)},Bt=[],Rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"nav"},[a("router-link",{staticClass:"neo nav__back",attrs:{to:{name:t.direction,query:{history:t.history,preference:t.preference}}}},[a("i",{staticClass:" nav__back__icon fas fa-long-arrow-alt-left fa-lg"}),a("span",{staticClass:"nav__back__text"},[t._v("Revenir en arrière")])])],1)},Tt=[],At={name:"NavJuge",props:{
//! Propriété qui permet de connaître l'ID du post sur lequelle l'utilisaateur à précédemment cliqué
history:{type:String,required:!0},
//! Propriété qui permet de donner des adresses aux différents liens (AgoraID ou MultimediaID)
direction:{type:String,required:!0},
//! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus" 
preference:{type:Number,required:!0}}},Ot=At,St=(a("ebc1"),Object(c["a"])(Ot,Rt,Tt,!1,null,"39bb0026",null)),Lt=St.exports,Mt={name:"MultimediaID",components:{Media:vt,NavBack:Lt,NavBar:V,Publication:It},data:function(){return{
//! Variable qui contient l'ID du post sur lequelle l'utilisateur à précédemment cliqué
await_HistoryPostID:"",
//! Variable qui contient la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés)
take_Preference:1,
//! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
blur:!1}},methods:{
//! Fonction qui permet de mettre à jour le postID qui a précédemment été ciblé par l'utilisateur
update_HistoryPostID:function(t){this.await_HistoryPostID=t.history},
//! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
updateBlur:function(t){this.blur=t.blur},give_Preference:function(t){this.take_Preference=t.prefer}},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))},
//! Quand la page est monté ...
mounted:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},Dt=Mt,jt=(a("3f48"),Object(c["a"])(Dt,Nt,Bt,!1,null,"5ba405a3",null)),qt=jt.exports,Vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"agora"},[a("NavBar",{staticClass:"agora__navbar",attrs:{mode:"accueil"}}),a("Publication",{staticClass:"agora__publication",attrs:{mode:"Agora"},on:{"blur-control":t.updateBlur}}),a("div",{staticClass:"agora__contain",class:{shadow:t.blur}},[a("NavJuge",{staticClass:"agora__contain__nav",attrs:{preference:t.choice,direction:"Agora"},on:{navChoice:t.get_Preference}}),a("Forum",{staticClass:"agora__contain__media",attrs:{preference:t.choice,direction:"AgoraID",focus:!1}})],1)],1)},Ut=[],Ft=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[1==t.noPost?a("div",{staticClass:"no-post"},[a("span",{staticClass:"no-post__text"},[t._v(t._s(t.noPostText))]),a("i",{staticClass:"no-post__icon far fa-grin-beam-sweat"})]):t._e(),t._l(t.data,(function(e,s){return a("div",{key:s,staticClass:"neo media",class:{media_small:t.small,media_big:t.big},attrs:{name:"media",id:e.postId}},[a("div",{staticClass:"media__edit"},[a("div",{staticClass:"media__edit__more",attrs:{name:"deletePost","data-mypost":e.my_post}}),a("div",{staticClass:"media__edit__self",attrs:{name:"deletePost","data-mypost":e.my_post,"data-active":"false"},on:{click:function(e){return e.target!==e.currentTarget?null:t.toggleButtonDelete.apply(null,arguments)}}}),a("div",{staticClass:"media__edit__delete"},[a("div",{staticClass:"media__edit__delete__self",attrs:{"data-id":e.postId},on:{click:function(e){return e.target!==e.currentTarget?null:t.deletePost.apply(null,arguments)}}}),a("i",{staticClass:"fas fa-trash-alt fa-lg"})])]),a("div",{staticClass:"media__question"},[a("span",[t._v(t._s(e.titre))])]),a("div",{staticClass:"media__influence"},[a("div",{staticClass:"media__influence__button"},[a("button",{staticClass:"media__influence__button__item",class:{button_small:t.small,button_big:t.big},attrs:{name:"buttonLikes","data-like":e.my_like,"data-id":e.postId}},[a("div",{staticClass:"media__influence__button__item__self",attrs:{"data-position":e.position},on:{click:function(e){return e.target!==e.currentTarget?null:t.likePost.apply(null,arguments)}}}),a("i",{staticClass:"media__influence__button__item__icon fas fa-satellite fa-lg"})]),0==t.focus?a("router-link",{class:{button_small:t.small},attrs:{to:{name:t.direction,params:{id:e.postId},query:{comments:!0,preference:t.preference}}}},[a("button",{staticClass:"media__influence__button__item",attrs:{name:"buttonComments","data-comments":e.my_comments}},[a("i",{staticClass:"media__influence__button__item__icon fas fa-comments fa-lg"})])]):t._e()],1),a("router-link",{attrs:{to:{name:"Profil",params:{id:e.userId}}}},[a("div",{staticClass:"media__influence__author"},[a("img",{staticClass:"avatar",attrs:{src:e.avatar,alt:"Avatar de profil"}}),a("span",{staticClass:"media__influence__author__name"},[t._v(t._s(e.firstName)+"."+t._s(e.lastName))])])]),a("div",{staticClass:"media__influence__note"},[a("div",{staticClass:"media__influence__note__item"},[a("div",{staticClass:"media__influence__note__item__text"},[a("span",{attrs:{name:"totalLikes"}},[t._v(t._s(e.likes))]),t._m(0,!0)]),a("div",{staticClass:"media__influence__note__item__text"},[a("span",{attrs:{name:"totalComments"}},[t._v(t._s(e.comments))]),t._m(1,!0)])])])],1),a("div",{staticClass:"media__date"},[a("span",[t._v("Il y a "+t._s(e.datePost))])]),a("div",{staticClass:"media__reaction",class:{reaction_small:t.small,reaction_big:t.big}},[a("div",{attrs:{id:"reaction",name:"reactionBlock"}},t._l(e.commentsList,(function(e,s){return a("div",{key:s,staticClass:"media__reaction__view",attrs:{name:"comments","data-commentsId":e.commentsId,"data-myComments":e.my_comments}},[a("div",{staticClass:"media__reaction__view__comments",class:{comments_small:t.small,comments_big:t.big}},[a("router-link",{staticClass:"media__reaction__view__comments__name",attrs:{to:{name:"Profil",params:{id:e.userId}}}},[a("img",{staticClass:"avatar",attrs:{src:e.avatar,alt:"Avatar de profil"}}),a("span",{staticClass:"media__reaction__view__comments__name--user"},[t._v(t._s(e.firstName)+"."+t._s(e.lastName)+" :")])]),a("span",{staticClass:"media__reaction__view__comments__phrase",class:{phrase_small:t.small}},[t._v(t._s(e.reaction))])],1),a("div",{staticClass:"media__reaction__view__opt"},[a("span",{staticClass:"media__reaction__view__opt__date"},[t._v(t._s(e.dateComments))]),a("button",{staticClass:"media__reaction__view__opt__delete"},[a("div",{staticClass:"media__reaction__view__opt__delete__self",attrs:{"data-commentsId":e.commentsId},on:{click:t.deleteComments}}),a("i",{staticClass:"media__reaction__view__opt__delete__icon fas fa-trash-alt fa-sm"})])])])})),0),0==t.focus?a("router-link",{staticClass:"media__reaction__more",attrs:{to:{name:t.direction,params:{id:e.postId},query:{comments:!1,preference:t.preference}}}},[a("button",{staticClass:"media__reaction__more__button"},[a("i",{staticClass:"fas fa-caret-down"})])]):t._e()],1),1==t.focus?a("div",{staticClass:"media__titre"},[t._v("Mon commentaire")]):t._e(),1==t.focus?a("form",{staticClass:"media__write",on:{submit:function(e){return e.preventDefault(),t.commentPost.apply(null,arguments)}}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comments,expression:"comments"}],attrs:{name:"textArea",rows:"2"},domProps:{value:t.comments},on:{input:function(e){e.target.composing||(t.comments=e.target.value)}}}),t._m(2,!0)]):t._e(),1==t.focus?a("Error",{staticClass:"media__error"}):t._e()],1)}))],2)},Ht=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._v(" engouement"),a("span",{attrs:{name:"textLikes"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._v(" réaction"),a("span",{attrs:{name:"textComments"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{attrs:{type:"submit"}},[a("i",{staticClass:"fas fa-rocket fa-lg"})])}],Jt={name:"Media",components:{Error:E},data:function(){return{
//! Variable qui contient l'ensemble des posts
data:[],
//! Ensemble de variables qui décide du type d'affichage (Scroll et Focus)
small:!1,big:!1,
//! Variable qui contient le commentaire du visiteur dans le formulaire
comments:"",
//! Variable qui permet d'activer/désactiver le message indiquant qu'il n'y a pas de post
noPost:!1,
//! Ensemble de variables qui vont constituer le texte à l'intérieur du message
noPostText:"",noPostTextActuality:"Le fil d'actualité est vide ...",noPostTextMyPost:"Vous n'êtes l'auteur d'aucune publication ...",noPostTextFavori:"Vous n'avez malheureusement pas de préférence ..."}},props:{
//! Propriété qui permet de donner des adresses aux différents liens (AgoraID ou MultimédiaID)
direction:{type:String,required:!0},
//! Propriété qui permet de déterminer la requête API dans la récupération des posts et le type d'affichage du post
focus:{type:Boolean,required:!0},
//! Propriété qui permet de savoir où l'utilisateur était quand il a cliqué sur le bouton "commenter" ou "voir plus"
preference:{type:Number}},methods:{
//! Fonction qui permet de faire apparaître/disparaître le toggle du bouton de suppression de post
toggleButtonDelete:function(t){"false"==t.target.dataset.active?(t.target.parentElement.children[2].style.display="flex",t.target.dataset.active="true"):"true"==t.target.dataset.active&&(t.target.parentElement.children[2].style.display="none",t.target.dataset.active="false")},
//! Fonction qui permet de supprimer un post
deletePost:function(t){var e=this;this.$dialog.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?").then((function(a){var s=t.target.dataset.id;e.$axios.delete("/agora/post/".concat(s)).then((function(){0==e.focus?(a.close(),document.location.reload()):1==e.focus&&(a.close(),e.$router.push({name:"Agora"}))})).catch((function(t){console.log(t)}))})).catch((function(){t.target.parentElement.style.display="none",t.target.parentElement.parentElement.children[1].dataset.active="false"}))},
//! Fonction qui permet de liker un post
likePost:function(t){var e=this.$store.state.userId,a=t.target.parentElement.dataset.id;this.$axios.post("/action/like",{postId:a,userId:e}).then((function(e){var a=t.target.dataset.position,s=e.data.likes,i=document.getElementsByName("buttonLikes")[a],n=document.getElementsByName("totalLikes")[a],o=document.getElementsByName("textLikes")[a];1==s?(i.classList.add("true-action"),i.classList.remove("false-action"),n.textContent="".concat(parseInt(n.textContent)+1)):(i.classList.remove("true-action"),i.classList.add("false-action"),n.textContent="".concat(parseInt(n.textContent)-1)),parseInt(n.textContent)>1?o.textContent="s":o.textContent=""})).catch((function(t){console.log(t)}))},
//! Fonction qui permet de commenter un post
commentPost:function(){var t=this;this.$store.commit("DESACTIVE_ERROR");var e=this.$route.params.id,a=this.$store.state.userId,s=this.comments;this.$axios.post("/action/",{postId:e,userId:a,reaction:s}).then((function(){document.location.reload()})).catch((function(e){t.$store.commit("ACTIVE_ERROR",JSON.parse(e.request.response).message)}))},
//! Fonction qui permet de supprimer un commentaire de post
deleteComments:function(t){var e=this;this.$store.commit("DESACTIVE_ERROR");var a=t.target.dataset.commentsid;this.$axios.delete("/action/".concat(a)).then((function(){document.location.reload()})).catch((function(t){e.$store.commit("ACTIVE_ERROR",JSON.parse(t.request.response).message)}))},
//! Fonction qui permet de changer l'adresse des requêtes (selon la view --> props FOCUS)
apiAdresse:function(){var t=this.focus;return 0==t?"/agora/recoverAll":"/agora/recoverOne"},
//! Fonction qui permet de changer le corps des requêtes (selon la view --> props FOCUS)
apiBody:function(){var t=this.focus,e=this.$store.state.userId,a=this.preference,s=this.$route.params.id;return 0==t?{userId:e,preference:a}:{userId:e,postId:s}},
//! Fonction qui permet d'activer ou de désactiver certaines "class" (selon la view --> props FOCUS)
buildClass:function(){var t=this.focus;0==t?this.small=!0:this.big=!0},
//! Fonction qui permet de conjuguer les termes associés aux likes et aux commentaires
buildConjugaison:function(){for(var t=document.getElementsByName("media"),e=document.getElementsByName("totalLikes"),a=document.getElementsByName("textLikes"),s=document.getElementsByName("totalComments"),i=document.getElementsByName("textComments"),n=0;n<t.length;n++)parseInt(s[n].textContent)>1&&(i[n].textContent="s"),parseInt(e[n].textContent)>1&&(a[n].textContent="s")},
//! Fonction qui permet de rendre les boutons "likes" actif/désactif grâce aux keys "my_likes" de la réponse API
buildMyLike:function(){for(var t=document.getElementsByName("buttonLikes"),e=0;e<t.length;e++)1==t[e].dataset.like?(t[e].classList.add("true-action"),t[e].classList.remove("false-action")):(t[e].classList.remove("true-action"),t[e].classList.add("false-action"))},
//! Fonction qui permet de rendre les boutons "comments" actif/désactif grâce aux keys "my_comments" de la réponse API
buildMyComments:function(){for(var t=document.getElementsByName("buttonComments"),e=0;e<t.length;e++)if(parseInt(t[e].dataset.comments)>0){t[e].classList.add("true-action"),t[e].classList.remove("false-action");var a=document.createElement("div");a.setAttribute("class","media__influence__button__my-comments"),a.setAttribute("style","top: -8px; right: -8px; height: 20px;width: 20px;background-color: rgb(0, 0, 0);position: absolute;color: rgb(255, 255, 255);display: flex;justify-content: center;align-items: center;border-radius: 100%;font-weight: bold;font-size: 10px;"),a.textContent=parseInt(t[e].dataset.comments),t[e].appendChild(a)}else t[e].classList.remove("true-action"),t[e].classList.add("false-action")},
//! Fonction qui permet de faire apparaître les boutons de suppression de post (ADMIN ALL ACCESS)
buildButtonDeletePost:function(t){if(2!==t)for(var e=document.getElementsByName("deletePost"),a=0;a<e.length;a++)0==parseInt(e[a].dataset.mypost)&&(e[a].style.display="none")},
//! Fonction qui permet de faire apparaître les boutons de suppression de commentaire (ADMIN ALL ACCESS)
buildButtonDeleteComments:function(t){if(2!==t)for(var e=document.getElementsByName("comments"),a=0;a<e.length;a++)0==parseInt(e[a].dataset.mycomments)&&e[a].children[1].removeChild(e[a].children[1].children[1])},
//! Fonction qui permet d'inscrire un message dans la partie "réaction" et retirer le bouton "more" quand celle-ci est vide
buildBlockReaction:function(){for(var t=document.getElementsByName("reactionBlock"),e=0;e<t.length;e++)if(0==t[e].children.length){var a=document.createElement("span");a.textContent="Absence de commentaires",t[e].appendChild(a),t[e].classList.add("no-comments"),0==this.focus&&(t[e].parentElement.lastChild.style.display="none")}},
//! Fonction qui permet d'utiliser des comportements de direction par rapport aux paramètres des url (selon la view --> props FOCUS)
buildHistory:function(){var t=this.focus;if(1==t){var e=this.$router.history.current.query.comments;1==e?document.getElementsByName("textArea")[0].focus():0==e&&(window.location.hash="#reaction"),this.$route.params.id&&this.$emit("history",{history:this.$route.params.id});var a=new URL(document.location).searchParams,s=a.get("preference");null!==s&&this.$emit("preference",{prefer:parseInt(s)})}else if(this.$router.history.current.query.history){var i=this.$router.history.current.query.history;window.location.hash="#".concat(i)}},
//! Fonction qui entreprend une action en cas d'erreur pendant l'appel à l'API
catchDecision:function(){if(0==this.focus){switch(this.preference){case 1:this.noPostText=this.noPostTextActuality;break;case 2:this.noPostText=this.noPostTextMyPost;break;case 3:this.noPostText=this.noPostTextFavori}this.noPost=!0}else 1==this.focus&&this.$router.push({name:"Agora"})},
//! Fonction qui contient toute la logique de rendu
RENDU_MONTAGE_FONCTION:function(){var t=this,e=this.apiAdresse(),a=this.apiBody();this.$axios.post(e,a).then((function(e){return t.data=e.data.posts,e.data.privilege})).then((function(e){return t.buildClass(),e})).then((function(e){return t.buildConjugaison(),e})).then((function(e){return t.buildMyLike(),e})).then((function(e){return t.buildMyComments(),e})).then((function(e){return t.buildButtonDeletePost(e),e})).then((function(e){t.buildButtonDeleteComments(e)})).then((function(){t.buildBlockReaction()})).then((function(){t.buildHistory()})).catch((function(){t.catchDecision()}))}},
//! Quand la propriété  ...
watch:{
//! "Préférence" change ...
preference:function(){
//! On réinitialise la variable indiquant si il y a une/des publications
this.noPost=!1,//! On supprime tout les posts
this.data=[],//! On applique le rendu de l'affichage des posts
this.RENDU_MONTAGE_FONCTION()}},
//! Quand la page est monté ...
mounted:function(){
//! On applique le rendu de l'affichage des posts
this.RENDU_MONTAGE_FONCTION(),//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},zt=Jt,Gt=(a("e384"),Object(c["a"])(zt,Ft,Ht,!1,null,"a2ddfc2e",null)),Wt=Gt.exports,Kt={name:"Agora",components:{NavJuge:_t,NavBar:V,Publication:It,Forum:Wt},data:function(){return{
//! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
blur:!1,
//! Variable qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés)
choice:1}},methods:{
//! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
updateBlur:function(t){this.blur=t.blur},
//! Fonction qui permet de mettre à jour la préférence de l'utilisateur (Fil d'actualité, Mes publications, Mes préférés)
get_Preference:function(t){this.choice=t.choice}},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))},
//! Avant que la page soit monté ...
beforeMount:function(){var t=new URL(document.location).searchParams,e=t.get("preference");null!==e&&(this.choice=parseInt(e))},
//! Quand la page est monté ...
mounted:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},Qt=Kt,Xt=(a("0bc3"),Object(c["a"])(Qt,Vt,Ut,!1,null,"049c256a",null)),Yt=Xt.exports,Zt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"agora"},[a("NavBar",{staticClass:"agora__navbar",attrs:{mode:"accueil"}}),a("Publication",{attrs:{mode:"Agora"},on:{"blur-control":t.updateBlur}}),a("div",{staticClass:"agora__contain",class:{shadow:t.blur}},[a("NavBack",{staticClass:"agora__contain__nav",attrs:{history:t.await_HistoryPostID,preference:t.take_Preference,direction:"Agora"}}),a("Forum",{staticClass:"agora__contain__media",attrs:{direction:"Agora",focus:!0},on:{preference:t.give_Preference,history:t.update_HistoryPostID}})],1)],1)},te=[],ee={name:"AgoraID",components:{NavBack:Lt,NavBar:V,Publication:It,Forum:Wt},data:function(){return{
//! Variable qui contient l'ID du post sur lequelle l'utilisateur à précédemment cliqué
await_HistoryPostID:"",
//! Variable qui contient la préférence de l'utilisateur (Fil d'actualité par défaut, Mes publications, Mes préférés)
take_Preference:1,
//! Variable qui permet d'activer/désactiver le flou d'arrière plan en fonction du composant Publication
blur:!1}},methods:{
//! Fonction qui permet de mettre à jour le postID qui a précédemment été ciblé par l'utilisateur
update_HistoryPostID:function(t){this.await_HistoryPostID=t.history},
//! Fonction qui permet de mettre à jour l'état du flou d'arrière plan
updateBlur:function(t){this.blur=t.blur},give_Preference:function(t){this.take_Preference=t.prefer}},
//! Avant la création de la page ...
beforeCreate:function(){var t=this;
//! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
this.$store.dispatch("majUserId").then((function(){
//! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
t.$store.dispatch("accessPage")})).catch((function(){t.$router.push({name:"Connexion"})}))},
//! Quand la page est monté ...
mounted:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")},
//! Quand la  page est mise à jour ...
updated:function(){
//! On apllique le rendu de la fonction Neo
this.$store.dispatch("neo")}},ae=ee,se=(a("156b"),Object(c["a"])(ae,Zt,te,!1,null,"74442c9b",null)),ie=se.exports;s["a"].use(f["a"]);var ne=[{path:"*",redirect:"/Multimedia"},{path:"/",name:"Connexion",component:k},{path:"/Friends",name:"Friends",component:st},{path:"/Info/:id",name:"Info",component:A},{path:"/Profil/:id",name:"Profil",component:X},{path:"/Multimedia",name:"Multimedia",component:Pt},{path:"/Multimedia/:id",name:"MultimediaID",component:qt},{path:"/Agora",name:"Agora",component:Yt},{path:"/Agora/:id",name:"AgoraID",component:ie}],oe=new f["a"]({base:"/Groupomania",mode:"hash",routes:ne}),re=oe;s["a"].use(_["a"]);var ce=new _["a"].Store({state:{
//! Variable qui contient le userId de l'utilisateur
userId:"",
//! Variables (composant Error)
errorAlert:!1,errorText:"",
//! Variables (fonction Neo)
color1:"#bebebe",color2:"#ffffff",color3:"#e0e0e0",time:.8},getters:{},mutations:{
//! Masquer l'erreur (composant Error)
DESACTIVE_ERROR:function(t){t.errorAlert=!1,t.errorText=""},
//! Afficher l'erreur (composant Error)
ACTIVE_ERROR:function(t,e){t.errorAlert=!0,t.errorText=e},
//! Met à jour le userId
USER_ID:function(t){null==sessionStorage.getItem("userId")&&null!==localStorage.getItem("userId")?t.userId=localStorage.getItem("userId"):null==localStorage.getItem("userId")&&null!==sessionStorage.getItem("userId")?t.userId=sessionStorage.getItem("userId"):t.userId=void 0}},actions:{
//! Fonction Neo
neo:function(t){for(var e=document.querySelectorAll(".neo"),a=0;a<e.length;a++){var s=e[a].offsetWidth,i=e[a].offsetHeight;e[a].style.transition="box-shadow ".concat(t.state.time,"s ease-in-out"),e[a].style.boxShadow=s>i?"".concat(s/10*(i/s),"px ").concat(s/10*(i/s),"px ").concat(s/10*(i/s*2),"px ").concat(t.state.color1,", \n          ").concat(s/10*(i/s*-1),"px ").concat(s/10*(i/s*-1),"px ").concat(s/10*(i/s*2),"px ").concat(t.state.color2):"".concat(i/10*(s/i),"px ").concat(i/10*(s/i),"px ").concat(i/10*(s/i*2),"px ").concat(t.state.color1,", \n          ").concat(i/10*(s/i*-1),"px ").concat(i/10*(s/i*-1),"px ").concat(i/10*(s/i*2),"px ").concat(t.state.color2)}for(var n=document.querySelectorAll(".neo-inverse"),o=0;o<n.length;o++){var r=n[o].offsetWidth,c=n[o].offsetHeight;n[o].style.transition="box-shadow ".concat(t.state.time,"s ease-in-out"),n[o].style.boxShadow=r>c?"inset ".concat(r/10*(c/r),"px ").concat(r/10*(c/r),"px ").concat(r/10*(c/r*2),"px ").concat(t.state.color1,", \n          inset ").concat(r/10*(c/r*-1),"px ").concat(r/10*(c/r*-1),"px ").concat(r/10*(c/r*2),"px ").concat(t.state.color2):"inset ".concat(c/10*(r/c),"px ").concat(c/10*(r/c),"px ").concat(c/10*(r/c*2),"px ").concat(t.state.color1,", \n          inset ").concat(c/10*(r/c*-1),"px ").concat(c/10*(r/c*-1),"px ").concat(c/10*(r/c*2),"px ").concat(t.state.color2)}},
//! Fonction qui met à jour le userId de l'utilisateur
majUserId:function(t){t.commit("USER_ID")},
//! Fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
accessPage:function(t){var e=t.state.userId;null!==e&&void 0!==e&&""!==e?d.a.get("/account/".concat(e)).catch((function(){localStorage.clear(),sessionStorage.clear(),re.push({name:"Connexion"})})):(localStorage.clear(),sessionStorage.clear(),re.push({name:"Connexion"}))}},modules:{}}),le=a("03a5"),ue=a.n(le);a("15f5"),a("7051");//! Fonction qui permet de récupérer le token
function _e(){return null==sessionStorage.getItem("token")&&null!==localStorage.getItem("token")?localStorage.getItem("token"):null==localStorage.getItem("token")&&null!==sessionStorage.getItem("token")?sessionStorage.getItem("token"):void 0}//! Dans chaque requêtes, on fixe automatiquement le token d'authentification obtenu lors de la connnexion
//! Chaque requête Axios commence par ce début d'URL (par défaut)
d.a.defaults.baseURL="https://reda-serveur.com/api/groupomania";var me=_e();null!==me&&void 0!==me&&""!==me&&(d.a.defaults.headers.common["Authorization"]="Bearer "+me),s["a"].use(ue.a,{html:!0,loader:!0,okText:"Oui",cancelText:"Non",animation:"bounce"}),s["a"].prototype.$axios=d.a,s["a"].config.productionTip=!1,new s["a"]({store:ce,router:re,render:function(t){return t(u)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";a("9c0c")},"5c8d":function(t,e,a){},"5cd8":function(t,e,a){"use strict";a("1f43")},"5f77":function(t,e,a){},6921:function(t,e,a){},"7bf4":function(t,e,a){},"7eef":function(t,e,a){"use strict";a("5c8d")},"81ab":function(t,e,a){"use strict";a("0842")},"86fd":function(t,e,a){},"90d7":function(t,e,a){},"947e":function(t,e,a){},"95c6":function(t,e,a){t.exports=a.p+"img/eye-open.043f9099.svg"},"9c0c":function(t,e,a){},a5ad:function(t,e,a){},b309:function(t,e,a){},b675:function(t,e,a){t.exports=a.p+"img/eye-close.629cbd8d.svg"},cb2e:function(t,e,a){},cd0d:function(t,e,a){"use strict";a("947e")},cf1c:function(t,e,a){t.exports=a.p+"img/loading.715f4b77.gif"},cf55:function(t,e,a){t.exports=a.p+"img/upload.e8630ec1.png"},d168:function(t,e,a){"use strict";a("90d7")},e19c:function(t,e,a){"use strict";a("36f9")},e384:function(t,e,a){"use strict";a("b309")},ebc1:function(t,e,a){"use strict";a("a5ad")},ecc7:function(t,e,a){},f806:function(t,e,a){}});
//# sourceMappingURL=app.bc87ce5b.js.map
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="scss">

@import "./sass/global.scss";

:root{
  @media screen and (max-width: $step-0) {
    font-size: 14px;
  } 
  
}

body{
  background-color: $color-secondary;
  font-family: $font-family;
  color: $color-primary;
  
}

*{
  text-decoration: none;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  line-height: 1;
  box-sizing: border-box;
  font-size: rem(16px);
  font-family: $font-family;
}

#app{
  width: 100%;
  height: 100%;
}

a:active{
  color: $color-primary;
}


input, textarea, video {
  outline: none;
}

input{
  background-color: $color-secondary;
}

.neo-press{
  background: linear-gradient(145deg, $color-fourth, $color-third);
}

.neo-relax{
  background: linear-gradient(145deg, $color-third, $color-fourth);
}

/* Boîte de dialogue */

.dg-container, .dg-content-cont, .dg-main-content{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dg-container{
  background-color: rgba(0, 0, 0, 0.568);
  position: fixed;
  top: 0;
  z-index: 10;
  height: 100vh;
}

.dg-view-wrapper{
  background-color: white;
  height: 150px;
  width: 80%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 3px 3px 16px white, -3px -3px 16px white;
  
}

.dg-content-footer{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.dg-clear{
  display: none;
}

.dg-content{
  text-align: center;
  font-size: rem(19px);
  margin-top: 8px;
  font-weight: bold;
}

.dg-btn{
  height: 30px;
  width: 80px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
  box-shadow: $box-shadow-button;
  cursor: pointer;
  outline: none;
}

.dg-btn--cancel{
  background-color: rgb(255, 51, 0);
}

.dg-btn--ok{
  background-color: rgb(0, 255, 34);
}

</style>

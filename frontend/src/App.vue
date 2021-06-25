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

body{
  background-color: $color-secondary;
  font-family: $font-family;
  font-size: (16px);
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
  font-size: (16px);
  font-family: $font-family;
}

#app{
  width: 100%;
  height: 100%;
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

</style>

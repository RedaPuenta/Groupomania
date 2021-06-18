<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">

/*******************************CSS GLOBAL**************************************/
@function rem($size) {
    @return $size / 16px * 1rem;
}

:root {
  --color-primary: #6b7992;
  --color-secondary: #e0e0e0;
  --color-third: #f0f0f0;
  --color-fourth: #cacaca;
}

body{
  background-color: var(--color-secondary);
  font-family: 'Mulish', sans-serif;
  font-size: 16px;
}

*{
  text-decoration: none;
  color: var(--color-primary);
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  line-height: 1;
  font: inherit;
  box-sizing: border-box;
}

input[type=file]::-webkit-file-upload-button {
  display: none;
}

input, textarea {
  outline: none;
}

input{
  background-color: var(--color-secondary);
}

.neo-press{
    background: linear-gradient(145deg, var(--color-fourth), var(--color-third));
}

.neo-relax{
    background: linear-gradient(145deg, var(--color-third), var(--color-fourth));
}

#app{
  width: 100%;
  height: 100%;
}

</style>

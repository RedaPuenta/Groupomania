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
  --color-error: rgba(223, 0, 0, 0.849);
}

body{
  background-color: var(--color-secondary);
  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  color: var(--color-primary);
}

*{
  text-decoration: none;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  line-height: 1;
  box-sizing: border-box;
  font-family: 'Mulish', sans-serif;
}

input, textarea, video {
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

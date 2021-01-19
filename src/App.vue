<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>
  html, body {
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  #app {
    padding: 40px;
    height: 100%;
    color: #000000;
    background: #FFFFFF;
  }
</style>

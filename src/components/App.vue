<template>
  <div id="app">
    <p>
      <router-link to="/inventory">inventory</router-link>
      <br/>
      <router-link to="/">shop</router-link>
      <br/>
      <router-link to="/login">login</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  //empty
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

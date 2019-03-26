<template>
  <div class="hello middle">
    <h1>{{ msg }}</h1>

    <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
  </div>
</template>

<script>


export default {
  name: "LandingPage",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.middle {
  display: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

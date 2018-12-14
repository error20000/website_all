<template>
  <div id="app">
    <router-view v-if="show"/>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      show: true
    };
  }
};
</script>

<style>
.test {
  border: 1px solid red;
}
</style>

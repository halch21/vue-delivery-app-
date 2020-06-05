<template>
  <div id="app">
    <HeaderDude/>

    <div class="layout__content">
      <router-view/>
    </div>

    <FooterDude/>

    <LoginForm
    v-if="$store.getters.getLoginFormState"/>
  </div>
</template>
<script>
  import FooterDude from "./components/FooterDude";
  import HeaderDude from "./components/HeaderDude";
  import LoginForm from "./components/LoginForm";
  export default {
    name: 'MainLayout',
    components: {
      HeaderDude,
      FooterDude,
      LoginForm,
    },
    created() {
      if (localStorage.userId) {
        this.$store.commit('updateUser', {uid: localStorage.userId})
      }
      // console.log('firebase', firebase);
      // console.log('firebase', this.$firebase);
    }
  }

</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }
  #app {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
  }
  body {
    font-family: Tahoma, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
  }
  .layout__content {
    flex-grow: 1;
    margin: 16px 60px;
  }
</style>

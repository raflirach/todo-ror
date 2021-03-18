<template>
  <div class="navbar">
    <a @click="changeIsAdd">Todo</a>
    <a class="btn-logout" @click="logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    changeIsAdd () {
      this.$store.commit('changeIsAdd', true)
    }
  }
}
</script>

<style>

</style>

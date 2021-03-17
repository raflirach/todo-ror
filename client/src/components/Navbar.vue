<template>
  <div class="h-12 w-full absolute top-0 shadow-md flex justify-between px-4 items-center">
    <div>Todo</div>
    <a class="bg-blue-400 py-1 px-4 rounded shadow-md text-white font-bold cursor-pointer" @click="logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="w-1/3 h-1/2 shadow-lg border rounded flex flex-col justify-center items-center">
    <div class="text-2xl font-bold mb-4">Login</div>
    <form>
      <input type="text" class="border border-blue-500 w-2/3 rounded p-2 mb-2 text-sm" placeholder="email" />
      <input type="password" class="border border-blue-500 w-2/3 rounded p-2 mb-2 text-sm" placeholder="password" />
      <div>
        <button class="bg-blue-500 rounded py-1 px-4 text-white shadow-md mt-4">Login</button>
        <div class="text-sm mt-4">Don't have an account? <a class="text-blue-500 cursor-pointer" @click="navigate">Register</a></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    navigate () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>

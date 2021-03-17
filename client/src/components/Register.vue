<template>
  <div class="w-1/3 h-1/2 shadow-lg border rounded flex flex-col justify-center items-center">
    <div class="text-2xl font-bold mb-4">Register</div>
    <form @submit.prevent="register">
      <input type="text" v-model="email" class="border border-blue-500 w-2/3 rounded p-2 mb-2 text-sm" placeholder="email" />
      <input type="password" v-model="password" class="border border-blue-500 w-2/3 rounded p-2 mb-2 text-sm" placeholder="password" />
      <div>
        <button class="bg-blue-500 rounded py-1 px-4 text-white shadow-md mt-4">Submit</button>
        <div class="text-sm mt-4">have an account? <a class="text-blue-500 cursor-pointer" @click="navigate">Login</a></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    navigate () {
      this.$router.push('/login')
    },
    register () {
      const { email, password } = this
      const payload = { email, password }
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style>

</style>

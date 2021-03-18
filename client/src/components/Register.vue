<template>
  <div class="container-auth">
    <div class="title-auth">Register</div>
    <form @submit.prevent="register">
      <input type="text" v-model="email" class="input-auth" placeholder="email" />
      <input type="password" v-model="password" class="input-auth" placeholder="password" />
      <div>
        <button class="btn-auth">Submit</button>
        <div class="text-sm mt-4">
          have an account?
          <a class="link-auth" @click="navigate">Login</a>
        </div>
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

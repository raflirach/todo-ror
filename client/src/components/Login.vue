<template>
  <div class="container-auth">
    <div class="title-auth">Login</div>
    <form @submit.prevent="login">
      <input type="text" v-model="email" class="input-auth" placeholder="email" />
      <input type="password" v-model="password" class="input-auth" placeholder="password" />
      <div>
        <button class="btn-auth">Login</button>
        <div class="text-sm mt-4">
          Don't have an account?
          <a class="link-auth" @click="navigate">Register</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    navigate () {
      this.$router.push('/register')
    },
    login () {
      const { email, password } = this
      const payload = { email, password }
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style>

</style>

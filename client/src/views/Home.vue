<template>
  <div class="w-full h-screen flex flex-col pt-14">
    <navbar />
    <todo-container />
    <modal v-if="isAdd"/>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import Navbar from '../components/Navbar.vue'
import TodoContainer from '../components/TodoContainer.vue'
// @ is an alias to /src

export default {
  components: { Navbar, TodoContainer, Modal },
  name: 'Home',
  methods: {
    fetchTodo () {
      this.$store.dispatch('fetchTodo')
    }
  },
  computed: {
    isAdd () {
      return this.$store.state.isAdd
    }
  },
  created () {
    this.fetchTodo()
  }
}
</script>

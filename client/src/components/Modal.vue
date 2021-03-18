<template>
  <div class="modal-container">
    <div class="modal-content">
      <div>Add Todo</div>
      <input type="text" placeholder="title" v-model="title" class="input" />
      <input type="date" v-model="dueDate" class="input" />
      <div>
        <input type="checkbox" v-model="status" value="true">
        <label> Status</label>
      </div>
      <div>
        <input type="checkbox" v-model="priority" value="true">
        <label> Priority</label>
      </div>
      <div class="flex gap-4 justify-center">
        <button class="btn-blue" @click="addTodo">Add</button>
        <button class="btn-red" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      title: '',
      dueDate: '',
      status: false,
      priority: false
    }
  },
  methods: {
    cancel () {
      this.$store.commit('changeIsAdd', false)
    },
    addTodo () {
      const { title, dueDate, status, priority } = this
      const payload = { title, dueDate, status, priority }
      this.$store.dispatch('addTodo', payload)
    }
  }
}
</script>

<style>

</style>

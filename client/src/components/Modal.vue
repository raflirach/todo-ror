<template>
  <div class="w-full h-screen bg-black absolute z-10 top-0 opacity-70 flex justify-center items-center">
    <div class="bg-white w-1/2 z-20 flex flex-col rounded p-4">
      <div>Add Todo</div>
      <input type="text" placeholder="title" v-model="title" class="border border-black my-1 p-2 rounded text-black" />
      <input type="date" v-model="dueDate" class="border border-black my-1 p-2 rounded text-black" />
      <div>
        <input type="checkbox" v-model="status" value="true">
        <label> Status</label>
      </div>
      <div>
        <input type="checkbox" v-model="priority" value="true">
        <label> Priority</label>
      </div>
      <div class="flex gap-4 justify-center">
        <button class="bg-blue-500 w-24 py-1 text-white rounded" @click="addTodo">Add</button>
        <button class="bg-red-500 w-24 py-1 text-white rounded" @click="cancel">Cancel</button>
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

<template>
  <div>
    <div class="border rounded w-full shadow-md text-left p-2 mb-2" v-if="isEdit === todo.id">
        <input type="text" placeholder="title" v-model="title" class="border border-black my-1 p-1 rounded text-black w-full text-sm" />
        <input type="date" v-model="dueDate" class="border border-black my-1 p-1 rounded text-black text-sm" />
        <div class="flex gap-1">
          <button
            class="bg-blue-500 px-2 rounded text-white text-sm shadow-md"
            @click="editTodo"
          >save</button>
          <button
            class="bg-red-500 px-2 rounded text-white text-sm shadow-md"
            @click="setIsEdit('')"
          >cancel</button>
        </div>
      </div>
    <div v-else class="content relative border rounded w-full shadow-md text-left p-2 mb-2">
      <div>{{ todo.title }}</div>
      <div>{{ date }}</div>
      <div class="option absolute top-1 right-2 flex gap-1">
        <button @click="setIsEdit(todo.id)"><i class="fas fa-pen"></i></button>
        <button @click="deleteTodo"><i class="fas fa-trash"></i></button>
      </div>
      <div class="option absolute bottom-1 right-2 flex gap-1">
        <button @click="setPriority(false)" class="bg-red-500 rounded px-1 text-sm" v-if="!todo.status && todo.priority">unpriority</button>
        <button @click="setPriority(true)" class="bg-blue-500 rounded px-1 text-sm" v-if="!todo.status && !todo.priority">set priority</button>
        <button @click="markAsDone(true)" class="bg-green-500 rounded px-1 text-sm" v-if="!todo.status">mark as done</button>
        <button @click="markAsDone(false)" class="bg-red-500 rounded px-1 text-sm" v-if="todo.status">undone</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: ['todo'],
  data () {
    return {
      isEdit: '',
      title: '',
      dueDate: ''
    }
  },
  methods: {
    deleteTodo () {
      const { id } = this.todo
      this.$store.dispatch('deleteTodo', id)
    },
    setIsEdit (id) {
      this.isEdit = id
      this.title = this.todo.title
      this.dueDate = this.todo.due_date.slice(0, 10)
    },
    async editTodo () {
      const { title, dueDate } = this
      const payload = { id: this.todo.id, title, dueDate, status: this.todo.status, priority: this.todo.priority }
      await this.$store.dispatch('editTodo', payload)
      this.setIsEdit('')
    },
    markAsDone (status) {
      const payload = { id: this.todo.id, status }
      this.$store.dispatch('markAsDone', payload)
    },
    setPriority (priority) {
      const payload = { id: this.todo.id, priority }
      this.$store.dispatch('setPriority', payload)
    }
  },
  computed: {
    date () {
      return this.todo.due_date.slice(0, 10)
    }
  }
}
</script>

<style scoped>
  .option {
    display: none;
  }
  .content:hover .option {
    display: flex;
  }
</style>

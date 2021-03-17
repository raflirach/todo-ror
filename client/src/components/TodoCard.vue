<template>
  <div>
    <div class="card" v-if="isEdit === todo.id">
        <input type="text" placeholder="title" v-model="title" class="input w-full" />
        <input type="date" v-model="dueDate" class="input" />
        <div class="flex gap-1">
          <button class="btn-blue" @click="editTodo">save</button>
          <button class="btn-red" @click="setIsEdit('')">cancel</button>
        </div>
      </div>
    <div v-else class="content relative card">
      <div class="text-md">{{ todo.title }}</div>
      <div class="text-sm text-gray-500">{{ date }}</div>
      <div class="option absolute top-1 right-2 flex gap-1">
        <button @click="setIsEdit(todo.id)"><i class="fas fa-pen"></i></button>
        <button @click="deleteTodo"><i class="fas fa-trash"></i></button>
      </div>
      <div class="option absolute bottom-1 right-2 flex gap-1">
        <button @click="setPriority(false)" class="btn-red" v-if="!todo.status && todo.priority">unpriority</button>
        <button @click="setPriority(true)" class="btn-blue" v-if="!todo.status && !todo.priority">set priority</button>
        <button @click="markAsDone(true)" class="btn-green" v-if="!todo.status">mark as done</button>
        <button @click="markAsDone(false)" class="btn-red" v-if="todo.status">undone</button>
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

<template>
  <div class="container-todo">
    <div class="container-card">
      <div class="mb-4">Undone</div>
      <div class="flex justify-between mb-2">
        <button class="btn-blue" @click="addUndone(true)"><i class="fas fa-plus"></i> Add</button>
        <div>
          <label>Sort by:</label>
          <select v-model="undoneSort">
            <option value="due_date">due date</option>
            <option value="title">title</option>
          </select>
        </div>
      </div>
      <div class="container-add" v-if="isAddUndone">
        <input type="text" placeholder="title" v-model="title" class="input w-full" />
        <input type="date" v-model="dueDate" class="input" />
        <div class="flex gap-1">
          <button class="btn-blue" @click="addUndoneTodo">save</button>
          <button class="btn-red" @click="addUndone(false)">cancel</button>
        </div>
      </div>
      <div v-for="todo in undoneTodo" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
    <div class="container-card">
      <div class="mb-4">Priority</div>
      <div class="mb-2">
        <label>Sort by:</label>

        <select v-model="prioritySort">
          <option value="due_date">due date</option>
          <option value="title">title</option>
        </select>
      </div>
      <div v-for="todo in priorityTodo" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
    <div class="container-card">
      <div class="mb-4">Done</div>
      <div class="mb-2">
        <label>Sort by:</label>

        <select v-model="doneSort">
          <option value="due_date">due date</option>
          <option value="title">title</option>
        </select>
      </div>
      <div v-for="todo in doneTodo" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCard from './TodoCard.vue'
export default {
  components: { TodoCard },
  name: 'TodoContainer',
  props: ['todos'],
  data () {
    return {
      prioritySort: 'due_date',
      undoneSort: 'due_date',
      doneSort: 'due_date',
      isAddUndone: false,
      title: '',
      dueDate: ''
    }
  },
  watch: {
    prioritySort (value) {
      this.$store.commit('changePrioritySort', value)
    },
    undoneSort (value) {
      this.$store.commit('changeUndoneSort', value)
    },
    doneSort (value) {
      this.$store.commit('changeDoneSort', value)
    }
  },
  methods: {
    addUndone (status) {
      this.title = ''
      this.dueDate = ''
      this.isAddUndone = status
    },
    addUndoneTodo () {
      const { title, dueDate } = this
      const payload = { title, dueDate, status: false, priority: false }
      this.$store.dispatch('addTodo', payload)
      this.isAddUndone = false
    }
  },
  computed: {
    doneTodo () {
      return this.$store.getters.doneTodo
    },
    undoneTodo () {
      return this.$store.getters.undoneTodo
    },
    priorityTodo () {
      return this.$store.getters.priorityTodo
    }
  }
}
</script>

<style>

</style>

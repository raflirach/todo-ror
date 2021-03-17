<template>
  <div class="w-full h-full grid grid-cols-3 gap-4 p-4">
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Undone</div>
      <div class="flex justify-between mb-2">
        <button
          class="bg-blue-500 px-4 rounded text-white text-sm shadow-md"
          @click="addUndone(true)"
        ><i class="fas fa-plus"></i> Add</button>
        <div>
          <label>Sort by:</label>
          <select v-model="undoneSort">
            <option value="due_date">due date</option>
            <option value="title">title</option>
          </select>
        </div>
      </div>
      <div class="border rounded w-full shadow-md text-left p-2 mb-2" v-if="isAddUndone">
        <input type="text" placeholder="title" v-model="title" class="border border-black my-1 p-1 rounded text-black w-full text-sm" />
        <input type="date" v-model="dueDate" class="border border-black my-1 p-1 rounded text-black text-sm" />
        <div class="flex gap-1">
          <button
            class="bg-blue-500 px-2 rounded text-white text-sm shadow-md"
            @click="addUndoneTodo"
          >save</button>
          <button
            class="bg-red-500 px-2 rounded text-white text-sm shadow-md"
            @click="addUndone(false)"
          >cancel</button>
        </div>
      </div>
      <div v-for="todo in undoneTodo" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Priority</div>
      <div>
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
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Done</div>
      <div>
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

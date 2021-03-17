<template>
  <div class="w-full h-full grid grid-cols-3 gap-4 p-4">
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Undone</div>
      <div>
        <label>Sort by:</label>

        <select v-model="undoneSort">
          <option value="due_date">due date</option>
          <option value="title">title</option>
        </select>
      </div>
      <div v-for="todo in undoneTodo" :key="todo.id">
        <div v-if="!todo.status && !todo.priority">
          <todo-card :todo="todo"/>
        </div>
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
        <div v-if="todo.priority && !todo.status">
          <todo-card :todo="todo"/>
        </div>
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
        <div v-if="todo.status">
          <todo-card :todo="todo"/>
        </div>
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
      doneSort: 'due_date'
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

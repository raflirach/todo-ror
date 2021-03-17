<template>
  <div class="w-full h-full grid grid-cols-3 gap-4 p-4">
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Undone</div>
      <div v-for="todo in todos" :key="todo.id">
        <div v-if="!todo.status && !todo.priority">
          <todo-card :todo="todo"/>
        </div>
      </div>
    </div>
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Priority</div>
      <div v-for="todo in todos" :key="todo.id">
        <div v-if="todo.priority && !todo.status">
          <todo-card :todo="todo"/>
        </div>
      </div>
    </div>
    <div class="border rounded shadow-md px-4 py-2">
      <div class="mb-4">Done</div>
      <div v-for="todo in todos" :key="todo.id">
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
  props: ['todos']
}
</script>

<style>

</style>

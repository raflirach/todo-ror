<template>
  <div class="content relative border rounded w-full shadow-md text-left p-2 mb-2">
    <div>{{ todo.title }}</div>
    <div>{{ todo.due_date }}</div>
    <div class="option absolute top-0 right-2 flex gap-1">
      <button><i class="fas fa-pen"></i></button>
      <button @click="deleteTodo"><i class="fas fa-trash"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: ['todo'],
  methods: {
    deleteTodo () {
      const { id } = this.todo
      this.$store.dispatch('deleteTodo', id)
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

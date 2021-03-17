<template>
  <div class="w-full h-screen flex flex-col pt-14">
    <navbar />
    <div> Home </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
// @ is an alias to /src

export default {
  components: { Navbar },
  name: 'Home'
}
</script>

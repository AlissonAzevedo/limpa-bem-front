<template>
  <div class="w-full flex flex-col">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  name: 'App',
  components:{
    NavBar
  }
}
</script>

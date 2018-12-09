<template>
  <div class="home">
    <TopicList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopicList from '@/components/TopicList.vue'

export default {
  name: 'home',
  components: {
    TopicList
  }
}
</script>

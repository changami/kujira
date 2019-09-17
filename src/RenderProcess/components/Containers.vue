<template>
    <div class="container-wrapper">
        <container v-for="container in this.containers" :key="container.id" :container="container"></container>
    </div>
</template>

<style scoped>
    .container-wrapper {
        padding: 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>

<script lang="ts">
  import {mapGetters} from 'vuex'
  import {GET_CONTAINERS} from '../store/action-types'
  import Container from "./parts/Container.vue"

  export default {
    components: {
      Container,
    },
    computed: {
      ...mapGetters({
        containers: 'containers',
      }),
    },
    mounted: function () {
      this.$store.dispatch(GET_CONTAINERS);
    }
  }
</script>

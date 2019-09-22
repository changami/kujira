<template>
  <div class="container-wrapper">
    <container v-for="container in containers" :key="container.id" :container="container" />
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
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import { GET_CONTAINERS } from '../store/action-types';
  import Container from './parts/Container.vue';

  @Component({ components: { Container } })
  export default class Containers extends Vue {
    intervalId: NodeJS.Timeout = null;

    get containers(): ContainerData[] { // TODO: compromised code because mapGetters is not working. "computed: mapGetters['containers']"
      return this.$store.state.containers;
    }

    mounted() {
      this.$store.dispatch(GET_CONTAINERS);

      this.intervalId = setInterval((): void => {
        this.$store.dispatch(GET_CONTAINERS);
      }, 5000);
    }

    beforeDestroy() {
      clearInterval(this.intervalId);
    }
  }
</script>

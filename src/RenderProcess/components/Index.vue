<template>
  <div>
    <h1>This is Top page!</h1>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';

  @Component
  export default class Index extends Vue {
    mounted() {
    }
  }
</script>

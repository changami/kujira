<template>
    <div class="content" :class="{running: isRunning}">
        <p class="name">{{container.names}}</p>
        <p>{{container.status}}</p>
    </div>
</template>

<style scoped>
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .content {
        background-color: #fbf7fe;
        border-radius: 4px;
        color: #545760;
        margin-bottom: 16px;
        padding: 8px;
        text-align: center;
        width: 30%;
    }

    .name {
        font-size: 1.25em;
    }

    .running {
        color: #e0e0e0;
        background-color: #5f4b8b;
    }
</style>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue,
  } from 'vue-property-decorator';

  @Component
  export default class Container extends Vue {
    @Prop({ default: {} })
    container!: ContainerData;

    get isRunning() {
      return !!this.container.status.match(/^Up/);
    }

    mounted() {
    }
  }
</script>

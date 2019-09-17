<template>
    <div id="app">
        <application-header></application-header>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import {
    ipcRenderer,
    IpcRendererEvent,
    MessageBoxOptions,
    remote,
  } from 'electron';
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import ApplicationHeader from './components/ApplicationHeader.vue';

  ipcRenderer.on('no-docker', async (event: IpcRendererEvent) => {
    const options: MessageBoxOptions = {
      type: 'error',
      title: 'No Docker Error',
      message: 'You need Docker to use this application.\n\n' +
        'https://docs.docker.com/engine/installation/',
      buttons: ['OK'],
    };
    const buttonIndex = await remote.dialog.showMessageBox(remote.getCurrentWindow(), options);
    console.log(buttonIndex);

    remote.app.quit();
  });

  @Component({ components: { ApplicationHeader } })
  export default class Application extends Vue {
    mounted() {
    }
  }
</script>

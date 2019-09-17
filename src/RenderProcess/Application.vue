<template>
    <div id="app">
        <application-header></application-header>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import ApplicationHeader from "./components/ApplicationHeader.vue"
  const {ipcRenderer, remote} = require('electron');

  ipcRenderer.on('no-docker', function (event) {
    const options = {
      type: 'error',
      title: 'No Docker Error',
      message: 'You need Docker to use this application.\n\n' +
      'https://docs.docker.com/engine/installation/',
      buttons: ['OK'],
    };
    remote.dialog.showMessageBox(remote.getCurrentWindow(), options,
      (buttonIndex) => {
        remote.app.quit();
      });
  });

  export default {
    name: 'app',
    components: {
      ApplicationHeader,
    },
    mounted: function () {
    }
  }
</script>

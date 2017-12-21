<template>
    <div>
        <h1>This is Images page!</h1>
    </div>
</template>

<script>
  import {GET_CONTAINERS} from '../store/action-types'

  module.exports = {
    mounted: function () {
      this.$store.dispatch(GET_CONTAINERS);
    }
  }
</script>

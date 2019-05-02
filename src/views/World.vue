<template>
  <div>
    <h1>World View</h1>

    <div>Seconds viewing this page: {{ counter }}</div>
  </div>

</template>

<script>
export default {
  name: 'world-view',

  data: () => ({
    counterInterval : 0,
    counter : 0
  }),

  title() {
    return 'WoRlD';
  },

  mounted() {
    this.counterInterval = setInterval (() => this.counter++, 1000);
  },

  beforeDestroy() {
    console.log ("Destroy interval", this.counterInterval);
    clearInterval (this.counterInterval);
  }
}
</script>
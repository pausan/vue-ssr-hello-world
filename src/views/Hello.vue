<template>
  <div>
    <h1>Hello View</h1>

    <div>
      <hi-component></hi-component>
    </div>

    <div>Server prerendered content here: {{ serverOnly }} {{ both }} </div>
    <div>Client dynamic content only here: {{ clientOnly }} {{ both }} </div>
  </div>

</template>

<script>
import HiComponent from '../components/HiComponent.vue'

export default {
  name: 'hello-view',

  components : {
    HiComponent
  },

  asyncData ({ store }) {
    return store.dispatch ('fetchItems')
  },

  created () {
    this.both = 'both';
  },

  data: () => ({
    both : 'empty',
    serverOnly : 'empty',
    clientOnly : 'empty'
  }),

  serverPrefetch () {
    // Server-rendered code will contain 'server-only' string, whereas
    // client won't run this code but 'mounted' event
    this.serverOnly = 'server-only'
    this.both += '-server';
  },

  mounted () {
    // Server won't run this code, only client
    this.clientOnly = 'client-only'
    this.both += '-client';
  },

  title() {
    return 'hello';
  }
}
</script>
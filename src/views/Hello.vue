<template>
  <div>
    <h1>Hello View</h1>
    <p>
      Please navigate from this page to /world and back, and try to reloading one page and then the other.
      You'll see some differences between the server rendered html and the client rendered html depending
      on who renders the data initially. Please note that on this example data is cached once it is loaded.
    </p>

    <p>Look at the title of this page as well</p>

    <div v-for="item in allItems">
      <hi-component :item="item"></hi-component>
    </div>

    <div  style="margin-top: 40px">
      Server prerendered content here:
      <ul>
        <li>{{ serverOnly }}</li>
        <li>{{ both }} </li>
      </ul>
    </div>
    <div>
      Client dynamic content only here:
      <ul>
        <li>{{ clientOnly }}</li>
        <li>{{ both }} </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
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

  computed : mapState({
    allItems : state => state.items
  }),

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
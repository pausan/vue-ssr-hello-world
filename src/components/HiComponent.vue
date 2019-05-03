<template>
  <div>hi {{ item.id }}: {{ item.value }}</div>
</template>

<script>
export default {
  name : 'hi-component',
  props : {
    item : Object
  }
}
</script>
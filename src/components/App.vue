<template>
  <router-view />
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  min-height: 100%;
  height: 100%;
}
</style>

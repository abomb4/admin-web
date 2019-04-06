<template>
  <root-layout msg="sggggggg">
    <router-view />
  </root-layout>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RootLayout from '@/components/layouts/RootLayout.vue';

@Component({
  components: {
    RootLayout
  }
})
export default class App extends Vue {

}
</script>

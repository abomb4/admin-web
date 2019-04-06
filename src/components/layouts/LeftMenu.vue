<template>
  <i-menu class="aw-root-layout-left-menu" active-name="1-2" theme="dark" width="auto">
    <i-menu-item name="1-1">
      <i-icon type="ios-navigate" />
      <span>Option 1</span>
    </i-menu-item>
    <i-menu-item name="1-2">
      <i-icon type="ios-search" />
      <span>Option 2</span>
    </i-menu-item>
    <i-menu-item name="1-3">
      <i-icon type="ios-settings" />
      <span>Option 3</span>
    </i-menu-item>
  </i-menu>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Menu } from 'iview';

@Component
export default class LeftMenu extends Vue {
  @Prop() private menuList!: Menu[];
}
</script>

<!--
  The layout looks like:
  +--------------------------+
  | lg | =           O xx xx |
  |    |---------------------|
  | -- | +-----------------+ |
  | -- | | ---- routerview | |
  | -- | | --------------- | |
  | -- | | --------------- | |
  | -- | | --------------- | |
  |    | | --------------- | |
  |    | +-----------------+ |
  |    |---------------------|
  |    |       footer        |
  +--------------------------+
-->
<template>
  <i-layout class="aw-root-layout">
    <i-sider ref="sider" class="aw-root-layout-sider"
             hide-trigger collapsible :collapsed-width="78"
    >
      <div class="wrapper">
        <div class="aw-logo">
          <svg viewBox="0 0 2300 580" fill="#3399ff">
            <path d="M535.441,412.339A280.868,280.868 0 1,1 536.186,161.733L284.493,286.29Z" />
            <text x="660" y="450" style="font-size: 420px;" fill="#ffffff">Admin</text>
          </svg>
        </div>
        <left-menu />
      </div>
    </i-sider>
    <i-layout class="aw-root-layout-main">
      <div class="wrapper">
        <i-header class="aw-root-layout-header">
          <i-icon type="md-menu" size="24" @click.native="collapsedSider" />
        </i-header>
        <i-content class="aw-root-layout-content">
          <slot />
          <router-view />
        </i-content>
        <i-footer class="aw-root-layout-footer">
          The administration web application based on vue by abomb4.
        </i-footer>
      </div>
    </i-layout>
  </i-layout>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LeftMenu from './LeftMenu.vue';

@Component({
  components: {
    LeftMenu
  }
})
export default class RootLayout extends Vue {
  @Prop({ default: 'a' }) msg!: string;
}
</script>

<style lang="scss">

$aw-header-height: 64px;
$aw-footer-height: 64px;

html, body, .aw-root-layout {
  height: 100%;
}

.aw-root-layout {
  background-color: $aw-color-bg-background;
  position: relative;
  overflow: hidden;
  height: 100%;

  .ivu-layout {
    background: $aw-color-bg-background;
    background-color: $aw-color-bg-background;
  }

  .aw-root-layout-sider, .ivu-menu-dark {
    background-color: $aw-color-bg-background-reserve;
  }

  .aw-root-layout-sider {

    .ivu-layout-sider-children > .wrapper {
      overflow-x: hidden;
      padding-bottom: 48px;
      height: 100%;
    }
  }
  .aw-logo {
    height: $aw-header-height;
    padding: $aw-padding-normal;
    & > svg {
      height: 100%;
    }
  }
  .aw-root-layout-header {
    padding: 0 $aw-padding-normal;
    background: $aw-color-bg;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    text-align: left;
  }
  .menu-icon {
    transition: all .3s;
  }

  .aw-root-layout-main {
    overflow: hidden;
    & > .wrapper {
      position: relative;
      overflow-x: hidden;
    }
  }

  .aw-root-layout-content {
    margin: $aw-padding-big;
    box-sizing: border-box;
    background-color: $aw-color-bg;
  }

  .aw-root-layout-footer {
    bottom: 0;
    width: 100%;
    color: $aw-color-fg;
    text-align: center;
    background-color: $aw-color-bg-background;
  }
}
</style>

<template>
  <div class="aw-root-layout">
    <i-layout>
      <i-sider ref="side1" v-model="isCollapsed" hide-trigger collapsible :collapsed-width="78">
        <i-menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
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
      </i-sider>
      <i-layout>
        <i-header :style="{padding: 0}" class="layout-header-bar">
          <i-icon
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
            @click.native="collapsedSider"
          />
        </i-header>
        <i-content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <slot />
        </i-content>
      </i-layout>
    </i-layout>
    <i-footer class="layout-footer-center">
      abomb4
    </i-footer>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RootLayout extends Vue {
  @Prop({ default: 'a' }) msg!: string;
}
</script>

<style lang="scss">
.aw-root-layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    text-align: left;
  }
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon {
    transition: all .3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
</style>

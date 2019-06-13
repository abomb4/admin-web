<template>
  <div>
    <i-menu class="aw-root-layout-left-menu" active-name="1-2" theme="dark" width="auto">
      <i-menu-item name="1-1">
        <i-icon type="ios-navigate" />
        <span @click="setId('1')">Option 1</span>
      </i-menu-item>
      <i-menu-item name="1-2">
        <i-icon type="ios-search" />
        <span @click="setId('2')">Option 2</span>
      </i-menu-item>
      <i-menu-item name="1-3">
        <i-icon type="ios-settings" />
        <span @click="setId('3')">Option 3</span>
      </i-menu-item>
      <i-menu-item name="1-4">
        <i-icon type="ios-settings" />
        <span><router-link to="/login">LOGIN</router-link></span>
      </i-menu-item>
    </i-menu>
    <div style="width: 400px; height: 400px;font-size: 200px;color: white;">{{ id }}</div>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Menu } from 'iview';

@Component({
})
export default class LeftMenu extends Vue {
  @Prop() private menuList!: Menu[];

  public id: string = '0';

  mounted() {
    const id = this.$route.query['id'];
    if (id) {
      if (id instanceof Array) {
        this.id = id[0] || '0';
      } else {
        this.id = id;
      }
    }
  }

  public setId(id: string) {
    this.id = id;
    this.$router.replace(this.$route.path + `?id=${this.id}`);
  }
}
</script>

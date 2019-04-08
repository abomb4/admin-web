<template>
  <div class="aw-login-page">
    <div class="aw-login-page-main">
      <div class="aw-login-page-post">
        <h1>Hello, Welcome!</h1>
        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div class="aw-login-page-form-container">
        <div class="title">Login</div>
        <login-form
          ref="formData"
          :form-data="formData"
          @loginFormSubmit="handleLoginFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/login/LoginForm.vue';

@Component({ components: { LoginForm } })
export default class LoginController extends Vue {
  private formData = {
    username: '',
    password: ''
  }

  private loading: boolean = false;

  handleLoginFormSubmit = (a: any) => {
    this.handleSubmit('formData');
  }

  private handleSubmit = (formName: string) => {
    console.log(this.$refs);
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        console.log('VALIDATE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } else {
        this.$Message.error('Please validate your login information input!');
      }
    });
  }
}
</script>

<style lang="scss">
.aw-login-page {
  height: 100%;
  background-color: #000fff33;
  // This beautiful background is from https://www.pexels.com/photo/background-blur-clean-clear-531880
  // They said that jpg is free to use.
  background-image: url('~@/assets/background.jpg');
  background-size: cover;
  background-position: center top;

  .ivu-form {
    width: 200px;
  }

  .aw-login-page-main {
    position: relative;
  }

  .aw-login-page-post {
    position: absolute;
    top: calc(38.2vh - 160px);
    left: 100px;
    color: $aw-color-fg-reserve;
    font-size: 32px;
    font-weight: bold;
    // background-color: #f0f00033;
    width: 550px;
    height: 400px;
    text-shadow: 2px 2px 12px #1b1d1e;

    h1 {
      font-size: 40px;
      line-height: 100px;
    }

    p {
      line-height: 50px;
    }
  }
  .aw-login-page-form-container {
    padding: $aw-padding-big;
    background-color: $aw-color-bg;
    position: absolute;
    right: 200px;
    top: calc(38.2vh - 103px);
    width: 255px;
    border-radius: 6px;
    box-shadow: 2px 2px 12px #1b1d1e;

    .title {
      margin-bottom: $aw-padding-normal;
      padding-bottom: $aw-padding-small;
      border-bottom: 1px solid $aw-color-border-light;
    }
  }
}
</style>

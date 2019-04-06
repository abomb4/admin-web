<template>
  <login
    :form-data="formData"
    @loginFormSubmit="handleLoginFormSubmit"
  />
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Login from '@/components/views/Login.vue';

@Component({ components: { Login } })
export default class LoginController extends Vue {
  private formData = {
    username: '',
    password: ''
  }

  private loading: boolean = false;

  handleLoginFormSubmit = (a: any) => {
    console.log('formData', this.formData);
  }
}
</script>

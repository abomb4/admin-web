<template>
  <div class="aw-login-page">
    <i-form ref="formData" :model="formData" :rules="ruleInline" inline>
      <i-form-item prop="username">
        <i-input v-model="formData.username" type="text" placeholder="Username">
          <i-icon slot="prepend" type="ios-person-outline" />
        </i-input>
      </i-form-item>
      <i-form-item prop="password">
        <i-input v-model="formData.password" type="password" placeholder="Password">
          <i-icon slot="prepend" type="ios-lock-outline" />
        </i-input>
      </i-form-item>
      <i-form-item>
        <i-button type="primary" :disabled="loading" @click="handleSubmit('formData')">
          Signin
        </i-button>
      </i-form-item>
    </i-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  @Prop({ default: { username: '', password: '' } })
  private formData!: { username: string, password: string, };

  @Prop({ default: false })
  private loading!: boolean;

  private ruleInline = {
    username: [
      { required: true, message: 'Please fill in the user name', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Please fill in the password.', trigger: 'blur' },
      { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
    ]
  }

  @Emit('loginFormSubmit')
  private emitLoginFormSubmit() {
  }

  private handleSubmit = (formName: string) => {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.emitLoginFormSubmit();
      } else {
        this.$Message.error('Please validate your login information input!');
      }
    });
  }
}
</script>

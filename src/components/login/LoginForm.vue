<template>
  <i-form ref="loginFormData" :model="loginFormData" :rules="ruleInline" inline>
    <i-form-item prop="username">
      <i-input v-model="loginFormData.username" type="text" placeholder="Username">
        <i-icon slot="prepend" type="ios-person-outline" />
      </i-input>
    </i-form-item>
    <i-form-item prop="password">
      <i-input v-model="loginFormData.password" type="password" placeholder="Password">
        <i-icon slot="prepend" type="ios-lock-outline" />
      </i-input>
    </i-form-item>
    <i-form-item>
      <i-button type="primary" :disabled="loading" @click="emitLoginFormSubmit">
        SIGN IN !!!
      </i-button>
    </i-form-item>
  </i-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  @Prop({ default: () => ({ username: '', password: '' }) })
  private loginFormData!: { username: string, password: string, };

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

  /**
   * Expose form validation method
   */
  public validate(callback: (valid: boolean) => void) {
    (this.$refs['loginFormData'] as any).validate(callback);
  }
}
</script>

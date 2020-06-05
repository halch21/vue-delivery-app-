<template>
    <div
    @click.self="$store.commit('closeLoginForm')"
    class="registration-container">
        <h1>Регистрация</h1>
        <div class="main-form">
<!--             <BaseInput
            v-model="name"
            label="Имя"
            type="text"
            class="main-form__input"/>
 -->
            <BaseInput
            v-model="email"
            label="Адрес электронной почты"
            type="email"
            class="main-form__input"/>

            <span
            v-if="emailError"
            class="main-form__error">
                {{ emailError }}
            </span>

<!--             <BaseInput
            v-model="phone"
            label="Телефон"
            type="text"
            class="main-form__input"/>
 -->
            <BaseInput
            v-model="password"
            label="Пароль"
            type="password"
            class="main-form__input"/>

            <span
            v-if="passwordError"
            class="main-form__error">
                {{ passwordError }}
            </span>

            <BaseInput
            v-model="passwordRepeat"
            label="Повторите пароль"
            type="password"
            class="main-form__input"/>

            <span
            v-if="passwordRepeatError"
            class="main-form__error">
                {{ passwordRepeatError }}
            </span>

            <BaseButton
            :disabled="!validForm"
            :loading="$store.getters.isLoading"
            @click="submit"
            class="registration__button">Зарегестрироваться</BaseButton>

            <span
            v-if="registrationError"
            class="main-form__error">
                {{ registrationError }}
            </span>

        </div>
    </div>
</template>

<script>
  import BaseInput from "@/components/blocks/BaseInput";
  import BaseButton from "@/components/blocks/BaseButton";

  export default {
    name: "Login",
    components: {
      BaseInput,
      BaseButton,
    },
    methods: {
      submit() {
        console.log(this.name, this.password);
        this.$store.dispatch('createUser', {
            name: this.name,
            email: this.email,
            password: this.password
        })
        .then(data => {
          if (data.user) {
            console.log('created', data.user);
          }
          console.log('data', data);
        })
        .catch(error => {
          console.log('registration error', error);
        })
      },
    },
    computed: {
      validEmail() {
        // const pattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const pattern =/.+@.+\..+/;
        return pattern.test(String(this.email).toLowerCase());
      },
      validForm() {
        return this.email
          && this.password
          && this.passwordRepeat
          && !this.emailError
          && !this.passwordError
          && !this.passwordRepeatError;
      },
      emailError() {
        if ( this.email.length === 0) return null;

        return this.validEmail? '' : 'Неверный формат email'
      },
      passwordError() {
        if ( this.password.length === 0) return null;
        if (this.password.length < 8) return 'Пароль должен содержать не менее 8 символов';
        return null;
      },
      passwordRepeatError() {
        if (this.passwordRepeat.length === 0) return null;
        if (this.password !== this.passwordRepeat) return 'Пароли не совпадают';
        return null;
      },
      registrationError() {
        return this.$store.getters.getRegistrationError;
      }

    },
    data: () => {
      return {
        name: '',
        phone: '',
        email: '',
        password: '',
        passwordRepeat: '',
      }
    }
  }
</script>

<style scoped lang="scss">
    .registration-container {
        max-width: 400px;
    }
    .registration__button {
        margin-top: 24px;
    }
    .main-form__error {
        font-size: 14px;
        color: #ff4343;
    }

    .main-form__input {
        margin-top: 14px;
    }
</style>

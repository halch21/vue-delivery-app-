<template>
    <div
    id='popUp'
    @click.self="$store.commit('closeLoginForm')"
    class="popup-layout">
        <div class="main-form">
            <BaseInput
            id="login"
            v-model="login"
            label="Логин"
            type="email"
            class="main-form__input"/>

            <BaseInput
            id="password"
            v-model="password"
            label="Пароль"
            type="password"
            class="main-form__input"/>

            <BaseButton
            ref="sign"
            :disabled="!!errors.length"
            :loading="$store.getters.isLoading"
            @click.native="signIn()">
                Войти
            </BaseButton>
            <span> У вас ещё нет аккаунта?
                <a class="link" id='reg' @click="go('Registration')">Зарегистрироваться</a>
            </span>
            <span>
                {{ errorMessage }}
                {{ authError }}
            </span>
            <div
            @click="$store.commit('closeLoginForm')"
            class="main-form__icon">
                <span class="material-icons">
                    close
                </span>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseInput from "./blocks/BaseInput";
  import BaseButton from "./blocks/BaseButton";


  export default {
    name: "Login",
    components: {
      BaseInput,
      BaseButton,
    },
    computed: {
      errors() {
        const errors = [];
         if (this.login.length === 0) errors.push('Поле логин обязательно для заполенения');
         if (this.password.length === 0) errors.push('Поле пароль обязательно для заполенения');
        return errors;
      },
      authError() {
        return this.$store.getters.getAuthError;
      }
    },
    methods: {
      closeLoginForm() {
        this.$store.commit('closeLoginForm');
      },
      go(page) {
        this.closeLoginForm();
        this.$router.push({name: page});
      },
      signIn() {
        this.$store.dispatch('signIn', {
          email: this.login,
          password: this.password,
        })
      }
    },
    data: () => {
      return {
        login: '',
        password: '',
        errorMessage: '',
        isDirty: false,
      }
    }
  }
</script>

<style scoped lang="scss">
    .popup-layout {
        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, .6);
        z-index: 100;
    }
    .main-form {
        height: 340px;
        min-width: 200px;
        flex-basis: 100%;
        max-width: 400px;
        background-color: #fff;
        padding: 34px 22px;
        margin: 0 14px;
        position: relative;
    }
    .main-form__input {
        margin-top: 14px;
    }
    .main-form__icon {
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 10px;
        color: #828282;
    }
    .link {
        text-decoration: underline;
        color: #5c6bc0;
        cursor: pointer;
    }
    .loader {
        margin: 0 auto;
    }
</style>

<template>
  <div class="order-page">
    <div class="order-page__header">
      <button
      @click="$router.go(-1)">Вернуться в меню</button>
      <h1>Оформление заказа</h1>
    </div>


    <div class="order-page__main">
      <div
      v-if="isLoading"
      class="order-page__loader">
        <BaseLoader/>
      </div>

      <div
      v-else
      class="order-page__form">
        <h2>Доставка</h2>
        <BaseInput
        v-model="phone"
        label="Телефон для связи*"
        type="text"
        maxLength="12"
        class="order-page__input"/>

        <BaseInput
        v-model="address"
        label="Адрес доставки*"
        type="text"
        class="order-page__input"/>

        <div class="order-page__input-row">
          <BaseInput
          v-model="porch"
          label="Подъезд"
          type="text"
          class="order-page__input"/>

          <BaseInput
          v-model="intercom"
          label="Домофон"
          type="text"
          class="order-page__input"/>

          <BaseInput
          v-model="floor"
          label="Этаж"
          type="number"
          class="order-page__input"/>

          <BaseInput
          v-model="room"
          label="Квартира"
          type="number"
          class="order-page__input"/>
        </div>

        <div class="order-page__input">
          <label for="comment">Комментарий</label>
          <textarea
          v-model="comment"
          id="comment"
          type="text"
          resize="none"/>
        </div>

        <BaseButton
        :disabled="isCartEmpty || !validAddress"
        @click="isLogged ? createOrder() : $store.commit('openLoginForm')"
        label="Заказать" />
        <div
        v-if="errorMessage"
        class="errorMessage">
          <span>{{ errorMessage }}</span>
        </div>
      </div>
      <div class="order-page__cart">
        <BasketDude
        hideOrderButton/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BasketDude from "../components/BasketDude";
import BaseInput from "../components/blocks/BaseInput";
import BaseButton from "../components/blocks/BaseButton";
import BaseLoader from "../components/blocks/BaseLoader";


export default {
  name: 'OrderPage',
  components: {
    BasketDude,
    BaseInput,
    BaseButton,
    BaseLoader,
  },
  computed: {
    fullAddress() {
      return `${this.address}, подъезд ${this.porch}, домофон ${this.intercom}, этаж ${this.floor}, квартира ${this.room}`
    },
    orderInfo() {
      return {
        address: this.fullAddress,
        phone: this.phone,
        comment: this.comment
      }
    },
    validAddress() {
      return this.phone.length && this.address.length
    },
    isLogged() {
      return this.$store.getters.getUser
    },
    isLoading() {
      return this.$store.getters.isLoading
    },
    isCartEmpty() {
      return this.$store.getters.getBasketItems.length === 0;
    },
    errorMessage() {
      if (!this.phone) return 'Телефон обязателен для заполения';
      if (!this.address) return 'Адрес обязателен для заполения';
      return ''
    }
  },
  methods: {
    createOrder() {
      this.$store.dispatch('createOrder', this.orderInfo);
    }
  },
  data() {
    return {
      phone: '',
      address: '',
      porch: '',
      intercom: '',
      floor: '',
      room: '',
      comment: '',
      error: false,
    }
  }
}
</script>

<style lang="scss">
  .order-page__main {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .order-page__form {
    flex-grow: 1;
    border-radius: 4px;
    margin-right: 16px;
    margin-bottom: 24px;
    padding: 8px 16px;
    box-sizing: border-box;
    box-shadow: 0 8px 8px 0 rgba(0,0,0,.04),
    0 -2px 8px 0 rgba(0,0,0,.04);
    background-color: #ffffff;
  }

  .order-page__input-row {
    margin-top: 18px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .order-page__input {
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .order-page__input {
    margin-top: 18px;

    textarea {
      width: 100%;
      padding: 4px 11px;
      color: rgba(0,0,0,.65);
      font-size: 14px;
      line-height: 1.5715;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: all .3s;
      resize: none;

      &:hover {
        border-color: #40a9ff;
        border-right-width: 1px !important;
      }

      &:focus {
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(24,144,255,.2);
      }

      &::placeholder {
        color: #bfbfbf;
      }
    }
  }

  .basket__meta {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .order-page__cart {
    min-width: 300px;
  }

  .errorMessage {
    text-align: center;
    color: #ff5722;
    margin: 8px;
  }

  .order-page__loader {
    margin: 20px auto;
  }
</style>

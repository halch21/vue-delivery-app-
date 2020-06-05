<template>
  <div class="admin-page">
    <div
    class="admin-header"
    :style="{
      'background-image': `url(${vendor.img})`
    }">
      <div class="admin-header__blackout">
        <div class="admin-header__wrap">
          <router-link
          tag="a"
          class="admin-header__link"
          to="/admin">
            <i class="material-icons admin-header__icon">
              keyboard_arrow_left
            </i>

            <span>
              Назад
            </span>
          </router-link>

          <div class="admin-header__title"> {{ vendor.name }}</div>
        </div>
      </div>
    </div>



    <div class="admin-menu-container">
      <BaseInput
      v-model="name"
      label="Название заведения"
      type="text"
      class="main-form__input"/>

      <BaseInput
      v-model="description"
      label="Описание заведения"
      type="text"
      class="main-form__input"/>

      <BaseInput
      v-model="price"
      label="Фото заведения"
      type="text"
      class="main-form__input"/>

      <BaseButton
      :loading="$store.getters.isLoading"
      class="registration__button">Сохранить изменения</BaseButton>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/blocks/BaseInput";
import BaseButton from "@/components/blocks/BaseButton";

export default {
  name: 'AdminEditItemPage',
  components: {
    BaseInput,
    BaseButton,
  },
  created() {
    this.$store.dispatch('updateVendor', '9ikeE3Xs4YZzMfQWEfYs');
    this.$store.dispatch('updateDishes', '9ikeE3Xs4YZzMfQWEfYs');
  },
  computed: {
    dishList() {
      return this.$store.getters.getDishes;
    },
    vendor() {
      return this.$store.getters.getCurrentVendor;
    }
  },
  data: () => {
    return {
      name: 'Имя товара',
      description: 'Описание товара',
      price: '300',
    }
  }
}
</script>

<style lang="scss">
  .admin-header {
    background-size: cover;
    background-position: center;
    height: 240px;
  }

  .admin-header__blackout {
    height: 100%;
    background-color: rgba(0,0,0, .5);
  }

  .admin-header__wrap {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    padding: 16px 0;
  }

  .admin-header__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    text-decoration: none;
  }

  .admin-header__icon {
    font-size: 32px;
  }

  .admin-header__title {
    font-size: 46px;
    font-weight: 700;
    color: #fff;
    margin-left: 32px;
  }

  .admin-menu-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .admin-menu {
    display: flex;
    flex-flow: row wrap;
  }

  .admin-menu__dish {
    min-width: 240px;
    width: calc(100% / 3 - 11px);
    overflow: hidden;
    flex-grow: 1;
    margin-bottom: 16px;
    margin-right: 16px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .admin-menu__main {
    flex-grow: 1;
    flex-shrink: 1;
  }

  .admin-menu__basket {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    width: 300px;
    margin-left: 18px;
    position: fixed;
    top: 70px;
    right: 0;
    background-color: #fff;
    height: 100%;
    box-shadow: 0 0px 8px 0 rgba(0,0,0,.04),
                0 0px 8px 0 rgba(0,0,0,.04)
  }

  .admin-info p{
    color: #555;
  }
</style>

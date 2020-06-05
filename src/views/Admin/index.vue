<template>
  <div class="admin-page">
    <div
    class="admin-header"
    :style="{
      'background-image': `url(${vendor.img})`
    }">
      <div class="admin-header__blackout">
        <div class="admin-header__wrap">
          <div class="admin-header__title"> {{ vendor.name }}</div>
        </div>
      </div>
    </div>

    <div class="admin-info">
      <h2> Информация </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid atque consectetur cum cupiditate delectus dolor earum error eveniet exercitationem, explicabo, fuga illo magni maiores minima molestiae molestias nisi non numquam obcaecati odio officia praesentium quaerat qui quia quibusdam ratione reiciendis rem sit tempora, ut veniam vero? Fugiat, perferendis.
      </p>
      <BaseButton
      class="admin-info__button"
      label="Изменить"
      @click="go(dish)"
      />
    </div>

    <div class="admin-menu-container">
      <div class="admin-menu__main">
        <h1> Меню </h1>
        <div class="admin-menu">
          <AdminDishItem
          v-for="dish in dishList"
          :key="dish.id"
          :dish="dish"
          class="admin-menu__dish"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminDishItem from "./AdminDishItem";
import BaseButton from "@/components/blocks/BaseButton";

export default {
  name: 'Admin',
  components: {
    AdminDishItem,
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
    flex-flow: row nowrap;
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
    box-shadow: 0 0 8px 0 rgba(0,0,0,.04),
                0 0 8px 0 rgba(0,0,0,.04)
  }

  .admin-info p{
    color: #555;
  }

  .admin-info__button {
    width: 120px;
  }
</style>

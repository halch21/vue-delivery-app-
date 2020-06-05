<template>
    <div
    @click="$emit('click')"
    class="dish-item">
        <div class="dish-item__img"
        :style="{
        'background-image': dish.img ? `url(${dish.img})` : ''
        }"/>

        <div class="dish-item__wrap">
            <div class="dish-item__title">
                {{ dish.title }}
            </div>
            <div class="dish-item__description">
                {{ dish.description }}
            </div>
            <div class="dish-item__order-row">
                <BaseButton
                class="dish-item__button"
                label="В корзину"
                @click="$store.dispatch('addItemToBasket', dish)"
                />
                <div class="dish-item__price">{{ dish.price }}  ₽ </div>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseButton from "./blocks/BaseButton";

  export default {
    name: "DishItem",
    props: {
      dish: {
        type: Object,
        required: true,
      },
    },
    components: {
      BaseButton,
    }
  }
</script>

<style scoped lang="scss">
    .dish-item {
        background-color: #ffffff;
        box-shadow: 0 8px 8px 0 rgba(0,0,0,.04),
                    0 -2px 8px 0 rgba(0,0,0,.04);
        transition: box-shadow 150ms ease-in-out;
        &:hover {
            box-shadow: 0 4px 4px 0 rgba(0,0,0,.1),
                        0 2px 4px 0 rgba(0,0,0,.04);
        }
    }
    .dish-item__img {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 300px;

        img {
            width: 100%;
        }
    }
    .dish-item__description {
        font-size: 14px;
        color: #828282;
        margin: 12px 0;
    }
    .dish-item__wrap {
        padding: 14px 16px;
    }
    .dish-item__order-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .dish-item__button {
        margin-right: 18px;
        flex-shrink: 1;
    }

    .dish-item__price {
        font-weight: bold;
        flex-shrink: 0;
    }
</style>

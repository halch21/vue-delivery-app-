<template>
    <div
    @click="$emit('click')"
    class="admin-dish-item">
        <div class="admin-dish-item__img"
        :style="{
        'background-image': dish.img ? `url(${dish.img})` : ''
        }"/>

        <div class="admin-dish-item__wrap">
            <div class="admin-dish-item__title">
                {{ dish.title }}
            </div>
            <div class="admin-dish-item__description">
                {{ dish.description }}
            </div>
            <div class="admin-dish-item__order-row">
                <BaseButton
                class="admin-dish-item__button"
                label="Изменить"
                @click="go(dish)"
                />
                <div class="admin-dish-item__price">{{ dish.price }}  ₽ </div>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseButton from "@/components/blocks/BaseButton";

  export default {
    name: "AdminDishItem",
    props: {
      dish: {
        type: Object,
        required: true,
      },
    },
    components: {
      BaseButton,
    },
    methods: {
      go(item) {
        this.$router.push(`admin/${item.id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
    .admin-dish-item {
        background-color: #ffffff;
        box-shadow: 0 8px 8px 0 rgba(0,0,0,.04),
                    0 -2px 8px 0 rgba(0,0,0,.04);
        transition: box-shadow 150ms ease-in-out;
        &:hover {
            box-shadow: 0 4px 4px 0 rgba(0,0,0,.1),
                        0 2px 4px 0 rgba(0,0,0,.04);
        }
    }
    .admin-dish-item__img {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 300px;

        img {
            width: 100%;
        }
    }
    .admin-dish-item__description {
        font-size: 14px;
        color: #828282;
        margin: 12px 0;
    }
    .admin-dish-item__wrap {
        padding: 14px 16px;
    }
    .admin-dish-item__order-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .admin-dish-item__button {
        margin-right: 18px;
        flex-shrink: 1;
    }

    .admin-dish-item__price {
        font-weight: bold;
        flex-shrink: 0;
    }
</style>

<template>
    <div class="basket__container">
        <div
        v-if="$store.getters.getTotalPrice === 0"
        class="basket__empty"
        >
            <span>В корзине пока пусто</span>
        </div>

        <div
        v-else
        class="basket__not-empty">
            <div class="basket__header">
                <h1>Мой заказ</h1>
                <span
                id='clear'
                @click="$store.commit('clearAllBasket')"
                class="basket__clear material-icons">delete</span>
            </div>

            <div class="basket__orderInfo">
                <h3 id='vendorName'>{{ $store.getters.getBasketVendor.name }}</h3>
                <div
                v-for="item in basketItems"
                :key="item.id"
                class="basket__item">
                    <div
                    :title="item.title"
                    class="basket__title">
                        {{ item.title }}
                    </div>
                    <div class="basket__count">
                        <div
                        id='decrement'
                        @click="$store.commit('decrementItemCount', item)"
                        class="basket__icon"> - </div>
                        <div> {{ item.count }} </div>
                        <div
                        id='increment'
                        @click="$store.commit('incrementItemCount', item)"
                        class="basket__icon"> + </div>
                    </div>
                    <div class="basket__price">
                        {{ item.price }} ₽
                    </div>
                </div>
            </div>
            <BaseButton
               id='checkout'
               v-if="!hideOrderButton"
               :label="`Заказать ${ $store.getters.getTotalPrice} ₽ `"
               @click="$router.push('/checkout')"
            />
        </div>
    </div>
</template>

<script>
  import BaseButton from "./blocks/BaseButton";

  export default {
    name: "BasketDude",
    props: {
        hideOrderButton: {
          type: Boolean,
          default: false,
        },
    },
    computed: {
      basketItems() {
        return this.$store.getters.getBasketItems;
      }
    },
    components: {
      BaseButton,
    },
    watch: {
      basketItems(value) {
        if (value.length === 0) {
          this.$router.go(-1);
        }
      }

    }
  }
</script>

<style lang="scss">
    .basket__container {
        display: flex;
        flex-flow: column nowrap;
        flex-grow: 1;
        justify-content: flex-start;
        padding: 0 12px;
    }

    .basket__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .basket__clear {
        cursor: pointer;
        font-size: 26px;
    }
    .basket__item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .basket__empty {
        display: flex;
        flex-grow: 1;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #555;
    }

    .basket__not-empty {
        display: flex;
        flex-flow: column nowrap;
    }

    .basket__title {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .basket__count {
        display: flex;
        flex-flow: row nowrap;
    }
    .basket__icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 24px;
        line-height: 21px;
        background-color: #cccccc;
        margin: 0 6px;
        text-align: center;
        font-weight: bold;
        color: #555;
        cursor: pointer;
        transition: all 150ms ease-in-out;

        &:hover {
            background-color: #555555;
            color: #cccccc;
        }
    }
</style>

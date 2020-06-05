<template>
    <div class="order-history">
        <h1>Мои заказы</h1>
        <div
        v-for="order in orderList"
        :key="order.id"
        class="order-item">
            <div class="order-item__date">{{ parseDate(order.createdAt) }}</div>
            <div class="order-item__vendor">{{ order.vendor.name }}</div>
            <div class="order-item__price">{{ order.price }} ₽</div>
            <div class="order-item__status">{{ order.status }}</div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "OrderHistory",
    created() {
      this.$store.dispatch('updateOrderHistory');
    },
    methods: {
      parseDate(timestamp){
        const date = timestamp.toDate();
        const minutes = `${date.getMinutes()}`.padStart(2, '0');
        const hours = `${date.getHours()}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      }
    },
    computed: {
      orderList() {
        return this.$store.getters.getOrderHistory;
        // return [
        //   {
        //     id: 1,
        //     date: '11.05.2020',
        //     vendor: 'KFC',
        //     price: '200',
        //     status: 'Доставлено',
        //   },
        //   {
        //     id: 2,
        //     date: '09.05.2020',
        //     vendor: 'Шоколадница',
        //     price: '1400',
        //     status: 'Доставлено',
        //   },
        // ]
      }
    },
  }
</script>

<style scoped lang="scss">
    .order-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        background-color: #fff;
        padding: 16px;
        margin: 16px 0;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.04),
                    0 -2px 8px 0 rgba(0, 0, 0, 0.04);
    }

    .order-item__date {
        width: 28%;
    }
    .order-item__vendor {
        width: 28%;
    }
    .order-item__price {
        width: 16%;
        text-align: right;
    }
    .order-item__status {
        width: 28%;
        text-align: right;
    }
</style>

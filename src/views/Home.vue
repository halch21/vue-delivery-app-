<template>
  <div class="vendor-list">
    <VendorItem
    v-for="item in vendorList"
    :key="item.id"
    @click="go(item)"
    :title="item.name"
    :src="item.img"
    class="vendor-item"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VendorItem from "../components/VendorItem";
// import {db} from "../firebaseConfig";

export default {
  name: 'Home',
  components: {
    VendorItem,
  },
  created() {
    this.$store.dispatch('updateVendors');
    // const restaurants = db.collection('restaurants11').orderBy('createdAt');
    // console.log('vendors', restaurants);
  },
  computed: {
    vendorList() {
      return this.$store.getters.getVendors;
    }
  },
  methods: {
    go(item) {
      this.$router.push(`vendor/${item.id}`)
    }
  }
}
</script>

<style>
  .vendor-list {
    display: flex;
    flex-flow: row wrap;
  }
  .vendor-item:nth-child(3n) {
    margin-right: 0;
  }
</style>

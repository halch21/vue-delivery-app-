<template>
    <div
    @click="$emit('click')"
    class="vendor-item">
        <a class="vendor-item__link">
            <div class="vendor-item__image">
                <img alt="vendor picture" :src="src"/>
            </div>
            <div class="vendor-item__wrap">
                <div class="vendor-item__head">
                    {{ title }}
                </div>
                <div class="vendor-item__row"></div>
            </div>
        </a>
    </div>
</template>

<script>
  export default {
    name: "VendorItem",
    props: {
      title: {
        type: String,
        required: true,
      },
      src: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style scoped lang="scss">
 .vendor-item {
     overflow: hidden;
     cursor: pointer;
     width: calc(100% / 3 - 11px);
     border-radius: 4px;
     margin-right: 16px;
     margin-bottom: 24px;
     box-sizing: border-box;
     background-color: #ffffff;
     box-shadow: 0 8px 8px 0 rgba(0,0,0,.04),
                 0 -2px 8px 0 rgba(0,0,0,.04);
     transition: box-shadow 150ms ease-in-out,
                 transform 150ms ease-in-out;
 }

 .vendor-item:hover {
     transform: translateY(-4px);
     box-shadow: 0 8px 8px 0 rgba(0,0,0,.1),
                 0 4px 8px 0 rgba(0,0,0,.04);
 }
 .vendor-item__wrap {
     height: 84px;
     padding: 16px;
     .vendor-item__head {
         font-size: 22px;
         font-weight: 700;
     }
 }
 .vendor-item__image img {
     width: 100%;
 }
</style>

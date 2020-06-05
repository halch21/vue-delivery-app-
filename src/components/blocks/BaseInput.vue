<template>
  <div class="wrapper">
     <label class="label" v-if="label" :for="label">{{ label }}</label>
     <input
     class="input"
     :placeholder="placeholder"
     :id="label"
     :type="type"
     :value="value"
     :maxlength="maxLength"
     @input="$emit('input', $event.target.value)"
     @change="$emit('change',$event.target.value)">
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',
    props: {
      value: {
        type: String
      },
      type: {
        type: String
      },
      label: {
        type: String
      },
      placeholder: {
        type: String
      },
      maxLength: {
        type: [String, Number]
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
    }
  .label {
      margin-bottom: 8px;
      color: #555555;
  }
  .input {
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s;

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
</style>

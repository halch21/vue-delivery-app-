<template>
    <div>
        <div
        v-if="loading"
        class="btn btn-loader">
          <img src="@/assets/circles_white.svg" />
        </div>

        <button
        v-else
        :disabled="disabled"
        :class="{
          'btn--disabled': disabled
        }"
        class="btn"
        @click="$emit('click')">
            <slot>{{ label }}</slot>
        </button>
    </div>
</template>

<script>

  export default {
    name: 'BaseButton',
    props: {
      label: {
        type: String,
        default: 'Отправить'
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
    .btn {
        background-color: #5eb8ff;
        color: #ffffff;
        padding: 14px 22px;
        border: none;
        border-radius: 4px;
        margin: 8px 0;
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        width: 100%;
        height: 42px;
        &:hover {
            background-color: #49a5ef;
        }
    }
    .btn--disabled {
        background-color: #c8e7ff;
        cursor: default;
        &:hover {
            background-color: #c8e7ff;
        }
    }
    .btn-loader {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        cursor: default;
        &:hover {
            background-color: #5eb8ff;
        }
    }
    .btn-loader img{
        height: 24px;
    }
</style>

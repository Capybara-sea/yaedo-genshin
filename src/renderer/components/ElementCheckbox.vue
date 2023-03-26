<template>
  <div class="element-box" :style="{ '--element-checkbox-height': height }">
    <div
      class="element-item"
      v-for="element in Element.data"
      :key="element.id"
      :class="{ checked: checked(element) }"
      :style="{ '--element-color': element.color }"
      @click="toggle(element)"
    >
      <img class="bottom" :src="element.icon.l" />
      <img class="top" :src="element.icon.l" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ElementType } from '@/models'
import { Element } from '@/models'

const props = defineProps<{ value: string[]; height?: string }>()
const emit = defineEmits<{ (e: 'update:value', value: string[]): void }>()

const checked = (element: ElementType) =>
  props.value.length === 0 || props.value.includes(element.name)

const toggle = (element: ElementType) => {
  const index = props.value.indexOf(element.name)
  if (index === -1) {
    emit('update:value', [...props.value, element.name])
  } else {
    emit(
      'update:value',
      props.value.filter((_, i) => i !== index)
    )
  }
}
</script>

<style lang="scss" scoped>
.element-box {
  .element-item {
    display: inline-block;
    position: relative;
    height: var(--element-checkbox-height, inherit);

    .bottom {
      height: inherit;
      object-fit: contain;
      transition: all 0.2s ease-in-out;
      filter: saturate(70%) grayscale(50%) brightness(70%);
    }

    .top {
      position: absolute;
      left: 0;
      top: 0;
      height: inherit;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      filter: drop-shadow(0 0 5px var(--element-color));
    }

    &.checked .top {
      opacity: 1;
    }
  }
}
</style>

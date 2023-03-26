<template>
  <div class="weapontype-box" :style="{ '--weapontype-checkbox-height': height }">
    <div
      class="weapontype-item"
      v-for="weapontype in Weapontype.data"
      :key="weapontype.id"
      :class="{ checked: checked(weapontype) }"
      @click="toggle(weapontype)"
    >
      <img class="bottom" :src="weapontype.icon" />
      <img class="top" :src="weapontype.icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WeapontypeList } from '@/models'
import { Weapontype } from '@/models'

const props = defineProps<{ value: string[]; height?: string }>()
const emit = defineEmits<{ (e: 'update:value', value: string[]): void }>()

const checked = (weapontype: WeapontypeList) =>
  props.value.length === 0 || props.value.includes(weapontype.name)

const toggle = (weapontype: WeapontypeList) => {
  const index = props.value.indexOf(weapontype.name)
  if (index === -1) {
    emit('update:value', [...props.value, weapontype.name])
  } else {
    emit(
      'update:value',
      props.value.filter((_, i) => i !== index)
    )
  }
}
</script>

<style lang="scss" scoped>
.weapontype-box {
  .weapontype-item {
    display: inline-block;
    position: relative;
    height: var(--weapontype-checkbox-height, inherit);

    .bottom {
      height: inherit;
      object-fit: contain;
      transition: all 0.2s ease-in-out;
      filter: contrast(30%) grayscale(50%) brightness(70%);
    }

    .top {
      position: absolute;
      left: 0;
      top: 0;
      height: inherit;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }

    &.checked .top {
      opacity: 1;
    }
  }
}
</style>

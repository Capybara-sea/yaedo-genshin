<template>
  <div class="rarity-box" :style="{ '--rarity-checkbox-height': height }">
    <span
      class="rarity-box-item"
      :class="{ active: checked(item) }"
      v-for="item in selectList"
      :key="item"
      @click="toggle(item)"
    >
      <span>{{ item }}</span>
      <img :src="Rarity.get('1')?.icon" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { Rarity } from '@/models'

type Props = { value: string[]; height?: string; selectList?: string[] }
const props = withDefaults(defineProps<Props>(), { selectList: () => ['1', '2', '3', '4', '5'] })
const emit = defineEmits<{ (e: 'update:value', value: string[]): void }>()

const checked = (id: string) => props.value.includes(id)

const toggle = (id: string) => {
  const index = props.value.indexOf(id)
  if (index === -1) {
    emit('update:value', [...props.value, id])
  } else {
    emit(
      'update:value',
      props.value.filter((item) => item !== id)
    )
  }
}
</script>

<style lang="scss" scoped>
.rarity-box {
  height: var(--rarity-checkbox-height, inherit);
  font-size: 1.2rem;

  &-item {
    margin-left: 0.2rem;
    padding: 0 0.2rem 0.1rem;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    transition: all 0.2s ease-in-out;
    opacity: 0.8;

    img {
      height: 1.2rem;
      margin-bottom: -0.2rem;
    }

    &.active {
      background-color: var(--table-header-color);
      border: 1px solid var(--border-color);
      opacity: 1;
    }
  }
}
</style>

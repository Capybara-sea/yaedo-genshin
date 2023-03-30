<template>
  <div class="filter-bar">
    <weapontype-checkbox v-model:value="weapontypeChecked" height="2rem" />

    <n-divider vertical style="height: 2rem" />

    <rarity-checkbox v-model:value="rarityChecked" class="rarity-box" />

    <n-divider vertical style="height: 2rem" />

    <div class="input-box">
      <n-input
        v-model:value="search"
        placeholder="听说什么都能搜..."
        clearable
        @clear="search = ''"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Weapon } from '@/types'

const props = defineProps<{ value: Weapon[]; origin: Weapon[] }>()
const emit = defineEmits<{ (e: 'update:value', value: Weapon[]): void }>()

const search = ref('')
const searchThrottled = refThrottled(search, 1000)
const weapontypeChecked = ref<string[]>([])
const rarityChecked = ref<string[]>([])

const filterWeapons = computed(() => {
  const { origin } = props
  const { value: search } = searchThrottled
  return origin.filter((character) => {
    return (
      // 武器类型
      (weapontypeChecked.value.length === 0 ||
        weapontypeChecked.value.includes(character.weapontype)) &&
      // 稀有度
      (rarityChecked.value.length === 0 || rarityChecked.value.includes(character.rarity)) &&
      // 关键字搜索
      (search === '' ||
        character.name.includes(search) ||
        character.description.includes(search) ||
        character.weapontype.includes(search) ||
        character.story.includes(search) ||
        character.substat.includes(search) ||
        character.effectname.includes(search) ||
        character.effect.includes(search) ||
        character.substat.includes(search) ||
        character.version.includes(search))
    )
  })
})

watch(
  () => filterWeapons.value,
  () => {
    emit('update:value', filterWeapons.value)
  }
)
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;

  padding: 0.5rem;
  border-radius: 10px;

  .rarity-box {
    height: inherit;
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
}
</style>

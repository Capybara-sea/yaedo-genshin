<template>
  <div class="filter-bar">
    <element-checkbox v-model:value="elementChecked" height="2rem" />

    <n-divider vertical style="height: 2rem" />

    <weapontype-checkbox v-model:value="weapontypeChecked" height="2rem" />

    <n-divider vertical style="height: 2rem" />

    <rarity-checkbox
      class="rarity-box"
      v-model:value="rarityChecked"
      height="2rem"
      :select-list="['4', '5']"
    />

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
import type { Character } from '@/types'

const props = defineProps<{ value: Character[]; origin: Character[] }>()
const emit = defineEmits<{ (e: 'update:value', value: Character[]): void }>()

const search = ref('')
const searchThrottled = refThrottled(search, 1000)
const elementChecked = ref<string[]>([])
const weapontypeChecked = ref<string[]>([])
const rarityChecked = ref<string[]>([])

const filterCharacters = computed(() => {
  const { origin } = props
  const { value: search } = searchThrottled
  return origin.filter((character) => {
    return (
      // 元素类型
      (elementChecked.value.length === 0 || elementChecked.value.includes(character.element)) &&
      // 武器类型
      (weapontypeChecked.value.length === 0 ||
        weapontypeChecked.value.includes(character.weapontype)) &&
      // 稀有度
      (rarityChecked.value.length === 0 || rarityChecked.value.includes(character.rarity)) &&
      // 关键字搜索
      (search === '' ||
        character.name.includes(search) ||
        character.title.includes(search) ||
        character.description.includes(search) ||
        character.affiliation.includes(search) ||
        character.constellation.includes(search) ||
        character.enName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        character.region.includes(search) ||
        character.substat.includes(search) ||
        character.version.includes(search))
    )
  })
})

watch(
  () => filterCharacters.value,
  () => {
    emit('update:value', filterCharacters.value)
  }
)
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;

  padding: 0.5rem;
  border-radius: 10px;
}
</style>

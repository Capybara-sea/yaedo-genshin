<template>
  <div class="filter-bar">
    <element-checkbox v-model:value="elementChecked" height="2rem" />

    <n-divider vertical style="height: 2rem" />

    <weapontype-checkbox v-model:value="weapontypeChecked" height="2rem" />

    <n-divider vertical style="height: 2rem" />

    <div class="rarity-box">
      <span
        class="rarity-box-item"
        :class="{ active: rarityChecked.includes(item) }"
        v-for="item in ['4', '5']"
        :key="item"
        @click="rarityCheck(item)"
      >
        <span>{{ item }}</span>
        <img :src="Rarity.get('1')?.icon" />
      </span>
    </div>

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
import { Rarity } from '@/models'

const props = defineProps<{ value: Character[]; origin: Character[] }>()
const emit = defineEmits<{ (e: 'update:value', value: Character[]): void }>()

const search = ref('')
const searchThrottled = refThrottled(search, 1000)
const elementChecked = ref<string[]>([])
const weapontypeChecked = ref<string[]>([])
const rarityChecked = ref<string[]>([])

function rarityCheck(item: string) {
  const index = rarityChecked.value.indexOf(item)
  if (index === -1) {
    rarityChecked.value.push(item)
  } else {
    rarityChecked.value.splice(index, 1)
  }
}

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

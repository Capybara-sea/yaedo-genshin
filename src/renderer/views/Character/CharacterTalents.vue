<template>
  <div class="talents-container">
    <n-scrollbar x-scrollable>
      <div class="tabs-bar">
        <div
          class="tabs-bar-item"
          :class="{ active: currentTabKey === key }"
          v-for="(image, key) in character.talents.images"
          :key="image"
        >
          <img class="icon" :src="image" @click="currentTabKey = key" />
          <div class="name">{{ character.talents[key]?.name }}</div>
        </div>
      </div>
    </n-scrollbar>
    <my-transition>
      <div :key="talentDetail.info" class="tabs-content">
        <md :content="talentDetail.info" />
        <md :content="talentDetail.description || ''" />

        <n-collapse>
          <n-collapse-item title="详细属性">
            {{ labelCompiling(talentDetail.attributes, 9) }}
          </n-collapse-item>
        </n-collapse>
      </div>
    </my-transition>
  </div>
</template>

<script lang="ts" setup>
import type { Character, TalentKey, TalentDetail } from '@/types/data'

const props = defineProps<{ character: Character }>()

const currentTabKey = ref<TalentKey>('combat1')

const talentDetail = computed(() => {
  const talentDetail = props.character.talents[currentTabKey.value] || {}
  return talentDetail
})

function labelCompiling(attributes: TalentDetail['attributes'], talentLevel: number) {
  if (!(talentLevel >= 1 && talentLevel <= 15)) throw '技能等级必须在1-15之间'
  if (!attributes) return []

  let outLabels = []

  const rx = /{(.*?)}/g
  for (let label of attributes.labels) {
    let matches = label.matchAll(rx)

    for (let match of matches) {
      const grab = match[1] // example: param5:F1
      const [paramnum, format] = grab.split(':')

      let value = attributes.parameters[paramnum][talentLevel - 1].toString()
      if (format === 'I') {
        // 整数
        label = label.replace(match[0], value)
        continue
      }
      if (format.includes('P'))
        // 百分比
        value = (Number(value) * 100).toString()
      if (format.includes('F')) {
        // 小数
        const precision = parseInt(format[1])
        if (!isNaN(precision)) {
          value = Number(value).toFixed(precision)
        }
      }
      if (format.includes('P'))
        // 百分比
        value = value + '%'
      label = label.replace(match[0], value)
    }
    outLabels.push(label)
  }
  return outLabels
}
</script>

<style lang="scss" scoped>
.talents-container {
  width: 100%;
  .tabs-bar {
    display: flex;
    gap: 2rem;
    padding: 0 1rem 1rem;

    .tabs-bar-item {
      min-width: 5rem;
      .icon {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: contain;
      }

      &.active {
        .icon {
          filter: drop-shadow(0 0 0.2rem #ffffff);
        }
      }
    }
  }

  .tabs-content {
    padding: 0 1rem;
    text-align: left;
  }
}
</style>

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
    <transition name="slide-fade" mode="out-in">
      <md :content="talent.info" class="tabs-content" :key="talent.info" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { Character, Talents, CombatTalentDetail, PassiveTalentDetail } from '@/types/data'

const props = defineProps<{ character: Character }>()

const currentTabKey = ref<keyof Talents>('combat1')

const talent = computed(() => {
  const talent = props.character.talents[currentTabKey.value] || {}
  return talent as CombatTalentDetail | PassiveTalentDetail
})
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
        // border: 1px solid #000000;
        // border-radius: 3rem;
        // padding: .5rem;
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

  .slide-fade- {
    &enter-active,
    &leave-active {
      transition: opacity 0.15s ease-in-out 0.05s, transform 0.2s ease-in;
    }
    &enter-from,
    &leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
    &enter-to,
    &leave-from {
      opacity: 1;
    }
  }
}
</style>

<template>
  <div class="talent-icon-container" :class="{ active }" :style="containerStyle">
    <img class="image" :src="src" />
    <div class="bg" />
    <!-- <div class="image" :style="{ maskImage: `url(${src})` }"></div> -->
  </div>
</template>

<script lang="ts" setup>
import chroma from 'chroma-js'
import { useTheme } from '@/hooks'

interface Props {
  src?: string
  active?: boolean
  bgColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  bgColor: '#00000047',
})

const { isDark } = useTheme()
const containerStyle = computed(() => ({
  '--background-color': props.bgColor,
  '--background-hover-color': chroma(props.bgColor).brighten(0.5).luminance(0.1).hex(),
  '--background-active-color': isDark.value
    ? chroma(props.bgColor).mix('#fff', 0.4).hex()
    : chroma(props.bgColor).mix('#000', 0.5).hex(),
}))
</script>

<style lang="scss" scoped>
.talent-icon-container {
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  border-radius: 9999px;
  transition: all 0.14s ease-in-out;
  .image {
    width: inherit;
    height: inherit;
    object-fit: contain;
    padding: 0.4rem;
    // -webkit-mask-size: contain;
    // -webkit-mask-repeat: no-repeat;
    // -webkit-mask-position: center;
  }

  .bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--background-color, #00000047);
    border-radius: 9999px;
    transition: all 0.2s ease-in-out;
  }

  &:hover .bg {
    transform: scale(1.03);
    background: var(--background-hover-color, #1d1d1d57);
  }

  &.active .bg {
    box-shadow: inset 0 0 1.5rem var(--background-active-color, #1d1d1d57);
  }
}
</style>

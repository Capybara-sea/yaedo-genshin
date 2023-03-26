<template>
  <div v-html="html" :style="mdStyle" />
</template>

<script lang="ts" setup>
import markdownIt from 'markdown-it'

type Props = {
  content: string
  strongColor?: string
}

const props = defineProps<Props>()

const mdStyle = computed(() => ({
  '--yg-strong-color': props.strongColor,
}))

const md = markdownIt({ breaks: true })
const html = computed(() => md.render(props.content?.replace(/\n\n/g, '\n\v\n')))
</script>

<style>
strong {
  color: var(--yg-strong-color);
}
</style>

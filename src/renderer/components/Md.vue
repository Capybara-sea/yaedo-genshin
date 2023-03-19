<template>
  <div v-html="html" />
</template>

<script lang="ts" setup>
import markdownIt from 'markdown-it'

const props = defineProps<{ content: string; strongColor?: string }>()

const md = markdownIt({ breaks: true })
const html = computed(() => md.render(props.content?.replace(/\n\n/g, '\n\v\n')))
</script>

<style>
strong {
  color: v-bind('props.strongColor');
}
</style>

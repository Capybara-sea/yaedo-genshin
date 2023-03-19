<template>
  <div v-html="html" />
</template>

<script lang="ts" setup>
import markdownIt from 'markdown-it'

type Props = {
  content: string
  strongColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  strongColor: '#cfc263',
})

const md = markdownIt({ breaks: true })
const html = computed(() => md.render(props.content?.replace(/\n\n/g, '\n\v\n')))
</script>

<style>
strong {
  color: v-bind('props.strongColor');
}
</style>

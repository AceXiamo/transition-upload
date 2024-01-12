<template>
  <div class="flex flex-col h-full items-center p-[100px]">
    <div class="w-[582px] border border-dashed border-indigo-500 p-[20px] rounded-md">
      <ImageChooseNode v-model="images" />
    </div>
    <div class="w-[582px] mt-[20px] flex flex-col items-start gap-[5px]">
      <div class="text-white/50 p-[3px_7px] rounded-[3px] w-max text-[13px]" v-for="(url, index) in images" :key="index">{{ url }}</div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, watchEffect } from 'vue'
import useImageChooseField from './components/useImageChooseField'

const images = ref<string[]>([])
const ImageChooseNode = useImageChooseField({
  move: true,
  limit: 15,
})
</script>

<template>
  <div
    v-if="show"
    v-motion="$props.motionKey!"
    class="bg-black bg-opacity-20 fixed top-0 bottom-0 left-0 right-0 grid place-content-center z-[99]"
    :initial="{
      opacity: 0,
      y: 10,
      transition: {
        duration: 200,
      },
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    }"
    :leave="{
      opacity: 0,
      y: 10,
      transition: {
        ease: 'easeOut',
      },
    }"
    @click="leave"
  >
    <div class="bg-white min-h-[100px] flex flex-col rounded-md py-[20px] gap-[20px]" :style="{ width: typeof $props.width === 'number' ? `${$props.width}px` : $props.width }" @click.stop>
      <div class="flex items-center px-[20px]">
        <span class="text-[#333] font-bold text-[15px] select-none">{{ $props.title }}</span>
        <div class="ml-auto cursor-pointer" @click="leave">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" fill="rgb(239 68 68)">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </div>
      </div>
      <template v-if="$props.content">
        <component :is="$props.content(h)" />
      </template>
      <template v-if="$props.footer">
        <component :is="$props.footer(h)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DialogProps } from '@/components/Dialog'
import { useMotions } from '@vueuse/motion'
import { onMounted, ref, h } from 'vue'

const show = ref(false)
const motion = useMotions()
const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
})

const leave = () => {
  motion[props.motionKey!].leave(() => {
    show.value = false
    props.onClose?.(props.motionKey!)
  })
}

onMounted(() => {
  props.instance!.close = leave
  show.value = true
})
</script>

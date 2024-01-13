<template>
  <div class="flex flex-col h-full items-center p-[100px] gap-[50px]">
    <div class="w-[582px] border border-dashed border-indigo-500 p-[20px] rounded-md">
      <ImageChooseNode v-model="images" />
    </div>

    <div
      v-motion="'theme_btn'"
      :initial="{
        scale: 1,
        transition: {
          duration: 200,
        },
      }"
      @mouseleave="
        motions['theme_btn'].apply({
          scale: 1,
        })
      "
      @mouseenter="
        motions['theme_btn'].apply({
          scale: 1.1,
        })
      "
      @mousedown="
        motions['theme_btn'].apply({
          scale: 0.9,
        })
      "
      @mouseup="
        motions['theme_btn'].apply({
          scale: 1.1,
        })
      "
      @click="handleClick($event)"
      class="p-[5px_15px] rounded-1 bg-indigo-500 text-white text-[12px] cursor-pointer"
    >
      <span class="select-none">Theme Change</span>
    </div>

    <div class="w-[582px]">
      <img
        @click="openImage"
        class="h-[100px] w-[100px] object-cover rounded-1 select-none"
        :src="Akarin"
      />
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref } from 'vue'
import useImageChooseField from './components/useImageChooseField'
import { useMotions } from '@vueuse/motion'
import Akarin from './assets/akarin.jpg'

const motions = useMotions()
const images = ref<string[]>([])
const ImageChooseNode = useImageChooseField({
  move: true,
  limit: 15,
})

function handleClick(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement

  const theme = document.querySelector(':root') as HTMLElement
  theme.style.setProperty('view-transition-name', 'theme_btn')
  const themeName = theme.dataset.theme as string

  const transition = document.startViewTransition(() => {
    theme.dataset.theme = themeName === 'dark' ? 'light' : 'dark'
  })

  transition.ready.then(() => {
    theme.animate(
      {
        clipPath: [
          `circle(0 at ${e.clientX}px ${e.clientY}px)`,
          `circle(100% at ${e.clientX}px ${e.clientY}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in',
        // 指定要附加动画的伪元素
        pseudoElement: '::view-transition-new(theme_btn)',
      }
    )
  })

  transition.finished.finally(() => {
    theme.style.removeProperty('view-transition-name')
  })
}

function openImage(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  target.style.setProperty('view-transition-name', 'image_view')

  const div = document.createElement('div')
  div.className = 'fixed inset-0 grid place-content-center'
  const img = document.createElement('img')
  img.className = 'h-[300px] w-[300px] object-cover rounded-1'
  img.src = Akarin
  img.style.setProperty('view-transition-name', 'image_view')
  div.appendChild(img)

  div.addEventListener('click', () => {
    document.startViewTransition(() => {
      target.style.setProperty('view-transition-name', 'image_view')
      img.style.removeProperty('view-transition-name')
      div.remove()
    })
  })

  document.startViewTransition(() => {
    target.style.removeProperty('view-transition-name')
    document.body.appendChild(div)
  })
}
</script>

<style>
::view-transition-old(theme_btn),
::view-transition-new(theme_btn) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

::view-transition-old(image_view),
::view-transition-new(image_view) {
  animation: 0.35s;
}
</style>

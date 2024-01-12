import { VNode, createApp, h, render } from 'vue'
import Component from '@/components/Dialog/component.vue'
import { MotionPlugin } from '@vueuse/motion'

export type DialogProps = {
  title: string
  content?: (h: any) => VNode
  footer?: (h: any) => VNode
  width?: string | number
  appendToBody?: boolean
  onClose?: (key: string) => void
  motionKey?: string,
  instance?: DialogInstance
}
export type DialogInstance = {
  key?: string
  close?: () => void
}

const hooks: DialogInstance[] = []
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    const last = hooks.pop()
    last?.close?.()
    removeListenVerify()
  }
}

const removeListenVerify = () => {
  if (hooks.length < 1) {
    window.removeEventListener('keydown', onEsc)
  }
}

const generateKey = (): string => {
  return `dialog_` + Math.random().toString(36).substr(2, 8)
}

const init = (props: DialogProps, onClose?: () => void): DialogInstance => {
  const instance: DialogInstance = {}

  const div = document.createElement('div')
  document.body.appendChild(div)
  const motionKey = generateKey()
  const vNode = h(Component, {
    ...props,
    instance,
    onClose: key => {
      const index = hooks.findIndex(item => item.key === key)
      if (index > -1) {
        hooks.splice(index, 1)
      }
      removeListenVerify()
      render(null, div)
      div.remove()
      onClose?.()
    },
    motionKey,
  })

  const app = createApp(vNode)
  app.use(MotionPlugin)
  app.mount(div)

  hooks.push(instance)
  window.addEventListener('keydown', onEsc)

  return instance
}

export default { init }

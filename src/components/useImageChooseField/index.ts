import { h } from 'vue'
import Component from './component.vue'

type DefineProps = {
  limit?: number
  module?: string
  move?: boolean
  modelValue?: string[]
  'onUpdate:modelValue'?: (val: string[]) => void
}

export default (params: DefineProps) => {
  return h(Component, params)
}

import { cloneVNode, mergeProps, useSlots } from 'vue'

export const useClone = (sharedProps: Record<string, unknown>) => {
  const slots = useSlots()

  function clone() {
    const vnode = slots.default?.()[0]
    if (!vnode) return null

    return cloneVNode(vnode, mergeProps(vnode.props ?? {}, sharedProps))
  }

  return clone
}

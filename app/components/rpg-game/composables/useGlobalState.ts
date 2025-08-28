import type { AnimationAction } from "three"

export function _useGlobalState() {
  const actions = shallowReactive<Record<string, AnimationAction>>({})

  function setActions(newActions: Record<string, AnimationAction>) {
    if (!newActions) return
    Object.assign(actions, newActions)
  }

  return {
    setActions,
    actions,
  }
}

const useGlobalState = createSharedComposable(_useGlobalState)

export default useGlobalState
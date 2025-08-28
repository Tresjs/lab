import { createSharedComposable } from '@vueuse/core'
import type { AnimationClip, Object3D } from 'three'

export function _useCharacterCtrl(model?: Ref<Object3D>, animations?: Ref<AnimationClip[]>) {
  const currentAction = shallowRef<string>('')

  // Call useAnimations in setup context, not inside watch
  const { actions, mixer } = useAnimations(animations || ref([]), model, {
    manualUpdate: true,
  })

  watch(actions, (actions) => {
    if (!actions) return
 
    actions.Idle?.play()
  }, { immediate: true })

  return {
    animations,
    model,
    actions,
    currentAction,
    mixer,
  }
}

const useCharacterCtrl = createSharedComposable(_useCharacterCtrl)

export default useCharacterCtrl
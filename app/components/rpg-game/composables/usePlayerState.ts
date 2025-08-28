export const WEAPONS = {
  '1H_Sword': '1H_Sword',
  '2H_Sword': '2H_Sword',
} as const

export const SHIELDS = {
  'Badge_Shield': 'Badge_Shield',
  'Rectangle_Shield': 'Rectangle_Shield',
  'Round_Shield': 'Round_Shield',
  'Spiked_Shield': 'Spiked_Shield',
} as const

export type Weapon = (typeof WEAPONS)[keyof typeof WEAPONS]
export type Shield = (typeof SHIELDS)[keyof typeof SHIELDS]

export interface PlayerState {
  ph: Ref<number>
  maxPH: Ref<number>
  ap: Ref<number>
  maxAP: Ref<number>
  level: Ref<number>
  exp: Ref<number>
  selectedWeapon: Ref<Weapon>
  selectedArmor: Ref<Shield>
}

export function _usePlayerState(): PlayerState {
  const ph = ref(90)
  const maxPH = ref(100)
  const ap = ref(50)
  const maxAP = ref(100)
  const level = ref(1)
  const exp = ref(30)
  const selectedWeapon: Ref<Weapon> = ref('1H_Sword')
  const selectedArmor: Ref<Shield> = ref('Badge_Shield')

  return {
    ph,
    maxPH,
    ap,
    maxAP,
    level,
    exp,
    selectedWeapon,
    selectedArmor,
  }
}

const usePlayerState = createSharedComposable(_usePlayerState)

export default usePlayerState
export type ShipToken = {
  tokenId: number
  shipCode: string
}

export type CONST_TYPE = {
  SPACESHIP_CONTRACT: string
  ALPHA_TOKEN_CONTRACT: string
  USER_SHIPS: ShipToken[]
  CURRENT_SHIP: ShipToken | undefined
  ALPHA_BALANCE: number
  INVENTORY: string[]
  SHOP: string[]
  SHIP_SIZE: number
  ITEM_SIZE: number
}

export let CONST: CONST_TYPE = {
  SPACESHIP_CONTRACT: '0x594ECB81ddB6b4DA8Ad29Ef003246a2006001182',
  ALPHA_TOKEN_CONTRACT: '0x0665d8d64e662D8eb3cEa97a2811474ef1d38D20',
  USER_SHIPS: [],
  CURRENT_SHIP: undefined,
  ALPHA_BALANCE: 0,
  INVENTORY: [],
  SHOP: [
    'itemCabin0',
    'itemCabin1',
    'itemCabin2',
    'itemCabin3',
    'itemWeapon0',
    'itemWeapon1',
    'itemWeapon2',
    'itemWeapon3',
    'itemWing0',
    'itemWing1',
    'itemWing2',
    'itemWing3',
    'itemEngine0',
    'itemEngine1',
    'itemEngine2',
    'itemEngine3',
  ],
  SHIP_SIZE: 60,
  ITEM_SIZE: 50,
}

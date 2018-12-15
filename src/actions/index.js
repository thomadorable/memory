export const createPlayer = player => ({
  type: 'CREATE_PLAYER',
  player
})

export const setBoard = params => ({
  type: 'SET_BOARD',
  params
})

export const pickImage = card => ({
  type: 'PICK_IMAGE',
  card
})

export const pickWrongImage = cards => ({
  type: 'PICK_WRONG_IMAGE',
  cards
})

export const pickSameImage = cards => ({
  type: 'PICK_SAME_IMAGE',
  cards
})

export const countStep = cards => ({
  type: 'COUNT_USER_STEP',
  cards
})

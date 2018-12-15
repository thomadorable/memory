const player = (state = {
  name: 'TomTom',
  step: 0
}, action) => {
    switch (action.type) {
      case 'CREATE_PLAYER':
        return {
          ...action.player,
          step: 0
        };
      case 'COUNT_USER_STEP':
      return {
        ...state,
        step: state.step + 1
      };
      default:
        return state
    }
  }
  
  export default player
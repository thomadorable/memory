import {combineReducers} from 'redux'

import deck from './deck'
import player from './player'

export default combineReducers({
    deck,
    player
})
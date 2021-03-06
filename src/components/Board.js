import React from 'react'
import InitPlayer from './InitPlayer'
import InitBoard from './InitBoard'
import Game from './Game'

const Board = ({ player, deck }) => {
    if (!player) {
        return (
            <InitPlayer />
          )
    } else if (!deck) {
        return (<div className="container" id="init-board">
            <h2 className="text-big">Bienvenue <strong>{player.name}</strong> 😎</h2>
            <InitBoard />
        </div>)
    } else {
        return (<Game deck={deck} player={player} />)
    }
}

export default Board

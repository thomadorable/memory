const deck = (state = null, action) => {
    switch (action.type) {
        case 'SET_BOARD':
            return {
                cards: action.params.cards,
                nbWin: 0,
                timer: 0,
                difficulty: action.params.cards.length / 2
            };

        case 'PICK_IMAGE':
            const id_card = action.card.index
            state.cards[id_card].status = 1;
            return {
                ...state,
                cards: state.cards,
                currentCard: id_card
            };

        case 'PICK_WRONG_IMAGE':
            state.cards[action.cards.new].status = 0;
            state.cards[action.cards.former].status = 0;

            return {
                ...state,
                cards: state.cards,
                currentCard: undefined
            };

        case 'RESET_GAME':
            return null;

        case 'PICK_SAME_IMAGE':
            state.cards[action.cards.new].status = 2;
            state.cards[action.cards.former].status = 2;

            return {
                ...state,
                cards: state.cards,
                currentCard: undefined,
                nbWin: state.nbWin + 1,
            };


        default:
            return state
    }
}

export default deck
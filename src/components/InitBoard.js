import React from 'react'
import { connect } from 'react-redux'
import { setBoard } from '../actions'

class InitBoard extends React.Component {
    constructor(props) {
        super(props);

        this.options = [];
        var values = [4, 6, 8, 10];
        for (let i = 0, l = values.length; i < l; i++) {
            const value = values[i];
            this.options.push(<option key={value} value={value}>{value} x {value}</option>);
        }

        this.state = {
            difficulty: values[0],
            isLoading: false
        }

        this.dispatch = props.dispatch;
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    generateCardsList(difficulty) {
        var nbCards = difficulty * difficulty;

        var cards = [];
        var values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 0, 'J', 'Q', 'K']
        var suits = ['S', 'D', 'C', 'H'];
        for (let i = 0, l = suits.length; i < l; i++) {
            const suit = suits[i];
            
            for (let y = 0, k = values.length; y < k; y++) {
                const value = values[y];
                cards.push(value + '' + suit);
            }
        }

        cards = this.shuffle(cards);

        nbCards = (nbCards / 2);

        var selectedCards = cards.splice(0, nbCards);
        
        this.getApiDeck(selectedCards, nbCards);
    }

    getApiDeck (selectedCards, nbCards) {
        selectedCards = selectedCards.join(',');

        var url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=' + selectedCards;

        console.log(url)
        fetch(url)
        .then((response) => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then((json) => {
                    this.getApiCardsFromDeck(json.deck_id, nbCards);
                });
            }
        });
    }

    getApiCardsFromDeck = (id, nbCards) => {
        var url = 'https://deckofcardsapi.com/api/deck/' + id + '/draw/?count=' + nbCards;

        console.log(url)
        fetch(url)
        .then((response) => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then((json) => {
                    var cards = this.shuffle([...json.cards, ...json.cards]);
                    this.cleanCards(cards);
                    
                });
            }
        });
    };

    cleanCards = (cards) => {
        cards = cards.map(function(card, i) {
            return {
                code: card.code,
                image: card.image,
                status: 0,
                index: i
            };
        });

        this.dispatch(setBoard({cards: cards}));
    }


    onSubmit = (e) => {
        e.preventDefault();
        var difficulty = parseInt(this.state.difficulty);
        if (difficulty > 0) {
            this.setState({
                isLoading: true
            });
            this.generateCardsList(difficulty);
        }
    }

    render() {
        if (this.state.isLoading) return ('LOADER.');
        return (
            <form onSubmit={this.onSubmit}>
                <select type="text" onChange={(e) => {
                    this.setState({
                        difficulty: e.target.value
                    });
                }}>
                    {this.options}
                </select>
                <button type="submit">Commencer</button>
            </form>
        )
    }
}

export default connect() (InitBoard)

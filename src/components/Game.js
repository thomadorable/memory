import React from 'react'
import { connect } from 'react-redux'
import { pickImage, pickWrongImage, pickSameImage, countStep } from '../actions'
import Card from './Card'
import Timer from './Timer'

class InitBoard extends React.Component {
    constructor(props) {
        super(props);

        this.cards = this.props.deck.cards;
        this.dispatch = props.dispatch;

        this.isAnimated = false;
    }

    onPickImage = (card) => {
        if (!this.isAnimated) {
            const indexCurrentCard = this.props.deck.currentCard;
            
            this.dispatch(countStep());
            this.dispatch(pickImage(card));
    
            if (typeof indexCurrentCard !== 'undefined') {
                const currentCard = this.props.deck.cards[indexCurrentCard];
    
                if (currentCard.code === card.code) {
                    this.dispatch(pickSameImage({
                        new: card.index,
                        former: indexCurrentCard
                    }));
                } else {
                    this.isAnimated = true;

                    setTimeout(() => {
                        this.dispatch(pickWrongImage({
                            new: card.index,
                            former: indexCurrentCard
                        }));
                        this.isAnimated = false;
                    }, 1000);
                }
            }
        }
    }

    // TODO: stocker les meilleurs scores
    // TODO: faire du design
    // TODO: plusieurs joueurs ?

    render() {
        var cards = [];
        for (let i = 0, l = this.cards.length; i < this.cards.length; i++) {
            const card = this.cards[i];

            cards.push(<Card key={i + '_' + card.code} card={card} t={Date.now()} onPickImage={this.onPickImage} />)
        }


        if (this.props.deck.nbWin >= this.props.deck.difficulty) {
            return (<p>Gagné en {this.props.player.step} coups !</p>)
        }

        var timer = Date.now() - this.props.deck.startTime;

        return (
            <div>
                <h1>Welcome {this.props.player.name} | {this.props.player.step} tries</h1>

                <Timer timer={timer}/>

                <div className={"cards cards-" + this.props.deck.difficulty}>
                    {cards}
                </div>
            </div>
        )
    }
}

export default connect() (InitBoard)

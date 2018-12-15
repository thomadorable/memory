import React from 'react'
import { connect } from 'react-redux'
import { pickImage, pickWrongImage, pickSameImage, countStep } from '../actions'
import Card from './Card'
import Timer from './Timer'
import Scores from './Scores'

class InitBoard extends React.Component {
    constructor(props) {
        super(props);

        this.cards = this.props.deck.cards;
        this.dispatch = props.dispatch;

        this.isAnimated = false;

        this.state = {
            isAddingScore: false,
            isAddingScoreError: false
        }
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

    // TODO: faire du design
    // TODO: plusieurs joueurs ?

    render() {
        let cards = [];

        for (let i = 0, l = this.cards.length; i < l; i++) {
            const card = this.cards[i];

            cards.push(<Card key={i + '_' + card.code} card={card} t={Date.now()} onPickImage={this.onPickImage} />)
        }

        // Vérifie si la partie est finie
        if (this.props.deck.nbWin >= this.props.deck.difficulty) {

            const data = {
                nbCards : this.props.deck.difficulty,
                player: this.props.player.name,
                step: this.props.player.step
            }

            return (
                <div>
                    <p>Gagné en {this.props.player.step} coups !</p>
                    <Scores data={data} />
                </div>
            )
        }

        else {
            let timer = Date.now() - this.props.deck.startTime;

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
}

export default connect() (InitBoard)

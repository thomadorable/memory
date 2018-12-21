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
            isAddingScoreError: false,
            classValue: "container hide",
            isPaused: false,
            time: 0
        }

        setInterval(() => {
            if (this.props.isPaused) return null;

            this.setState({
                time: this.state.time + 1
            })
        }, 1000);
    }

    onPickImage = (card) => {
        if (this.state.isPaused) {
            return false;
        }

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


    toggleTimer = (e) => {
        console.log('toggle timer');
        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    // TODO : enregister le temps
    // TODO : filter score + temps
    // TODO : bt reset
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
                step: this.props.player.step,
                time: this.state.time
            }

            return (
                <div className="container show">
                    <p className="text-big">Gagné en {this.props.player.step} coups !</p>
                    <Scores data={data} />
                </div>
            )
        }

        else {
            let timer = this.props.deck.timer;

            return (
                <div className="container show">

                    <h1 className="text-big">{this.props.player.name} | {this.props.player.step} essai{this.props.player.step > 1 ? 's' : ''}</h1>

                    <Timer time={this.state.time} isPaused={this.state.isPaused} toggleTimer={this.toggleTimer}/>

                    <div className={"cards cards-" + this.props.deck.difficulty}>
                        {cards}
                    </div>
                </div>
            )
        }
    }
}

export default connect() (InitBoard)

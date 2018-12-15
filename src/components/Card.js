import React from 'react'
import { connect } from 'react-redux'
import backCard from '../assets/imgs/deck.jpg'

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const animatedClass = (this.props.card.status === 0) ? '' : 'animated';
        const hiddenClass = (this.props.card.status === 0) ? ' hidden' : '';

        return(
        <div  className={'cards-img ' + animatedClass + hiddenClass}  onClick={() => {
            if (this.props.card.status === 0) {
                this.props.onPickImage(this.props.card);
            }
        }} >
            <img src={backCard} className="back-img"/>
            <img src={this.props.card.image}/>
        </div>)
    }
}

export default connect() (Card)

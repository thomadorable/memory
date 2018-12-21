import React from 'react'
import { connect } from 'react-redux'
import backCard from '../assets/imgs/deck.jpg'

var images = require.context('../assets/imgs', true);

class Card extends React.Component {
    render() {
        const code = this.props.card.code;
        const status = this.props.card.status;

        let img_src = images('./' + code.split('')[1] + '.png')
        const animatedClass = (status === 0) ? '' : 'animated';
        const hiddenClass = (status === 0) ? ' hidden' : '';

        return(
        <div  className={'cards-img ' + animatedClass + hiddenClass}  onClick={() => {
            if (status === 0) {
                this.props.onPickImage(this.props.card);
            }
        }} >
            <img src={backCard} className="back-img" alt={"back image" + code}/>
            <div className="card">
                <img src={img_src} alt={"image" + code} />
                <p className="code">{code.split('')[0]}</p>
            </div>
        </div>)
    }
}

export default connect() (Card)

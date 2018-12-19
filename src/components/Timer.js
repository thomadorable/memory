import React from 'react'
import { connect } from 'react-redux'

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: Math.floor(this.props.timer / 1000),
            isPaused: false
        }

        setInterval(() => {

            if (this.state.isPaused) return null;

            this.setState({
                time: this.state.time + 1
            })
        }, 1000);
    }

    formatDate = () => {
        
        return this.state.time + 's';
    }

    click = (e) => {

        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    render() {
        const time = this.formatDate();

        return(
            <button onClick={this.click} className="bt-border timer">Timer !!! {time}</button>
        )
    }
}

export default connect() (Card)

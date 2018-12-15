import React from 'react'
import { connect } from 'react-redux'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Math.floor(this.props.timer / 1000)
        }

        setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
        }, 1000);
    }

    formatDate = () => {
        return this.state.time + 's';
    }

    render() {
        
        const time = this.formatDate();

        return(
            <p>Timer !!! {time}</p>
        )
    }
}

export default connect() (Card)

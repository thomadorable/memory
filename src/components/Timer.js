import React from 'react'
import { connect } from 'react-redux'

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <button onClick={this.props.toggleTimer} className="bt-border timer">
                {this.props.time}s
                <span className="emoji-pause">
                    {this.props.isPaused ? '▶️' : '⏸'}
                </span>
            </button>
        )
    }
}

export default connect() (Card)

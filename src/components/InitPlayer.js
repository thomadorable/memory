import React from 'react'
import { connect } from 'react-redux'
import { createPlayer } from '../actions'

class InitPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

        this.dispatch = props.dispatch;
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submit !!', this.state.name)
        const name = this.state.name.trim();
        if (name.length > 0) {
            this.dispatch(createPlayer({name: name, step: 0}));
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => {
                    this.setState({
                        name: e.target.value
                    });
                }} />
                <button type="submit">Envoyer</button>
            </form>
        )
    }
}

export default connect() (InitPlayer)

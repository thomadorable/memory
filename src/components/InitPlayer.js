import React from 'react'
import { connect } from 'react-redux'
import { createPlayer } from '../actions'

class InitPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }

        this.dispatch = props.dispatch;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name.trim();

        if (name.length > 0) {
            document.getElementById("form-init-player").classList.add("submitted")

            setTimeout(() => {
                this.dispatch(createPlayer({name: name, step: 0}));
                document.getElementById("init-board").classList.add("show")
            }, 250)
        }
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className="container show"
                id="form-init-player">

                <input
                    type="text"
                    placeholder="votre prénom"
                    className="text-big"
                    onChange={(e) => {
                    this.setState({
                        name: e.target.value
                    });
                }} />

                <button
                    className="bt-full"
                    type="submit"
                >envoyer</button>

            </form>
        )
    }
}

export default connect() (InitPlayer)

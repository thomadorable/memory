import React from 'react'

class Scores extends React.Component {
    constructor(props) {
        super(props)

        // prépare notre état
        this.state = {
            savingStatus: "Enregistrement en cours",
            scores: []
        }

        this.nbCards = props.data.nbCards

        // enregistre les scores
        this.addScore(props.data)
    }

    showScores = (e) => {
        const game = this

        // paramètres de la requete
        const params = {
            method: 'GET',
        }

        // ajoute le score dans le json
        fetch(`http://localhost:3000/scores?nbCards=${this.nbCards}&_sort=step&_order=asc`, params)

            .then((response) =>response.json() )
            .then((data) => {

                for (let score of data) {
                    game.setState({
                        scores: [...this.state.scores, {score}]
                    })
                }
            })
            .catch((error) => {
                console.error("error", error)
                game.setSavingStatus("error")
            });

        e.preventDefault()
    }

    addScore(data) {
        const game = this

        // paramètres de la requete
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        // ajoute le score dans le json
        fetch('http://localhost:3000/scores', params)

            .then((res) => {

                if( res.ok ) game.setSavingStatus("success")
                else game.setSavingStatus("error")
            })
            .catch((error) => {
                console.error("error", error)
                game.setSavingStatus("error")
            });
    }

    setSavingStatus(type) {

        switch (type) {
            case  "success" :
                this.setState({
                    savingStatus: "Enregistrement du score validé"
                })
                break;
            default :
                this.setState({
                    savingStatus: "Erreur pendant l'enregistrement"
                })
        }
    }

    render () {

        return (
            <div>
                <p>{this.state.savingStatus}</p>
                <button onClick={this.showScores}>Afficher tous les scores</button>
                <ul>
                    {this.state.scores.map( (item) => <li key={item.score.id}>{item.score.player} {item.score.step}</li> )}
                </ul>
            </div>
        )

    }
}

export default Scores

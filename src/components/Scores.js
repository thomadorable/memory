import React from 'react'

class Scores extends React.Component {
    constructor(props) {
        super(props)

        // prépare notre état
        this.state = {
            savingStatus: "Enregistrement en cours",
            scores: [],
            bestScoreOpen: false
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
        fetch(`http://localhost:3000/scores?nbCards=${this.nbCards}&_sort=step,time&_order=asc&_limit=10`, params)

            .then((response) =>response.json() )
            .then((data) => {
                for (let score of data) {
                    game.setState({
                        scores: [...this.state.scores, {score}],
                        bestScoreOpen: true
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
                    savingStatus: "Votre score a bien été enregistré"
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
                <p className="text-current">{this.state.savingStatus}</p>
                { this.state.bestScoreOpen ? null: <button className="bt-full" onClick={this.showScores}>Afficher les meilleurs scores</button> }
                <ul>
                    {this.state.scores.map( (item) => <li className="text-current" key={item.score.id}>nom: {item.score.player} essais:{item.score.step} temps: {item.score.time}s</li> )}
                </ul>
            </div>
        )

    }
}

export default Scores

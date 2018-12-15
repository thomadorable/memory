import { connect } from 'react-redux'
import Board from '../components/Board'

const mapStateToProps = state => ({
  player: state.player,
  deck: state.deck
})

export default connect(
  mapStateToProps
)(Board)
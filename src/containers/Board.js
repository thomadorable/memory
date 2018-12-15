import { connect } from 'react-redux'
import Board from '../components/Board'
// import { toggleTodo, favTodo } from '../actions'
// import { VisibilityFilters } from '../actions'

const mapStateToProps = state => ({
  player: state.player,
  deck: state.deck
})

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id)),
  // favTodo: id => dispatch(favTodo(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
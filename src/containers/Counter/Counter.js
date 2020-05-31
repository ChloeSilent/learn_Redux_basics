import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionsType from "../../store/actions"
class Counter extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubstractCounter}
        />
        <hr />
        <button onClick={()=>{this.props.onStoreResult(this.props.ctr)}}>Store result</button>
        <ul>
            {this.props.rslt.map(item =>  (<li key={item.id} onClick={() => {this.props.onDeleteResult(item.id)}}>{item.val}</li>))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counterReducer.counter,
    rslt: state.resultsReducer.results
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: actionsType.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionsType.DECREMENT }),
    onAddCounter: () => dispatch({ type: actionsType.ADD, value: 5 }),
    onSubstractCounter: () => dispatch({ type: actionsType.SUBSTRACT, value: 5 }),
    onStoreResult: (result)=> dispatch( {type: actionsType.STORE_RESULT, result}),
    onDeleteResult: (id)=> dispatch({type: actionsType.DELETE_RESULT, id: id}),
};
};

export default connect(mapStateToProps, dispatchToProps)(Counter);

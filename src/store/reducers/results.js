import * as actionsType from '../actions'

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionsType.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat([{id: new Date, val: action.result}])
            }
        case actionsType.DELETE_RESULT:
            let newArr = state.results.filter(item => item.id !== action.id)
            return {
                ...state,
                results: newArr
            }
    }
    return state;
}

export default reducer;
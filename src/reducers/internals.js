
import {ADD_PARTICIPANT, ADD_SCORE, DELETE_PARTICIPANT} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import _ from 'lodash';

const initialState = {
  AddParticipantForm: {name: ''},
  EditParticipant: {}
};


const actions = {
  [ADD_PARTICIPANT]: (state, action) => {
    const participants = action.name ? [...state.participants, action.name] : state.participants;
    return Object.assign({}, state, { participants: participants });
  },
  [DELETE_PARTICIPANT]: (state, action) => {
    const participants = _.without(_.cloneDeep(state.participants), action.name);
    return Object.assign({}, state, { participants: participants });
  }
};


export default (state = initialState, action) => {
  const actionFn = actions[action.type];

  return actionFn ? actionFn(state, action) : state;

/*
	switch (action.type) {
		case ADD_PARTICIPANT:
    {
      const participants = action.name ? [...state.participants, action.name] : state.participants;
      return Object.assign({}, state, { participants: participants });
    }

    case NEW_PARTICIPANT:
      return Object.assign({}, state, { newParticipant: action.name });

		case ADD_SCORE:
    // { // limit scope with this code block, to satisfy eslint no-case-declarations rule.
    //   let newState = objectAssign({}, state);
    //   newState[action.fieldName] = action.value;
    //   let calc = calculator();
    //   newState.necessaryDataIsProvidedToCalculateSavings = calc.necessaryDataIsProvidedToCalculateSavings(newState);
    //   newState.dateModified = dateHelper.getFormattedDateTime(new Date());
    //
    //   if (newState.necessaryDataIsProvidedToCalculateSavings) {
    //     newState.savings = calc.calculateSavings(newState);
    //   }
    //
    //   return newState;
    // }

		default:
			return state;
	}
*/
};

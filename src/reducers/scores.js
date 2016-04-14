
import {
  ADD_PARTICIPANT,
  ADD_SCORE,
  DELETE_PARTICIPANT,
  RENAME_PARTICIPANT
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import _ from 'lodash';

const initialState = {
  participants: [],
  scores: {}
};


const actions = {
  [ADD_PARTICIPANT]: (state, action) => {
    if (state.participants.indexOf(action.name) > -1) return state;
    const participants = action.name ? [...state.participants, action.name] : state.participants;
    const scores = Object.assign({}, state.scores, { [action.name]: [0] });
    return Object.assign({}, state, { participants, scores });
  },

  [RENAME_PARTICIPANT]: (state, { oldName, newName }) => {
    const { participants } = state;
    const oldNameIndex = participants.indexOf(oldName);
    if (oldNameIndex === -1) return state;
    if (participants.indexOf(newName) > -1) return state;

    const newParticipants = [
      ...participants.slice(0, oldNameIndex),
      newName,
      ...participants.slice(oldNameIndex+1)
    ];
    const _newScores = Object.assign({}, state.scores, { [newName]: state.scores[oldName] });
    const newScores = _.omit(_newScores, oldName);
    return Object.assign({}, state, { participants: newParticipants, scores: newScores });
  },

  [DELETE_PARTICIPANT]: (state, { name }) => {
    const participants = _.without(_.cloneDeep(state.participants), name);
    const scores = _.omit(_.cloneDeep(state.scores), name);
    return Object.assign({}, state, { participants, scores });
  },

  [ADD_SCORE]: (state, { participantName, score }) => {
    if (!participantName) {
      return state;
    }
    const participantScores = _.get(state, `scores.${participantName}`, []);
    const updatedScores = [...participantScores, score];
    const scores = Object.assign({}, state.scores, {[participantName]: updatedScores});
    return Object.assign({}, state, { scores });
  }
};


export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};

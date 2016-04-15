
import {
  ADD_PARTICIPANT,
  ADD_SCORE,
  DELETE_PARTICIPANT,
  RENAME_PARTICIPANT,
  MOVE_UP_PARTICIPANT,
  MOVE_DOWN_PARTICIPANT,
  REVERT_STATE
} from '../constants/actionTypes';

import objectAssign from 'object-assign';
import _ from 'lodash';

const initialState = {
  participants: [],
  scores: {},
  currentScores: {},
  currentLap: 1
};

const isLastLap = (currentLap, participants, scores) => {
  const allParticipantsWhoPlayThatLap = Object.keys(scores).filter((name) => (
    scores[name].length > currentLap
  ));
  return allParticipantsWhoPlayThatLap.length === participants.length;
};

const statesHistory = [];


const actions = {
  [ADD_PARTICIPANT]: (state, action) => {
    if (state.participants.indexOf(action.name) > -1) return state;
    const participants = action.name ? [...state.participants, action.name] : state.participants;
    const placeholder = _.range(state.currentLap).map(() => 0);
    const scores = Object.assign({}, state.scores, { [action.name]: placeholder });
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
      ...participants.slice(oldNameIndex + 1)
    ];
    const _newScores = Object.assign({}, state.scores, { [newName]: state.scores[oldName] });
    const newScores = _.omit(_newScores, oldName);
    return Object.assign({}, state, { participants: newParticipants, scores: newScores });
  },

  [MOVE_UP_PARTICIPANT]: (state, { participantName }) => {
    const { participants } = state;
    const participantIndex = participants.indexOf(participantName);
    if (participantIndex < 1) return state;

    const newParticipants = [
      ...participants.slice(0, participantIndex - 1),
      participantName,
      ...[].concat(
        participants.slice(participantIndex - 1, participantIndex),
        participants.slice(participantIndex + 1)
      )
    ];

    return Object.assign({}, state, { participants: newParticipants });
  },

  [MOVE_DOWN_PARTICIPANT]: (state, { participantName }) => {
    const { participants } = state;
    const participantIndex = participants.indexOf(participantName);
    if (participantIndex === -1) return state;
    if (participantIndex === participants.length -1) return state;

    const newParticipants = [
      ...[].concat(
        participants.slice(0, participantIndex),
        participants.slice(participantIndex + 1, participantIndex + 2)
      ),
      participantName,
      ...participants.slice(participantIndex + 2)
    ];

    return Object.assign({}, state, { participants: newParticipants });
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
    let currentScores = Object.assign({}, state.currentScores, { [participantName]: score });

    let currentLap = state.currentLap;
    if (isLastLap(state.currentLap, state.participants, scores)) {
      currentLap = state.currentLap + 1;
      currentScores = {};
    }
    return Object.assign({}, state, { scores, currentLap, currentScores });
  },

  [REVERT_STATE]: (state, { index }) => {
    return statesHistory[index];
  }
};


export default (state = initialState, action) => {
  statesHistory.push(state);
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};

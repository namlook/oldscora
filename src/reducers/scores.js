/* global window */

import {
  ADD_PARTICIPANT,
  ADD_SCORE,
  RESET_SCORES,
  RESET_ALL,
  DELETE_PARTICIPANT,
  RENAME_PARTICIPANT,
  MOVE_UP_PARTICIPANT,
  MOVE_DOWN_PARTICIPANT,
  REVERT_STATE
} from '../constants/actionTypes';

import objectAssign from 'object-assign';
import _ from 'lodash';

const { localStorage } = window;

const _initialState = {
  participants: [],
  scores: {},
  currentScores: {},
  currentLap: 1,
  history: 0
};

let initialState;
try {
  initialState = JSON.parse(localStorage.getItem('scoraState'));
} catch (e) {
  initialState = null;
  console.log('no local state found');
}
initialState = initialState || _initialState;

// let statesHistory;
// try {
//   statesHistory = JSON.parse(localStorage.getItem('scoraStateHistory'));
// } catch (e) {
//   statesHistory = null;
// }
// statesHistory = statesHistory || [];
//
// let stateIndex = parseFloat(localStorage.getItem('scoraStateHistoryIndex') || 0);
let statesHistory = [];
let stateIndex = 0;

const isLastLap = (currentLap, participants, scores) => {
  const allParticipantsWhoPlayThatLap = Object.keys(scores).filter((name) => (
    scores[name].length > currentLap
  ));
  return allParticipantsWhoPlayThatLap.length === participants.length;
};


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

  [RESET_SCORES]: (state) => {
    const scores = state.participants.reduce((acc, name) => {
      acc[name] = [0];
      return acc;
    }, {});
    return Object.assign({}, _initialState, { scores, participants: state.participants });
  },

  [RESET_ALL]: (state) => {
    statesHistory = [];
    stateIndex = 0;
    localStorage.setItem('scoraStateHistory', JSON.stringify(statesHistory));
    localStorage.setItem('scoraStateHistoryIndex', stateIndex);
    return Object.assign({}, _initialState, {});
  },

  [REVERT_STATE]: (state, { index }) => {
    console.log(stateIndex, statesHistory.length, statesHistory);
    if (stateIndex + index > statesHistory.length) {
      return statesHistory.slice(-1)[0];
    }
    if (stateIndex + index - 1 < 0) {
      return state;
    }
    stateIndex += index;
    const newState = statesHistory[stateIndex - 1];
    return newState;
  }
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  const newState = actionFn ? actionFn(state, action) : state;
  if (action.type != REVERT_STATE || action.type != RESET_ALL) {
    statesHistory = [...statesHistory.slice(0, stateIndex), newState];
    stateIndex += 1;
    localStorage.setItem('scoraStateHistory', JSON.stringify(statesHistory));
    localStorage.setItem('scoraStateHistoryIndex', stateIndex);

  }
  localStorage.setItem('scoraState', JSON.stringify(newState));
  return newState;
};

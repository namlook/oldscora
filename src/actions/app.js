import * as types from '../constants/actionTypes';

export function addParticipant(name) {
	return { type: types.ADD_PARTICIPANT, name };
}

export function deleteParticipant(name) {
  return { type: types.DELETE_PARTICIPANT, name};
}

export function renameParticipant(oldName, newName) {
  return { type: types.RENAME_PARTICIPANT, oldName, newName};
}

export function addScore(participantName, score) {
	return { type: types.ADD_SCORE, participantName, score };
}

export function moveUpParticipant(participantName) {
  console.log('up', participantName);
	return { type: types.MOVE_UP_PARTICIPANT, participantName };
}

export function moveDownParticipant(participantName) {
	return { type: types.MOVE_DOWN_PARTICIPANT, participantName };
}

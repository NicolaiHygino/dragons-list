import { MdPendingActions } from "react-icons/md";

export const initialState = {
  dragons: [],
};

export const addDragons = (dragons) => ({
  type: "ADD_DRAGONS",
  dragons,
});

export const editDragon = (dragon) => ({
  type: "EDIT_DRAGON",
  dragon,
});

export const dragonsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_DRAGONS':
      return {
        dragons: action.dragons,
      }
    case 'EDIT_DRAGON':
      return {
        dragons: state.dragons.map(dragon => {
          if (dragon.id === action.dragon.id) {
            return {...dragon, ...action.dragon}
          }
          return dragon;
        })
      }
    default:
      throw new Error(`"${action.type}" action type does not exists.`);
  }
};

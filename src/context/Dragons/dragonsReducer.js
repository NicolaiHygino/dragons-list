export const initialState = {
  dragons: [],
};

export const addDragons = (dragons) => ({
  type: "ADD_DRAGONS",
  dragons,
});

export const dragonsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_DRAGONS':
      return {
        dragons: action.dragons,
      }
    default:
      throw new Error(`"${action.type}" action type does not exists.`);
  }
};

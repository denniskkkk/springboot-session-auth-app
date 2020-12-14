
const initialState = {
		counter: 0,
		lists: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
    case 'ADD-TYPE': {
      //const { counter } = action.payload;
      return {
        ...state,
        counter: ++state.counter,
      };
    }
    case 'TOGGLE-TYPE': {
      //const { counter } = action.payload;
      return {
        ...state,
        counter: (state.counter > 0) ? 0:1 ,
      };
    }
    case 'ZERO-TYPE': {
        const { counter } = action.payload;
        return {
          ...state,
          counter: counter,
        };
      }    
    case 'ADDLIST-TYPE': {
        const { item } = action.payload;
        return {
          ...state,
          lists: [...state.lists, item]
        };
      }      
    case 'CLSLIST-TYPE': {
        return {
          ...state,
          lists: []
        };
      }      
    default: {
      return state;
    }
  }
}


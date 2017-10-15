const initialState = {
  items: []
}

function items(state = initialState, action) {
  switch(action.type) {
    case 'SET_ITEM_INFO':
      const items = [ ...state.items ];
      items[action.itemIndex] = { ...items[action.itemIndex], ...action.itemInfo };
      return { items };
    default:
      return state;
  }
}

export default items;

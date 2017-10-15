const initialState = {
  items: [
    {
      title: 'yellow bike',
      src: 'https://i.pinimg.com/736x/40/ba/c8/40bac89fdf296d77e22abe228739d87f--art-students-candy-land.jpg',
      description: 'Travel wit style and comfort',
      price: 2.34,
    },
    {
      title: 'unicorn bike',
      src: 'https://i.pinimg.com/736x/54/af/51/54af512f77758d98397e3497d391c107--unicorn-bike-unicorn-mask.jpg',
      description: 'Travel wit more style and comfort',
      price: 2.69,
    },
    {
      title: 'banana',
      src: 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg',
      description: 'helps you become less hungry',
      price: 0.006,
    },
  ]
}

function items(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default items;
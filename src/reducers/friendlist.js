import * as types from '../constants/ActionTypes';

export const initialState = {
  friendsById: [
    {
      id: '111111',
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'male'
    },
    {
      id: '222222',
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'male'
    },
    {
      id: '333333',
      name: 'George Washington',
      starred: false,
      gender: 'male'
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          {
            id: action.id,
            name: action.name,
            gender: action.gender,
            starred: action.starred
          },
          ...state.friendsById
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}

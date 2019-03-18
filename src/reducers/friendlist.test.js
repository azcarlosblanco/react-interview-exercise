import * as actionTypes from '../constants/ActionTypes';
import friends, { initialState } from './friendlist';

describe('friends reducer', () => {

    it('should return the initial state', () => {
        expect(friends(undefined, {})).toEqual(initialState)
    })

    it('should add friend to list when addFriend is called', () => {
        const newFriendActionCreator = {
            name: 'John F. Kennedy',
            gender: 'male',
            starred: false,
            type: actionTypes.ADD_FRIEND
        }
        
        expect(friends(undefined, newFriendActionCreator).friendsById.length).toBe(initialState.friendsById.length + 1);
    });

    it('should remove a friend from list when deleteFriend is called', () => {
        const deleteFriendActionCreator = {
            id: '111111',
            type: actionTypes.DELETE_FRIEND
        }

        expect(friends(undefined, deleteFriendActionCreator)).toEqual({
            friendsById: [{
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
        });
    });

    it('should star friend when startFriend is called', () => {
        const startFriendActionCreator = {
            id: '222222',
            type: actionTypes.STAR_FRIEND
        }

        expect(friends(undefined, startFriendActionCreator)).toEqual({
            friendsById: [{
                    id: '111111',
                    name: 'Theodore Roosevelt',
                    starred: true,
                    gender: 'male'
                },
                {
                    id: '222222',
                    name: 'Abraham Lincoln',
                    starred: true,
                    gender: 'male'
                },
                {
                    id: '333333',
                    name: 'George Washington',
                    starred: false,
                    gender: 'male'
                }
            ]
        });
    });

});
import * as actionTypes from '../constants/ActionTypes';
import { initialState, friends } from './friendlist';

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

        const {
            type,
            ...newFriend
        } = newFriendActionCreator;

        expect(friends(undefined, newFriendActionCreator)).toEqual({
            friendsById: [...initialState.friendsById, newFriend]
        });
    });

    it('should remove a friend from list when deleteFriend is called', () => {
        const deleteFriendActionCreator = {
            id: 0,
            type: actionTypes.DELETE_FRIEND
        }

        expect(friends(undefined, deleteFriendActionCreator)).toEqual({
            friendsById: [{
                    name: 'Abraham Lincoln',
                    starred: false,
                    gender: 'male'
                },
                {
                    name: 'George Washington',
                    starred: false,
                    gender: 'male'
                }
            ]
        });
    });

    it('should star friend when startFriend is called', () => {
        const startFriendActionCreator = {
            id: 1,
            type: actionTypes.STAR_FRIEND
        }

        expect(friends(undefined, startFriendActionCreator)).toEqual({
            friendsById: [{
                    name: 'Theodore Roosevelt',
                    starred: true,
                    gender: 'male'
                },
                {
                    name: 'Abraham Lincoln',
                    starred: true,
                    gender: 'male'
                },
                {
                    name: 'George Washington',
                    starred: false,
                    gender: 'male'
                }
            ]
        });
    });

});
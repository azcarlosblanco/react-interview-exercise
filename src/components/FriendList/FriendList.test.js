import React from 'react';
import { addFriend, deleteFriend, starFriend } from '../../actions/FriendsActions';
import FriendList from './FriendList';
import { initialState } from '../../reducers/friendlist';
import FriendListItem from './FriendListItem';

const actions = {
    addFriend: addFriend,
    deleteFriend: deleteFriend,
    starFriend: starFriend
}; 

describe('FriendList Component', () => {

    let component;

    it('exists and is not undefined', () => {
      expect(FriendList).toBeDefined();
    });

    describe('when rendered successfully', () => {
        beforeEach(() => {
            component = shallow(<FriendList friends={initialState.friendsById} actions={actions} />);
        });

        it('should render component', () => {
            expect(component).toHaveLength(1);
        });

        it('should render FriendListItem(3)', () => {
            const friendListItem = component.find(FriendListItem);
            expect(friendListItem).toHaveLength(initialState.friendsById.length);
        });

    })
});
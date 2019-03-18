import { addFriend, deleteFriend, starFriend } from './FriendsActions';
import * as actionTypes from '../constants/ActionTypes';

describe('FriendsActions', () => {
    
    it('should return name, gender and stared when addFriend is called', () => {
        const name = 'John F. Kennedy';
        const gender = 'male';

        const addFriendActionCreator = addFriend(name, gender);

        expect(addFriendActionCreator.name).toBe(name);
        expect(addFriendActionCreator.gender).toBe(gender);
        expect(addFriendActionCreator.starred).toBe(false);

        expect(addFriendActionCreator.type).toBe(actionTypes.ADD_FRIEND);
    });

    it('should return id when deleteFriend is called', () => {
        const id = 1;
        const deleteFriendActionCreator = deleteFriend(id);

        expect(deleteFriendActionCreator.id).toBe(id);
        expect(deleteFriendActionCreator.type).toBe(actionTypes.DELETE_FRIEND);
    });

    it('should return id when starFriend is called', () => {
        const id = 1;
        const starFriendActionCreator = starFriend(id);

        expect(starFriendActionCreator.id).toBe(id);
        expect(starFriendActionCreator.type).toBe(actionTypes.STAR_FRIEND);
    });

});
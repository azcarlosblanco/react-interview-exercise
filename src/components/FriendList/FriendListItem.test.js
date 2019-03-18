import React from 'react';
import FriendListItem from './FriendListItem';

const actions = {
    deleteFriend: jest.fn(),
    starFriend: jest.fn()
}; 

const friend = {
    id: '000000',
    name: 'John F. Kennedy',
    gender: 'male',
    starred: true,
}

describe('AddFriendForm Component', () => {

    let component;

    it('exists and is not undefined', () => {
      expect(FriendListItem).toBeDefined();
    });

    describe('when rendered successfully', () => {
        beforeEach(() => {
            component = shallow(<FriendListItem {...friend} {...actions} />);
        });

        it('should render component', () => {
            expect(component).toHaveLength(1);
        });
    
        it('should render name', () => {
            const name = component.find('span');
            expect(name.text()).toBe(friend.name);          
        });

        it('should render gender', () => {
            const gender = component.find('small').first();
            expect(gender.text()).toBe(`Gender: ${friend.gender}`); 
        });
   
        it('should render fa-star instead of fa-star-o', () => {
            const faStart = component.find('.fa-star');
            expect(faStart).toHaveLength(1);
        });
    })


    describe('li wrapper', () => {

        beforeEach(() => {
            component = shallow(<FriendListItem {...friend} {...actions} />);
        });

        it('should call starFriend on button click', () => {
            component.find(".fa-star").parent().simulate('click');

            expect(actions.starFriend).toHaveBeenCalled();
        });

        it('should call deleteFriend on button click', () => {
            component.find(".fa-trash").parent().simulate('click');

            expect(actions.deleteFriend).toHaveBeenCalled();
        });

    });
});
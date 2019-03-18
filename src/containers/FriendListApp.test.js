import React from 'react';
import FriendListApp from './FriendListApp';

import {combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { FriendList, AddFriendForm } from '../components';
import Pagination from '../components/Pagination/Pagination';
import { initialState } from '../reducers/friendlist';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

describe('FriendListApp Component', () => {

    let component;

    it('exists and is not undefined', () => {
      expect(FriendListApp).toBeDefined();
    });

    describe('when rendered successfully', () => {
        beforeEach(() => {
            component = mount(<FriendListApp />, { context: { store } });
        });

        it('should render component', () => {
            expect(component).toHaveLength(1);
        });
    
        it('should render FriendList', () => {
            expect(component.find(FriendList)).toHaveLength(1);          
        });

        it('should render AddFriendForm', () => {        
            expect(component.find(AddFriendForm)).toHaveLength(1);          
        });

        it('should render Pagination', () => {        
            expect(component.find(Pagination)).toHaveLength(1);          
        });

    })


    describe('div wrapper', () => {

        beforeEach(() => {
            component = shallow(
                <Provider store={store}>
                    <FriendListApp />
                </Provider>
            );
        });

        fit('should set state on page change', () => {    
            const data = { currentPage: 1, pageLimit: 2 };
            const wrapper = component.dive({ context: { store }}).dive({ context: { store }});

            wrapper.instance().onPageChanged(data);

            expect(wrapper.state()).toEqual(data);
        });

        fit('should return filter friends correctly', () => {    
            const data = { currentPage: 2, pageLimit: 2 };
            const wrapper = component.dive({ context: { store }}).dive({ context: { store }});

            wrapper.instance().setState(data);
            const filteredFriends = wrapper.instance().getCurrentFriends(initialState.friendsById);

            expect(filteredFriends).toEqual([ { name: 'George Washington', starred: false, gender: 'male' } ]);
        });
    })
});
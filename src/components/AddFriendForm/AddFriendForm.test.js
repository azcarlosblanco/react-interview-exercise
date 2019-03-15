import React from 'react';
import AddFriendForm from './AddFriendForm';
import { addFriend } from '../../actions/FriendsActions';
import AlertMessages from '../../constants/AlertMessages';


describe('AddFriendForm Component', () => {

    let component;

    it('exists and is not undefined', () => {
      expect(AddFriendForm).toBeDefined();
    });

    describe('when rendered successfully', () => {
        beforeEach(() => {
            component = shallow(<AddFriendForm addFriend={() => {}} />);
        });

        it('should render component', () => {
            expect(component).toHaveLength(1);
        });
    
        it('should have 3 inputs', () => {
            const wrapper = shallow(<AddFriendForm addFriend={addFriend} />);
            const inputs = wrapper.find('input');
        
            expect(inputs).toHaveLength(3);          
        });

        it('should have a button of type submit', () => {
            const wrapper = shallow(<AddFriendForm addFriend={addFriend} />);
            const button = wrapper.find('button');

            expect(button).toHaveLength(1); 
            expect(button.props().type).toEqual('submit');               
        });
    })


    describe('Form', () => {

        beforeEach(() => {
            component = shallow(<AddFriendForm addFriend={() => {}} />);
        });

        it('should call handleSubmit on submit', () => {            
            const spy = sinon.spy(AddFriendForm.prototype, 'handleSubmit');
            const wrapper = shallow(<AddFriendForm addFriend={() => {}} />);

            wrapper.find("form").simulate('submit', { preventDefault: () => {} });

            expect(spy.calledOnce).toBeTruthy();
        });

        it('should call addFriend on submit', () => {
            const addFriend = jest.fn();
            const wrapper = shallow(<AddFriendForm addFriend={addFriend} />);

            wrapper.setState({ name: 'Jonh Doe', gender: 'male'})
            wrapper.find("form").simulate('submit', { preventDefault: () => {} });

            expect(addFriend).toHaveBeenCalled();
        });

        it('should call onInputChange on input(3) change', () => {            
            const spy = sinon.spy(AddFriendForm.prototype, 'onInputChange');
            const wrapper = shallow(<AddFriendForm addFriend={() => {}} />);

            const name = wrapper.find("input[type='text']");
            name.simulate('change', { target: { value: 'Hello World' } })

            const gender = wrapper.find("input[type='radio']");
            gender.forEach((node) => {
                node.simulate('change', { target: { value: 'Gender' } });
            });

            expect(spy.calledThrice).toBeTruthy();
        });

        it('should show an error message when name is not set', () => {   
            component.find("form").simulate('submit', { preventDefault: () => {} });
            const alert = component.find('.alert');

            expect(alert).toHaveLength(1);  
            expect(alert.text()).toEqual(AlertMessages.requiredName);                  
        });

        it('should show an error message when gender is not set', () => {            
            const name = component.find("input[type='text']");
            name.simulate('change', { target: { value: 'Hello World', name: 'name' } });
            component.find("form").simulate('submit', { preventDefault: () => {} });

            const alert = component.find('.alert');

            expect(alert).toHaveLength(1);  
            expect(alert.text()).toEqual(AlertMessages.requiredGender);     
        });

        it('should show a success message when form is submited', () => {
            const name = component.find("input[type='text']");
            name.simulate('change', { target: { value: 'Hello World', name: 'name' } });

            const gender = component.find("input[type='radio']");
            gender.first().simulate('change', { target: { value: 'male', name: 'gender' } });
            
            component.find("form").simulate('submit', { preventDefault: () => {} });

            const alert = component.find('.alert');

            expect(alert).toHaveLength(1);  
            expect(alert.text()).toEqual(AlertMessages.success);
        });
    })
});
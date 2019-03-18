import React from 'react';
import Pagination from './Pagination';

const paginationConfig = {
    totalRecords: 100,
    pageLimit: 2,
    pageNeighbours: 1,
    onPageChanged: jest.fn()
}
describe('Pagination Component', () => {

    let component;
    let spy;

    fit('exists and is not undefined', () => {
      expect(Pagination).toBeDefined();
    });

    describe('when rendered successfully', () => {
        beforeEach(() => {
            component = shallow(<Pagination {...paginationConfig} />);
        });

        fit('should render an ul', () => {
            const ul = component.find('ul');
            expect(component).toHaveLength(1);
        });

        fit('should render page-item(7)', () => {
            const pageItem = component.find('.page-item');
            expect(pageItem).toHaveLength(7);
        });

        fit('should render page-item one have clase active', () => {
            const pageItem = component.find('.page-item').first();
            expect(pageItem.props().className).toEqual('page-item active');
        });
    
        fit('should move to page 2', () => {
            component.instance().gotoPage(2);
            const pageItem = component.find('.page-item').at(1);

            expect(pageItem.props().className).toEqual('page-item active');         
            expect(component.state().currentPage).toBe(2);
        });

        fit('should show first and last page', () => {
            const pageItemFirst = component.find('.page-item').first();
            const pageItemLast = component.find('.page-item').last();

            expect(pageItemFirst.children().text()).toBe('1');
            expect(pageItemLast.children().text()).toBe('50');         
        });
    })


    describe('Nav wrapper', () => {

        beforeEach(() => {
            component = shallow(<Pagination {...paginationConfig} />);
        });

        fit('should call gotoPage on mount', () => {  
            spy = sinon.spy(Pagination.prototype, 'gotoPage');          
            const wrapper = shallow(<Pagination {...paginationConfig} />);
            expect(spy.calledOnce).toBeTruthy();
            Pagination.prototype.gotoPage.restore();
        });

        fit('should have called gotoPage twice when handleClick is invoked', () => {
            spy = sinon.spy(Pagination.prototype, 'gotoPage');    
            const wrapper = shallow(<Pagination {...paginationConfig} />);
            wrapper.instance().handleClick(2)({ preventDefault: () => {} });

            expect(spy.calledTwice).toBeTruthy();
            Pagination.prototype.gotoPage.restore();
        });

        it('should call handleClick on click', () => {
            spy = sinon.spy(Pagination.prototype, 'handleClick');                
            const wrapper = shallow(<Pagination {...paginationConfig} />);
            wrapper.find('.page-item')
                .last()
                .children()
                .simulate('click', { preventDefault: () => {} })

            expect(spy.calledOnce).toBeTruthy();
            Pagination.prototype.handleClick.restore();
        });

        fit('should call handleMoveLeft on click', () => {
            spy = sinon.spy(Pagination.prototype, 'handleMoveLeft');                
            const wrapper = shallow(<Pagination {...paginationConfig} />);
            wrapper.instance().handleClick(10)({ preventDefault: () => {} });
            wrapper.find("[aria-label='Previous']").simulate('click', { preventDefault: () => {} });

            expect(spy.calledOnce).toBeTruthy();
            Pagination.prototype.handleMoveLeft.restore();
        });

        fit('should call handleMoveRight on mount', () => {
            spy = sinon.spy(Pagination.prototype, 'handleMoveRight');                
            const wrapper = shallow(<Pagination {...paginationConfig} />);
            wrapper.instance().handleClick(25)({ preventDefault: () => {} });
            wrapper.find("[aria-label='Next']").simulate('click', { preventDefault: () => {} });
            
            expect(spy.calledOnce).toBeTruthy();
            Pagination.prototype.handleMoveRight.restore();
        });

        //...
    })
});
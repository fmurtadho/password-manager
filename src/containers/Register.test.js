import React from 'react';
import { shallow,mount } from 'enzyme';
import '../test-setup'
import {Register} from '../containers/Register';
// import store from '../store';
// import {Provider} from 'react-redux';

describe('<Register /> component ', () => {
    const registerWrapper = shallow(<Register />);
    
    it('renders correctly', () => {
        expect(registerWrapper).toHaveLength(1);
    });

    it('renders a <img>', () => {
        const registerSectionImg = registerWrapper.find('img');
        expect(registerSectionImg).toHaveLength(1)
    });

    it('renders a form <form>', () => {
        const formSection = registerWrapper.find('form');
        expect(formSection).toHaveLength(1);
    });

    it('have email state',()=>{
        const newUser = registerWrapper.state('newUser')     
        expect(newUser).toBeDefined()
        expect(newUser).toHaveProperty('email','')
        expect(newUser).toHaveProperty('password','')
    })
});

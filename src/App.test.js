import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import './test-setup.js'

// Enzyme.configure({adapter : new Adapter()})

describe('<App />',() => {
  const wrapper = shallow(<App />)
  
  it('should render App',()=>{
    expect(wrapper).toBeTruthy()
  })
  
})

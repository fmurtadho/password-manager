import React from 'react';
import { shallow } from 'enzyme';
import '../test-setup'
import Login from '../containers/Login';
import store from '../store';

describe('<Login /> component ', () => {
  it('renders correctly', () => {
    const loginWrapper = shallow(<Login store={store} />);
    expect(loginWrapper).toHaveLength(1);
  });
});

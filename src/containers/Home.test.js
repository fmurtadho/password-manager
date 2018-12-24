import React from 'react';
import { shallow } from 'enzyme';
import '../test-setup'
import Home from '../containers/Home';
import store from '../store';

describe('<Home /> component ', () => {
  it('renders correctly', () => {
    const homeWrapper = shallow(<Home store={store} />);
    expect(homeWrapper).toHaveLength(1);
  });
});

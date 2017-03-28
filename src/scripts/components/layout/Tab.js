import Inferno from 'inferno';
import Component from 'inferno-component';

const Tab = ({ children }) => (
  <div className='tabs__tab__content'>
    {children}
  </div>
);

export default Tab;

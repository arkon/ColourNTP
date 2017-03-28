import Inferno from 'inferno';
import Component from 'inferno-component';

const Toast = ({ visible, children }) => {
  return visible ?
    <div className="toast">{children}</div> :
    null;
};

export default Toast;

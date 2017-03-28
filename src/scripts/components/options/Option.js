import Inferno from 'inferno';
import Component from 'inferno-component';

import Chrome from '../../modules/chrome';

export default class Option extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  render () {
    return null;
  }
}

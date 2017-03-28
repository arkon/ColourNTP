import Inferno from 'inferno';
import Component from 'inferno-component';

import svgClose from '../../../assets/img/close.svg';

export default class DeleteList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      sortedList: []
    };

    this.getSortedBlackList = this.getSortedBlackList.bind(this);
  }

  componentDidMount () {
    this.setState({
      sortedList: this.getSortedBlackList(this.props.data)
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      sortedList: this.getSortedBlackList(nextProps.data)
    });
  }

  getSortedBlackList (blacklist) {
    let list = Object.keys(blacklist).map((key) => ({ date: blacklist[key], url: key }));
    return list.sort((a, b) => a.date > b.date);
  }

  render () {
    return (
      <div>
        <button
          onClick={this.props.onDeleteAll}
          className="options__button">
          Clear list
        </button>

        <table className="options__list__table">
          <tbody>
            {this.state.sortedList.map((data, i) => (
              <tr key={i}>
                <td>{data.url}</td>
                <td>
                  <button
                    onClick={() => this.props.onDelete(data.url)}
                    className="options__list__remove"
                    dangerouslySetInnerHTML={{ __html: svgClose }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };
}

import React, { Component } from 'react';

export default class DeleteList extends Component {
  state = {
    show: false,
    sortedList: []
  };

  constructor (props) {
    super(props);

    this.getSortedBlackList = this.getSortedBlackList.bind(this);
    this.toggleShowHide = this.toggleShowHide.bind(this);
  }
  
  getSortedBlackList (blacklist) {
    let list = Object.keys(blacklist).map((key) => {{ date: blacklist[key], url: key }});
    return list.sort((a, b) => a.date > b.date);
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

  toggleShowHide () {
    this.setState({
      show: !this.state.show
    });
  }

  render () {
    return (
      <div className="options__content">
        <button 
          className="options__button" 
          onClick={this.toggleShowHide}>
          show/hide removed sites
        </button>
        {this.state.show && 
          <ul>
            {this.state.sortedList.map((data, i) => {
              return (
                <li key={i}>
                  <button 
                    onClick={() => this.props.onDelete(data.url)}
                    className="options__remove">
                  </button>
                  <span>{data.url}</span>
                </li>
                );
            })}
          </ul>
        }
      </div>
    )
  };

}

import React, { Component } from 'react';

export default class DeleteList extends Component {
  state = {
	 show: false,
   sortedList: []
  }

  constructor (props) {
    super(props);

    this.getSortedBlackList = this.getSortedBlackList.bind(this);
  }
  
  getSortedBlackList (blacklist){
    let list = [];
    for (var key in blacklist) {
      if (blacklist.hasOwnProperty(key)) {
        list.push({date: blacklist[key], url: key})
      }
    }

    return list.sort((a, b) => {return a.date > b.date})
  }
  
  componentDidMount (){
    this.setState({
      sortedList: this.getSortedBlackList(this.props.data)
    });  
  }

  componentWillReceiveProps (nextProps){
    this.setState({
      sortedList: this.getSortedBlackList(this.props.data)
    });
  }

  render () {
    return (
      <div className="options__content">
        <button 
          className="options__button" 
          onClick={()=>this.setState({show: !this.state.show})}>
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

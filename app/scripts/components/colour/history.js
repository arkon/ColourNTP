import React from 'react';


var History = (props) => {
    return (
        <div className='history'>
            { props.data.getArray().map((item, i) => {
                let onItemClick = (e) => {
                    prompt('Copy to clipboard: Ctrl/⌘+C, Enter', item);
                };

                return (
                    <div key={i} className='history__item'
                        style={{ backgroundColor: item }}
                        onClick={onItemClick} />
                );
            }) }
        </div>
    );
}

export default History;

import React from 'react';

import Chrome from '../../modules/chrome';
import WebFont from '../../modules/webfont';


var FontPreview = (props) => {
    WebFont.loadFont(props.font);

    return (
        <p>{props.font}</p>
    );
};

export default FontPreview;

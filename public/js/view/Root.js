'use strict';

import React from 'react';


export default class Root extends React.Component {

    render () {
        const page = this.props.page;


        return (
            <div>
                {page}
            </div>
        );
    }

}
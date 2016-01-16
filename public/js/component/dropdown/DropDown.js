'use strict';

import React from 'react';
import cx from 'classnames';

export default class DropDown extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            open: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.setState({
            open: !this.state.open
        });
    }

    render () {
        const className = cx('dropdown', {
            open: this.state.open
        });

        return (
            <div onClick={this.onClick} className={className}>
                {this.props.children}
            </div>
        )
    }

}

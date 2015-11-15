'use strict';

import React from 'react';
import numeral from 'numeral';

export default class NumberFormControl extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            displayValue: '0',
            focus: false
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

    }

    onChange (e) {
        const displayValue = e.target.value;
        const numericValue = numeral(displayValue).value();

        this.setState({ displayValue });

        this.props.onChange(numericValue, e);

    }

    onFocus () {
        this.setState({
            focus: true
        });
    }

    onBlur () {
        const displayValue = numeral(this.state.displayValue).format(this.props.format);
        const focus = false;
        this.setState({ focus, displayValue });
    }

    componentWillReceiveProps (props) {
        if (typeof props.value !== 'undefined' && this.state.focus !== true) {
            this.setState({
                displayValue: props.value
            });
        }
    }

    componentWillMount () {
        this.setState({
            displayValue: this.props.value
        });
    }

    render () {

        return (
            <input onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} className={this.props.className} type="text" value={this.state.displayValue} />
        );

    }


}


NumberFormControl.defaultProps = {
    format: '0',
    onChange: function () {}
};
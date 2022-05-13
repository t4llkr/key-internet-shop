import React from 'react';
import PropTypes from 'prop-types';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: props.initialCount }
    }

    handleClickPlus = () => {
        if (this.state.counter < 1) { this.setState({counter: 1}); }
        else { this.setState({counter: this.state.counter + 1}); }
    }

    handleClickMinus = () => {
        if (this.state.counter <= 1) { this.setState({counter: 1}); }
        else { this.setState({counter: this.state.counter - 1}); }
    }

    render() {
        let {counter} = this.state;

        return(
            <div>
                <button onClick={this.handleClickMinus}className='counter'>-</button>
                <div className='counter counter-value'>{counter}</div>
                <button onClick={this.handleClickPlus}className='counter'>+</button>
            </div>
        );
    }
}

Counter.propTypes = {
    text: PropTypes.string,
    initialCount: PropTypes.number
}
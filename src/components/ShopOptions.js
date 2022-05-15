import React from 'react';
import PropTypes from 'prop-types';

class ShopOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boughtItems: props.boughtItems
        }
    }

    sortAsc = (e) => {
        const{sortingModeUpdate} = this.props;
        e.preventDefault();
        sortingModeUpdate(1);
    }

    sortDesc = (e) => {
        const{sortingModeUpdate} = this.props;
        e.preventDefault();
        sortingModeUpdate(2);
    }

    searchProcess = (e) => {
        this.setState({filter: e.target.value})
        const{filterUpdate} = this.props;
        e.preventDefault();
        filterUpdate(e.target.value);
    }

    goToProfile = () => {
        const {toOtherPage} = this.props;
        toOtherPage(1);
    }

    goToCart = () => {
        const {toOtherPage} = this.props;
        toOtherPage(3);
    }

    goToLogin = () => {
        const {toOtherPage} = this.props;
        toOtherPage(0);
    }

    render() {
        const {boughtItems} = this.props;
        return(
            <div className='shop-menu'>
                <div className='shop-options'>
                    <form>
                        <input className='p-b'
                            onChange={this.searchProcess}
                            name='search'
                            type='text'
                            placeholder='Поиск'/>
                    </form>
                    <div>
                        <button className='p-b' onClick={this.sortAsc}>От самого дешёвого</button>
                        <button className='p-b' onClick={this.sortDesc}>От самого дорогого</button>
                    </div>
                </div>
                <div className='prof-bpanel'>
                    <button className='p-b' onClick={this.goToProfile}>Профиль</button>
                    <button className='p-b' onClick={this.goToCart}>Корзина ({boughtItems})</button>
                    <button className='p-b' onClick={this.goToLogin}>Выйти</button>
                </div>
            </div>
        )
    }
}

ShopOptions.propTypes = {
    toOtherPage: PropTypes.func,
    sortingModeUpdate: PropTypes.func,
    filter: PropTypes.string,
    filterUpdate: PropTypes.func,
    boughtItems: PropTypes.number
}

export default ShopOptions;
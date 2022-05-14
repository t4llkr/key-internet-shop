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

    handleChange = (e) => {
        this.setState({filter: e.target.value})
    }

    searchProcess = (e) => {
        const{filterUpdate} = this.props;
        e.preventDefault();
        filterUpdate(this.state.filter);
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
        let {boughtItems} = this.state;
        return(
            <div className='shop-menu'>
                <div className='shop-options'>
                    <form>
                        <input
                            onChange={this.handleChange}
                            name='search'
                            type='text'
                            placeholder='Поиск'/>
                        <button className='p-b' onClick={this.searchProcess}>Найти</button>
                    </form>
                    <div>
                        <button className='p-b' onClick={this.sortAsc}>По возрастанию цены</button>
                        <button className='p-b' onClick={this.sortDesc}>По убыванию цены</button>
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
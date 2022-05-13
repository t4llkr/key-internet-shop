import React from 'react';
import PropTypes from 'prop-types';

class ShopOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: props.filter
        }
    }

    sortAsc = (e) => {
        const{sortingModeUpdate} = this.props;
        e.preventDefault();
        sortingModeUpdate(2);
    }

    sortDesc = (e) => {
        const{sortingModeUpdate} = this.props;
        e.preventDefault();
        sortingModeUpdate(1);
    }

    handleChange = (e) => {
        const{filterUpdate} = this.props;
        this.setState({filter: e.target.value})
        filterUpdate(e.target.value);
    }

    searchProcess = (e) => {
        e.preventDefault();
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
                        <button className='p-b' onClick={this.sortAsc}>По возрастанию</button>
                        <button className='p-b' onClick={this.sortDesc}>По убыванию</button>
                    </div>
                </div>
                <div className='prof-bpanel'>
                    <button className='p-b' onClick={this.goToProfile}>Профиль</button>
                    <button className='p-b' onClick={this.goToCart}>Корзина</button>
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
    filterUpdate: PropTypes.func
}

export default ShopOptions;
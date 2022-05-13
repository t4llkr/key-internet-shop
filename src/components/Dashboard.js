import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: props.title
        }
    }

    logoutClick = () => {
        const {logoutClick} = this.props;
        logoutClick(0);
    }

    shopShowClick = () => {
        const {toShopClick} = this.props;
        toShopClick(2);
    }

    render() {
        let {title} = this.props;

        return (
            <div className='dashboard'>
                <div className='dashboard-bpanel'>
                    <button
                        onClick={this.shopShowClick}
                        className='dashboard-button'>
                            В магазин
                    </button>
                    <button
                        onClick={this.logoutClick}
                        className='dashboard-button'>
                            Выйти
                    </button>
                </div>
                <div className='dash-tpanel'><p className='dashboard-text'>{title}</p></div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutClick: PropTypes.func,
    toShopClick: PropTypes.func,
    title: PropTypes.string
}

export default Dashboard;
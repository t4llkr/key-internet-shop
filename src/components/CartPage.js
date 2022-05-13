import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.min.css';
import PropTypes from 'prop-types';

const tableColumns = [
    {title: 'ID', dataIndex: 'id'},
    {title: 'Наименование', dataIndex: 'title'},
    {title: 'Стоимость', dataIndex: 'price'},
    {title: 'Кол-во', dataIndex: 'amount'}
]

export default class cartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          boughtItems: props.cartItems
        };
      }

    turnBack = () => {
        const {returnToShop} = this.props;
        returnToShop(2);
    }

    render() {
        const {boughtItems} = this.state;

        return (
            <div className='cart-page'>
                <Table columns={tableColumns} dataSource={boughtItems}/>
                <button className='dashboard-button'>Оформить заказ</button>
                <button className='dashboard-button'onClick={this.turnBack}>Вернуться в магазин</button>
            </div>
        )
    }
}

cartPage.propTypes = {
    returnToShop: PropTypes.func,
    cartItems: PropTypes.array
}
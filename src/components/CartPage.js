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
          boughtItems: props.cartItems,
          boughtItemsR: []
        };
      }

    turnBack = () => {
        const {returnToShop} = this.props;
        returnToShop(2);
    }

    bUpd = () => {
        const{bItemsUpdate} = this.props;
        bItemsUpdate(this.state.boughtItemsR);
    }

    render() {
        const {boughtItems} = this.state;
        const {itemsAmDec} = this.props;

        return (
            <div className='cart-page'>
                <h1>Добавлено товаров: {boughtItems.length}</h1>
                <Table 
                onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        this.setState ({
                            boughtItems: [...boughtItems.slice(0, rowIndex), ...boughtItems.slice(rowIndex+1)],
                            boughtItemsR: [...boughtItems.slice(0, rowIndex), ...boughtItems.slice(rowIndex+1)]
                        });
                        itemsAmDec();
                      }
                    };
                  }}
                columns={tableColumns} dataSource={boughtItems}/>
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
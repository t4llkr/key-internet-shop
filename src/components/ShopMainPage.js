import React from 'react';
import { Space, Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import Counter from './Counter';
import PropTypes from 'prop-types';

const url = 'https://fakestoreapi.com/products';
//const url = 'localhost:3001/products';
const imgalt = 'https://i.imgur.com/H9eDDyd.png';

class ShopMainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          minValue: 0,
          maxValue: 4,
          shopItems: [],
          error: '',
          boughtItems: props.boughtItems,
          keyVal: props.keyVal,
          sortingMode: props.sortingMode
        };
      }

    handleChange = (value) => {
        if (value <= 1) {
            this.setState({
              minValue: 0,
              maxValue: 4
            });
          }
        else {
            this.setState({
            minValue: value * 4 - 4,
            maxValue: value * 4
            });
        }
    };

    componentDidMount = async() => {
        let shopItems = [];
        try {
            const {shopItemsUpdate} = this.props;
            const result = await fetch(url);
            shopItems = await result.json();
            this.setState({shopItems: shopItems})
            shopItemsUpdate(shopItems);
        }
        catch (err) {
            this.setState ({
                error: 'Ошибка стоп нольнольноль'
            })
        }

        this.setState ( {
            shopItems
        })
    }

    buyItem = (e) => {
        e.preventDefault();
        const {boughtItems} = this.props;
        let bCopy = Object.assign([], boughtItems);
        bCopy.push()
    }

    render() {
        const {error, shopItems, boughtItems, keyVal} = this.state;
        let {inCount, itemsUpdate, keyUpdate} = this.props;

        return (
        <div className='shop-main'>
            <div className='pag-marg'>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={4}
                    onChange={this.handleChange}
                    total={20}
                />
            </div>
            <Space size={[8, 16]} wrap>{
                //shopItems.map(item => (
                shopItems &&
                shopItems.length > 0 &&
                shopItems.slice(this.state.minValue, this.state.maxValue).map((item) => (
                    <div 
                      align='center'
                      key={item.id}
                      className='item-block'
                      onClick={this.openModal}>
                        <img src={item.image} alt={imgalt} width='60%'/>
                        <div className='item-name'>{item.title}</div>
                        <div className='item-price'>{item.price}$</div>
                        <Counter initialCount={inCount}/>
                        <button className='item-buy-button' onClick={() => {
                                let bCopy = boughtItems.slice();
                                bCopy.push({key: keyVal, id: item.id, title: item.title, price: item.price, amount: inCount});
                                this.setState({boughtItems:bCopy, keyVal: keyVal+1});
                                itemsUpdate(bCopy);
                                keyUpdate(keyVal+1);
                                }
                            }
                        >Добавить в корзину</button>
                    </div>
                ))
                }
                <h2>{error}</h2>
            </Space>
            
        </div>
        )
    }
}

ShopMainPage.propTypes = {
    inCount: PropTypes.number,
    keyVal: PropTypes.number,
    boughtItems: PropTypes.array,
    itemsUpdate: PropTypes.func,
    keyUpdate: PropTypes.func,
    sortingMode: PropTypes.number,
    shopItemsUpdate: PropTypes.func
}

export default ShopMainPage;

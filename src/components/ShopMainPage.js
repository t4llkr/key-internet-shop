import React from 'react';
import { Space, Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import Counter from './Counter';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { SpinnerDotted } from 'spinners-react';

//const url = 'https://fakestoreapi.com/products';
const url = 'http://localhost:3001/products';
const imgalt = 'https://i.imgur.com/H9eDDyd.png';

class ShopMainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          minValue: 0,
          maxValue: 4,
          shopItems: props.shopItems,
          error: '',
          boughtItems: props.boughtItems,
          keyVal: props.keyVal,
          sortingMode: props.sortingMode,
          isLoaded: false,
          showAlert: false,
          showModal: false,
          bDown: false,
          image: '',
          title: '',
          price: '',
          description: '',
          category: '',
          count: '',
          counterAmount: 1,
          isBought: false
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
            this.setState({shopItems: shopItems, isLoaded: true})
            shopItemsUpdate(shopItems);
        }
        catch (err) {
            this.setState ({
                error: 'Ошибка стоп нольнольноль'
            })
        }
    }

    buyItem = (e) => {
        e.preventDefault();
        const {boughtItems} = this.props;
        let bCopy = Object.assign([], boughtItems);
        bCopy.push()
    }

    hideAlert = () => {
        this.setState({showAlert: false})
    }

    showModal = () => {
        if (this.state.bDown === false) {this.setState({showModal:true})}
    }
    hideModal = () => {
        this.setState({showModal: false})
    }

    onBDown = () => {
        this.setState({bDown: true})
    }
    onBOut = () => {
        this.setState({bDown: false})
    }

    submitCAmount = (n) => {
        this.setState({counterAmount: n})
    }

    switchBought = (bool) => {
        this.setState({isBought: bool})
    }

    render() {
        const {error, boughtItems, keyVal, showAlert, counterAmount} = this.state;
        let {inCount, itemsUpdate, keyUpdate, itemsAmInc, sh} = this.props;

        return (
        <div className='shop-main'>
            <div className='pag-marg'>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={4}
                    onChange={this.handleChange}
                    total={sh.length}
                />
            </div>
            <Space size={[8, 16]} wrap>{
                //shopItems.map(item => (
                sh &&
                sh.length > 0 &&
                sh.slice(this.state.minValue, this.state.maxValue).map((item) => (
                    <>
                        <div 
                        key={item.id}
                        className='item-block'
                        onClick={() => {
                                this.showModal();
                                this.setState({
                                    image: item.image,
                                    title: item.title,
                                    price: item.price,
                                    description: item.description,
                                    category: item.category,
                                    count: item.rating.count
                                })
                            }
                        }>
                            <img src={item.image} alt={imgalt} width='60%'/>
                            <div className='item-name'>{item.title}</div>
                            <div className='item-price'>{item.price}$</div>
                            <Counter initialCount={inCount}
                            onBDown={this.onBDown}
                            onBOut={this.onBOut}
                            submitCAmount={this.submitCAmount}
                            switchBought={this.switchBought}
                            counterAmount={this.state.counterAmount}
                            />
                            <button onMouseOver={this.onBDown}
                                onMouseOut={this.onBOut}
                                className='item-buy-button' onClick={() => {
                                    let bCopy = boughtItems.slice();
                                    bCopy.push({key: keyVal, id: item.id, title: item.title, price: item.price, amount: counterAmount});
                                    this.setState({boughtItems:bCopy, keyVal: keyVal+1, showAlert:true});
                                    itemsUpdate(bCopy);
                                    keyUpdate(keyVal+1);
                                    itemsAmInc();
                                    this.switchBought(true);
                                    }
                                }>Добавить в корзину</button>
                            
                        </div>
                    </>
                ))
                }
                <h2>{error}</h2>
            </Space>
            <Popup open={this.state.showModal} close={this.state.showModal} onClose={this.hideModal} modal>
                <div className='modal-bg' onClick={this.hideModal}></div>
                <div className='login-form'>
                    <img className='modal-pic' src={this.state.image} alt={imgalt} width='40%'/>
                    <div className='item-name'>{this.state.title}</div>
                    <div className='item-price'>{this.state.price}$</div>
                    <div><strong>Описание:</strong> {this.state.description}</div>
                    <div><strong>Категория:</strong> {this.state.category}</div>
                    <div><strong>В наличии:</strong> {this.state.count} шт.</div>
                </div>
            </Popup>
            <SpinnerDotted
                size='5%'
                className='spinner-to-center'
                enabled={!this.state.isLoaded} />
                <div className='alert-form'>
                    <div 
                        onClick={this.hideAlert}
                        className='alert-text'>
                            {showAlert ? 'Товар добавлен в корзину!' : ''}
                    </div>
                </div>
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
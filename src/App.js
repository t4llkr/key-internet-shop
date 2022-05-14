import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';
import Dashboard from './components/Dashboard';
import ShopMainPage from './components/ShopMainPage';
import ShopOptions from './components/ShopOptions';
import CartPage from './components/CartPage';

class App extends React.Component {
  state = {
    pageID: 0,
    title: "Информация о профиле",
    login: '',
    password: '',
    initialCount: 1,
    boughtItems: [],
    shopItems: [],
    shopItemsReserve: [],
    url:'https://fakestoreapi.com/products',
    keyVal: 0,
    sortingMode: 0,
    filter: ''
  }

  switchPage = (param) => {
    this.setState({pageID: param})
  }

  titleChangingClick = (newTitle) => {
    this.setState({title: newTitle})
  }

  boughtItemsUpdate = (array) => {
    this.setState({boughtItems: array})
  }

  keyIDUpdate = (val) => {
    this.setState({keyVal: val})
  }

  shopItemsUpdate = (array) => {
    this.setState({shopItems: array, shopItemsReserve: array})
  }

  sortingModeUpdate = (val) => {
    this.setState({sortingMode: val})
    this.state.shopItems.sort(function (a, b) {
      if (val === 1) {return a.price > b.price;}
      if (val === 2) {return a.price < b.price;}
  })
  }

  filterUpdate = (str) => {
    const {shopItemsReserve} = this.state;
    this.setState({filter: str, shopItems: shopItemsReserve});
    var filteredItems = this.state.shopItems.filter (function (item) {
      return item.title.includes(str);
    });
    this.setState({shopItems: filteredItems})
  }

  render() {
    const changePage = () => {
      switch(this.state.pageID) {
        case 0:
          return (
            <LoginForm
              toNext={this.switchPage}
              login={this.state.login}
              password={this.state.password}/>
          );
        case 1:
          return (
            <div className="profile-screen">
              <Navigator
                titleChangingClick={this.titleChangingClick}
              />
              <Dashboard
                logoutClick={this.switchPage}
                toShopClick={this.switchPage}
                title={this.state.title}
              />
            </div>
          );
        case 2:
          return (
            <>
              <ShopOptions
                toOtherPage={this.switchPage}
                sortingModeUpdate={this.sortingModeUpdate}
                filter={this.state.filter}
                filterUpdate={this.filterUpdate}/>
              <ShopMainPage
                inCount={this.state.initialCount}
                keyVal={this.state.keyVal}
                boughtItems={this.state.boughtItems}
                itemsUpdate={this.boughtItemsUpdate}
                keyUpdate={this.keyIDUpdate}
                sortingMode={this.state.sortingMode}
                shopItemsUpdate={this.shopItemsUpdate}/>
            </>
          );
        case 3:
          return (
            <CartPage
              returnToShop={this.switchPage}
              cartItems={this.state.boughtItems}/>
          );
        default:
          return <h1>404</h1>
      }
    }

    return (
      <div className='App'>{changePage()}</div>
    );
  }
}

export default App;
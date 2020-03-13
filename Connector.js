import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: ''
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    var dydx_operation =  {"constant":false,"inputs":[{"components":[{"name":"owner","type":"address"},{"name":"number","type":"uint256"}],"name":"accounts","type":"tuple[]"},{"components":[{"name":"actionType","type":"uint8"},{"name":"accountId","type":"uint256"},{"components":[{"name":"sign","type":"bool"},{"name":"denomination","type":"uint8"},{"name":"ref","type":"uint8"},{"name":"value","type":"uint256"}],"name":"amount","type":"tuple"},{"name":"primaryMarketId","type":"uint256"},{"name":"secondaryMarketId","type":"uint256"},{"name":"otherAddress","type":"address"},{"name":"otherAccountId","type":"uint256"},{"name":"data","type":"bytes"}],"name":"actions","type":"tuple[]"}],"name":"operate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}

    var accounts = [["0x2a5c6E0Eb76915466C0CE771DCFb6f258a572336", "223"]];

    var actions = [["1", "0", [false, "0", "1", "1000"], "1", "99", "0x2a5c6E0Eb76915466C0CE771DCFb6f258a572336", "99", web3.utils.asciiToHex("0")]];

    var dydx_operation_args = [
      accounts,
      actions
    ]


    const data = await web3.eth.abi.encodeFunctionCall(dydx_operation, dydx_operation_args)
    console.log(data)
  }

  render() {
    return (
      <div>
        DYDX Connector
      </div>
    );
  }
}

export default App;

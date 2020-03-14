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

    var dydx_operation =  {"constant":false,"inputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"number","type":"uint256"}],"internalType":"struct DydxInterface.Info[]","name":"accounts","type":"tuple[]"},{"components":[{"internalType":"enum DydxInterface.ActionType","name":"actionType","type":"uint8"},{"internalType":"uint256","name":"accountId","type":"uint256"},{"components":[{"internalType":"bool","name":"sign","type":"bool"},{"internalType":"enum DydxInterface.AssetDenomination","name":"denomination","type":"uint8"},{"internalType":"enum DydxInterface.AssetReference","name":"ref","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct DydxInterface.AssetAmount","name":"amount","type":"tuple"},{"internalType":"uint256","name":"primaryMarketId","type":"uint256"},{"internalType":"uint256","name":"secondaryMarketId","type":"uint256"},{"internalType":"address","name":"otherAddress","type":"address"},{"internalType":"uint256","name":"otherAccountId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct DydxInterface.ActionArgs[]","name":"actions","type":"tuple[]"},{"internalType":"uint256","name":"maxAmt","type":"uint256"}],"name":"borrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}

    var accounts = [["0x2a5c6E0Eb76915466C0CE771DCFb6f258a572336", "223"]];
    //first deposit and then withdraw
    var actions = [["0", "0", [true, "0", "0", "10000000"], "0", "98", "0x2a5c6E0Eb76915466C0CE771DCFb6f258a572336", "98", web3.utils.asciiToHex("0")], ["1", "0", [false, "0", "0", "1000"], "1", "99", "0x2a5c6E0Eb76915466C0CE771DCFb6f258a572336", "99", web3.utils.asciiToHex("0")]];

    var dydx_operation_args = [
      accounts,
      actions,
      "100000000000"
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

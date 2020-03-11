//JS File for interacting eith the protocol.
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

    var dydx_operation = { "constant": false, "inputs": [{ "components": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "number", "type": "uint256" }], "internalType": "struct DydxInterface.Info[]", "name": "accounts", "type": "tuple[]" }, { "components": [{ "internalType": "enum DydxInterface.ActionType", "name": "actionType", "type": "uint8" }, { "internalType": "uint256", "name": "accountId", "type": "uint256" }, { "components": [{ "internalType": "bool", "name": "sign", "type": "bool" }, { "internalType": "enum DydxInterface.AssetDenomination", "name": "denomination", "type": "uint8" }, { "internalType": "enum DydxInterface.AssetReference", "name": "ref", "type": "uint8" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct DydxInterface.AssetAmount", "name": "amount", "type": "tuple" }, { "internalType": "uint256", "name": "primaryMarketId", "type": "uint256" }, { "internalType": "uint256", "name": "secondaryMarketId", "type": "uint256" }, { "internalType": "address", "name": "otherAddress", "type": "address" }, { "internalType": "uint256", "name": "otherAccountId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "struct DydxInterface.ActionArgs[]", "name": "actions", "type": "tuple[]" }], "name": "operate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }

    var accounts = [["0xc19c5f0ecf68be63937cd1e9a43b4b4b19629c0f", 12]];

    var actions = [[1, 12, [true, 0, 1, "1000000"], 1, 0, "0x0000000000000000000000000000000000000000", 0, "0x12"]];

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

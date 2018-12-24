import {Card, Icon, Table} from 'antd';
import * as React from 'react';
import Web3 from 'web3';
import {IndexLink} from "react-router";

let web3;

class ListBlockTx extends React.Component<> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      blocks: [],
      txs: []
    };
  }

  async componentDidMount() {
    if (typeof web3 !== 'undefined'){
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8546'));
    }
    let blockNumber = 0;
    await web3.eth.getBlockNumber()
      .then(res => blockNumber = res)
      .catch(e => console.error(e));
    console.log(blockNumber);
    this.getBlocksTxs(blockNumber);
  }

  async getBlocksTxs(blockNumber) {
    const blocks = this.state.blocks.slice();
    const txs = this.state.txs.slice();
    let currentBlockObject, currentTxObject;
    let currentBlockNumber = blockNumber;
    for (let i = 0; i < 20; i++, currentBlockNumber--) {
      await web3.eth.getBlock(currentBlockNumber)
        .then(res => currentBlockObject = res);
      console.log(currentBlockObject);
      currentBlockObject.txNumber= currentBlockObject.transactions.length;
      blocks.push(currentBlockObject);
      for (let j = currentBlockObject.txNumber - 1; j >= 0; j--) {
        await web3.eth.getTransactionFromBlock(currentBlockNumber, j)
          .then(res => currentTxObject = res);
        console.log(currentTxObject);
        txs.push(currentTxObject);
      }
    }
    this.setState({
      blocks: blocks,
      txs: txs,
      loading: false
    });

  }

  render() {
    return (
      <div>
        <Card
          title="最新区块"
          extra={<IndexLink to="/listAllBlocks">查看全部</IndexLink>}
          style={{ width: "100%" }}
        >
          <Table dataSource={this.state.blocks} loading={this.state.loading} >
            <Table.Column dataIndex="number" title="Height"/>
            <Table.Column dataIndex="hash" title="Hash"/>
            <Table.Column dataIndex="size" title="Size"/>
            <Table.Column dataIndex="timestamp" title="TimeStamp"/>
            <Table.Column dataIndex="gasUsed" title="GasUsed"/>
            <Table.Column dataIndex="gasLimit" title="GasLimit"/>
          </Table>
        </Card>
        <br />
        <Card
          title="最新交易"
          style={{ width: "100%" }}
        >
          <Table dataSource={this.state.txs} loading={this.state.loading}  expandedRowRender={record =>
            {
              const detail = [];
              detail.push(record);
              return (
              <Table dataSource={detail}>
                <Table.Column dataIndex="gas" title="Gas"/>
                <Table.Column dataIndex="gasPrice" title="GasPrice"/>
                <Table.Column dataIndex="nonce" title="Nonce"/>
                <Table.Column dataIndex="input" title="Input"/>
                <Table.Column dataIndex="blockHash" title="BlockHash"/>
                <Table.Column dataIndex="blockNumber" title="BlockNumber"/>
              </Table>
            );}} >
            <Table.Column dataIndex="hash" title="TransactionHash" />
            <Table.Column dataIndex="from" title="From"/>
            <Table.Column dataIndex="to" title="To"/>
            <Table.Column dataIndex="value" title="Value"/>
          </Table>
        </Card>
      </div>
    );
  }
}

export default ListBlockTx;

import { Input, Table } from 'antd';
import * as React from 'react';
import Web3 from 'web3';

let web3;

class SearchBlock extends React.Component<> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      blocks: [],
    };
  }

  async componentDidMount() {
    if (typeof web3 !== 'undefined'){
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    let blockNumber = 0;
    await web3.eth.getBlockNumber()
      .then(res => blockNumber = res)
      .catch(e => console.error(e));
    console.log(blockNumber);
    this.getBlocks(blockNumber);
  }

  async getBlocks(blockNumber) {
    const blocks = this.state.blocks.slice();
    let currentBlockObject;
    let currentBlockNumber = blockNumber;
    for (let i = 0; i < 10; i++, currentBlockNumber--) {
      await web3.eth.getBlock(currentBlockNumber)
        .then(res => currentBlockObject = res);
      console.log(currentBlockObject);
      blocks.push(currentBlockObject);
    }
    this.setState({
      blocks: blocks,
      loading: false
    });

  }

  render() {
    return (
      <div>
        <div style={{ background: '#fff', padding: 0 }}>
        </div>
        <div style={{position: 'relative'}}>
          <Table dataSource={this.state.blocks} loading={this.state.loading} >
            <Table.Column dataIndex="number" title="Height"/>
            <Table.Column dataIndex="hash" title="Hash"/>
            <Table.Column dataIndex="size" title="Size"/>
            <Table.Column dataIndex="timestamp" title="TimeStamp"/>
            <Table.Column dataIndex="gasUsed" title="GasUsed"/>
            <Table.Column dataIndex="gasLimit" title="GasLimit"/>
          </Table>
        </div>
      </div>
    );
  }
}

export default SearchBlock;

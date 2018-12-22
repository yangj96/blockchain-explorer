import { Input, Table } from 'antd';
import * as React from 'react';
import Web3 from 'web3';
const Search = Input.Search;

let web3;

class SearchBlockTx extends React.Component<> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      blocks: [],
      currentBlock: null,
    };

  }

  async componentDidMount() {
    if (typeof web3 !== 'undefined'){
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8546'));
    }
    let currentBlockNumber = 0;
    await web3.eth.getBlockNumber()
      .then(res => currentBlockNumber = res)
      .catch(e => console.error(e));
    console.log(currentBlockNumber);
    this.getBlocks(currentBlockNumber);
  }

  async getBlocks(currentBlockNumber) {
    const blocks = this.state.blocks.slice();
    let maxBlocks = currentBlockNumber;
    let currentBlockObject;
    for (let i = 0; i < maxBlocks; i++, currentBlockNumber--) {
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
          <div>
            <Search
              placeholder="请输入区块ID或区块哈希"
              onSearch={this.onSearch}
              enterButton={true}
              size="large"
              style={{maxWidth: '400px'}}
            />
          </div>
        </div>
        <br />
        <div style={{position: 'relative'}}>
          <Table dataSource={this.state.blocks} loading={this.state.loading} scroll={{ x: 3600 }} >
            <Table.Column dataIndex="number" title="Height" width="80" fixed="left"/>
            <Table.Column dataIndex="size" title="Size"/>
            <Table.Column dataIndex="timestamp" title="TimeStamp"/>
            <Table.Column dataIndex="gasUsed" title="GasUsed"/>
            <Table.Column dataIndex="gasLimit" title="GasLimit"/>
            <Table.Column dataIndex="difficulty" title="Difficulty"/>
            <Table.Column dataIndex="miner" title="Miner"/>
            <Table.Column dataIndex="nonce" title="Nonce"/>
            <Table.Column dataIndex="parentHash" title="ParentHash"/>
            <Table.Column dataIndex="sha3Uncles" title="Sha3Uncles"/>
            <Table.Column dataIndex="stateRoot" title="StateRoot"/>
            <Table.Column dataIndex="hash" title="Hash" width="100" fixed="right"/>
          </Table>
        </div>
      </div>
    );
  }

  onSearch = async (keyword) => {
    this.setState ({
      loading: true,
      blocks: []
    });
    console.log(keyword);
    await web3.eth.getBlock(keyword)
      .then (res => this.state.currentBlock = res);
    console.log(this.state.currentBlock);
    let searchBlock = [];
    searchBlock.push(this.state.currentBlock);
    this.setState ({
      blocks: searchBlock,
      loading: false
    });

  };
}

export default SearchBlockTx;
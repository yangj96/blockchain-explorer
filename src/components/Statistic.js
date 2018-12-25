import { Card, Col, Row } from 'antd';
import * as React from 'react';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { OrdinalFrame } from 'semiotic';
import { stringToArrayFn } from 'semiotic/lib/data/dataFunctions';
import Web3 from 'web3';

let web3;

class Statistic extends React.Component<> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transctionsByMin: [],
      hashRate: [],
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
    this.getTransactions(blockNumber);
    this.getHashRate();
  }

  async getTransactions(blockNumber) {
    const transctionsByMin = this.state.transctionsByMin.slice();
    let currentBlockNumber = blockNumber;
    let tableLength = Math.ceil(blockNumber/60);
    for (let i = 0,j = 1; i < tableLength & j <= currentBlockNumber; i++) {
      let temp = 0;
      for(let counter = 0;counter < 10;counter++){
        await web3.eth.getBlockTransactionCount(j)
        .then(res => temp = temp + res);
        j++;  
      }
      transctionsByMin.push(temp);
    }
    this.setState({
      transctionsByMin: transctionsByMin,
      loading: false
    });
    console.log(transctionsByMin);
  }

  async getHashRate(){
    let colorShop = ["#FADAD8","#ABD0CE","#CBA6C3","#AAABD3","#8EC0E4","#9B8281","#f6ea8c","#353866"];
    const hashRate = this.state.hashRate.slice();
    let tmp_rate = [];
    for(let port = 8546;port < 8550;port++){
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:'+String(port)));
      await web3.eth.getHashrate()
      .then(res => tmp_rate.push(res));
    }
    let sum = 0,elem;
    for(elem in tmp_rate){
      sum += elem;
    }
    for(let i = 0;i < tmp_rate.length;i++){
      let percent = tmp_rate[i]/sum;
      hashRate.push({node:"Node"+String(i+1),rate:tmp_rate[i],color:colorShop[(i)%8]})
    }
    this.setState({
      hashRate: hashRate
    });
    console.log(hashRate);
  }

  render() {
    const transctionsByMin = this.state.transctionsByMin;
    const hashRate = this.state.hashRate;
    const barChartData = [];
    let s = transctionsByMin.length;
    for(let i = 0;i<s;i++){
      barChartData.push({time:String(i-s),transactionNum: transctionsByMin[i]});
    }
    console.log(barChartData);

    return(
      <div>
        <div style={{padding: '30px' }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">
                <Card title="最近几分钟的交易量统计" bordered={false} style={{ width: 300 }}>
                  <ResponsiveOrdinalFrame
                    size = {[500,300]}
                    responsiveWidth = { true }
                    margin = {{top : 10, bottom: 20, left: 40, right: 20}}
                    data={[{time:"-6",transactionNum:4},{time:"-5",transactionNum:4},{time:"-4",transactionNum:3},{time:"-3",transactionNum:3},{time:"-2",transactionNum:2},{time:"-1",transactionNum:1}]}
                    rAccessor={"transactionNum"}
                    oAccessor={"time"}
                    style={{ fill: "#6AAFE6", stroke: "#6AAFE6" }}
                    type={"bar"}
                    oLabel={true}
                    oPadding={10}
                    pixelColumnWidth={40}
                    axis={{ orient: "left" }}
                  />
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">
                <Card title="算力分布" bordered={false} style={{ width: 300 }}>
                  <OrdinalFrame
                    size={[300, 300]}
                    data={hashRate}
                    oAccessor={"node"}
                    dynamicColumnWidth={"rate"}
                    style={d => ({ fill: d.color, stroke: "white" })}
                    type={{ type: "bar", innerRadius: 50 }}
                    projection="radial"
                    margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    oPadding={1}
                    tooltipContent="pie"
                    oLabel={true}
                    hoverAnnotation={true}
                  />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      
    )
  }
}

export default Statistic;

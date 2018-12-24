import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import * as React from 'react';
import { IndexLink } from 'react-router';
import './Home.css'

const { Header, Content, Footer } = Layout;

class Home extends React.Component<> {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" >
            <span>区块链浏览器</span>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1">
              <IndexLink to="/listBlockTx">
                <Icon type="block" />
                <span >数据列表</span>
              </IndexLink>
            </Menu.Item>
            <Menu.Item key="2">
              <IndexLink to="/searchBlockTx">
                <Icon type="search" />
                <span >区块查询</span>
              </IndexLink>
            </Menu.Item>
            <Menu.Item key="3">
              <IndexLink to="/statistic">
                <span >数据统计</span>
              </IndexLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
          </Breadcrumb>
          <div style={{background: '#fff', padding: 24, minHeight: 280}}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Blockchain Explorer ©2018 Created by 15th Group
        </Footer>
      </Layout>
    );
  }
}

export default Home;

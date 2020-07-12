import * as React from 'react';
import Layout from './layout';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Aside from './aside';
import './layout.example.scss';

const LayoutExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>example 1</h1>
        <Layout className="hi" style={{height: 300,width:500}}>
          <Header className="x">header</Header>
          <Content className="z">content</Content>
          <Footer className="y">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>example 2</h1>
        <Layout style={{height: 300,width:500}}>
          <Header className="x">header</Header>
          <Layout>
            <Aside className="a">aside</Aside>
            <Content className="z">content</Content>
          </Layout>
          <Footer className="y">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>example 3</h1>
        <Layout style={{height: 300,width:500}}>
          <Header className="x">header</Header>
          <Layout>
            <Content className="z">content</Content>
            <Aside className="a">aside</Aside>
          </Layout>
          <Footer className="y">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>example 4</h1>
        <Layout style={{height: 300,width:500}}>
          <Aside className="a">aside</Aside>
          <Layout>
            <Header className="x">header</Header>
            <Content className="z">content</Content>
            <Footer className="y">footer</Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default LayoutExample;

import React from "react";
import { Layout } from "antd";

//components
import { HeaderComp } from "../components/Header";
import { TeamPicker } from "../components/TeamPicker";
import { Copyright } from "../components/Copyright";

export function PageLayout(props) {
  const { data } = props;
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>
        <HeaderComp data={data} />
      </Header>
      <Content>
        <TeamPicker data={data} />
      </Content>
      <Footer>
        <Copyright data={data} />
      </Footer>
    </Layout>
  );
}

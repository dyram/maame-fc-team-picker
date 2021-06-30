import React from "react";
import { Layout, BackTop } from "antd";

//components
import { HeaderComp } from "../components/Header";
import { TeamPicker } from "../components/TeamPicker";
import { Copyright } from "../components/Copyright";

export function PageLayout(props) {
  const { data } = props;
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <BackTop />
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

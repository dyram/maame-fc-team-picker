import React from "react";
import { Typography, Row, Col, Button } from "antd";

//assets
import logo from "../asset/Maame.png";

export function HeaderComp(props) {
  const { data } = props;
  const { Text } = Typography;

  return (
    <Row>
      <Col span={4}>
        <img src={logo} alt="Maame" style={{ width: "40%", height: "auto" }} />
      </Col>
      <Col span={16} style={{ textAlign: "center" }}>
        <Text style={{ letterSpacing: "5px" }}>
          {data.company.toString().toUpperCase()} &nbsp;&nbsp; TEAM PICKER
        </Text>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
}

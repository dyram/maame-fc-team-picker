import React from "react";
import { Typography, Row, Col } from "antd";

//assets
import logo from "../asset/Maame.png";

//hooks
import useWindowDimensions from "../hooks/useWindowDimensions";

export function HeaderComp(props) {
  const { data } = props;
  const { Text } = Typography;
  const { width } = useWindowDimensions();

  return (
    <Row>
      <Col span={4}>
        <img
          src={logo}
          alt="Maame"
          style={
            width < 576
              ? { width: "100%", height: "auto" }
              : { width: "40%", height: "auto" }
          }
        />
      </Col>
      <Col span={16} style={{ textAlign: "center" }}>
        {width < 576 ? (
          <Text style={{ fontSize: "x-small", letterSpacing: "5px" }}>
            TEAM PICKER
          </Text>
        ) : (
          <Text style={{ letterSpacing: "5px" }}>
            {data.company.toString().toUpperCase()} &nbsp;&nbsp; TEAM PICKER
          </Text>
        )}
      </Col>
      <Col span={4}></Col>
    </Row>
  );
}

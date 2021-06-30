import React from "react";
import { Typography } from "antd";

export function Copyright(props) {
  const { data } = props;
  const { Text } = Typography;
  return (
    <div style={{ textAlign: "center" }}>
      <Text>
        ©{" "}
        {data.company ? data.company.toString().toUpperCase() : "Not Specified"}
      </Text>
    </div>
  );
}

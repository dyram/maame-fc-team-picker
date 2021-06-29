import React from "react";
import { Typography, List, Avatar, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export function Team(props) {
  const { name, manager, players, currentTeam, unpick } = props;
  const { Title, Text } = Typography;

  return (
    <>
      <Title level={4} style={{ textAlign: "center" }}>
        {name}
      </Title>

      <div style={{ textAlign: "center" }}>
        <Text>
          <b>COACH :</b> {manager}
        </Text>
      </div>

      {players.length > 0 && (
        <div style={{ textAlign: "center" }}>
          <Text>
            <b>CAPTAIN :</b> {players[0].name}
          </Text>
        </div>
      )}

      <div style={{ height: "300px", overflow: "auto" }}>
        <List
          style={{ padding: "2%" }}
          itemLayout="horizontal"
          dataSource={players}
          renderItem={(player) => (
            <List.Item
              actions={[
                <Tooltip title="Unpick Player">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={(e) => unpick(player, currentTeam)}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={44}
                    src={
                      player.image
                        ? player.image
                        : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }
                  />
                }
                title={player.name}
                description={player.position}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

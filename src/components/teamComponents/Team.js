import React from "react";
import { Typography, List, Avatar, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

//hooks
import useWindowDimensions from "../../hooks/useWindowDimensions";

export function Team(props) {
  const { name, manager, players, currentTeam, unpick } = props;
  const { Title, Text } = Typography;
  const { width } = useWindowDimensions();

  return (
    <>
      <Title level={width < 576 ? 5 : 4} style={{ textAlign: "center" }}>
        {name}
      </Title>

      <div
        style={{
          textAlign: "center",
          fontSize: width < 576 ? "x-small" : "medium",
        }}
      >
        <Text>
          <b>COACH -</b> {manager}
        </Text>
      </div>

      {players.length > 0 && (
        <div
          style={{
            textAlign: "center",
            fontSize: width < 576 ? "x-small" : "medium",
          }}
        >
          <Text>
            <b>CAPTAIN -</b> {players[0].name}
          </Text>
        </div>
      )}

      <div
        style={{ height: width < 576 ? "100px" : "300px", overflow: "auto" }}
      >
        <List
          style={{
            padding: "2%",
          }}
          itemLayout="horizontal"
          dataSource={players}
          renderItem={(player) => (
            <List.Item
              key={player.name}
              actions={
                players[0].name === player.name ||
                players[1].name === player.name
                  ? [
                      <Avatar
                        size={width < 576 ? 22 : 34}
                        style={{ backgroundColor: "darkgreen" }}
                      >
                        {players[0].name === player.name ? "C" : "VC"}
                      </Avatar>,
                      <Tooltip title="Unpick Player">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<DeleteOutlined />}
                          size={width < 576 ? "small" : "middle"}
                          onClick={(e) => unpick(player, currentTeam)}
                        />
                      </Tooltip>,
                    ]
                  : [
                      <Tooltip title="Unpick Player">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<DeleteOutlined />}
                          size={width < 576 ? "small" : "middle"}
                          onClick={(e) => unpick(player, currentTeam)}
                        />
                      </Tooltip>,
                    ]
              }
            >
              <List.Item.Meta
                key={player.name}
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
                title={
                  width < 576 ? (
                    <Text style={{ fontSize: "x-small" }}>
                      {player.name ? player.name : "Not Specified"}
                    </Text>
                  ) : player.name ? (
                    player.name
                  ) : (
                    "Not Specified"
                  )
                }
                description={
                  width < 576 ? (
                    <Text style={{ fontSize: "x-small" }}>
                      {player.position ? player.position : "Not Specified"}
                    </Text>
                  ) : player.position ? (
                    player.position
                  ) : (
                    "Not Specified"
                  )
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

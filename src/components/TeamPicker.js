import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Avatar,
  Modal,
  Button,
  notification,
} from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

//Components
import { Team } from "./teamComponents/Team";

export function TeamPicker(props) {
  const { data } = props;
  const { Title, Text, Paragraph } = Typography;
  const { Meta } = Card;

  const [pickedPlayers, setPickedPlayers] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState({});
  //team to select referenced to by index
  const [sequenceArr, setSequenceArr] = useState([]);
  const [teamToSelect, setTeamToSelect] = useState(0);
  //modal state -- only for first 5 picks
  const [pickVisible, setPickVisible] = useState(false);
  const [lastPickedPlayer, setLastPickedPlayer] = useState({});
  //modal state -- for export
  const [exportVisible, setExportVisible] = useState(false);
  const [exportText, setExportText] = useState([]);

  const selectPlayer = (player, team) => {
    if (!findIfPlayerSelected(player)) {
      //Set the modal data
      setLastPickedPlayer(player);

      //Updating the store
      pickedPlayers[data.teams[team].name].players.push(player);
      selectedPlayers[player.name] = player;

      //if no sequence specified use the round robin, else sequence order
      if (data.sequence.length > 0) {
        sequenceArr.shift();
        if (sequenceArr.length > 0) {
          setSequenceArr(sequenceArr);
          setTeamToSelect(sequenceArr[0]);
        } else {
          setTeamToSelect(0);
        }
      } else {
        if (teamToSelect === data.teams.length - 1) {
          setTeamToSelect(0);
        } else {
          setTeamToSelect(teamToSelect + 1);
        }
      }

      //Open the modal
      if (Object.keys(selectedPlayers).length < 7) {
        setTimeout(() => {
          setPickVisible(true);
        }, 200);
      } else {
        setLastPickedPlayer({});
      }
    } else {
      notification.error({
        message: "Player Already Selected",
        description:
          "Pick a player who is not already on a team, we know you badly want this guy but tough luck, sucks to be you.",
      });
    }
  };

  const findIfPlayerSelected = (player) => {
    return Object.keys(selectedPlayers).includes(player.name);
  };

  const unpickPlayer = (player, teamIndex) => {
    let teamName = data.teams[teamIndex].name;

    delete selectedPlayers[player.name];
    setSelectedPlayers({ ...selectedPlayers });

    pickedPlayers[teamName].players = pickedPlayers[teamName].players.filter(
      (playerDetails) => playerDetails.name !== player.name
    );
  };

  //Parsing of export team details
  const setExportTeam = () => {
    if (Object.keys(selectedPlayers).length > 0) {
      Object.values(pickedPlayers).map((overallDetail) => {
        let text = "";
        text += overallDetail.teamName + " : ";

        overallDetail.players.map((player, index) => {
          text += index === 0 ? `${player.name}` : `, ${player.name}`;
        });

        exportText.push(text);
        setExportVisible(true);
      });
    } else {
      notification.error({
        message: "No players were selected",
        description: "Pick a player and form your teams already",
      });
    }
  };

  useEffect(() => {
    data.teams.map((team) => {
      pickedPlayers[team.name] = { teamName: team.name, players: [] };
    });

    if (data.sequence.length > 0) {
      let flattenedSequence = data.sequence.flat();
      setSequenceArr(flattenedSequence);
      setTeamToSelect(flattenedSequence[0]);
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: "4%" }}></div>

      {/* Export Modal -- start */}
      <Modal
        title="Export your teams"
        visible={exportVisible}
        footer={[]}
        onCancel={(e) => setExportVisible(false)}
        width={800}
      >
        <Paragraph copyable={{ text: exportText.map((text) => text + "\n") }}>
          Copy this text and send to your mates via Whatsapp
        </Paragraph>
        <Paragraph>
          <pre>{exportText.map((text) => text + "\n")}</pre>
        </Paragraph>
      </Modal>
      {/* Export Modal -- end */}

      {/* Lottery Modal -- start */}
      <Modal
        title="LOTTERY PICK!!"
        visible={pickVisible}
        footer={[]}
        onCancel={(e) => setPickVisible(false)}
        width={700}
      >
        <Text style={{ fontSize: "large" }}>
          {`With the No.${Object.keys(selectedPlayers).length} Pick, ${
            data.teams[
              teamToSelect === 0 ? data.teams.length - 1 : teamToSelect - 1
            ].name
          } select ${lastPickedPlayer.name}`}
        </Text>
        <Card style={{ margin: "1%" }}>
          <Meta
            avatar={
              <Avatar
                size={64}
                src={
                  lastPickedPlayer.image
                    ? lastPickedPlayer.image
                    : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
              />
            }
            title={
              lastPickedPlayer.name
                ? lastPickedPlayer.name.toString()
                : "Not Specified"
            }
            description={
              lastPickedPlayer.position
                ? lastPickedPlayer.position.toString()
                : "Not Specified"
            }
          />
        </Card>
      </Modal>
      {/* Lottery Modal -- end */}

      {/* TeamRow -- start */}
      <Row style={{ padding: "1% 2%" }}>
        {data.teams.map((team, index) => (
          <Col span={data.teams.length ? parseInt(24 / data.teams.length) : 8}>
            <Team
              name={team.name ? team.name : "NewTeam"}
              manager={team.manager ? team.manager : "None"}
              players={
                Object.keys(pickedPlayers).length > 0
                  ? pickedPlayers[team.name].players
                  : []
              }
              currentTeam={index}
              unpick={(player, teamIndex) => unpickPlayer(player, teamIndex)}
            />
          </Col>
        ))}
      </Row>
      {/* TeamRow -- end */}

      <Row style={{ margin: "0% 3%" }}>
        <Col span={12}>
          <Title level={4} style={{ margin: "1%" }}>
            {data.teams[teamToSelect].name} pick your baller...
          </Title>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: "right" }}>
            <Button type="primary" onClick={(e) => setExportTeam()}>
              Export Teams
            </Button>
          </div>
        </Col>
      </Row>

      {/* PickingPart -- start  */}
      <Row style={{ padding: "1% 2%" }}>
        {data.players.map((player) => (
          <Col
            span={data.players.length ? parseInt(24 / data.teams.length) : 4}
            onClick={(e) => {
              selectPlayer(player, teamToSelect);
            }}
          >
            <Card
              className="pick-card"
              hoverable
              style={{ margin: "1%" }}
              extra={
                findIfPlayerSelected(player) ? (
                  <span>
                    Player is selected &nbsp;&nbsp;
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </span>
                ) : (
                  "Not Selected"
                )
              }
            >
              <Meta
                avatar={
                  <Avatar
                    size={64}
                    src={
                      player.image
                        ? player.image
                        : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }
                  />
                }
                title={player.name.toString()}
                description={
                  player.position ? player.position.toString() : "Not Specified"
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      {/* PickingPart -- end  */}
    </>
  );
}

// Testing json import
import React from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { DynamicButton } from "./dynamicButton";
import { EntryDynamicButton } from "./entryDynamicButton";
import { TrophyDynamicButton } from "./trophyDynamicButton";
export const MoveButtons = props => {
  const moveList = require("../../data/moves_lists/move_list.json");
  const screenWidth = Math.round(Dimensions.get("window").width);
  const availableMoves = Object.values(moveList).flat();
  const buttonPercentage = screenWidth > 600 ? "25%" : "50%";
  const entryButtonPercentage = screenWidth > 600 ? "33%" : "33%";
  const trophyButtonPercentage = screenWidth > 600 ? "33%" : "50%";
  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      {availableMoves.map((item, key) => {
        if (item.Move == "Trophy 1" || item.Move == "Trophy 2" || item.Move == "Trophy 3") {
          return (
            <View style={{ width: trophyButtonPercentage }} key={key}>
              <TrophyDynamicButton
                paddler={
                  props.paddlerList[props.currentHeat][props.paddlerIndex]
                }
                run={props.run}
                move={item}
                direction={"left"}
              />
            </View>
          )

        } else if (item.Move == "Entry 1" || item.Move == "Entry 2" || item.Move == "Entry 3") {
        return (
          <View style={{ width: entryButtonPercentage }} key={key}>
            <EntryDynamicButton
              paddler={
                props.paddlerList[props.currentHeat][props.paddlerIndex]
              }
              run={props.run}
              move={item}
              direction={"left"}
            />
          </View>
        )
      } else {

        if (!item.Reverse) {
          return (
            <View style={{ width: buttonPercentage }} key={key}>
              <DynamicButton
                paddler={
                  props.paddlerList[props.currentHeat][props.paddlerIndex]
                }
                run={props.run}
                move={item}
                direction={"left"}
              />
            </View>
          );
        } else {
          return (
            <React.Fragment key={key}>
              <View style={{ width: buttonPercentage }} >
                <DynamicButton
                  paddler={
                    props.paddlerList[props.currentHeat][props.paddlerIndex]
                  }
                  run={props.run}
                  move={item}
                  direction={"left"}
                />
              </View>
              <View style={{ width: buttonPercentage }}>
                <DynamicButton
                  paddler={
                    props.paddlerList[props.currentHeat][props.paddlerIndex]
                  }
                  run={props.run}
                  move={item}
                  direction={"right"}
                />
              </View>
              </React.Fragment>
          );
        }
        }
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    paddlerIndex: state.paddlers.paddlerIndex,
    paddlerList: state.paddlers.paddlerList,
    currentHeat: state.paddlers.currentHeat,
    run: state.paddlers.run
  };
};

export default connect(
  mapStateToProps,
  null
)(MoveButtons);

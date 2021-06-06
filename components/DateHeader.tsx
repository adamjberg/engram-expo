import React from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { View, Text } from "./Themed";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import useColorScheme from "../hooks/useColorScheme";

export type DateHeaderProps = {
  date: Date;
  onChange: (date: Date) => void;
  onRefresh: () => void;
  onToday: () => void;
};

export default function DateHeader({ date, onChange, onRefresh, onToday }: DateHeaderProps) {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    dateHeader: {
      borderBottomWidth: 1,
      borderBottomColor: theme ==="light" ? "#EEE" : "#424242"
    },
    content: {
      width: "100%",
      maxWidth: 800,
      flexDirection: "row"
    },
    spacer: {
      flexGrow: 1
    },
    date: {
      fontSize: 24,
      paddingHorizontal: 8,
      paddingVertical: 4
    }
  });

  function handleDateLeftPressed() {
    handleDateChanged(-1);
  }

  function handleDateRightPressed() {
    handleDateChanged(1);
  }

  function handleDateChanged(amount: number) {
    onChange(moment(date).add(amount, 'days').toDate());
  }

  function handleRefreshPressed() {
    onRefresh();
  }

  function handleTodayPressed() {
    onToday();
  }

  return (
    <View style={styles.dateHeader}>
      <View style={styles.content}>
        <Button type="clear" icon={<Icon name="calendar" size={24} onPress={handleTodayPressed}/>}/>
        <View style={styles.spacer}></View>
        <Button type="clear" icon={<Icon name="chevron-left" size={24} onPress={handleDateLeftPressed}/>} />
        <Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
        <Button type="clear" icon={<Icon name="chevron-right" size={24} onPress={handleDateRightPressed} />} />
        <View style={styles.spacer}></View>
        <Button type="clear" icon={<Icon name="refresh" size={24} onPress={handleRefreshPressed}/>}/>
      </View>
    </View>
  );
}

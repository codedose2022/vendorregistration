import React from "react";
import { Box } from "@material-ui/core";
import useStyles from './TabPanelStyles'

export default function TabPanel(props) {
  const classes = useStyles();
  return <Box className={classes.tabPanel} value={props.value}>{props.content}</Box>;
}

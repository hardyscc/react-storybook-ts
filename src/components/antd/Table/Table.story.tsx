import { storiesOf } from "@storybook/react";
import React from "react";
import { Box } from "rebass";
import { DraggableColumn } from "./DraggableColumn";
import { MultiColumnsSort } from "./MultiColumnsSort";

const stories = storiesOf("Antd/Table", module);

stories.add("Draggable Column", () => (
  <Box m={4}>
    <DraggableColumn />
  </Box>
));

stories.add("Multi Columns Sort", () => (
  <Box m={4}>
    <MultiColumnsSort />
  </Box>
));

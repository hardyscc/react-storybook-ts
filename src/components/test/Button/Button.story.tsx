import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Button } from ".";

storiesOf("Test/Button", module).add("simple", () => (
  <Button onClick={action("clicked")}>Hello World</Button>
));

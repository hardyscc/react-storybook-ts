import { storiesOf } from "@storybook/react";
import React from "react";
import { Button } from ".";

storiesOf("Button", module).add("with text", () => (
  <Button>Hello World</Button>
));

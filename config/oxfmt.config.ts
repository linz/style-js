import base from "@linzjs/style/oxfmt.config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  // single quote is most common override
  singleQuote: false,
});

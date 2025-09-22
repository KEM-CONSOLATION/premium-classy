import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { config } from "./src/config";

export default defineConfig({
  name: "premium-classy",
  title: "Premium&Classy CMS",

  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

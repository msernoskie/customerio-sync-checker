import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "segmentCount" model, go to https://marks-sync-checker.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "segmentCount",
  fields: {
    count: {
      type: "number",
      validations: { required: true },
      storageKey: "segmentCount-count",
    },
    fetchedAt: {
      type: "dateTime",
      includeTime: true,
      validations: { required: true },
      storageKey: "segmentCount-fetchedAt",
    },
    segmentId: {
      type: "string",
      validations: { required: true },
      storageKey: "segmentCount-segmentId",
    },
  },
};

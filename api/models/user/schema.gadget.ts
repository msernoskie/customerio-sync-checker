import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://marks-sync-checker.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "DataModel-AppAuth-User",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "4tiIfssKbhxc",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "sG9FirBpoKi9",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "3M6-bAVRr8UL",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "-0K0GZKuHg0-",
    },
    firstName: { type: "string", storageKey: "SffQ-pYHqWVs" },
    googleImageUrl: { type: "url", storageKey: "rX_bvrhwVsgD" },
    googleProfileId: { type: "string", storageKey: "53RO-heA2fVv" },
    lastName: { type: "string", storageKey: "isJjG8iZ7Ld2" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "zoeTk3N2ARDW",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "S2RCXxolWCWJ",
    },
    profilePicture: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "EmCgJb6y-1pI",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "Be0l_jnWs-eL",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Y8OXxZlORzWA",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "Gm3WYP3bQCdF",
    },
  },
};

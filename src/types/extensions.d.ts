declare module "*.vue" { // eslint-disable-line import/unambiguous
  import Vue from "vue";

  export default Vue;
}

declare module "*.jpg" {}
declare module "*.svg" {}
declare module "*.gif" {}
declare module "*.json" {
  const value: unknown;
  export default value;
}
declare module "*.sass" {}
declare module "*.css" {}
declare module "*.scss" {}
declare module "*.png" {}

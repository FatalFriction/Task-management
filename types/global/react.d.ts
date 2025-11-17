import "react";

declare module "react" {
  // maps <ElementRef<"input">> to HTMLInputElement etc.
  export type ElementRef<T extends keyof HTMLElementTagNameMap> =
    HTMLElementTagNameMap[T];
}

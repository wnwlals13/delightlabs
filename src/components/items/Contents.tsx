import React, { Component, ReactElement } from "react";

export default function Contents({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  return <main>{children}</main>;
}

import { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * 헤더
 * @returns
 */
export default function Header({ children }: Props) {
  return <header>{children}</header>;
}

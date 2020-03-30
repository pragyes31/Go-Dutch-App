import React from "react";

export default function Header(props) {
  return (
    <div class="header">
      <header class="main-title">{props.title}</header>
    </div>
  );
}

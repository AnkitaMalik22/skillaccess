import React, { useState } from "react";
import Header from "./Header";
import List from "./List";

const Inbox = () => {
  const [show, setShow] = useState("all");
  return (
    <div className="w-11/12 mx-auto">
      <Header show={show} setShow={setShow} />
      <List show={show} />
    </div>
  );
};

export default Inbox;

import React, { useState } from "react";
import Header from "./Header";
import List from "./List";

const Inbox = () => {
  const [show, setShow] = useState("all");
  const [inboxType, setInboxType] = useState("Received");
  return (
    <div className="w-11/12 mx-auto py-5 md:py-10">
      <Header
        show={show}
        setShow={setShow}
        inboxType={inboxType}
        setInboxType={setInboxType}
      />
      <List show={show} inboxType={inboxType} setInboxType={setInboxType} />
    </div>
  );
};

export default Inbox;

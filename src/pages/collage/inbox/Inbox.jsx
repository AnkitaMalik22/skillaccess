import React, { useState } from "react";
import Header from "../../../components/collage/inbox/Header";
import List from "../../../components/collage/inbox/List";
import useTranslate from "../../../hooks/useTranslate";

const Inbox = () => {
  useTranslate();
  const [show, setShow] = useState("all");
  const [inboxType, setInboxType] = useState("Received");
  return (
    <>
      <Header
        show={show}
        setShow={setShow}
        inboxType={inboxType}
        setInboxType={setInboxType}
      />
      <List show={show} inboxType={inboxType} setInboxType={setInboxType} />
    </>
  );
};

export default Inbox;

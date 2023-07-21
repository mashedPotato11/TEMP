import React, { useContext, useEffect, useRef } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameuser,
} from "./ChatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { ChatContext } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const containerRef = useRef(null);
  const ChatState = useContext(ChatContext);
  const { user } = ChatState;

  useEffect(() => {
    // Scroll to the bottom of the container when new messages are added
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "460px", // Specify the desired height
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      {messages[0] &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id} px="1">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#D0F0C0" : "#89CFF0"
                }`,
                color: "black",
                borderRadius: "16px",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameuser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;

import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function TopicName({}, ref) {
  const topicDataSelector = useSelector((state) => state?.topicsListReducer);

  const [topicName, setTopicName] = useState("");
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && dropDown) {
        setDropDown(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropDown]);

  function dropBoxHandler(topicName) {
    setTopicName(topicName);
    setDropDown(false);
  }

  console.log("topicDataSelector", topicDataSelector.response);
  return (
    <div className="technologyModal-form-input">
      <label>Topic Name</label>
      <div className="input-wrapper">
        {/* Technology Name Input element */}
        <input
          ref={ref}
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        {/* Caret symbol to open and close dropbox */}
        <motion.span onClick={() => setDropDown((prev) => !prev)}>
          <motion.div
            animate={{ rotate: dropDown ? 180 : 0 }}
            className="pointer"
          >
            &#9650;
          </motion.div>
        </motion.span>

        {/*   DropDown for the Technology Name   */}
        {dropDown && (
          <div className="technologyModal-dropbox">
            {topicDataSelector.response.map((item) => {
              if (item.TopicName)
                return (
                  <p
                    key={item.TopicID}
                    onClick={() => dropBoxHandler(item.TopicName)}
                  >
                    {item.TopicName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(TopicName);

import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useDropDown from "../../../hooks/useDropDown";

function TopicName({ modalData }, ref) {
  const modulesDataSelector = useSelector((state) => state?.topicsListReducer);

  const [topicName, setTopicName] = useState(modalData?.TopicName || "");
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

  // filter DropDown
  const [includedDropDownItems, dropDownChangeHandler] = useDropDown({
    key: "TopicName",
  });

  useEffect(() => {
    dropDownChangeHandler(topicName, modulesDataSelector?.response);
  }, [topicName, modulesDataSelector]);

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
            {includedDropDownItems.map((item) => {
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

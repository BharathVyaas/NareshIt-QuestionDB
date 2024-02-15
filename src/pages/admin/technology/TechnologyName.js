import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function TopicName({}, ref) {
  const modulesDataSelector = useSelector((state) => state?.topicsListReducer);

  const [TopicName, setTopicName] = useState("");
  const [dropDown, setDropDown] = useState(false);

  // To close window when dropBox is open
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

  function dropBoxHandler(TopicName) {
    setTopicName(TopicName);
    setDropDown(false);
  }

  return (
    <div className="technologyModal-form-input">
      <label>Technology Name</label>
      <div className="input-wrapper">
        {/* Technology Name Input element */}
        <input
          ref={ref}
          type="text"
          value={TopicName}
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
            {modulesDataSelector.response.map((item) => {
              if (item.TopicName)
                return (
                  <p
                    key={item.TechnologyID}
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

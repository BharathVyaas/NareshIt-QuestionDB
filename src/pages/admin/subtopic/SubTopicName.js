import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function SubTopicName({}, ref) {
  const modulesDataSelector = useSelector(
    (state) => state?.subtopicsListReducer
  );

  const [subTopicName, setSubTopicName] = useState("");
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

  function dropBoxHandler(subTopicName) {
    setSubTopicName(subTopicName);
    setDropDown(false);
  }

  return (
    <div className="technologyModal-form-input">
      <label>SubTopic Name</label>
      <div className="input-wrapper">
        {/* Technology Name Input element */}
        <input
          ref={ref}
          type="text"
          value={subTopicName}
          onChange={(e) => setSubTopicName(e.target.value)}
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
          <div className="technologyModal-dropbox subTopic-dropbox">
            {modulesDataSelector.response.map((item) => {
              if (item.SubTopicName)
                return (
                  <p
                    key={item.SubTopicID}
                    onClick={() => dropBoxHandler(item.SubTopicName)}
                  >
                    {item.SubTopicName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(SubTopicName);

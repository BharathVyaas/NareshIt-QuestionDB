import { React, useEffect, useState } from "react";
import Sidenav from "../../../components/Sidenav";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "../../../redux/hooks.helper";
import { subtopicListSlice } from "../../../redux/root.slice";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // T
import { AgGridReact } from "ag-grid-react";
import "../../../index.css";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import SubTopicModal from "../../../ui/SubTopicModal";
import ModalUi from "../../../ui/ModalUi";

function Subtopics() {
  var dispatch = useDispatch();
  const [subTopicsData, setSubTopicData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);

  // create new topic modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);

  const subTopicsDataSelector = useSelector(
    (state) => state?.subtopicsListReducer
  );

  useEffect(() => {
    dispatch(subtopicListSlice.actions.request());
    setSubTopicData(subTopicsDataSelector.response);
  }, []);

  // Delete Option from the Table
  const handleDelete = (rowData) => {
    console.log("Row Data:", rowData);
  };

  // Edit Option from the Table
  const handleEdit = (rowData) => {
    console.log("Row Data:", rowData);
    setModalData(rowData);
    setShowModal({ type: "edit", from: "subTopic" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(subTopicsData)?.forEach((item, i) => {
      console.log("item", subTopicsData[item].TopicID);
      let obj = {
        SubTopicID: subTopicsData[item].SubTopicID,
        // "Description":moduleData[item].Description,
        SubTopicName: subTopicsData[item].SubTopicName,
        //  "ModuleID":moduleData[item].ModuleID,
        TopicID: subTopicsData[item].TopicID,
      };
      arr.push(obj);
    });
    setColumnDefs([
      {
        field: "SubTopicID",
        headerName: "SubTopicID",
        width: 300,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "SubTopicName",
        headerName: "SubTopicName",
        width: 300,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "TopicID",
        headerName: "TopicID",
        width: 500,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "Action",
        width: 100,
        headerName: "Action",
        //  fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
        cellRenderer: (parames) => {
          const { data } = parames;

          return (
            <div>
              <DeleteOutlineIcon
                style={{ color: "Red" }}
                onClick={() => handleDelete(data)}
              ></DeleteOutlineIcon>{" "}
              <EditIcon
                style={{ color: "blue" }}
                onClick={() => handleEdit(data)}
              ></EditIcon>
            </div>
          );
        },
      },
    ]);
    console.log("arr", arr);
    setRowData(arr);
  };

  useEffect(() => {
    console.log("modulesDataSelector", subTopicsDataSelector);
    setRowData(subTopicsDataSelector.response);
  }, [subTopicsDataSelector]);

  // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState([
  //   { field: 'ModuleName' },
  //   { field: 'Description' },
  //   { field: 'ModuleID' },
  //   { field: 'TechnologyID' },
  //   { field: 'CreatedBy' }
  // ]);

  // Called from SubTopicModal
  function subTopicModalSubmitHandler(id, topicName, subTopicName) {
    console.log("subTopicModalSubmitHandler", id, topicName, subTopicName);
  }

  console.log("rowData", rowData);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {showModal && (
          <SubTopicHandler
            flag={showModal}
            modalData={modalData}
            modalSubmitHandler={subTopicModalSubmitHandler}
            modalCancelHandler={setShowModal}
          />
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ margin: "5px", paddingTop: "0px" }}
        >
          <div
            className="ag-theme-quartz"
            style={{ width: "100%", height: "500px", margin: "10px" }}
          >
            <div style={{ marginBottom: "5px" }}>
              <Typography variant="h5" gutterBottom>
                Sub Topics
              </Typography>
            </div>
            <Divider />
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Button
                onClick={() =>
                  setShowModal({ type: "create", from: "subTopic" })
                }
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </div>
            {subTopicsData.length > 0 ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
              />
            ) : (
              <div>loading</div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Subtopics;

function SubTopicHandler({
  modalData,
  flag,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      ModalParam={SubTopicModal}
      modalData={modalData}
      flag={flag}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

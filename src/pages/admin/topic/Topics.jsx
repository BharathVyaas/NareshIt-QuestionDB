import { React, useEffect, useState } from "react";
import Sidenav from "../../../components/Sidenav";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "../../../redux/hooks.helper";
import { topicsListSlice } from "../../../redux/root.slice";
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
import ModalUi from "../../../ui/ModalUi";
import TopicModal from "../../../ui/TopicModal";

function Topics() {
  var dispatch = useDispatch();
  const [topicData, setTopicData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);

  // create new topic modal
  const [showModal, setShowModal] = useState(false);

  const topicDataSelector = useSelector((state) => state?.topicsListReducer);

  useEffect(() => {
    dispatch(topicsListSlice.actions.request());
    setTopicData(topicDataSelector.response);
  }, []);

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(topicData)?.forEach((item, i) => {
      console.log("item", topicData[item].TopicID);
      let obj = {
        TopicID: topicData[item].TopicID,
        // "Description":moduleData[item].Description,
        TopicName: topicData[item].TopicName,
        Description: topicData[item].Description,
        ModuleID: topicData[item].ModuleID,
      };
      arr.push(obj);
    });
    setColumnDefs([
      {
        field: "TopicID",
        headerName: "TopicID",
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
        field: "TopicName",
        headerName: "TopicName",
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
        field: "Description",
        headerName: "Description",
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
          return (
            <div>
              <DeleteOutlineIcon style={{ color: "Red" }}></DeleteOutlineIcon>{" "}
              <EditIcon style={{ color: "blue" }}></EditIcon>
            </div>
          );
        },
      },
    ]);
    console.log("arr", arr);
    setRowData(arr);
  };

  useEffect(() => {
    console.log("modulesDataSelector", topicDataSelector);
    setTopicData(topicDataSelector.response);
  }, [topicDataSelector]);

  // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState([
  //   { field: 'ModuleName' },
  //   { field: 'Description' },
  //   { field: 'ModuleID' },
  //   { field: 'TechnologyID' },
  //   { field: 'CreatedBy' }
  // ]);

  // Called from topicModal
  function topicModalSubmitHandler(id, topicName, topicDescription) {
    console.log("topicModalSubmitHandler", id, topicName, topicDescription);
  }

  console.log("rowData", rowData);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {showModal && (
          <TopicHandler
            modalSubmitHandler={topicModalSubmitHandler}
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
                Topics
              </Typography>
            </div>
            <Divider />
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Button
                onClick={() => setShowModal(true)}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </div>
            {topicData.length > 0 ? (
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

export default Topics;

function TopicHandler({ modalSubmitHandler, modalCancelHandler }) {
  return (
    <ModalUi
      ModalParam={TopicModal}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

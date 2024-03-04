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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Topics() {
  const { ModuleID } = useParams();
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const [topicData, setTopicData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);

  // create new topic modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);

  const topicHandler = async () => {
    const res = await axios.get(
      `https://www.nareshit.net/fetchTopics/${ModuleID}`
    );
    setModalData(res.data);
    setTopicData(res.data);
  };

  useEffect(() => {
    topicHandler();
  }, []);

  const cellClickHandler = async (e) => {
    if (e.colDef.field !== "Action") {
      navigate(`/subtopics/${e.data.TopicID}`);
    }
  };

  // Delete Option from the Table
  const handleDelete = (rowData) => {
    console.log("Row Data:", rowData);
  };

  // Edit Option from the Table
  const handleEdit = (rowData) => {
    console.log("Row Data:", rowData);
    setModalData(rowData);
    setShowModal({ type: "edit", from: "topic" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(topicData)?.forEach((item, i) => {
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
            flag={showModal}
            modalData={modalData}
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
                onClick={() => setShowModal({ type: "create", from: "topic" })}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </div>
            {modalData ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                onCellClicked={cellClickHandler}
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

function TopicHandler({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      ModalParam={TopicModal}
      flag={flag}
      modalData={modalData}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

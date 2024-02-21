import { React, useEffect, useState } from "react";
import Sidenav from "../../../components/Sidenav";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "../../../redux/hooks.helper";
import { technologiesListSlice } from "../../../redux/root.slice";
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
import { Modal } from "@mui/material";
import ModalUi from "../../../ui/ModalUi";
import axios from "axios";
import QuestionViewModal from "../../../ui/QuestionViewModal";
import { useParams } from "react-router-dom";

// to get selected question data

function getQuestionData(questionID, arr) {
  return arr.find((ele) => ele.QuestionID == questionID);
}

function QuestionView() {
  const { SubTopicID } = useParams();
  const [moduleData, setModuleData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  useEffect(() => {
    async function fetchHandler() {
      axios
        .get("https://www.nareshit.net/mcqCheckQuestions")
        .then((res) => res.data)
        .then((data) => data.slice(0, 100))
        .then((data) => {
          setModuleData(data);
        });
    }

    fetchHandler();
  }, []);

  useEffect(() => {
    if (moduleData.length > 0) {
      setRowData(
        moduleData.map((item) => ({
          QuestionID: item.QuestionID,
          SubTopicID: item.SubTopicID,
          Question: item.Question,
        }))
      );
    }
  }, [moduleData]);

  const handleCellClick = (e) => {
    if (e?.colDef?.headerName !== "Action") {
      if (!showModal) {
        const selectedQuestion = getQuestionData(e.data.QuestionID, moduleData);

        rowData.question = selectedQuestion;
        rowData.type = "view";

        setModalData(rowData);
        setShowModal({ type: "view", from: "technologies" });
      }
    }
  };

  const handleDelete = (rowData) => {
    console.log("Row Data:", rowData);
  };

  const handleEdit = (rowData) => {
    console.log("Row Data:", rowData);
    const selectedQuestion = getQuestionData(rowData.QuestionID, moduleData);

    rowData.question = selectedQuestion;
    rowData.type = "edit";

    setModalData(rowData);
    setShowModal({ type: "edit", from: "technologies" });
  };

  const onGridReady = (params) => {
    setColumnDefs([
      {
        field: "QuestionID",
        headerName: "QuestionID",
        width: 300,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
      },
      {
        field: "SubTopicID",
        headerName: "SubTopicID",
        width: 500,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
      },
      {
        field: "Question",
        headerName: "Question",
        width: 300,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
      },
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
        cellRenderer: (parames) => {
          const { data } = parames;

          return (
            <div>
              <DeleteOutlineIcon
                style={{ color: "Red" }}
                onClick={() => handleDelete(data)}
              />
              <EditIcon
                style={{ color: "blue" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(data);
                }}
              />
            </div>
          );
        },
      },
    ]);
  };

  function questionModalSubmitHandler(questionData) {
    console.log(questionData);
    setShowModal(false);
    setModalData({});
  }

  function questionModalcancelHandler() {
    setShowModal(false);
    setModalData({});
  }

  console.log("row", rowData, "col", columnDefs);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {showModal && (
          <ModalHandler
            flag={showModal}
            modalData={modalData}
            modalSubmitHandler={questionModalSubmitHandler}
            modalCancelHandler={questionModalcancelHandler}
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
                Question View
              </Typography>
            </div>
            <Divider />

            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              {/* Create New Technology */}
              <Button
                onClick={() => {
                  setShowModal({ type: "create", from: "technologies" });
                }}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </div>
            {moduleData.length > 0 ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                onCellClicked={handleCellClick}
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

export default QuestionView;

function ModalHandler({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      flag={flag}
      ModalParam={QuestionViewModal}
      modalData={modalData}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

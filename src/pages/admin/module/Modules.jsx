import { React, useEffect, useState } from "react";
import Sidenav from "../../../components/Sidenav";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "../../../redux/hooks.helper";
import { modulesListSlice } from "../../../redux/root.slice";
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
import ModuleModal from "../../../ui/ModuleModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Modules() {
  const { TechnologyID } = useParams();
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const [moduleData, setModuleData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);

  // create new module modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);

  const modulesDataSelector = useSelector((state) => state?.modulesListReduer);

  const moduleFetchHandler = async () => {
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${TechnologyID}`
    );
    setModuleData(res.data);
  };

  useEffect(() => {
    moduleFetchHandler();
  }, []);

  const cellClickHandler = (e) => {
    if (e.colDef.field !== "Action") {
      navigate(`/topics/${e.data.ModuleID}`);
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
    setShowModal({ type: "edit", from: "module" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(moduleData)?.forEach((item, i) => {
      console.log("item", moduleData[item].ModuleID);
      let obj = {
        ModuleID: moduleData[item].ModuleID,
        // "Description":moduleData[item].Description,
        TechnologyID: moduleData[item].TechnologyID,
        ModuleName: moduleData[item].ModuleName,
      };
      arr.push(obj);
    });

    setColumnDefs([
      {
        field: "ModuleID",
        headerName: "ModuleID",
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
        field: "TechnologyID",
        headerName: "TechnologyID",
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
        field: "ModuleName",
        headerName: "ModuleName",
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
    console.log("modulesDataSelector", modulesDataSelector);
    //setRowData( modulesDataSelector.response);
  }, [modulesDataSelector]);

  // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState([
  //   { field: 'ModuleName' },
  //   { field: 'Description' },
  //   { field: 'ModuleID' },
  //   { field: 'TechnologyID' },
  //   { field: 'CreatedBy' }
  // ]);

  // Called from ModuleModal
  function moduleModalSubmitHandler(id, technologyName, moduleName) {
    console.log("modules.jsx", id, technologyName, moduleName);
  }

  function technologyModalcancelHandler() {
    setShowModal(false);
    setModalData(false);
  }

  console.log("rowData", rowData);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {showModal && (
          <ModalHandler
            modalData={modalData}
            flag={showModal}
            modalSubmitHandler={moduleModalSubmitHandler}
            modalCancelHandler={technologyModalcancelHandler}
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
                Modules
              </Typography>
            </div>
            <Divider />
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Button
                onClick={() => setShowModal({ type: "create", from: "module" })}
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

export default Modules;

function ModalHandler({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      ModalParam={ModuleModal}
      flag={flag}
      modalData={modalData}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

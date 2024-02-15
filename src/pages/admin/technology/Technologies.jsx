import { React, useEffect, useMemo, useState } from "react";
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
import TechnologyModal from "../../../ui/TechnologyModal";

function Technologies() {
  var dispatch = useDispatch();
  const [moduleData, setModuleData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);

  // create new technology modal
  const [showModal, setShowModal] = useState(false);

  // api response
  const modulesDataSelector = useSelector(
    (state) => state?.technologiesListReducer
  );

  // local data
  const technologyDataSelector = useSelector(
    (state) => state?.technologyReducer
  );

  // Responsible for storing all data related to TechnologyPage
  const technologyData = useMemo(() => {
    return {
      api: modulesDataSelector?.response,
      local: technologyDataSelector,
    };
  }, [modulesDataSelector, technologyDataSelector]);

  console.log("technologyData", technologyData);

  useEffect(() => {
    dispatch(technologiesListSlice.actions.request());
    setModuleData(modulesDataSelector.response);
  }, []);

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(moduleData)?.forEach((item, i) => {
      //console.log("item", moduleData[item].ModuleID);
      let obj = {
        Description: moduleData[item].Description,
        // "Description":moduleData[item].Description,
        TechnologyID: moduleData[item].TechnologyID,
        TechnologyName: moduleData[item].TechnologyName,
      };
      arr.push(obj);
    });
    setColumnDefs([
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
        field: "TechnologyName",
        headerName: "TechnologyName",
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
        field: "Description",
        headerName: "Description",
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
    //console.log("arr", arr);
    setRowData(arr);
  };

  useEffect(() => {
    // console.log("modulesDataSelector", modulesDataSelector);
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

  function technologyModalSubmitHandler(
    id,
    technologyName,
    technologyDescription
  ) {
    /* console.log(
      "technologyModalSubmitHandler",
      id,
      technologyName,
      technologyDescription
    ); */
  }

  //console.log("rowData", rowData);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {showModal && (
          <ModalHandler
            modalSubmitHandler={technologyModalSubmitHandler}
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
                Technologies
              </Typography>
            </div>
            <Divider />

            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              {/* Create New Technology */}
              <Button
                onClick={() => {
                  setShowModal(true);
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

export default Technologies;

function ModalHandler({ modalSubmitHandler, modalCancelHandler }) {
  return (
    <ModalUi
      ModalParam={TechnologyModal}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}

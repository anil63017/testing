// ** React Imports
import { Fragment, useState, forwardRef } from "react";

// ** Add New Modal Component
// import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  CardBody,
} from "reactstrap";

import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

import EmployeeGrid from "./EmployeeGrid";
import EmployeeModal from "./modal/EmployeeModal";

const Employeetable = () => {
  // ** States
  const [modal, setModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);
  // ** Function to handle filter

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Employee Directory</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add Record</span>
            </Button>
          </div>
        </CardHeader>
        {/* <Row className="justify-content-end mx-0"> */}
        <CardBody >

          <EmployeeGrid employeeList={employeeList} setEmployeeList={setEmployeeList}/>
        </CardBody>


        {/* </Row> */}
        {/* <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : data}
          />
        </div> */}


      </Card>

      <EmployeeModal open={modal} handleModal={handleModal} setEmployeeList={setEmployeeList} closeModal={()=>{
        setModal(false);
      }}/>
    </Fragment>
  );
};

export default Employeetable;

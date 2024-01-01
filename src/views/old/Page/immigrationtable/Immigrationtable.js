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
import ImmigrationGrid from "./ImmigrationGrid";

const Immigrationtable = () => {
  // ** States
  const [modal, setModal] = useState(false);
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);
  // ** Function to handle filter

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Immigration Directory</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add Record</span>
            </Button>
          </div>
        </CardHeader>
   <ImmigrationGrid />


      </Card>
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  );
};

export default Immigrationtable;

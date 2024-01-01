// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
// import { data, columns } from '../data'

// // ** Add New Modal Component
// import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

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
  UncontrolledButtonDropdown
} from 'reactstrap'
import VendorGrid from './VendorGrid'
import VendorModal from './modal/VendorModal'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const VendorTable = () => {
  // ** States
  const [modal, setModal] = useState(false)
    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)
  const [employeeList, setEmployeeList] = useState([]);






  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Employee Directory</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
     
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Record</span>
            </Button>
          </div>
        </CardHeader>
        {/* <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
            />
          </Col>
        </Row> */}

<VendorGrid  setEmployeeList= {setEmployeeList} employeeList={employeeList}  />
   

      </Card> 
      <VendorModal setEmployeeList= {setEmployeeList} open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export default VendorTable

// ** React Imports
import { Fragment, useRef, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Home, Check, X, Briefcase } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { getRefValue } from "../../../../utility/Utils";
import { useAuth } from "../../../../utility/context/AuthContext";
import { createEmployee } from "../../../../services/employeeService";

const defaultValues = {
  lastName: "",
  firstName: "",
};

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

const EmployeeModal = ({ open, handleModal, setEmployeeList, closeModal }) => {
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  const [show, setShow] = useState(false);
  const entryDateRef = useRef(null);
  const employeeIdRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const statusRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressOneRef = useRef(null);
  const addressTwoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);

  const { userAccessToken } = useAuth();
  // ** Hooks
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = () => {
    const entryDate = getRefValue(entryDateRef);
    const employeeId = getRefValue(employeeIdRef);
    const firstName = getRefValue(firstNameRef);
    const lastName = getRefValue(lastNameRef);
    const status = statusRef.current.getValue?.()?.[0]?.value;
    const email = getRefValue(emailRef);
    const phone = getRefValue(phoneRef);
    const address = getRefValue(addressOneRef);
    const street = getRefValue(addressTwoRef);
    const city = getRefValue(cityRef);
    const state = getRefValue(stateRef);
    const zip = getRefValue(zipRef);

    createEmployee(
      {
        entryDate,
        employeeId,
        firstName,
        lastName,
        status,
        email,
        phone,
        address,
        street,
        city,
        state,
        zip,
      },
      userAccessToken
    )
      .then((data) => {
        setEmployeeList((employeedetails) => {
          return [data,...employeedetails];
        });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDiscard = () => {
    clearErrors();
    setShow(false);
    reset();
    closeModal()
  };

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered modal-lg"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      ></ModalHeader>
      <ModalBody className="pb-5 px-sm-4 mx-50">
        <h1 className="address-title text-center mb-1">Add New Candidate</h1>
        <Row tag="form" className="gy-1 gx-2">
          <Col xs={12} md={6}>
            <Label className="form-label" for="entrydate">
              Entry Date
            </Label>
            <Input
              id="entrydate"
              innerRef={entryDateRef}
              type="date"
              placeholder="Select Date"
            />
          </Col>
          <Col xs={12} md={6}>
            <Label className="form-label" for="employeeid">
              Employee ID
            </Label>

            <Input
              id="employeeid"
              innerRef={employeeIdRef}
              placeholder="Ex : 11001"
            />
          </Col>

          <Col xs={12} md={6}>
            <Label className="form-label" for="lastName">
              Last Name
            </Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  id="lastName"
                  placeholder="Doe"
                  innerRef={lastNameRef}
                  invalid={errors.lastName && true}
                  {...field}
                />
              )}
            />
            {errors.lastName && (
              <FormFeedback>Please enter a valid Last Name</FormFeedback>
            )}
          </Col>
          <Col xs={12} md={6}>
            <Label className="form-label" for="firstName">
              First Name
            </Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  id="firstName"
                  placeholder="John"
                  innerRef={firstNameRef}
                  invalid={errors.firstName && true}
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>Please enter a valid First Name</FormFeedback>
            )}
          </Col>

          <Col xs={12} md={6}>
            <Label className="form-label" for="email">
              Email Id
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Id"
              innerRef={emailRef}
            />
          </Col>
          <Col xs={12} md={6}>
            <Label className="form-label" for="Phone">
              Phone
            </Label>
            <Input id="Phone" placeholder="Enter Phone" innerRef={phoneRef} />
          </Col>

          <Col xs={12}>
            <Label className="form-label" for="status">
              Status
            </Label>
            <Select
              id="status"
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              theme={selectThemeColors}
              defaultValue={statusOptions[0]}
              ref={statusRef}
            />
          </Col>

          <Col xs={12}>
            <Label className="form-label" for="addressLine1">
              Address Line 1
            </Label>
            <Input
              id="addressLine1"
              innerRef={addressOneRef}
              placeholder="12, Business Park"
            />
          </Col>
          <Col xs={12}>
            <Label className="form-label" for="addressLine2">
              Address Line 2
            </Label>
            <Input
              id="addressLine2"
              innerRef={addressTwoRef}
              placeholder="Mall Road"
            />
          </Col>
          <Col xs={12}>
            <Label className="form-label" for="city">
              City
            </Label>
            <Input
              id="city"
              innerRef={cityRef}
              placeholder="Ex : Los Angeles"
            />
          </Col>
          <Col xs={12} md={6}>
            <Label className="form-label" for="state-province">
              State / Province
            </Label>
            <Input
              id="state-province"
              innerRef={stateRef}
              placeholder="California"
            />
          </Col>
          <Col xs={12} md={6}>
            <Label className="form-label" for="zip-code">
              Zip Code
            </Label>
            <Input id="zip-code" innerRef={zipRef} placeholder="99950" />
          </Col>
          {/* <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-check form-switch form-check-primary me-25'>
                  <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <label className='form-check-label fw-bolder' htmlFor='billing-switch'>
                  Use as a billing address?
                </label>
              </div>
            </Col> */}
          <Col className="text-center" xs={12}>
            <Button onClick={onSubmit} className="me-1 mt-2" color="primary">
              Submit
            </Button>
            <Button
              type="reset"
              className="mt-2"
              color="secondary"
              outline
              onClick={onDiscard}
            >
              Discard
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default EmployeeModal;

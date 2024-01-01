// // ** React Imports
// import { Fragment, useRef, useState } from "react";

// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Card,
//   Label,
//   Input,
//   Modal,
//   Button,
//   CardBody,
//   CardText,
//   CardTitle,
//   ModalBody,
//   ModalHeader,
//   FormFeedback,
// } from "reactstrap";

// // ** Third Party Components
// import Select from "react-select";
// import { useForm, Controller } from "react-hook-form";
// import { Home, Check, X, Briefcase } from "react-feather";

// // ** Utils
// import { selectThemeColors } from "@utils";

// // ** Styles
// import "@styles/react/libs/react-select/_react-select.scss";
// import { getRefValue } from "../../../../utility/Utils";
// import { useAuth } from "../../../../utility/context/AuthContext";
// import { createImmigrationData } from "../../../../services/employeeService";

// const defaultValues = {
//   lastName: "",
//   firstName: "",

// };

// const statusOptions = [
//   { value: "H1 Visa", label: "H1 Visa" },
//   { value: "OPT Visa", label: "OPT Visa" },
// ];

// const ImmigrationModal = ({ open, handleModal ,setImmigrationList}) => {
//   // ** State
//   const [Picker, setPicker] = useState(new Date());

//   // ** Custom close btn
//   const CloseBtn = (
//     <X className="cursor-pointer" size={15} onClick={handleModal} />
//   );

//   const [show, setShow] = useState(false);
//   const employeeIdRef = useRef(null)
//   const entryDateRef = useRef(null)
//   const visaStatusRef = useRef(null)
//   const visaValidityRef = useRef(null)
//   const remainingDaysRef = useRef(null)

    
//   const {userAccessToken} = useAuth()
//   // ** Hooks
//   const {
//     reset,
//     control,
//     setError,
//     clearErrors,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const onSubmit = () => {
//     const entryDate = getRefValue(entryDateRef)
//     const employeeId = getRefValue(employeeIdRef)
//     const visaStatus = getRefValue(visaStatusRef)
//     const visaValidity = getRefValue(visaValidityRef)


//     createImmigrationData({entryDate,employeeId,visaStatus , visaValidity },userAccessToken)
    
//    .then((data)=>{
//    setImmigrationList((employeedetails)=>{
//   return [...employeedetails,data]
   
//    }).catch((err)=>{
//     console.log(err)
//    })

//     })

//   };

//   const onDiscard = () => {
//     clearErrors();
//     setShow(false);
//     reset();
//   };

  
//   return (
//     <Modal
//       isOpen={open}
//       toggle={handleModal}
//       className="modal-dialog-centered modal-lg"
//       contentClassName="pt-0"
//     >
//       <ModalHeader
//         className="mb-1"
//         toggle={handleModal}
//         close={CloseBtn}
//         tag="div"
//       ></ModalHeader>
//       <ModalBody className="pb-5 px-sm-4 mx-50">
//         <h1 className="address-title text-center mb-1">Add New Candidate</h1>
//         <Row tag="form" className="gy-1 gx-2" >

//           <Col xs={12} md={6}>
//             <Label className="form-label" for="entrydate">
//               Entry Date
//             </Label>
//             <Input id="entrydate" innerRef={entryDateRef} type="date" placeholder="Select Date" />
//           </Col>
//           <Col xs={12} md={6}>
//             <Label className="form-label" for="employeeid">
//               Employee ID
//             </Label>

//             <Input id="employeeid" innerRef={employeeIdRef} placeholder="Ex : 11001" />
//           </Col>




//           <Col xs={12}>
//             <Label className="form-label" for="visaStatus">
//               Visa Status
//             </Label>
//             <Select
//               id="visaStatus"
//               isClearable={false}
//               className="react-select"
//               classNamePrefix="select"
//               options={statusOptions}
//               theme={selectThemeColors}
//               defaultValue={statusOptions[0]}
//               ref={visaStatusRef}
//             />
//           </Col>
//           <Col xs={12} >
//             <Label className="form-label" for="visavalidity">
//               Visa Validity
//             </Label>
//             <Input id="visavalidity" innerRef={visaValidityRef} type="date" placeholder="Select Date" />
//           </Col>

      
//           {/* <Col xs={12}>
//               <div className='d-flex align-items-center'>
//                 <div className='form-check form-switch form-check-primary me-25'>
//                   <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
//                   <Label className='form-check-label' htmlFor='billing-switch'>
//                     <span className='switch-icon-left'>
//                       <Check size={14} />
//                     </span>
//                     <span className='switch-icon-right'>
//                       <X size={14} />
//                     </span>
//                   </Label>
//                 </div>
//                 <label className='form-check-label fw-bolder' htmlFor='billing-switch'>
//                   Use as a billing address?
//                 </label>
//               </div>
//             </Col> */}
//           <Col className="text-center" xs={12}>
//             <Button  onClick={onSubmit} className="me-1 mt-2" color="primary">
//               Submit
//             </Button>
//             <Button
//               type="reset"
//               className="mt-2"
//               color="secondary"
//               outline
//               onClick={onDiscard}
//             >
//               Discard
//             </Button>
//           </Col>
//         </Row>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default ImmigrationModal;

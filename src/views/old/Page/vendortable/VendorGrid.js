import { useEffect, useRef, useState } from "react";
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { CellRender, RowRender } from "../../../utility/renderers";
import { bulkUpdateEmployee, getEmployeeList } from "../../../services/employeeService";
import { useAuth } from "../../../utility/context/AuthContext";
const EDIT_FIELD = 'inEdit';
function EmployeeGrid() {
    const bulkEmployeeUpdates = useRef({});
    const originalList = useRef([]);
    const [updates, setUpdates] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const { userAccessToken } = useAuth();
    const employeeGridStyles = { height: '430px', width: '100%' }
    const enterEdit = (dataItem, field) => {
        const editableEmployeeList = employeeList.map((employee) => ({
            ...employee,
            [EDIT_FIELD]: employee.employeeId === dataItem.employeeId && !updates ? field : undefined
        }))
        setEmployeeList(editableEmployeeList)
    }
    const exitEdit = () => {
        const blockedEmployeeList = employeeList.map((employee) => {
            delete employee[EDIT_FIELD];
            return employee;
        })
        setEmployeeList(blockedEmployeeList)
    }
    const customCellRender = (td, props) => <CellRender
        originalProps={props}
        td={td}
        enterEdit={enterEdit}
        editField={EDIT_FIELD}
    />;
    const customRowRender = (tr, props) => <RowRender
        originalProps={props}
        tr={tr}
        exitEdit={exitEdit}
        editField={EDIT_FIELD}
    />;

    const onChange = (event) => {
        if (event.field) {
            // event.dataItem[event.field] = event.value;
            const levels = event.field?.split?.('.') || ['']
            console.log(levels)
            let updatedEmployeeData = employeeList.map(employee => {
                if (employee.employeeId === event.dataItem.employeeId && levels.length) {
                    levels.reduce((previous, next) => {
                        if (previous?.[next] && typeof previous?.[next] === 'object' && !(previous[next] instanceof Date)) {
                            return previous[next]
                        } else {
                            previous[next] = event.value
                            return employee
                        }
                    }, employee)
                }
                return employee;
            });
            const currentEmployeeUpdates = bulkEmployeeUpdates.current[event.dataItem.employeeId];
            bulkEmployeeUpdates.current[event.dataItem.employeeId] = currentEmployeeUpdates ? {
                ...currentEmployeeUpdates,
                [event.field]: event.value,
            } : { [event.field]: event.value, }
            setEmployeeList(updatedEmployeeData);
        }
    }

    const saveChanges = async () => {
        setUpdates(true)
        bulkUpdateEmployee(bulkEmployeeUpdates.current, userAccessToken)
            .then((data) => {
                console.log(data)
                if (data.status) {
                    originalList.current = employeeList;
                    bulkEmployeeUpdates.current = {};
                    setUpdates(false);
                }
            })
    }

    const cancelChanges=()=>{
        bulkEmployeeUpdates.current = {}
        setEmployeeList(originalList.current);
    }

    useEffect(() => { console.log(employeeList) }, [employeeList])

    useEffect(() => {
        if (!employeeList?.length) {
            getEmployeeList(userAccessToken).then((data) => {
                // console.log(data)
                if (data?.length) {
                    const mappedData = data.map(employee => { employee.entryDate = new Date(employee.entryDate); return employee })
                    setEmployeeList(mappedData);
                    originalList.current = mappedData;
                }
            });
        }
    }, [])
    return (
        <Grid
            style={employeeGridStyles}
            data={employeeList}
            dataItemKey={'employeeId'}
            rowHeight={50}
            onItemChange={onChange}
            cellRender={customCellRender}
            rowRender={customRowRender}
            editField={EDIT_FIELD}
        >
            <GridToolbar>
                <button title="Save Changes" className="btn btn-primary k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={saveChanges}
                    disabled={!Object.keys(bulkEmployeeUpdates.current).length}
                >
                    Save Changes
                </button>
                <button title="Cancel Changes" className="btn btn-secondary k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={cancelChanges}
                    disabled={!Object.keys(bulkEmployeeUpdates.current).length}
                >
                    Cancel Changes
                </button>
            </GridToolbar>
            <Column field="employeeId" title="Id" width="100px" editable={false} />
            <Column field="entryDate" title="Entry Date" width="120px" format="{0:d}" editor="date" />
            <Column field="status" title="Status" width="120px" />
            <Column field="firstName" title="First Name" width="120px" />
            <Column field="lastName" title="Last Name" width="120px" />
            <Column field="phone" title="Phone" width="120px" />
            <Column field="email" title="Email" width="170px" />
            <Column field="address" title="Address" width="130px" />
            <Column field="street" title="Street" width="130px" />
            <Column field="city" title="City" width="90px" />
            <Column field="state" title="State" width="80px" />
            <Column field="zip" title="Zip" width="90px" />
            {/* <Column field="comments" title="Comments" /> */}
        </Grid>
    )
}

export default EmployeeGrid;
import { useEffect, useRef, useState } from "react";
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { bulkUpdateEmployee, bulkUpdateImmigration, getEmployeeList, getImmigrationEntries } from "../../../services/employeeService";
import { CellRender, RowRender } from "../../../utility/renderers";
import getReminingDays from "../../../utility/getReminingDays";
import { hasUpdates } from "../../../utility/validators";
import { useAuth } from "../../../utility/context/AuthContext";

const EDIT_FIELD = 'inEdit';
function ImmigrationGrid() {
    const bulkEmployeeUpdates = useRef({});
    const bulkImmigrationUpdates = useRef({});
    const [updates, setUpdates] = useState(false);
    const [immigrationList, setImmigrationList] = useState([]);
    const { userAccessToken } = useAuth();
    const employeeGridStyles = { height: '520px' }
    const enterEdit = (dataItem, field) => {
        const editableImmigrationList = immigrationList.map((employee) => ({
            ...employee,
            [EDIT_FIELD]: employee.employeeId === dataItem.employeeId && !updates ? field : undefined
        }))
        setImmigrationList(editableImmigrationList)
    }
    const exitEdit = () => {
        const blockedImmigrationList = immigrationList.map((employee) => {
            delete employee[EDIT_FIELD];
            return employee;
        })
        setImmigrationList(blockedImmigrationList)
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
            let updatedEmployeeData = immigrationList.map(entry => {
                if (entry.employeeId === event.dataItem.employeeId && levels.length) {
                    levels.reduce((previous, next) => {
                        if (typeof previous?.[next] === 'object' && !(previous[next] instanceof Date)) {
                            return previous[next]
                        } else {
                            previous[next] = event.value
                            if (next === 'visaValidity') {
                                entry.remainingDays = getReminingDays(event.value);
                            }
                            return entry
                        }
                    }, entry)
                }
                return entry;
            });
            if (levels.includes('employee')) {
                const currentEmployeeUpdates = bulkEmployeeUpdates.current[event.dataItem.employeeId];
                bulkEmployeeUpdates.current[event.dataItem.employeeId] = currentEmployeeUpdates ? {
                    ...currentEmployeeUpdates,
                    [levels.at(-1)]: event.value,
                } : { [levels.at(-1)]: event.value, }
            }
            else {
                const currentImmigrationUpdates = bulkImmigrationUpdates.current[event.dataItem.employeeId];
                bulkImmigrationUpdates.current[event.dataItem.employeeId] = currentImmigrationUpdates ? {
                    ...currentImmigrationUpdates,
                    [event.field]: event.value,
                } : { [event.field]: event.value, }
            }
            setImmigrationList(updatedEmployeeData);
        }
    }

    const saveChanges = () => {
        setUpdates(true)
        const updatePromises = []
        if (hasUpdates(bulkEmployeeUpdates.current)) {
            updatePromises.push(bulkUpdateEmployee(bulkEmployeeUpdates.current, userAccessToken))
        }
        if (hasUpdates(bulkImmigrationUpdates.current)) {
            updatePromises.push(bulkUpdateImmigration(bulkImmigrationUpdates.current, userAccessToken))
        }
        Promise.allSettled(updatePromises)
            .then((data) => {
                console.log(data)
                bulkEmployeeUpdates.current = {}
                bulkImmigrationUpdates.current = {};
                setUpdates(false);
            }).catch((err) => console.error('updates failed', err))
    }

    useEffect(() => { console.log(immigrationList, bulkEmployeeUpdates, bulkImmigrationUpdates) }, [immigrationList])

    useEffect(() => {
        if (!immigrationList?.length) {
            getImmigrationEntries(userAccessToken).then((immigrationData) => {
                if (immigrationData?.length) {
                    getEmployeeList(userAccessToken).then(employeeData => {
                        if (employeeData?.length) {
                            const mappedData = immigrationData.map((entry) => {
                                const employeeDetails = employeeData.find((employee) => employee.employeeId === entry.employeeId);
                                const mappedEntry = {
                                    ...entry,
                                    visaValidity: new Date(entry.visaValidity),
                                    entryDate: new Date(entry.entryDate),
                                    employee: {
                                        ...employeeDetails,
                                    },
                                    remainingDays: getReminingDays(entry.visaValidity),
                                }
                                return mappedEntry
                            })
                            setImmigrationList(mappedData);
                        }
                    })
                }
            });
        }
    }, [])
    return (
        <Grid
            style={employeeGridStyles}
            data={immigrationList}
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
                    disabled={!(Object.keys(bulkImmigrationUpdates.current).length || Object.keys(bulkEmployeeUpdates.current).length)}
                >
                    Save Changes
                </button>
                <button title="Cancel Changes" className="btn btn-secondary k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    // onClick={cancelChanges}
                    disabled={!(Object.keys(bulkImmigrationUpdates.current).length || Object.keys(bulkEmployeeUpdates.current).length)}
                >
                    Cancel Changes
                </button>
            </GridToolbar>
            <Column field="employeeId" title="Id" width="50px" editable={false} />
            <Column field="employee.firstName" title="First Name" width="140px" />
            <Column field="employee.lastName" title="Last Name" width="140px" />
            <Column field="entryDate" title="Entry Date" width="200px" format="{0:d}" editor="date" />
            <Column field="employee.status" title="Status" width="140px" />
            <Column field="employee.phone" title="Phone" width="140px" />
            <Column field="employee.email" title="Email" width="140px" />
            <Column field="visaStatus" title="Immigration Status" width="140px" />
            <Column field="visaValidity" title="Visa Validity" format="{0:d}" editor="date" width="140px" />
            <Column field="remainingDays" title="remainingDays" width="140px" editable={false} />
        </Grid>
    )
}

export default ImmigrationGrid;
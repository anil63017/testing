import * as React from 'react';
 
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { sampleProducts } from './sample-products';

const EditCommandCell = props => {
  return <td>
      <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterEdit(props.dataItem)}>
        Edit
      </button>
    </td>;
};
const App = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [editItem, setEditItem] = React.useState({
    ProductID: 1
  });
  const [data, setData] = React.useState(sampleProducts);
  const enterEdit = item => {
    setOpenForm(true);
    setEditItem(item);
  };
  const handleSubmit = event => {
    let newItem = true;
    let newData = data.map(item => {
      if (event.ProductID === item.ProductID) {
        newItem = false;
        item = {
          ...event
        };
      }
      return item;
    });
    if (newItem) {
      newData.push(event);
    }
    setData(newData);
    setOpenForm(false);
  };
  const addNew = () => {
    setOpenForm(true);
    setEditItem({
      ProductID: 99
    }); // you need to change the logic for adding unique ID value;
  };
  const handleCancelEdit = () => {
    setOpenForm(false);
  };
  const MyEditCommandCell = props => <EditCommandCell {...props} enterEdit={enterEdit} />;
  return <React.Fragment>
      <Grid style={{
      height: '400px'
    }} data={data}>
        <GridToolbar>
          <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addNew}>
            Add new
          </button>
        </GridToolbar>
        <Column field="ProductID" title="ID" width="40px" />
        <Column field="ProductName" title="Name" width="250px" />
        <Column field="Category.CategoryName" title="CategoryName" />
        <Column field="UnitPrice" title="Price" />
        <Column field="UnitsInStock" title="In stock" />

      </Grid>
    
    </React.Fragment>;
};
export default App
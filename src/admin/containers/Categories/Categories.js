import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { addCategories, deleteCategories, getCategories, updateCategories } from '../../../Redux/Slice/Categorie.slice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

function Categories(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');

    const dispatch = useDispatch()

    const categorie = useSelector(state => state.categories.categories)
    

    const getData = () => {
        dispatch(getCategories())
    }


    const handleAdd = async (data) => {

        dispatch(addCategories(data));
    }

    const handleDelete = (id) => {
       dispatch(deleteCategories(id))
    }

    const handleEdit = (data) => {
        setValues(data);
        setUpdate(data.id)
        handleClickOpen();
        
    };

    const handleUpdate = (data) => {
        dispatch(updateCategories(data));
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm()
        setUpdate(null)
    };

    useEffect(() => {
        getData()
    }, [])



    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'categories', headerName: 'categories Name', width: 200 },
        {
            field: 'action', headerName: 'Action', width: 100,
            renderCell: (params) => {                
                return (
                    <>
                        <IconButton sx={{ color: red[500] }} aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{ color: green[500] }} aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        },
    ];



    let categorieSchema = object({
        categories: string().required("Please Enter Categories.")
    });

    const formik = useFormik({
        initialValues: {
            categories: ''
        },
        validationSchema: categorieSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdate(values)
            } else {
                handleAdd(values)
            }

            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleChange, handleBlur, resetForm, setValues,errors, values, touched } = formik

    return (
        <div>
            <h1>Categories</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{color: "#FFFFFF", background:"#3D464D"}} >
                    Add Categories
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Categories</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="categories"
                                label="Categories"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.categories}
                                error={errors.categories && touched.categories}
                                helperText={errors.categories && touched.categories ? errors.categories : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={categorie}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page:0,
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5,10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Categories;
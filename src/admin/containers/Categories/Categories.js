import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { mixed, object, string } from 'yup';
import { addCategories, deleteCategories, getCategories, updateCategories, updateCategorieStatus } from '../../../Redux/Slice/Categorie.slice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Switch } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

function Categories(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');

    const dispatch = useDispatch()

    const categorie = useSelector(state => state.categories.categories)


    const handleStatus = (data) =>{
        dispatch(updateCategorieStatus(data))
    }

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
        { field: 'categories', headerName: 'categories Name', width: 250 },
        {
            field: 'cat_img', headerName: 'categories Image', width: 200,
            renderCell: (params) => (
                <img src={"../img/" + params.row.cat_img} width={"80px"} height={"80px"} />
            )
        },
        { field: 'status', headerName: 'status', width: 150 },

        {
            field: 'action', headerName: 'Action', width: 150,
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
        {
            field: 'statusAction', headerName: 'Status Action', width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Switch
                            checked={params.row.status === 'active' ? true : false}
                            onChange={() => handleStatus(params.row)}

                        />
                    </>
                )
            }
        },
    ];



    let categorieSchema = object({
        categories: string().required("Please Enter Categories."),
        cat_img: mixed().required("Categories image is a required field")
    });

    const formik = useFormik({
        initialValues: {
            categories: '',
            cat_img: ''
        },
        validationSchema: categorieSchema,
        onSubmit: (values, { resetForm }) => {

            console.log(values);

            if (update) {
                handleUpdate({ ...values, status: 'active', cat_img: typeof values.cat_img === "string" ? values.cat_img : values.cat_img.name })

            } else {
                handleAdd({ ...values, status: 'active', cat_img: values.cat_img.name })
            }

            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleChange, handleBlur, resetForm, setValues, errors, values, touched, setFieldValue } = formik

    console.log(values);




    return (
        <div>
            <h1>Categories</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{ color: "#FFFFFF", background: "#3D464D" }} >
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

                            <span>Categorie Image :- </span>

                            <input
                                type='file'
                                name='cat_img'
                                onChange={(e) => setFieldValue("cat_img", e.target.files[0])}
                                onBlur={handleBlur}
                            />
                            <br />
                            <img src={typeof values.cat_img === "string" ? "../img/" + values.cat_img : URL.createObjectURL(values.cat_img)} height={"80px"} width={"80px"} />
                            <br />
                            <span className='error_validation'>{errors.cat_img && touched.cat_img ? errors.cat_img : ''}</span>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: '100%', width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={categorie}
                    rowHeight={100}
                    columns={columns}
                    style={{padding: '20px'}}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 10,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Categories;
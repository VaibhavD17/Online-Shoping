import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { mixed, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Switch } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { getCategories } from '../../../Redux/Slice/Categorie.slice';
import { addSubCategories, deleteSubCategories, getSubCategories, updateSubcategories, updateSubcategorieStatus } from '../../../Redux/Slice/Subcategorie.slice';


function SubCategories(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');
    const dispatch = useDispatch();
    const categorie = useSelector(state => state.categories.categories)
    const subCategories = useSelector(state => state.subCategories.subCategories)

    const handleChangecheckd = (data) =>{

        dispatch(updateSubcategorieStatus(data))
        
    }

    const getData = () => {
        dispatch(getCategories())
        dispatch(getSubCategories())
    }

    const handleAdd = (data) => {
        dispatch(addSubCategories(data))
    }

    const handleDelete = (id) => {
        dispatch(deleteSubCategories(id))
    }

    const handleEdit = (data) => {
        setUpdate(data.id)
        setValues(data)
        handleClickOpen()
    }

    const handleUpdate = (data) => {
        dispatch(updateSubcategories(data))
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
        { field: 'id', headerName: "ID", width: 90 },
        {
            field: 'categories', headerName: "Categories Name", width: 200,
            renderCell: (params) => {
                return categorie.find((v) => v.id === params.row.categories)?.categories
            }
        },
        { field: 'subcategories', headerName: "SubCategories", width: 230 },
        { field: 'subcategoriesDesc', headerName: "Description", width: 200 },
        {
            field: 'subcat_img', headerName: "SubCategories Image", width: 200,
            renderCell: (params) => (
                <img src={"../img/" + params.row.subcat_img} width={"80px"} height={"80px"} />
            )
        },
        { field: 'status', headerName: "status", width: 150 },
        {
            field: 'action', headerName: "Action", width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton sx={{ color: red[500] }} aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{ color: green[500] }} aria-label="edit" onClick={() => handleEdit(params.row)} >
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        },
        {
            field: 'statusAction', headerName: "Status Action", width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Switch
                            checked={params.row.status === 'active' ? true : false}
                            onChange={() => handleChangecheckd(params.row)}
                        />

                    </>
                )
            }
        },

    ]

    let SubcategorieSchema = object({
        categories: string().required("Please Select Categories."),
        subcategories: string().required("Please Enter subcategories."),
        subcategoriesDesc: string().required("Please Enter subcategories Description."),
        subcat_img: mixed().required("subcategories image is a required field")
    });

    const formik = useFormik({
        initialValues: {
            categories: '',
            subcategories: '',
            subcategoriesDesc: '',
            subcat_img: ''
        },
        validationSchema: SubcategorieSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdate({ ...values, status: 'active', subcat_img: typeof values.subcat_img === "string" ? values.subcat_img : values.subcat_img.name })
            } else {
                handleAdd({ ...values, status: 'active', subcat_img: values.subcat_img.name })
            }

            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleChange, handleBlur, resetForm, setValues, errors, values, touched, setFieldValue } = formik
    return (
        <div>
            <h1>SubCategories</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{ color: "#FFFFFF", background: "#3D464D" }} >
                    Add SubCategories
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>SubCategories</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel className={errors.categories && touched.categories ? 'error_validation' : ''} id="demo-simple-select-error-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="categories"
                                    name='categories'
                                    value={values.categories}
                                    label="Categories"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.categories && touched.categories}
                                >
                                    {categorie.map((v, i) => (
                                        <MenuItem
                                            key={v.id}
                                            value={v.id}
                                        >
                                            {v.categories}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className='error_validation'>{errors.categories && touched.categories ? errors.categories : ''}</FormHelperText>
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="name"
                                name="subcategories"
                                label="SubCategories Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subcategories}
                                error={errors.subcategories && touched.subcategories}
                                helperText={errors.subcategories && touched.subcategories ? errors.subcategories : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="subcategoriesDesc"
                                label="SubCategories Description"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subcategoriesDesc}
                                error={errors.subcategoriesDesc && touched.subcategoriesDesc}
                                helperText={errors.subcategoriesDesc && touched.subcategoriesDesc ? errors.subcategoriesDesc : ''}
                            />
                            <span>Subcategories Image :- </span>
                            <input
                                type='file'
                                name='subcat_img'
                                onChange={(e) => setFieldValue("subcat_img", e.target.files[0])}
                                onBlur={handleBlur}
                            />
                            <img src={typeof values.subcat_img === "string" ? "../img/" + values.subcat_img : URL.createObjectURL(values.subcat_img)} width={"80px"} height={"80px"} />
                            <br />
                            <span className='error_validation'>{errors.subcat_img && touched.subcat_img ? errors.subcat_img : ''}</span>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: "100%", width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={subCategories}
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
                   
                    rowHeight={100}
                />
            </div>
        </div>
    );
}

export default SubCategories;
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { getSubCategories } from '../../../Redux/Slice/Subcategorie.slice';
import { getCategories } from '../../../Redux/Slice/Categorie.slice';
import { render } from '@testing-library/react';
import { addProducts, deleteProducts, getProducts, updateProducts } from '../../../Redux/Slice/Products.slice';


function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.categories)
    const subCategories = useSelector(state => state.subCategories.subCategories)
    const products = useSelector(state => state.products.products)

    console.log(products);
    

    const getData = () => {
        dispatch(getCategories())
        dispatch(getSubCategories())
        dispatch(getProducts())
    }

    const handleAdd = (data) => {
        dispatch(addProducts(data))
    }

    const handleDelete = (id) => {
        dispatch(deleteProducts(id))
    }

    const handleEdit = (data) => {
        setUpdate(data.id)
        setValues(data)
        handleClickOpen()
    }

    const handleUpdate = (data) => {
        dispatch(updateProducts(data))
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
        { field: 'id', headerName: "ID", width: 100 },
        {
            field: "categories", headerName: 'Categories', width: 200,
            renderCell: (params) => {
                return categories.find((v) => v.id === params.row.categories)?.categories
            }
        },
        {
            field: "subcategories", headerName: 'SubCategories', width: 200,
            renderCell: (params) => {
                return subCategories.find((v) => v.id === params.row.subcategories)?.subcategories
            }
        },
        { field: 'products', headerName: "Products", width: 200 },
        { field: 'productsDesc', headerName: "productsDesc", width: 200 },
        { field: 'price', headerName: "price", width: 100 },
        { field: 'action', headerName: "Action", width: 100 ,
            renderCell:(params)=>{
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
        
    ]

    let SubcategorieSchema = object({
        categories: string().required("Please Select Categories."),
        subcategories: string().required("Please Select SubCategories."),
        products: string().required("Please Enter Products."),
        productsDesc: string().required("Please Enter products Descriptions."),
        price: number().required("Please Enter Price."),
    });
    
    const formik = useFormik({
        initialValues: {
            categories: '',
            subcategories: '',
            products: '',
            productsDesc:'',
            price:''
        },
        validationSchema: SubcategorieSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdate(values)
                console.log(values);
                
            } else {
                handleAdd(values)
                console.log(values);
                
            }

            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleChange, handleBlur, resetForm, values, errors, touched, setValues } = formik;

    return (
        <div>
            <h1>Products</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{ color: "#FFFFFF", background: "#3D464D" }} >
                    Add Products
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Products</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel className={errors.categories && touched.categories ? 'error_validation' : ''} id="demo-simple-select-error-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    required
                                    id="categories"
                                    name='categories'
                                    value={values.categories}
                                    label="Categories"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.categories && touched.categories}
                                >
                                    {categories.map((v, i) => (
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
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel className={errors.subcategories && touched.subcategories ? 'error_validation' : ''} id="demo-simple-select-error-label">SubCategories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    required
                                    id="subcategories"
                                    name='subcategories'
                                    value={values.subcategories}
                                    label="subcategories"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.subcategories && touched.subcategories}
                                >
                                    {subCategories.filter((v) => v.categories === values.categories)?.map((c) => (

                                   
                                        <MenuItem
                                            key={c.id}
                                            value={c.id}
                                        >
                                            {c.subcategories}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className='error_validation'>{errors.subcategories && touched.subcategories ? errors.subcategories : ''}</FormHelperText>

                            </FormControl>
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="products"
                                label="products Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.products}
                                error={errors.products && touched.products}
                                helperText={errors.products && touched.products ? errors.products : ''}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="productsDesc"
                                label="products Descriptions"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.productsDesc}
                                error={errors.productsDesc && touched.productsDesc}
                                helperText={errors.productsDesc && touched.productsDesc ? errors.productsDesc : ''}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="price"
                                label="price"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price && touched.price}
                                helperText={errors.price && touched.price ? errors.price : ''}
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
                    rows={products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Products;
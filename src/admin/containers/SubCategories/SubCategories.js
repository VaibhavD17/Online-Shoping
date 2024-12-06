import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { addCategories, deleteCategories, getCategories, updateCategories } from '../../../Redux/Slice/Categorie.slice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';

function SubCategories(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');

    const categories = useSelector(state => state.categories)

    console.log(categories);
    

    const getData = () => {

    }

    const handleAdd = () =>{

    }

   const handleUpdate = () =>{
        
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

    let SubcategorieSchema = object({
        subcategories: string().required("Please Enter Categories."),
        subcategoriesDesc: string().required("Please Enter Categories.")
    });

    const formik = useFormik({
        initialValues: {
            subcategories: '',
            subcategoriesDesc:''
        },
        validationSchema: SubcategorieSchema,
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
            <h1>SubCategories</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{color: "#FFFFFF", background:"#3D464D"}} >
                    Add SubCategories
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>SubCategories</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                required
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
                                required
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">ADD</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default SubCategories;
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, deleteCoupon, getCoupon, updateCoupon } from '../../../Redux/Slice/Coupon.slice';
import { green, red } from '@mui/material/colors';


function Coupon(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('')
    const dispatch = useDispatch();

    const coupon = useSelector(state => state.coupon.coupon)

    const handleAdd = (data) => {
        dispatch(addCoupon(data))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteCoupon(id))
    }
    const handleEdit = (data) => {
        setValues(data)
        handleClickOpen()
        setUpdate(data.id)
    }

    const handleUpdate = (data) => {
        dispatch(updateCoupon(data))
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
        setUpdate(null);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'code', headerName: 'Coupon Code', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
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
        }
    ];

    let couponSchema = object({
        code: string().required('Please Enter Coupon Code'),
        discount: number().min(1).max(100).required('Please Enter Discount Percent.')
    });

    const formik = useFormik({
        initialValues: {
            code: '',
            discount: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdate(values)
            } else {
                handleAdd(values);
            }


            handleClose();
            resetForm();
        },
    });

    const getData = () => {
        dispatch(getCoupon())
    }

    useEffect(() => {
        getData();
    }, [])

    const { handleSubmit, handleChange, handleBlur, resetForm, setValues, values, errors, touched } = formik

    return (

        <div>
            <h1>Coupons</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{ color: "#FFFFFF", background: "#3D464D" }}>
                    Add to Coupons
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        Coupon
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                required
                                margin='dense'
                                id='code'
                                name='code'
                                label='Coupon'
                                type='text'
                                fullWidth
                                variant='outlined'
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.code && touched.code}
                                helperText={errors.code}
                            />
                            <TextField
                                required
                                margin='dense'
                                id='discount'
                                name='discount'
                                label='Discount'
                                type='text'
                                fullWidth
                                variant='outlined'
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.discount && touched.discount}
                                helperText={errors.discount}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type='submit'>{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={coupon}
                    columns={columns}
                    style={{ padding: '20px' }}
                    rowHeight={70}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0, 
                                pageSize: 10
                            },
                        },
                    }}
                />
            </div>

        </div>
    );
}

export default Coupon;
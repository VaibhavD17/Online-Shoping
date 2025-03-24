import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getBilling, updateBilling } from '../../../Redux/Slice/Checkout.slice';
import { getProducts } from '../../../Redux/Slice/Products.slice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DialogTitle } from '@mui/material';

function OrderList(props) {

    const disptch = useDispatch()
    const orderList = useSelector(state => state.checkout.checkout)
    const products = useSelector(state => state.products.products)
    const [orderData, setOrderData] = useState([])
    const cartData = orderData.cart
    const billing_details = orderData.billing_details
    const OrderDate = new Date(orderData.createdAt)
    const [disabled, setdisabled] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('');

    const handleChange = (e) => {
        console.log(e);

        setStatus(e);
    };


    console.log(status);

    const handleSubmit = (e) => {
        const data = { ...orderData, status: status }
        disptch(updateBilling(data))
        setOpen(false)
    }

    const fData = products.filter((v) => {
        return (
            orderData?.cart?.find((c) => c.pid === v.id)
        )
    })

    const handleClickOpen = (data) => {
        setOpen(true);
        setOrderData(data)
    };

    const handleClose = () => {
        setOpen(false);
        setdisabled(false)
    };


    const renderProductName = (params) => {
        const cartItem = params.row.cart

        const productName = cartItem.map((v) => {

            const product = products.find((p) => p.id === v.pid);

            return product ? product.products : ''
        })

        return productName.join(', ')

    }





    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'user_id', headerName: 'User id', width: 80 },
        { field: 'fname', headerName: 'User name', width: 200 , 
            renderCell: (params) => {
                return (
                    params.row.billing_details.fname + ' ' +  params.row.billing_details.Lname 
                )
            }
        },
        {
            field: 'product', headerName: 'product', width: 400,
            renderCell: renderProductName
        },
        { field: 'total_amount', headerName: 'Amount', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
        {
            field: 'action', headerName: 'View Detail', width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => handleClickOpen(params.row)} >
                            <VisibilityIcon />
                        </IconButton>
                    </>
                )
            }
        },
        {
            field: 'edit', headerName: 'Status Edit', width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            onClick={() => (
                                handleClickOpen(params.row),
                                setdisabled(true)
                            )}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        },
    ]



    const getData = () => {
        disptch(getBilling())
        disptch(getProducts())
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <h1>Orders</h1>
            <React.Fragment>

                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                >

                    
                    <DialogContent>
                        <div>
                            <div className="container-fluid py-5">
                                <div className="container">
                                    <div className='d-flex orderDetail-Data'>
                                        <button className='myOrderbtn back-button' onClick={handleClose}><ArrowBackIcon></ArrowBackIcon> Close</button>

                                        <div className='dataOrder'></div>
                                        <div className='dataOrder'>
                                            <Box sx={{ minWidth: 120 }} style={{ display: disabled ? 'block' : 'none' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={status}
                                                        label="Status"
                                                        onChange={(e) => handleChange(e.target.value)}

                                                    >
                                                        <MenuItem value={'pending'}>Pending</MenuItem>
                                                        <MenuItem value={'accepte'}>Accepte</MenuItem>
                                                        <MenuItem value={'delivered'}>Delivered</MenuItem>
                                                        <MenuItem value={'reject'}>Reject</MenuItem>
                                                        <MenuItem value={'transist'}>Transist</MenuItem>
                                                        <MenuItem value={'cancel'}>Cancel</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div className='dataOrder'>Status: {orderData.status} </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-column orderData'>
                            <div className='orderSection'>

                                {fData.map((v) => {
                                    const cartItem = cartData.find(c1 => c1.pid === v.id);

                                    return (
                                        <div className='d-flex orderDetail-Data'>
                                            <div className='dataOrder productname'>{v.products}</div>
                                            <div className='dataOrder orderQuantity'>{cartItem ? cartItem.qty : 0}</div>
                                            <div className='dataOrder orderPrice'>{cartItem ? `$${cartItem.amount * cartItem.qty}` : '$0'}</div>
                                        </div>
                                    );
                                })}

                                <div className='d-flex orderDetail-total'>
                                    <div className='dataOrder'></div>
                                    <div className='dataOrder totalQuantity'>
                                        <strong>Total Quantity:</strong> {orderData?.cart?.reduce((acc, c1) => acc + c1.qty, 0)}
                                    </div>
                                    <div className='dataOrder bill-amount-order'>
                                        <div>Discount: ${(orderData.total_amount * orderData.discount) / 100}</div>
                                        <div>Billing Amount: ${orderData.billing_amount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="card shadow-lg border-0 rounded-lg">
                                    <div className="card-body">
                                        <h5 className="card-title text-dark">Order Summary</h5>
                                        <hr />

                                        <p><strong>Billing Address:</strong> {billing_details?.address} </p>

                                        <p className="card-text">
                                            <strong>Total Amount:</strong> ₹ {orderData.total_amount}
                                        </p>

                                        <p className="card-text">
                                            <strong>Discount:</strong> ₹{(orderData.total_amount * orderData.discount) / 100} ({orderData.discount}%)
                                        </p>

                                        <p className="card-text">
                                            <strong>Billing Amount:</strong> ₹{orderData.billing_amount}
                                        </p>

                                        <p className="card-text">
                                            <strong>Payment Method:</strong> {billing_details?.payment}
                                        </p>

                                        <p className="card-text">
                                            <strong>Order Date:</strong> {OrderDate.toLocaleDateString()} {OrderDate.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    {
                                        disabled === true ? <DialogActions>
                                            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" className="submit-btn">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                            :
                                            null
                                    }

                                </div>
                            </div>
                        </div>

                    </DialogContent>

                </Dialog>
            </React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={orderList}
                    columns={columns}
                    style={{padding: '20px'}}
                    rowHeight={70}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                />
            </Box>
        </div>
    );
}

export default OrderList;
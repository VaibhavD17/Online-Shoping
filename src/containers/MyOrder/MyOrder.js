import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { cancelOrder, getBilling } from '../../Redux/Slice/Checkout.slice';
import { getProducts } from '../../Redux/Slice/Products.slice';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';


function MyOrder(props) {
    const auth = useSelector(state => state.auth.auth)
    const orderList = useSelector(state => state.checkout.checkout)
    const [orderData, setOrderData] = useState([])
    const OrderDate = new Date(orderData.createdAt)
    const cartData = orderData.cart
    const billing_details = orderData.billing_details
    const products = useSelector(state => state.products.products)
    const [open, setOpen] = React.useState(false);
    const disptch = useDispatch()

    const pData = orderList.filter((c) => auth?.id === c.user_id)

    const fData = products.filter((v) => {
        return (
            orderData?.cart?.find((c) => c.pid === v.id)
        )
    })





    const handleClickOpen = (data) => {
        setOpen(true)
        setOrderData(data)
    }

    // console.log(orderData);
    // console.log(orderList);
    // console.log(fData);
    // console.log(products);

    console.log(pData);



    const renderProductName = (params) => {
        const cartItem = params.row.cart

        const productName = cartItem.map((v) => {

            const product = products.find((p) => p.id === v.pid);

            return product ? product.products : ''
        })

        return productName.join(', ')

    }

    const handleCancelOrder = (data) => {

        if (data.status !== 'delivered') {
            disptch(cancelOrder(data.id))
        } else {
            alert('Your order was alrady delivered')
        }
       
    }





    const handleClose = () => {
        setOpen(false);
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user_id', headerName: 'User id', width: 90 },
        {
            field: 'product', headerName: 'product', width: 300,
            renderCell: renderProductName
        },

        {
            field: 'qty', headerName: 'Total Quantity', width: 150,
            renderCell: (params) => {
                return (
                    params.row.cart.reduce((acc, v) => v.qty + acc, 0)
                )
            }
        },
        { field: 'total_amount', headerName: 'Amount', width: 130 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'action', headerName: 'View Detail', width: 150,
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
            field: 'cancel', headerName: 'Cancel Order', width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => handleCancelOrder(params.row)} >
                            <CancelIcon sx={{ color: red[500] }} />
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
            <React.Fragment>

                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                    }}
                >


                    <DialogContent>
                        <div>
                            <div className="container-fluid py-5">
                                <div className="container">
                                    <div className='d-flex orderDetail-Data'>
                                        <button className='myOrderbtn back-button btn-primary' onClick={handleClose}><ArrowBackIcon></ArrowBackIcon> Close</button>

                                        <div className='dataOrder'></div>
                                        <div className='dataOrder'>

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


                                </div>
                            </div>
                        </div>

                    </DialogContent>

                </Dialog>
            </React.Fragment>
            <Box sx={{ height: "100%", width: '100%' }}>
                <DataGrid
                    rows={pData}
                    columns={columns}
                    style={{ padding: '20px' }}
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

export default MyOrder;
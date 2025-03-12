import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../../Redux/Slice/Contact.slice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser';

function Contact(props) {
    const dispatch = useDispatch()
    const contact = useSelector(state => state.contact.contact)
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = useState('')
    const [type, setType] = useState('')
    const [userData, SetUserData] = useState('')



    const sendEmail = (value) => {
        
    
        emailjs
          .send('service_zppnhcs', 'template_steghrd', {
            to_name:userData.name,
            from_name:'Vaibhav Gohil',
            email:userData.email,
            message:value.reply
          }, {
            publicKey: 'vq0PugDSMVxTMBX8R',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };


    const handleReply = (data) => {
        setmessage(data.message)
        setType('reply')
        SetUserData(data)
        handleClickOpen()

    }

    const handleMessage = (data) => {

        setmessage(data.message)
        handleClickOpen()
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setType('')
        SetUserData('')
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'email', width: 300 },
        { field: 'subject', headerName: 'Subject', width: 250 },
        {
            field: 'message', headerName: 'view Message', width: 150,
            renderCell: (params) => {
                return (
                    <IconButton onClick={() => handleMessage(params.row)} >
                        <RemoveRedEyeIcon />
                    </IconButton>
                )
            }
        },
        {
            field: 'reply', headerName: 'Reply', width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => handleReply(params.row)} >
                            <QuickreplyIcon />
                        </IconButton>
                    </>
                )
            }
        },

    ];



    let ContactSchema = object({
        reply: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            reply: ''
        },
        validationSchema: ContactSchema,
        onSubmit: (values) => {
            sendEmail(values)

            handleClose()
            resetForm()
        },
    });


    const getData = () => {
        dispatch(getContact())
    }

    useEffect(() => {
        getData()
    }, [])

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm } = formik

    return (
        <div>
            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            component: 'form',

                        },
                    }}
                >
                    {
                        type === 'reply' ?
                            <DialogTitle><h3>Reply</h3></DialogTitle>
                            :
                            null
                    }
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <DialogContentText>
                                <h5>Message :-</h5>
                                <span>{message}</span>
                            </DialogContentText>
                            {
                                type === 'reply' ?
                                    <>
                                        <TextField
                                            margin="normal"
                                            id="reply"
                                            name="reply"
                                            label="Reply to message"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.reply}
                                        />
                                        <p className="help-block text-danger">{errors.reply && touched.reply ? errors.reply : ''} </p>
                                    </>
                                    :
                                    null

                            }

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{type === 'reply' ? 'Cancel' : 'Back'}</Button>
                            {
                                type === 'reply' ?
                                    <Button type="submit">Send</Button>
                                    :
                                    null
                            }

                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={contact}
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

export default Contact;
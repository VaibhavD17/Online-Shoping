import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Categories(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        
    }
    return (
        <div>
            <h1>Categories</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
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
                                name="name"
                                label="Categories"
                                type="text"
                                fullWidth
                                variant="standard"
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

export default Categories;
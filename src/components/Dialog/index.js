import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

import './Dialog.css'

import template from '../png/box.png'

import { FaSearch } from 'react-icons/fa'

function Example( {data , tipo} ){
    console.log(tipo)
    if(tipo === 'base64'){
    return <img src={`data:image/jpeg;base64,${data}`}  className="image"/>}
    else if (tipo === 'not-found'){
    return <img src={template} className="not-found"/>
    } else {
        return <h3>Produto sem Imagem</h3>
    }
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },ref: React.Ref<unknown>,
    
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ handleShow, price, iditem, image, handleGetImage, tipo, descricao }) {
    const [open, setOpen] = React.useState(false);
    const getPreco = (price)=>{
        if(price == 'Produto não encontrado'){
            return <h3>{price}</h3>
        }else {
            return 'R$ '+Number(price).toFixed(2)
        }
    }

    const getDescricao = (descricao)=>{
        if(descricao){
            return <h2>{descricao}</h2>
        }else{
            return <></>
        }
    }




    const handleClickOpen = () => {
        setTimeout(() => {
            setOpen(true);
        }, 800);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>
            <Button className='search' variant="contained" onClick={function (event) {handleShow(iditem);handleClickOpen()}}>
                <FaSearch />
            </Button>
            <Dialog className="dialog"
                fullScreen={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Preço do Produto"}
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {getPreco(price)}<br/>
                        <Example data={image} tipo={tipo}/><br/>
                        {getDescricao(descricao)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
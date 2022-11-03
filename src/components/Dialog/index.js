import React, { useEffect } from 'react';

// dialog necessary
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { FaSol } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

// img
import template from '../png/box.png'

// css
import './Dialog.css'

const diferencaCents = 0.9;
const diferencaPorCento = 0.10;

// validações de preço
const getPreco = (price, priceAnt) => {
    if (price === 'Produto não encontrado' || price === 0) {
        return <h3>{price}</h3>
    } 
    else if((priceAnt - price > diferencaCents || (priceAnt - price) / price > diferencaPorCento ) && price > diferencaCents){
        return <div className="preco"><p className="precoant">{priceAnt}</p><p> R$ {Number(price).toFixed(2)}</p></div>
    }
    else {
        return 'R$' + Number(price).toFixed(2)
    }
}



// adiciona uma img data to jpg
function Base64toIMG({ data, tipo }) {
    if (tipo === 'base64') {
        return <img src={`data:image/jpeg;base64,${data}`} className="image" />
    }
    else if (tipo === 'not-found') {
        return <img src={template} className="not-found" />
    }
    else if (tipo === 'no-image') {
        return <h3>Produto sem Imagem</h3>
    }
    else if (tipo === 'blank'){
        return <></>
    }
}

// é numero?
function isNumber(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false
    } else { return true }
}

// invalida 0 possívelmente refaturar por if(num)
function codeValid(num) {
    const numero = Number(num)
    if (numero) {
        return true
    } else {
        return false
    }
}

// aviso por entender que isso só funciona em Typescript, para desabilitar a tarja desabilite o @vscode.typescript-language-features
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    }, ref: React.Ref<unknown>,

) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ handleShow, price, priceAnt,  iditem, image, tipo, descricao, handleWipe, handleListen, handleReturn, handleDelete }) {
    const [open, setOpen] = React.useState(false);
    

    // pega descrição do item
    const getDescricao = (descricao) => {
        if (descricao) {
            return <h2>{descricao}</h2>
        } else {
            return <></>
        }
    }

    // abre o dialog, TimeOut temporário até receber um ok que tudo carregou
    const handleClickOpen = () => {
        setTimeout(() => {
            setOpen(true);
        }, 700);
    };

    // fecha o dialog
    const handleClose = () => {
        setOpen(false);
    };

    // listener para inserir número visto que o INPUT é readOnly e também pesquisar com enter
    useEffect(() => {
        const onKey = (event) => {
            if (isNumber(event)) {
                handleListen(event.key)
            }
            if (event.key == 'Enter') {
                if (codeValid(handleReturn())) {
                    handleShow()
                    handleClickOpen()
                }

            }
        };

        window.addEventListener('keypress', onKey);

        return () => {
            window.removeEventListener('keypress', onKey);
        }
    }, []);

    // listener para ler o BACKSPACE para apagar usando handleDelete e também aspas simples --> ' <-- para limpar
    /// Motivo de usar dois listener é porque o BACKSPACE não é pego por alguns, refaturar para apenas keydown
    useEffect(() => {
        const onKey = (event) => {
            if (event.keyCode === 8) {
                handleDelete()
            }
            if (event.keyCode === 192) {
                handleWipe()
            }
        };

        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
        }
    }, []);
    return (
        <div>
            
            <Button className='search' variant="contained" onClick={function (event) { if (codeValid(iditem)) { handleShow(iditem); handleClickOpen() } else { handleWipe() } }} >
                <FaSearch />
            </Button>

            <Dialog className="dialog"
                fullScreen={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="titulo"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="titulo">
                    {"Preço do Produto"}
                </DialogTitle>

                <DialogContent>
                  
                    <DialogContentText id="alert-dialog-description" component={'div'}>
                        {getPreco(price, priceAnt)}<br />
                        <Base64toIMG data={image} tipo={tipo} /><br />
                        {getDescricao(descricao)}
                    </DialogContentText>
                
                </DialogContent>
                    <button className="botaoclose" onClick={function (event) {handleClose (); setTimeout(function (){handleWipe();}, 300)}} ><AiFillCloseCircle /></button>

                </Dialog>
                
        
        </div>
    );
}
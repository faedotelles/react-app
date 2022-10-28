import React, { Component } from "react";
import Form from "./Form";
import Keypad from "./Keypad";
import getPrice from "../services/itemprvda";
import getImagem from '../services/itemimagem'

import AlertDialog from "./Dialog";


import './Main.css';
import './Keypad/Keypad.css'




const Home = class extends Component {
    state = {
        inputBar: '',
        priceShow: '',
        image64: '',
        tipo: '',
        descricao: '',
    };

    handleChanged = (event) => {
        this.setState({
            inputBar: event.target.value,
        });
    }

    handleDelete = () => {
        const { inputBar } = this.state;
        const backspace = inputBar.substring(0, inputBar.length - 1)
        this.setState({
            inputBar: backspace,
        })
    }

    handleButton = (event) => {
        const { inputBar } = this.state;
        let novoInput = inputBar + event.target.value;
        this.setState({
            inputBar: novoInput,
        })
    }

    handleWipe = () => {
        this.setState({
            inputBar: ''
        })
    }

    

    handleShow = (iditem) => {
        const {priceShow, tipo, image64, descricao} = this.state
        getPrice(iditem).then((response) => {
                if(response[0].PRECO !== undefined){
                    getImagem(iditem).then((result)=>{
                        if(result == ''){
                            console.log('sem imagem')
                            this.setState({
                                tipo: 'no-image',
                            })
                        }else{
                            console.log('com imagem')
                            this.setState({
                                tipo: 'base64',
                                image64: result,
                            })
                        }
                    })
                    this.setState({
                        priceShow: response[0].PRECO,
                        descricao: response[0].DESCRICAO,
                        inputBar: ''
                    })                    
                }
        })
        .catch((err) => {
            this.setState({
                priceShow: 'Produto não encontrado',
                tipo: 'not-found',
                inputBar: '',
                descricao: '',
            })
        })
    }

    // handleGetImage = (iditem) =>{
    //     const {image64} = this.state;
    //     getImagem(iditem).then((response)=> {
    //         this.setState({
    //             image64: response
    //         })
    //     })
    // }

    render() {
        const { inputBar, priceShow , image64, tipo, descricao } = this.state;
        return (
            <div className="main">
                <Form handleChanged={this.handleChanged}
                    inputBar={inputBar}
                />
                <div className="keypad">
                    <Keypad
                        handleButton={this.handleButton}
                        handleWipe={this.handleWipe}
                        handleDelete={this.handleDelete}
                        handleSearch={this.handleSearch} />
                </div>
                <div className="keypad-line">
                <span ><AlertDialog price={priceShow}
                        handleShow={this.handleShow}
                        iditem={inputBar}
                        handleGetImage={this.handleGetImage}
                        image={image64}
                        tipo={tipo}
                        descricao={descricao}/></span>
                
                </div>


            </div>


        )
    }


}

export default Home;
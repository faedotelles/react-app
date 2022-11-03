import React, { Component } from "react";

// gets
import getPrice from "../services/itemprvda";

// htmls
import Form from "./Form";
import Keypad from "./Keypad";
import AlertDialog from "./Dialog";

// css
import './Main.css';
import './Keypad/Keypad.css'

const Home = class extends Component {
    state = {
        inputBar: '',
        priceShow: '',
        priceAnt: '',
        image64: '',
        tipo: '',
        descricao: '',
    }

    // altera o valor do input não somente como exibição
    handleChanged = (event) => {
        this.setState({
            inputBar: event.target.value,
        });
    }

    // função generica para receber o valor do input quando o mesmo está inacessivel
    handleReturn = () => {
        const { inputBar } = this.state;
        return inputBar
    }

    // deleta o ultimo caracter
    handleDelete = () => {
        const { inputBar } = this.state;
        const backspace = inputBar.substring(0, inputBar.length - 1)
        this.setState({
            inputBar: backspace,
        })
    }

    // adiciona o valor de cada botão no input
    handleButton = (event) => {
        const { inputBar } = this.state;
        let novoInput = inputBar + event.target.value;
        this.setState({
            inputBar: novoInput,
        })
    }

    // limpa input
    handleWipe = () => {
        this.setState({
            inputBar: '',
            tipo: 'blank',
            image64: '',
            priceShow: ''
        })
    }

    // insere numeros através do listener, necessario por desabilitar o input
    handleListen = (key) => {
        const { inputBar } = this.state
        let novoInput = inputBar + key
        if (key !== 'Enter') {
            this.setState({
                inputBar: novoInput,
            })
        }
    }

    // faz todas validações como se existe preço com imagem, imagem com preço, item sem preço
    // handleShow = () => {
    //     const { inputBar } = this.state
    //     if (inputBar !== '') {
    //         getPrice(inputBar).then((response) => {
    //             if (response[0].PRECO !== undefined) {
    //                 getImagem(inputBar).then((result) => {
    //                     if (result === '') {
    //                         this.setState({
    //                             tipo: 'no-image',
    //                         })
    //                     } else {
    //                         this.setState({
    //                             tipo: 'base64',
    //                             image64: result,
    //                         })
    //                     }
    //                 })
    //                 this.setState({
    //                     priceShow: response[0].PRECO,
    //                     priceAnt: response[0].PRECOANT,
    //                     descricao: response[0].DESCRICAO,
    //                     inputBar: ''
    //                 })
    //             }
    //         })
    //             .catch((err) => {
    //                 this.setState({
    //                     priceShow: 'Produto não encontrado',
    //                     tipo: 'not-found',
    //                     inputBar: '',
    //                     descricao: '',
    //                 })
    //             })
    //     }
    // }

    handleShow = () => {
        const {inputBar, priceShow} = this.state;
        getPrice(inputBar).then((response) => {
            console.log(response[0].DESCRICAO)
            if(response[0].PRECO !== 0){
                if(response[1] !== ''){
                    this.setState({
                        tipo: 'base64',
                        image64: response[1],
                    })
                }
                else if (response[1] === '') {
                    this.setState({
                        tipo: 'no-image'
                    })
                }
                this.setState({
                    priceShow: response[0].PRECO,
                    descricao: response[0].DESCRICAO,
                    priceAnt: response[0].PRECOANT,
                    inputBar: '',
                })
            }
        }).catch((err) => {
            {
                this.setState({
                    priceShow: 'Produto não encontrado',
                    tipo: 'not-found',
                    inputBar: '',
                    descricao: '',
                })
            }
        })
    }

    render() {
        const { inputBar, priceShow, priceAnt, image64, tipo, descricao } = this.state;
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
                    />
                </div>
                <div className="keypad-line">
                    <span ><AlertDialog price={priceShow}
                        priceAnt={priceAnt}
                        handleShow={this.handleShow}
                        iditem={inputBar}
                        image={image64}
                        tipo={tipo}
                        descricao={descricao}
                        handleWipe={this.handleWipe}
                        handleListen={this.handleListen}
                        handleReturn={this.handleReturn}
                        handleDelete={this.handleDelete}
                    /></span>
                </div>
            </div>
        )
    }
}

export default Home;
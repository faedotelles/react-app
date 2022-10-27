import React, { Component } from "react";
import Form from "./Form";
import Tarefas from "./Tarefas";

import './Main.css';


export default class Main extends Component {
    state = {
        novaTarefa: '',
        listaTarefas: [],
    };

    handleChanged = (event) => {
        this.setState({
            novaTarefa: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { listaTarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();
        if(listaTarefas.indexOf(novaTarefa) !== -1) return;
        const novasTarefas = [...listaTarefas];
        if(index === -1) {
            if(novaTarefa !== ''){
                this.setState({
                    listaTarefas: [...novasTarefas, novaTarefa],
                    novaTarefa: '',
                })
            } else {
                this.setState({
                    novaTarefa: '',
                })
            }
        } else {
            novasTarefas[index] = novaTarefa;

            this.setState({
                listaTarefas: [...novasTarefas],
                index: -1,



            })
        }
        
        
       
    }

    handleDelete = (event, index) => {
        const {listaTarefas} = this.state;
        const novasTarefas = [...listaTarefas];
        novasTarefas.splice(index, 1);

        this.setState({
            listaTarefas: [...novasTarefas ]
        })
    }
    handleEdit = (event, index) => {
        const { listaTarefas } = this.state;
        this.setState({
            index,
            novaTarefa: listaTarefas[index]
        })

    }

    render() {
        const { novaTarefa, listaTarefas } = this.state;

        return (
            <div className="main">
                <h1>Lista de Tarefas</h1>
                <Form handleSubmit={this.handleSubmit}
                handleChanged={this.handleChanged}
                novaTarefa={novaTarefa}
                 />
                 <Tarefas listaTarefas={listaTarefas}
                 handleDelete={this.handleDelete}
                 handleEdit={this.handleEdit}/>
                

                
            </div>


        )
    }


}
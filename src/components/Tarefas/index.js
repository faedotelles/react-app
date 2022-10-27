import React from "react";
import {FaEdit, FaWindowClose} from 'react-icons/fa'
import PropTypes from 'prop-types';

import './Tarefas.css'


export default function Tarefas({listaTarefas, handleEdit, handleDelete}) {
    return(
        <ul className="tarefas">
                    {listaTarefas.map((tarefa, index) => (
                        <li key={tarefa}>{tarefa}
                            <span>
                                <FaEdit className="edit" onClick={(event) => handleEdit(event, index)}/>
                                <FaWindowClose className="delete" onClick={(event) => handleDelete(event, index)}/>
                            </span></li>
                    ))}
                </ul>
    );
}


Tarefas.propTypes= {
    listaTarefas: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}
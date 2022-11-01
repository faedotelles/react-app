import React from "react";
import './Keypad.css'
import { AiFillDelete } from 'react-icons/ai'
import { FaBackspace} from 'react-icons/fa'
import PropTypes from 'prop-types';

export default function Keypad({ handleButton, handleWipe, handleDelete }) {
    const keys = [];
    var keyAtual = 1;
    for (let i = 1; i <= 4; i++) {
        let keypads = [];
        for (let x = 1; x < 4; x++) {
            if (keyAtual < 10) {
                keypads.push(<button value={keyAtual} onClick={handleButton} className="keys" key={'key' + keyAtual}>{keyAtual}</button>)
            }
            else {
                let keychar = keyAtual === 10 ? <AiFillDelete /> : keyAtual === 12 ? <FaBackspace /> : 0
                let handle = keyAtual === 10 ? handleWipe : keyAtual === 12 ? handleDelete : handleButton;
                keypads.push(<button value={0} onClick={handle} className="keys" key={'key' + keyAtual}>{keychar}</button>)
            }
            keyAtual += 1;
        }
        keys.push(<div key={i} className="keypad-line">{keypads}</div>)
    }
    return <span className="keypad">{keys}</span>
}

Keypad.propTypes = {
    handleButton: PropTypes.func.isRequired,
    handleWipe: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

export default function Form({handleChanged, inputBar}) {
    return (
        <form action="#" className="form" >
            <input onChange={handleChanged}
                type="text"
                value={inputBar} 
                readOnly="readonly"
                placeholder=" Digite o Código"/>
        </form>
    );
}
// Form.defaultProps = {
//     inputBar: 'Valor Padrão',
// }

Form.propTypes = {
    handleChanged: PropTypes.func.isRequired,
    inputBar: PropTypes.string.isRequired,
}


import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './Form.css';

export default function Form({handleSubmit, handleChanged, novaTarefa}) {
    return (
        <form action="#" className="form" onSubmit={handleSubmit}>
            <input onChange={handleChanged}
                type="text"
                value={novaTarefa} />
            <button type="submit"><FaPlus /></button>
        </form>
    );
}

// Form.defaultProps = {
//     novaTarefa: 'Valor Padrão',
// }

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChanged: PropTypes.func.isRequired,
    novaTarefa: PropTypes.string.isRequired,
}


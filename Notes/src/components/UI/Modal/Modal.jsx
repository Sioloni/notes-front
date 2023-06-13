import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

export default function Modal({ popupOpen, togglePopupOpen, children }) {
    return (
        <div onClick={togglePopupOpen} className={popupOpen ? "modal active" : "modal"}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    popupOpen: PropTypes.bool.isRequired,
    togglePopupOpen: PropTypes.func,
    children: PropTypes.element
}

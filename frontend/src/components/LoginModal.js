import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const LoginModal = ({ show, onClose }) => {
    const navigate = useNavigate();

    if (!show) {
        return null;
    }

    const handleLoginClick = () => {
        onClose();
        navigate('/login');
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-wrapper">
                <h2>Please Login</h2>
                <p>Proceed to login to add items to your cart.</p>
                <button className="modal-button" onClick={handleLoginClick}>Login</button>
                <button className="modal-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LoginModal;

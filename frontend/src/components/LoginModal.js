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
                <h5>Please Login</h5>
                <p>Proceed to login to add items to your cart.</p>
                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    <button style={{ height: "30px", width: "100px", border: "none", borderRadius: "5px", backgroundColor: "#2B97A4", color: "white" }} onClick={handleLoginClick}>Login</button>
                    <button style={{ height: "30px", width: "100px", border: "none", borderRadius: "5px", backgroundColor: "#2B97A4", color: "white" }} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

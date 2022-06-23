import React from "react";
import alm from "../images/Alm.svg";
import nr from "../images/Nr.svg";

const InfoTooltip = ({ isOpen, onClose, regState }) => {
    return (
        <div className={`popup ${isOpen && "popup_visible"}`}>
            <div className="popup__container popup__container_tooltip">
                <button
                    type="button"
                    className="popup__btn-close"
                    onClick={onClose}
                ></button>
                <img
                    src={regState ? nr : alm}
                    alt="info"
                />
                <p className="popup__info-message">
                    {regState
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
            </div>
        </div>
    );
};

export default InfoTooltip;
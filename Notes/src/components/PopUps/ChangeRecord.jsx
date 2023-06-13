import React, {useState} from 'react';
import Select from "react-select";
import PropTypes from "prop-types";
import axios from "axios";
import {baseURL, getData} from "../../FetchData/imports.jsx";

import Modal from "../UI/Modal/Modal.jsx";
import './addrecord.css';


export default function ChangeRecord({ popupOpen, togglePopupOpen, setPosts, selectedRecord}) {
    const options = [{
        value: 'info',
        label: 'Info'
    },
    {
        value: 'danger',
        label: 'Danger'
    },
    {
        value: 'warning',
        label: 'Warning'
    }
    ];

    const data = {
        title: "",
        text: "",
        tags: [],
        recordIds: []
    };
    const [inputData, setInputData] = useState(selectedRecord || data);

    const handleInput = (event) => {
        setInputData({...inputData, [event.target.name]: event.target.value});
    }
    function handleSubmit(event){
        if (window.confirm(`Вы уверены что хотите изменить запись: ${selectedRecord.title}`)) {
            event.preventDefault()
            setCurrentTags(['']);
            setInputData(data);
            inputData.tags = [...inputData.tags, ...currentTags]
            axios.put(baseURL + selectedRecord.id, inputData)
                .then(response => {
                    console.log(`Резульат: ${response}`)
                    getData(setPosts)
                })
                .catch(err => console.log(`ОШИБКА: ${err}`))
        }
    }

    const [currentTags, setCurrentTags] = useState(inputData.tags || ['']);
    let isMulti = true;
    const getValue = () => {
        if(currentTags) {
            return isMulti
                ? options.filter(tag => currentTags.indexOf(tag.value) >= 0)
                : options.find(tag => tag.value === currentTags)
        } else {
            return isMulti ? []  : '';
        }
    };


    const onChange = (newValue) => {
        setCurrentTags(isMulti ? newValue.map(v => v.value) : newValue.value);
    }

    return (
        <Modal popupOpen={popupOpen} togglePopupOpen={togglePopupOpen}>
            <div className="popup-container">
                <h1 className="popup-title">Изменить запись</h1>
                <form onSubmit={handleSubmit} className='popup-form'>
                    <input onChange={handleInput}
                           name="title"
                           value={inputData.title}
                           type="text"
                           placeholder={`Измените название: ${selectedRecord ? selectedRecord.title : ''}`}
                           required
                    />
                    <input onChange={handleInput}
                           name="text"
                           value={inputData.text}
                           type="text"
                           placeholder={`Измените коллекцию: ${selectedRecord ? selectedRecord.text : ''}`}
                           required
                    />
                    <Select onChange={onChange} value={getValue()} options={options} isMulti={isMulti}
                            placeholder='Выберите тэги' />
                    <button onClick={togglePopupOpen}>Изменить запись</button>
                </form>
            </div>
        </Modal>
    );
}

ChangeRecord.propTypes = {
    popupOpen: PropTypes.bool.isRequired,
    togglePopupOpen: PropTypes.func,
    setPosts: PropTypes.func,
    selectedRecord: PropTypes.object
}

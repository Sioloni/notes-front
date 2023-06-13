import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Select from 'react-select';

import { baseURL, getData } from "../../FetchData/imports";
import Modal from "../UI/Modal/Modal.jsx";
import './addrecord.css';

export default function AddRecord({ popupOpen, togglePopupOpen, posts, setPosts }) {
    const options = [
        {
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

    const content = {
        title: "",
        text: "",
        tags: [],
        recordIds: []
    };
    const [inputData, setInputData] = useState(content);

    const handleInput = (event) => {
        setInputData({ ...inputData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCurrentTags(['']);
        setInputData(content);
        inputData.tags = [...inputData.tags, ...currentTags]
        inputData.recordIds= [...inputData.recordIds, ...currentRecordIds]

        axios.post(baseURL, inputData)
            .then(response => {
                console.log(`Резульат: ${response}`)
                getData(setPosts)
            })
            .catch(err => console.log(`ОШИБКА: ${err}`))
    }

    const [currentTags, setCurrentTags] = useState([]);
    const [currentRecordIds, setCurrentRecordIds] = useState([]);

    let isMulti = true;
    const getTagValue = () => {
        return isMulti
            ? options.filter(tag => currentTags.indexOf(tag.value) >= 0)
            : options.find(tag => tag.value === currentTags)
    };

    const getRecordIdValue = () => {
        return isMulti
            ? posts.filter(post => currentRecordIds.includes(post.id))
            : posts.find(post => post.id === currentRecordIds);
    };
    const handleTagChange = (newValue) => {
        setCurrentTags(isMulti ? newValue.map(v => v.value) : newValue.value);
    }

    const handleRecordIdChange = (newValue) => {
        setCurrentRecordIds(isMulti ? newValue.map(v => v.value) : newValue.value);
    };
    const recordOptions = posts.map(post => ({
        value: post.id,
        label: post.title
    }));


    useEffect(() => {
        setCurrentTags([]);
        setCurrentRecordIds([]);
    }, [popupOpen]);

    return (
        <Modal popupOpen={popupOpen} togglePopupOpen={togglePopupOpen}>
            <>
                <div className="popup-container">
                    <h1 className="popup-title">Создать запись</h1>
                    <form onSubmit={handleSubmit} className='popup-form'>
                        <input onChange={handleInput} name="title" value={inputData.title} type="text" placeholder='Введите название' required />
                        <input onChange={handleInput} name="text" value={inputData.text} type="text" placeholder='Введите коллекцию' required />
                        <textarea placeholder="Описание:"></textarea>
                        <Select onChange={handleTagChange} value={getTagValue()} options={options} isMulti={isMulti} placeholder='Выберите тэги' />
                        <Select onChange={handleRecordIdChange} value={getRecordIdValue()} options={recordOptions} isMulti={isMulti} placeholder='Выберите связь' />
                        <button onClick={togglePopupOpen}>Создать запись</button>
                    </form>
                </div>
            </>
        </Modal>
    );
}

AddRecord.propTypes = {
    popupOpen: PropTypes.bool.isRequired,
    togglePopupOpen: PropTypes.func,
    posts: PropTypes.array,
    setPosts: PropTypes.func
}

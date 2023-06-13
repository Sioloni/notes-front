import React, {useEffect, useState} from 'react';
import {getRecord} from "../../FetchData/imports.jsx";
import {useParams} from "react-router-dom";

import './record.css';

export default function Record() {
    const [post, setPost] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        getRecord(id, setPost)
    },[])
    console.log(post)
    return (
        <div className='container__record'>
            <h1>Название записи: {post.title}</h1>
            <p>Коллекция: {post.text}</p>
            <p>Дата и время создания: {new Date(post.date).toLocaleString("ru-RU")}</p>
            <span>Тэги: {post.tags && post.tags.join(', ')}</span>
        </div>
    );
}

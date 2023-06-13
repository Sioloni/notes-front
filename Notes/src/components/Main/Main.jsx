import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {getData} from "../../FetchData/imports.jsx";

import ContentTable from '../Content/ContentTable.jsx';
import AddRecord from "../PopUps/AddRecord.jsx";
import ContentList from "../Content/ContentList.jsx";
import './main.css';
import ContentTree from "../Content/ContentTree.jsx";


export default function Main({ popupOpen, togglePopupOpen }) {
    const [posts, setPosts] = useState([]);
    const [view, toggleView] = useState(0);

    function betterToggleState() {
        toggleView((prevState) => (prevState + 1) % 3);
    }

    useEffect(() => {
        getData(setPosts)
    }, [])

    return (
        <main>
            <textarea placeholder='Поле комментария для данного пространства записей, здесь обычно пишут что это, зачем, для кого и т.д... &#13;&#10;Оно может быть заполнено оставлено пустым'></textarea>
            <ul className="tabs">
                <li>Заметки</li>
            </ul>
            <div className="content-settings">
                <div className='content-settings__nav'>
                    <div className="content-settings__nav-view">
                        Отображение: <br />
                        {
                            view === 0 ? 'Таблица' :
                            view === 1 ? 'Диаграмма' : 'Список'
                        }
                    </div>
                    <div className="content-settings__nav-options" onClick={() => betterToggleState()}>...</div>
                </div>
                <button onClick={togglePopupOpen} className='content-settings__create'>Создать</button>
            </div>
            {
                view === 0 ? <ContentTable data={posts} setPosts={setPosts} /> :
                view === 1 ? <ContentTree data={posts}/> : <ContentList data={posts} />
            }
            <AddRecord posts={posts} setPosts={setPosts} popupOpen={popupOpen} togglePopupOpen={togglePopupOpen}/>
        </main>
    )
}

Main.propTypes = {
    popupOpen: PropTypes.bool.isRequired,
    togglePopupOpen: PropTypes.func
}
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useToggle} from "../../hooks/useToggle.jsx";
import {deleteRecord} from "../../FetchData/imports.jsx";
import ChangeRecord from "../PopUps/ChangeRecord.jsx";
import { NavLink } from "react-router-dom";

import './content.css';
export default function ContentTable({ data, setPosts }) {
const [popupOpen, togglePopupOpen] = useToggle(false);
const [selectedRecord, setSelectedRecord] = useState(null);
    return (
        <>
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Коллекция</th>
                <th>Теги</th>
                <th>Связанное</th>
                <th>Дата создания</th>
                <th>+</th>
                <th>...</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((item) =>
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/record/${item.id}`}>
                                {item.title}
                            </NavLink>
                        </td>
                        <td>{item.text}</td>
                        <td>
                            {
                                item.tags.map((tag, indexTag) =>
                                    <span className={`table-tags table-tags_${tag}`} key={indexTag}>Тэг {tag}</span>)
                            }
                        </td>
                        <td>
                            {
                                item.recordIds.map((id, indexId) =>
                                    <span className='table-records'  id={`id-${item.title[0]}`} key={indexId}>Связаная {id === data.map(e=> e.id) ? data.map(e=> e.title) : id}</span>)
                            }
                        </td>
                        <td>{new Date(item.date).toLocaleString("ru-RU")}</td>
                        <td onClick={() => {
                            setSelectedRecord(item);
                            togglePopupOpen();
                        }} className='table-change'>Изменить</td>
                        <td onClick={() => deleteRecord(item, setPosts)} className='table-delete'>Удалить</td>
                    </tr>
                )
            }
            </tbody>
        </table>
                <ChangeRecord setPosts={setPosts}
                              popupOpen={popupOpen}
                              togglePopupOpen={togglePopupOpen}
                              selectedRecord={selectedRecord}
                />
    </>
    )
}

ContentTable.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
    setPosts: PropTypes.func
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useToggle } from '../../hooks/useToggle';

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Record from "../Pages/Record.jsx";
import NotFound from "../Pages/NotFound.jsx";
import './wrapper.css';

export default function Wrapper() {
    const [sidebarOpen, toggleSidebarOpen] = useToggle(false);
    const [popupOpen, togglePopupOpen] = useToggle(false);


    return (
        <Router>
            <div className='layout'>
                <Sidebar isOpen={sidebarOpen} />
                <div className="wrapper" >
                    <Navbar isOpen={sidebarOpen} toggleIsOpen={toggleSidebarOpen} />
                    <Routes>
                        <Route exact path="/"
                               element=
                                   {
                                        <Main
                                               popupOpen={popupOpen}
                                               togglePopupOpen={togglePopupOpen}
                                        />
                                    }
                        />
                        <Route path="/record/:id" element={<Record />}/>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

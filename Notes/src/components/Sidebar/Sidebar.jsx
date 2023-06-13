import React from 'react';
import PropTypes from 'prop-types';
import './sidebar.css';

export default function Sidebar({isOpen}) {
  return (
    <div className='sidebar-wrapper' style={{width:  !isOpen ? '0' : '200px'}}>
      <div className='sidebar-logo' style={{display: !isOpen ? 'none' : 'block'}}><a href="/">Notes</a></div>
      <div className='sidebar-content'>
        <ul className='sidebar-content__list' style={{display: !isOpen ? 'none' : 'block'}}>
          <a href="/"><li className='sidebar-content__list-items'>Заметки</li></a>
          <a href="/"><li className='sidebar-content__list-items'>Пространство записей</li></a>
          <a href="/"><li className='sidebar-content__list-items'>Вложения</li></a>
          <a href="/"><li className='sidebar-content__list-items sidebar-content__list-items_disable'>+ Создать новое пространство</li></a>
        </ul>
        <ul className='sidebar-content__settings' style={{display: !isOpen ? 'none' : 'block'}}>
          <a href=""><li className='sidebar-content__settings-items'>Личный кабинет</li></a>
          <a href=""><li className='sidebar-content__settings-items'>Настройки</li></a>
          <a href=""><li className='sidebar-content__settings-items'>Помощь</li></a>
        </ul>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
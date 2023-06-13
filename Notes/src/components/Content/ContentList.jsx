import React from 'react';
import PropTypes from 'prop-types';
import { useToggle } from "../../hooks/useToggle.jsx";
import './content.css';

export default function ContentList({ data }) {
    const [dropDown, toggleDropDown] = useToggle(true);

    return (
        <div className='container'>
            {data.map((elems, index) => (
                <div key={index} className="container__item">
          <span
              style={{ transform: dropDown ? 'rotate(45deg)' : 'rotate(135deg)' }}
              className="item__arrow"
              onClick={toggleDropDown}
          />
                    <div className="item__title">{elems.title}</div>
                    <div className="item__caption">
                        <div className="item__caption-collection">{elems.text}</div>
                        <div className="item__caption-tags">
                            {elems.tags.map((tag, indexTag) => (
                                <span className={`table-tags table-tags_${tag}`} key={indexTag}>Тэг {tag}</span>
                            ))}
                        </div>
                    </div>
                    {elems.recordIds.map((record, indexRecord) => {
                        <ContentList key={indexRecord} data={record} />
                    })}
                </div>
            ))}
        </div>
    );
}

ContentList.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ])
}
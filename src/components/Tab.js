import React from 'react';

function Tab({activeTab, label, onClick}) {
    function onClickHandler() {
        onClick(label);
    }

    let className = 'tab-list-item';

    if (activeTab === label) {
        className += ' tab-list-active';
    }

    return (
        <li className={className} onClick={onClickHandler}>
            {label}
        </li>
    );
}

export default Tab;

import React, {useState} from 'react';
import Tab from './Tab';
import styled from "styled-components";

const TabsStyles = styled.div`
  .tab-list {
    border-top: 1px solid rgba(0,0,0,.1);
    border-bottom: 1px solid rgba(0,0,0,.1);
    list-style: none;
    display: flex;
    li {
      color: #afafaf;
      text-transform: uppercase;
      font-size: 1.1rem;
      font-family: Helvetica, sans-serif;
      padding: 15px 25px;
      cursor: pointer;
    }
    .tab-list-active {
      border-bottom: 2px solid #0d6efd;
      color: #0d6efd;
    }
  }
  .tab-content {
    padding: 20px;
  }
`;

function Tabs({children}) {
    const [activeTab, setActiveTab] = useState(children[0].props.label);


    function onClickTabItem(tab){
        setActiveTab(tab);
    }

    return (
        <TabsStyles>
            <ul className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ul>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </TabsStyles>
    );
}

export default Tabs;

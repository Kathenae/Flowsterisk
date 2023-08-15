import React, { useState, ReactNode } from 'react';

export type TabbedPaneElement = React.ReactElement<TabsProp>;

interface TabsProp {
  children: ReactNode;
}


interface Panel {
  name: string;
  children: ReactNode;
}


function Tabs({children} : TabsProp){
   const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className='flex border-b-1 border-gray-300 text-sm max-w-full scrollable overflow-x-auto'>
        {React.Children.map(children, (child, index) => {
          const tab = child as React.ReactElement<Panel>;
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`py-2 px-4 bg-transparent font-semibold ${index === activeTab && 'border-b-6 border-green-500'}`}
            >
              {tab.props.name}
            </button>
          )
        })}
      </div>

      <div className={`mt-2 max-h-[calc(100vh_-_110px)] overflow-auto scrollable px-2`}>
        {React.Children.toArray(children)[activeTab]}
      </div>
    </>
  )
}

function Panel({children} : Panel) {
  return (
    <>
      {children}
    </>
  )
}

Tabs.Panel = Panel

export default Tabs
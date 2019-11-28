import React, { useState } from 'react'

export function Tabs ({ style, items, className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const classes = 'flex flex-no-shrink items-center justify-center font-bold no-underline px-6 py-3 text-base text-center whitespace-no-wrap hover:bg-blue hover:text-white transition-colors decorator-separator-left--unHover'

  return <div className={`tabs ${className}`} style={style}>
    <nav className="list-reset text-gray-light">
      <div className="decorator-border-bottom-after">
        <div className="flex h-full mx-auto overflow-hidden">
          {
            items
              .map((item, index) => {
                return (
                  <div
                    style={{ 'cursor': 'pointer' }}
                    key={index}
                    title={item.title}
                    className={`${classes} ${activeIndex === index ? 'bg-blue text-white' : 'text-gray-darker'}`}
                    onClick={() => setActiveIndex(index)}>
                    {item.icon && <i className={item.icon}/>}
                    {item.label}
                  </div>
                )
              })
          }
        </div>
      </div>
    </nav>
    <div>
      {items.map(({ children }, index) => {
        return <div className="pt-2" key={index} style={{ display: index === activeIndex ? 'block' : 'none' }}>
          {children}
        </div>
      })}
    </div>
  </div>
}

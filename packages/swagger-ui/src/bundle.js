import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import SwaggerUI from './swaggerui/swaggerui.component'

window.CmSwaggerUI = (id, config) => {
  ReactDOM.render(() => {
    return <div className="App">
      <SwaggerUI {...config}/>
    </div>
  }, document.getElementById(id))
}

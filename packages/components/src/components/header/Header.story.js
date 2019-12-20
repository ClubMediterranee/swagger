import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { Header } from './Header'
import { ReactComponent as User } from '../../statics/svg/user.svg'
import { Icon } from '../icon/Icon'

storiesOf('Components/Header', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () => (
    <div className="p-4 w-screen">
      <MemoryRouter>
        <div>
          <Header
            title={text('title', 'Clubmed')}
            iconSize={text('iconSize', '1.3rem')}
            height={text('height', '60px')}
            border={boolean('border', true)}>
            <ul
              aria-label="ClubMed main navigation"
              className="reset-list flex"
              role="menubar"
              style={{ flex: '1 1 auto' }}>
              <li className="flex items-stretch">
                <span
                  className="reset-anchor cursor-pointer flex font-sans font-bold items-center px-4 relative text-gray-darker">
                  Quentin de Saint Steban
                </span>
              </li>
            </ul>
            <div className="flex flex-no-shrink relative">
              <span
                className='reset-button cursor-pointer flex items-center px-4 relative focus:text-blue hover:text-blue text-gray-darker'>
                <Icon svg={User} width='1.5rem'/>
              </span>
            </div>
          </Header>

          <h1>Welcome</h1>
        </div>
      </MemoryRouter>
    </div>
  ))

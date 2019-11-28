import { configure } from '@storybook/react'
import { initializeRTL } from 'storybook-addon-rtl'
import '@clubmed/components'

// automatically import all files ending in *.story.js
const req = require.context('@clubmed/components/src', true, /.story.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

initializeRTL()

configure(loadStories, module)

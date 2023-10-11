import {dirname} from 'path'
import preset from '@clubmed/ui/tailwind.preset'
const config = {
  presets: [
    preset
  ],
  content: [
    './src/**/*.{ts,tsx}',
    `${dirname(require.resolve('@clubmed/ui'))}/{assets,atoms,contexts,molecules}/**/*.{ts,tsx}`
  ]
}

export default config

import type { FC } from 'react'
import './index.css'

const currentYear: number = new Date().getFullYear()

export const Footer: FC = () => (
  <footer>
    <p>&copy; Jana Chaloupková 2021 - {currentYear}</p>
  </footer>
)

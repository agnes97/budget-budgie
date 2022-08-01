import type { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { Home } from 'pages/Home'
import { NotFoundPage } from 'pages/NotFoundPage'

const Routes: FC = () =>
  useRoutes([
    { path: '/', element: <Home /> },

    // 404 PAGE NOT FOUND
    { path: '*', element: <NotFoundPage /> },
  ])

export const App: FC = () => <Routes />

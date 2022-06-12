import type { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from 'pages/Home'

const Routes: FC = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
)

export const App: FC = () => <Routes />

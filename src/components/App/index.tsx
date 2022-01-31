import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import '../../themes/global.css'
import '../../themes/variables.css'

import Home from 'pages/Home'

const Routes: FC = () => (
	<Switch>
		<Route path="/" component={Home} />
	</Switch>
)

const App: FC = () => (
    <Routes />
)

export default App
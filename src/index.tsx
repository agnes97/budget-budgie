import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from 'components/App'
import { UserProvider } from 'contexts/User'
import { GlobalStyles } from 'themes/global'
import { reportWebVitals } from 'utils/reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GlobalStyles />
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

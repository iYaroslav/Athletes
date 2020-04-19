import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import './index.less'
import Logo from './components/judo-logo'
import registerServiceWorker from './registerServiceWorker'

const render = Component => ReactDOM.render(<React.Fragment>
  <Component />
  <Logo />
</React.Fragment>, document.getElementById('root'))

render(App)
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./components/app', () => {
    console.clear()
    const NextApp = require('./components/app').default
    render(NextApp)
  })
}

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import './index.less'
import Logo from "./components/judo-logo"
import registerServiceWorker from './registerServiceWorker'

console.log(`
_____/\\\\\\\\\\\\\\______________________/\\\\\\\\\\\\\\_________/\\\\\\_
 ___/\\\\\\/////\\\\\\__________________/\\\\\\/////\\\\\\___/\\\\\\\\\\\\\\_
  __/\\\\\\____\\//\\\\\\________________/\\\\\\____\\//\\\\\\_\\/////\\\\\\_
   _\\/\\\\\\_____\\/\\\\\\__/\\\\\\____/\\\\\\_\\/\\\\\\_____\\/\\\\\\_____\\/\\\\\\_
    _\\/\\\\\\_____\\/\\\\\\_\\///\\\\\\/\\\\\\/__\\/\\\\\\_____\\/\\\\\\_____\\/\\\\\\_
     _\\/\\\\\\_____\\/\\\\\\___\\///\\\\\\/____\\/\\\\\\_____\\/\\\\\\_____\\/\\\\\\_
      _\\//\\\\\\____/\\\\\\_____/\\\\\\/\\\\\\___\\//\\\\\\____/\\\\\\______\\/\\\\\\_
       __\\///\\\\\\\\\\\\\\/____/\\\\\\/\\///\\\\\\__\\///\\\\\\\\\\\\\\/_______\\/\\\\\\_
        ____\\///////_____\\///____\\///_____\\///////_________\\///__
                            LeeryBit LLC`)

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

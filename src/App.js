import Login from './Pages/Login'
import Register from './Pages/Register'

import Components from './Pages/Components'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'

function App() {

  return(
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/main" component={Components}/>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    
  )
}

export default App
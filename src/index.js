import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker'
import store from './redux/store'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const render = () => ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>, 
  document.getElementById('root')
)
render()
store.subscribe(render)
// store.dispatch(fetchMovies())
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

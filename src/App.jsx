
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components/auth/components/LoginForm'
import { AppRouter } from './router/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App

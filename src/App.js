import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import Layout from './components/Layout'
import Signup from './components/Signup'

// import Sidebar from './components/Sidebar';
import Login from './components/Login'
import Logout from './components/Logout'

const theme = createTheme({
  palette: {
    secondary: blue
  },
  typography: {
    fontFamily: 'Asap',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {  
  return (
    // <div className='App'>
    //   <Login />
    // </div>
    <ThemeProvider theme={theme}>
    {/* <Sidebar /> */}
    <Router>
      <Layout>
        <Switch>
            <Route exact path="/notes">
              <Notes />
            </Route>
              <Route path="/create">
                <Create />
              </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/logout">
              <Logout />/
            </Route>
            <Route path="/">
              <Login />
            </Route>
        </Switch>
      </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;
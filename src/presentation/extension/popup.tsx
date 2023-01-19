import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { Route, Routes, Router } from '@solidjs/router'
import '../../main/styles/global.css'

const Home = lazy(() => import('../pages/home'))
const PageNotFound = lazy(() => import('../pages/page-not-found'))

const App = () => {
    return (
      <div>
         <header>
            
         </header>
         <main>
            <Routes>
              <Route path={['/popup.html', '/', '/index.html']} element={Home} />
              <Route path='*' element={PageNotFound} />
            </Routes>
         </main>
         <footer>
            
         </footer>
      </div>
    )
}

document.body.id = 'image-tracker-html'
const root = document.createElement('div')
const portal = document.createElement('div')
portal.id = 'portal'
root.id = 'root'

document.body.prepend(portal)
document.body.append(root)

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root') as HTMLElement)
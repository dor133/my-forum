import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Tuto } from './entities/tuto'
import { Home } from './entities/home'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/tuto" element={<Tuto />}></Route>
        </Routes>
    )
}

export default App

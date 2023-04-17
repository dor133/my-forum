import { Route, Routes } from 'react-router-dom'
import { Tuto } from './entities/tuto'
import { Home } from './entities/home'
import { Post } from './entities/post'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tuto" element={<Tuto />} />
            <Route path="/posts/:id" element={<Post />} />
        </Routes>
    )
}

export default App

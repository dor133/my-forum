import { Route, Routes } from 'react-router-dom'
import { Tuto } from './entities/tuto'
import { Home } from './entities/home'
import { Post } from './entities/post'
import { LogIn } from './entities/logIn'
import { Register } from './entities/register'
import { NewPost } from './entities/newPost'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tuto" element={<Tuto />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default App

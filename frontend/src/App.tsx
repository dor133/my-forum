import { Route, Routes } from 'react-router-dom'
import { Tuto } from './entities/tuto'
import { Home } from './entities/home'
import { Post } from './entities/post'
import { LogIn } from './entities/logIn'
import { Register } from './entities/register'
import { NewPost } from './entities/newPost'
import { Profile } from './entities/profile'
import { ProtectedRoute } from './services/protectedRoute'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tuto" element={<Tuto />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route
                path="/posts/new"
                element={
                    <ProtectedRoute>
                        <NewPost />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default App

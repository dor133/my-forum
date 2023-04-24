import { Route, Routes } from 'react-router-dom'
import { Tuto } from './entities/tuto'
import { Home } from './entities/home'
import { Post } from './entities/posts/post'
import { LogIn } from './entities/users/logIn'
import { Register } from './entities/users/register'
import { NewPost } from './entities/posts/newPost'
import { Profile } from './entities/users/profile'
import { ProtectedRoute } from './entities/security/protectedRoute'
import { ModifyPost } from './entities/posts/modifyPost'
import { Header } from './entities/header'

function App() {
    return (
        <>
            <Header />
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
                <Route
                    path="/posts/:id/modify"
                    element={
                        <ProtectedRoute>
                            <ModifyPost />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default App

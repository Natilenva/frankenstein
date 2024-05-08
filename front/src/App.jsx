//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'

//* components q siempre se ven
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProjectPage } from './pages/ProjectPage'
import { QuestionPage } from './pages/QuestionPage'
import { NotFoundPage } from './pages/NotFoundPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
    //const [count, setCount] = useState(0)

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/project/:id" element={<ProjectPage />} /> 

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/question/:id" element={<QuestionPage />} />

                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />

        </>
    )
}

export default App

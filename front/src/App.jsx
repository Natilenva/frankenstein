import './App.css';

import { Routes, Route } from 'react-router-dom';
//* components q siempre se ven

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ProjectPage } from './pages/ProjectPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';
import QuestionsPage from './pages/QuestionsPages/QuestionsPage';
import QuestionDetailsPage from './pages/QuestionsPages/QuestionDetailsPage';
import NewQuestionPage from './pages/QuestionsPages/NewQuestionPage';
import { CuentaPage } from './pages/CuentaPage';
import { NewProfile } from './components/ProfileComponents/NewProfile';
import { Crear } from './pages/CrearPage';
import { ProjectsPage } from './pages/ProjectsPage';
import ResponsesOfQuestion from './components/ResponsesComponents/ResponsesOfQuestion';
import { ValidatePage } from './pages/ValidatePage';
import { UpdatePassword } from './pages/UpdatePassword';
import { ValidateCompanyPage } from './pages/ValidateCompanyPage';
import { RejectCompanyPage } from './pages/RejectCompanyPage';
// import { useContext, useEffect } from 'react';
// import { AuthContext } from './context/AuthContext';
function App() {
    //const [count, setCount] = useState(0)
    // const { token, user } = useContext(AuthContext);
    // const navigate = useNavigate();
    // console.log('Antes de useEffect', user);
    // useEffect(() => {
    //     console.log({ token, user });
    //     if (token && user && !user.profile_id) {
    //         navigate('/newprofile');
    //     }
    // }, [token, user, navigate]);

    return (
        <>
            <Toaster position="bottom-right" />
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/validate/:registrationCode"
                    element={<ValidatePage />}
                />
                <Route
                    path="/admin/validate/:id"
                    element={<ValidateCompanyPage />}
                />
                <Route
                    path="/admin/reject/:id"
                    element={<RejectCompanyPage />}
                />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/crear" element={<Crear />} />
                {/* <Route path="/" element={<ProjectPage />} /> */}

                <Route path="/profile/:id" element={<CuentaPage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/question/:id" element={<QuestionDetailsPage />} />

                <Route
                    path="/responses/:id"
                    element={<ResponsesOfQuestion />}
                />

                <Route path="/newprofile" element={<NewProfile />} />
                <Route path="/updatepassword" element={<UpdatePassword />} />

                <Route
                    path="/questions/newquestion"
                    element={<NewQuestionPage />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/reset-password/:id/:token"
                    element={<ResetPasswordPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;

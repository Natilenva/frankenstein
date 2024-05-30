import './App.css';
import { Routes, Route } from 'react-router-dom';
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
// import { NewProfile } from './components/ProfileComponents/NewProfile';
import { Crear } from './pages/CrearPage';
import { ProjectsPage } from './pages/ProjectsPage';
import ResponsesOfQuestion from './components/ResponsesComponents/ResponsesOfQuestion';
import { ValidatePage } from './pages/ValidatePage';
import { UpdatePassword } from './pages/UpdatePassword';
import { ValidateCompanyPage } from './pages/ValidateCompanyPage';
import { RejectCompanyPage } from './pages/RejectCompanyPage';

import { UpdateProfile } from './components/ProfileComponents/UpdateProfile';
import { ProfilePublic } from './pages/ProfilePublic';

// import { UpdateProject } from './components/UpdateProject';
import { ProjectUpdatePage } from './pages/ProjectUpdatePage';

import { NewProfilePage } from './pages/NewProfilePage';

function App() {
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
                <Route
                    path="/updateproject/:id"
                    element={<ProjectUpdatePage />}
                />
                <Route path="/profilepublic/:id" element={<ProfilePublic />} />
                <Route path="/crear" element={<Crear />} />

                <Route path="/profile/:id" element={<CuentaPage />} />
                <Route path="/profileupdate" element={<UpdateProfile />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/question/:id" element={<QuestionDetailsPage />} />

                <Route
                    path="/responses/:id"
                    element={<ResponsesOfQuestion />}
                />

                {/* <Route path="/newprofile" element={<NewProfile />} /> */}
                <Route path="/newprofile" element={<NewProfilePage />} />
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

import { useState } from 'react';
import Cookies from 'js-cookie';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import {usePopup} from "../../components/Popup/PopupContext.jsx";
import tor from '/src/assets/LoginTor.png'
import logo from "/src/assets/TonyByLogo.png"
import {useLoginSuperAdminMutation} from "../../services/adminApi.jsx";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const showPopup = usePopup();
    const [loginSuperAdmin, { isLoading, error }] = useLoginSuperAdminMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await loginSuperAdmin({ email , password });

            if ('data' in response) {
                const { token } = response.data.data;

                Cookies.set('superAdminToken', token);

                showPopup('Giriş uğurludur', 'Sistemə daxil oldunuz', 'success');
                setEmail('')
                setPassword('')
                navigate('/admin/companies');
            } else {
                showPopup('Giriş uğursuz oldu', 'Məlumatları yoxlayın.', 'error');
            }
        } catch (err) {
            console.error(err);
            showPopup('Xəta baş verdi', 'Sistem daxil olarkən problem oldu.', 'error');
        }
    };

    return (
        <div id="login">
            <img src={tor} alt="Tor" className={"tor"}/>
            <div className={'logo'}>
                <img src={logo} alt="Logo" className={"logo"}/>
            </div>
            <div className="login-panel">
                <div>
                    <div className="login-form">
                        <div className="title">
                            <h1>Sistemə daxil olun</h1>
                            <p>
                                Sistemdəki məlumatlara çıxış üçün hesabınıza daxil olun.                            </p>
                        </div>

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="Emailinizi daxil edin"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group password-group">
                                <label>Şifrə</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Şifrəni gizlə' : 'Şifrəni göstər'}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="submit" disabled={isLoading}>
                                {isLoading ? 'Yoxlanılır...' : 'Giriş et'}
                            </button>



                        </form>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="copyRight">
                    <p>Copyright@2025</p>
                </div>
                <div className="terms">
                    <p>Sistemə giriş yalnız icazəl şəxslər üçün mümkündür.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
import React from 'react'
import { useState } from 'react'
import logo from '../logo.png'
function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userID, setUserID] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function login(e) {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            u => u.userId === userID && u.username === username && u.password === password
        );
        if (user) {
            // נקה קבצים זמניים של משתמש קודם
            const oldUser = localStorage.getItem('currentUser')
            if (oldUser) {
                const oldUserId = JSON.parse(oldUser).userId
                if (oldUserId !== user.userId) {
                    localStorage.removeItem(`tempFiles_${oldUserId}`)
                }
            }
            
            // וידוא שיש savedFiles
            if (!user.savedFiles) {
                user.savedFiles = [];
                const userIndex = users.findIndex(u => u.userId === user.userId);
                users[userIndex] = user;
                localStorage.setItem("users", JSON.stringify(users));
            }
            localStorage.setItem("currentUser", JSON.stringify(user));
            props.onUserLogin()
            props.showLoginPage(false)
            props.showSignupPage(false)
            return;
        }
        else {
            setErrorMessage('משתמש לא נמצא במערכת')
            setTimeout(() => {
                setErrorMessage('')
                props.showLoginPage(false)
                props.showSignupPage(true)
            }, 1500)
        }
    }

    return (
        <div className="app-container">
           
            
            <div className="text-area-full">
                <div style={{width: '100%', maxWidth: '900px', padding: '20px', minHeight: '500px', display: 'flex', alignItems: 'center', background: 'transparent'}}>
                    <form onSubmit={login} className="login-form">
                        <img src={logo} alt="לוגו" className="form-logo" />
                        <h1 className="form-title">התחברות למערכת</h1>
                        <div className="form-group">
                            <label className="form-label">:תעודת זהות</label>
                            <input
                                className="form-input"
                                type="text"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">:שם משתמש</label>
                            <input
                                className="form-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">:סיסמה</label>
                            <div className="password-input-container">
                                <input
                                    className="form-input password-input"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" className="signup-button">התחבר</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <span className="auth-link-inside" onClick={() => { props.showLoginPage(false); props.showSignupPage(true) }}>הרשמה</span>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login
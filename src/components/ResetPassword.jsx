import React, { useState } from 'react'
import { useParams } from "react-router-dom";


function ResetPassword() {


    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password/${token}`, {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ password: newPassword })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Password reset successful !");
                setTimeout(() =>{
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(data.error || "Reset failed")
            }
        }
        catch (error) {
            setMessage("Server.error: " + error.message);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <input type="password" placeholder='New Password' value={newPassword} onChange={handleChange}
                required />

            <button type='submit'> Reset Password</button>
            <p>{message}</p>
        </form>
    )

}

export default ResetPassword;

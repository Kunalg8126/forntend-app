import React, { useState } from "react"
import { use } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './stylesheet/Login.css'

const Login = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        try {
            const res = await fetchfetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                navigate('/profile');
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            alert("Server error: " + error.message);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInput} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleInput} />
            </label>
            <button type="submit">Login</button>
            <p>
                 Forgot your password? <Link to="/forgot-password">Reset Here</Link>
            </p>
        </form>
    );
};


export default Login;

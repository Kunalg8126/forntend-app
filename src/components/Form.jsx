import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import './stylesheet/Form.css'


const Form = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [otpSent, setOtpSent] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);


    useEffect(() => {
        let countdown;
        if (resendTimer > 0) {
            countdown = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);


    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const handleGenerateOtp = async () => {
        if (!formData.email) {
            alert("please enter your email first");
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-otp`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await res.json();

            if (res.ok) {
                alert("OTP sent successfully");
                setOtpSent(true);
                setCanResend(false);
                setResendTimer(60);
                alert("OTP send successfully");
            } else {
                alert(data.error || "failed to send OTP")
            }

            if (data.error === "User already register") {
                setFormData({ ...formData, email: "" });
                setOtpSent(false);
                setEnteredOtp("")
                setOtpVerified(false);
            }

        }
        catch (err) {
            alert("Server error: ", err.message);
        }

    }

    const handleVerifyOtp = async () => {
        if (!enteredOtp) {
            alert("Please enter the OTP");
            return;
        }

        try {
            const res = await fetch(`https://classifyapp.onrender.com/api/verify-otp`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp: enteredOtp })
            });

            const data = await res.json();

            if (res.ok) {
                alert("OTP verified successfuly");
                setOtpVerified(true);
            } else {
                alert(data.error || "Invalid OTP")
            }

        } catch (error) {
            alert("server error :" + error.message)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password do not match !");
            return;
        }

        if (!otpVerified) {
            alert("Please verify your email first.");
            return;
        }

        try {
            const res = await fetch(`https://classifyapp.onrender.com/api/register`, {

                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || "User registered successfully!");
                setFormData({ name: "", email: "", password: "" });
                navigate('/login');

            } else {
                alert(data.message || "registration failed")
            }
        }

        catch (error) {
            alert("server error: " + error.message);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                <br />
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    required
                />
            </label>

            <label>
                <br />
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    disabled={otpVerified}
                    required
                />

                {!otpSent && (
                    <button type="button" onClick={handleGenerateOtp}>
                        Get OTP
                    </button>
                )}

                {otpSent && !otpVerified && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleVerifyOtp}>
                            Verify
                        </button>
                        <button
                            type="button"
                            onClick={handleGenerateOtp}
                            disabled={!canResend}
                        >
                            {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                        </button>
                    </>
                )}
            </label>

            <label>
                <br />
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInput}
                    required
                />
            </label>

            <label>
                <br />
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInput}
                    required
                />
            </label>

            <br />
            <button type="submit">Register</button>
            <Link to="/login">Already have an account?</Link>
        </form>
    );

}
export default Form;

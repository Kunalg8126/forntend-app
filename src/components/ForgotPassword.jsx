import React, { useState } from 'react'

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [messaege, setMessage] = useState('');


    const handleChnage = (e) =>{
        setEmail(e.target.value);
    };

    const handelSubmit = async(e) =>{
        e.preventDefault();

        try{
            const res = await fetch(`https://classifyapp.onrender.com/api/forgot-password`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            const data = await res.json();
            
            if(res.ok){
                setMessage(data.message);
            }else{
                setMessage(data.error || "failed to send reset link");
            }
        }
         catch (error){
            setMessage("Server error:" + error.message)
         }
    };
  return (
    <form onSubmit ={handelSubmit}>
        <h2>Forgot Password</h2>
        <input type="email" placeholder='Enter your registered email' value={email} onChange={handleChnage} required/>
        <button>Reset Link</button>
        <p>{messaege}</p>
    </form>
  );
};

export default ForgotPassword;

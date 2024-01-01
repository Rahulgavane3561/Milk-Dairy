"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = ({params,any}) => {
  const id=params.id;
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(true); 
  const [otpError, setOtpError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      try {
      

        const r1 = await axios.post('http://localhost:8086/api/supplie/supplierotpverify', {otp,id})
       

        if (r1.data.success) {
          setVerificationSuccess(true);
          router.push('/signin'); 
        } else {
          setOtpError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        setOtpError('Something went wrong. Please try again later.');
      }
    } else {
      setOtpError('Please enter a 6-digit OTP.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-4">OTP Verification</h3>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {otpSent && <p className="text-success mb-3">OTP sent to your registered mobile number <br/><span style={{color:'red'}}>Valid for 5 minutes</span></p>}
            <div className="form-group">
              <button className="btn btn-primary" onClick={handleVerifyOTP}>
                Verify OTP
              </button>
            </div>
            {otpError && <p className="text-danger">{otpError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaUser, FaPhone, FaBuilding, FaEnvelope, FaUsers, FaLock,FaMobileAlt } from 'react-icons/fa';

const RegistrationForm = ({setToken}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    companyEmail: '',
    employeeSize: '',
    password: '',
  });
  const { login } = useContext(UserContext);

  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProceed = (e) => {
    e.preventDefault();
    setStep(2);
    handleSendEmailOtp();
    handleSendPhoneOtp();
  };

  const handleSendEmailOtp = async () => {
    try {
      const response = await axios.post('https://cuvette-wlsp.onrender.com/api/send-otp-email', { email: formData.companyEmail });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send email OTP. Please try again.');
    }
  };

  const handleVerifyEmailOtp = async () => {
    try {
      const response = await axios.post('https://cuvette-wlsp.onrender.com/api/verify-otp-email', { email: formData.companyEmail, otp: emailOtp });
      setMessage(response.data.message);
      if (response.data.message === 'Email verified successfully!') {
        setEmailVerified(true);
      }
    } catch (error) {
      setMessage('Invalid email OTP. Please try again.');
    }
  };

  const handleSendPhoneOtp = async () => {
    try {
      const response = await axios.post('https://cuvette-wlsp.onrender.com/api/send-otp-phone', { phone: formData.phone });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send phone OTP. Please try again.');
    }
  };

  const handleVerifyPhoneOtp = async () => {
    try {
      const response = await axios.post('https://cuvette-wlsp.onrender.com/api/verify-otp-phone', { phone: formData.phone, otp: phoneOtp });
      setMessage(response.data.message);
      if (response.data.message === 'Phone number verified successfully!') {
        setPhoneVerified(true);
      }
    } catch (error) {
      setMessage('Invalid phone OTP. Please try again.');
    }
  };

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        setResendDisabled(false);
      }, 30000);
    }
  }, [step]);

  const handleRegistrationSubmit = async (formData) => {
    try {
      const response = await axios.post('https://cuvette-wlsp.onrender.com/api/register', formData);
      if (response.status === 201) {
        localStorage.setItem('authToken', response.data.token);
        const userData = JSON.parse(atob(response.data.token.split('.')[1]));
        login(userData);
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    handleRegistrationSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className='w-2/3 p-8 text-center hidden md:block'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repudiandae assumenda ea soluta placeat cum iusto minima obcaecati ex ab quae, vitae dolorem unde tempore provident aliquam repellat, harum hic! Quod expedita eius quisquam alias mollitia ipsum laudantium. Inventore reprehenderit nihil amet consequuntur labore natus fugiat perferendis aspernatur? Voluptatibus
      </div>
      <div className="w-full md:w-1/3 max-w-md p-8 bg-white rounded-lg shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleProceed}>
              <div className="mb-4 relative">
                <FaUser className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaPhone className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Phone no."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaBuilding className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="text"
                  id="companyName"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="email"
                  id="companyEmail"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Company Email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaUsers className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="number"
                  id="employeeSize"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Employee Size"
                  value={formData.employeeSize}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 text-center">
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Proceed
              </button>
            </form>
          </>
        ) : (
          // <>
          //   <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
          //   <div className="mb-4">
          //     <label className="block text-sm font-medium text-gray-700">Email OTP</label>
          //     <input
          //       type="text"
          //       className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          //       placeholder="Enter your email OTP"
          //       value={emailOtp}
          //       onChange={(e) => setEmailOtp(e.target.value)}
          //     />
          //     <button
          //       onClick={handleVerifyEmailOtp}
          //       className="mt-2 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none"
          //       disabled={emailVerified}
          //     >
          //       Verify Email
          //     </button>
          //     <button
          //       onClick={handleSendEmailOtp}
          //       className="ml-2 mt-2 py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
          //       disabled={resendDisabled}
          //     >
          //       Resend OTP
          //     </button>
          //   </div>
          //   <div className="mb-4">
          //     <label className="block text-sm font-medium text-gray-700">Phone OTP</label>
          //     <input
          //       type="text"
          //       className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          //       placeholder="Enter your phone OTP"
          //       value={phoneOtp}
          //       onChange={(e) => setPhoneOtp(e.target.value)}
          //     />
          //     <button
          //       onClick={handleVerifyPhoneOtp}
          //       className="mt-2 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none"
          //       disabled={phoneVerified}
          //     >
          //       Verify Phone
          //     </button>
          //     <button
          //       onClick={handleSendPhoneOtp}
          //       className="ml-2 mt-2 py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
          //       disabled={resendDisabled}
          //     >
          //       Resend OTP
          //     </button>
          //   </div>
          //   <button
          //     onClick={handleSubmit}
          //     className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          //     disabled={!emailVerified || !phoneVerified}
          //   >
          //     Submit
          //   </button>
          //   <p className="text-center mt-4 text-red-500">{message}</p>
          // </>
          <>
      <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>

      {/* Email OTP Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email OTP</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your email OTP"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
          />
        </div>
        <button
          onClick={handleVerifyEmailOtp}
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={emailVerified}
        >
          Verify Email
        </button>
        <p className="mt-2">
          <span
            onClick={handleSendEmailOtp}
            className="text-blue-600 hover:underline cursor-pointer"
            disabled={resendDisabled}
          >
            Resend OTP
          </span>
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone OTP</label>
        <div className="relative">
          <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your phone OTP"
            value={phoneOtp}
            onChange={(e) => setPhoneOtp(e.target.value)}
          />
        </div>
        <button
          onClick={handleVerifyPhoneOtp}
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={phoneVerified}
        >
          Verify Phone
        </button>
        <p className="mt-2">
          <span
            onClick={handleSendPhoneOtp}
            className="text-blue-600 hover:underline cursor-pointer"
            disabled={resendDisabled}
          >
            Resend OTP
          </span>
        </p>
      </div>
      <button
  onClick={handleSubmit}
  className={`w-full py-2 mt-4 ${
    !emailVerified || !phoneVerified ? 'bg-gray-400' : 'bg-blue-600'
  } text-white font-semibold rounded-md hover:${!emailVerified || !phoneVerified ? 'bg-gray-500' : 'bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
  disabled={!emailVerified || !phoneVerified}
>
  Submit
</button>
      <p className="text-center mt-4 text-red-500">{message}</p>
    </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;

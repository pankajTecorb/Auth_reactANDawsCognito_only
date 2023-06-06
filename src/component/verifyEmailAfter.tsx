import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
import UserPool from '../UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
var emails: any = localStorage.email
const VerifyEmailAfter = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const handleEmailVerifyAfters = async (e: any) => {
    e.preventDefault();
    const userData = {
      Username: emails,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        console.log(err);
        toast.error(err.message);
      } else {
        console.log(result);
        toast.success("Successfully Verify");
        navigate("/");
      }
    });
  };


  const handleResendOTP = async (e: any) => {
    e.preventDefault();
    const userData = {
      Username: emails,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        toast.error(err.message);
      } else {
        console.log(result);
        toast.success(result);

      }
    });
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="https://www.tecorb.com" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://upwork-usw2-prod-assets-static.s3.us-west-2.amazonaws.com/org-logo/1033068490733023232" alt="logo" />
          Tecorb
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify Your Email
            </h1>
            <form onSubmit={handleEmailVerifyAfters} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                <input
                  type="otp"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <a onClick={handleResendOTP} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Send OTP</a>
              <div className="flex items-center justify-between">
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default VerifyEmailAfter;


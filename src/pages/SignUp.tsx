
import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto";
import LanguageSelector from "../components/LanguageSelector";

const SignUp = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    // Redirect to chat page after successful signup
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-6 flex items-center justify-between w-full max-w-md">
        <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          KurdishChat
        </Link>
        <LanguageSelector />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <ProfilePhoto />
        <SignUpForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default SignUp;

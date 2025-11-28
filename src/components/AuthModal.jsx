// import { X } from 'lucide-react';
// import { useState } from 'react';

// export default function AuthModal({ isOpen, onClose }) {
//   const [isSignUp, setIsSignUp] = useState("signin");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           {isSignUp ? 'Sign Up' : 'Sign In'}
//         </h2>

//         <form className="space-y-4">
//           {isSignUp && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your name"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter your password"
//             />
//           </div>

//           {isSignUp && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             {isSignUp ? 'Sign Up' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="text-blue-600 hover:text-blue-700 text-sm"
//           >
//             {isSignUp ? (
//   <span>
//     Already have an account? <button onClick={() => setIsSignUp(false)} className="text-blue-600">Sign In</button>
//   </span>
// ) : (
//   <div className="flex flex-col gap-2 items-center">
//     <button onClick={() => setIsSignUp(true)} className="text-blue-600">
//       Don't have an account? Sign Up
//     </button>

//     <button onClick={handleForgotPassword} className="text-red-500">
//       Forgot Password?
//     </button>
//   </div>
// )}

//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { X } from "lucide-react";
import { useState } from "react";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleForgotPassword = () => {
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* FOOTER SWITCH */}
        <div className="mt-4 text-center">
          {isSignUp ? (
            <>
              <span>Already have an account? </span>
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Sign In
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Don't have an account? Sign Up
              </button>

              <button
                onClick={handleForgotPassword}
                className="text-red-500 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

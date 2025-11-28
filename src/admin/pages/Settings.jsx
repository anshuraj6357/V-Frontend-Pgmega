// import { useState,useEffect } from 'react';
// import { Shield, Users } from 'lucide-react';
// import {useProfileQuery} from "../features/api/authapi"

// export default function Settings() {
//   const [activeTab, setActiveTab] = useState('security');
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
//   const [passwords, setPasswords] = useState({
//     current: '',
//     new: '',
//     confirm: '',
//   });
//    const {data}=useProfileQuery()

//   useEffect(()=>{console.log(data?.profile)},[data])
//     const [profile, setProfile] = useState({
//     fullName: data?.profile?.username,
//     email: data?.profile?.email,
//     // phone: data?.profile?.,
//     company: data?.profile?.address,
//     address: data?.profile?.state,
//   });
 

//   // ✅ Simulated backend actions
//   const handleToggle2FA = (value) => {
//     setTwoFactorEnabled(value);
//     console.log('🔐 2FA toggled:', value);
//     // TODO: POST /api/settings/twofactor { enabled: value }
//   };

//   const handleChangePassword = () => {
//     console.log('🔑 Change Password:', passwords);
//     if (passwords.new !== passwords.confirm) {
//       console.log('❌ Passwords do not match!');
//       alert('Passwords do not match');
//       return;
//     }
//     // TODO: POST /api/settings/change-password { passwords }
//   };

//   const handleUpdateProfile = () => {
//     console.log('👤 Update Profile:', profile);
//     // TODO: PUT /api/settings/profile { profile }
//   };

//   const handleNotificationToggle = (section, option, checked) => {
//     console.log(`🔔 Notification Setting Changed: ${section} - ${option}`, checked);
//     // TODO: PATCH /api/settings/notifications { section, option, checked }
//   };

//   const handleRoleEdit = (role) => {
//     console.log('🛠 Edit Role:', role);
//     // TODO: GET /api/settings/roles/:roleId or open edit modal
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-[#1e3a5f] text-3xl mb-2">Settings</h1>
//         <p className="text-gray-600">
//           Manage security, notifications, and system preferences
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//         <div className="flex border-b border-gray-200 overflow-x-auto">
//           {['security',  'profile'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 console.log('🧭 Switched Tab:', tab);
//               }}
//               className={`px-6 py-4 text-center transition-colors whitespace-nowrap ${
//                 activeTab === tab
//                   ? 'text-[#1e3a5f] border-b-2 border-[#1e3a5f]'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {tab === 'security'
//                 ? 'Security'
//                 : tab === 'notifications'
//                 ? 'Notifications'
//                 : tab === 'roles'
//                 ? 'Roles & Permissions'
//                 : 'Profile'}
//             </button>
//           ))}
//         </div>

//         {/* Security Tab */}
//         {activeTab === 'security' && (
//           <div className="p-6 space-y-6">
//             <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
//               <div className="flex items-center gap-3 mb-2">
//                 <Shield className="text-blue-600" size={24} />
//                 <h3 className="text-lg text-blue-900">Security Overview</h3>
//               </div>
//               <p className="text-blue-700">
//                 All tenant and payment data is encrypted with AES-256 encryption.
//               </p>
//             </div>

//             {/* 2FA */}
//             <div className="space-y-4">
//               <h4 className="text-[#1e3a5f]">Two-Factor Authentication (2FA)</h4>
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <div>
//                   <p className="text-[#1e3a5f] mb-1">Enable 2FA for Admin Login</p>
//                   <p className="text-sm text-gray-600">
//                     Add an extra layer of security with OTP verification
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={twoFactorEnabled}
//                     onChange={(e) => handleToggle2FA(e.target.checked)}
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1e3a5f] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all"></div>
//                 </label>
//               </div>

//               {twoFactorEnabled && (
//                 <div className="p-4 bg-green-50 rounded-xl border border-green-200">
//                   <p className="text-sm text-green-700">
//                     ✓ 2FA is currently enabled. OTP will be sent to your registered mobile number.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Change Password */}
//             <div className="space-y-4">
//               <h4 className="text-[#1e3a5f]">Change Password</h4>
//               <div className="space-y-3">
//                 {['current', 'new', 'confirm'].map((key) => (
//                   <div key={key}>
//                     <label className="block text-sm text-gray-700 mb-2">
//                       {key === 'current'
//                         ? 'Current Password'
//                         : key === 'new'
//                         ? 'New Password'
//                         : 'Confirm New Password'}
//                     </label>
//                     <input
//                       type="password"
//                       value={passwords[key]}
//                       onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   onClick={handleChangePassword}
//                   className="bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

       

       

//         {/* Profile Tab */}
//         {activeTab === 'profile' && (
//           <div className="p-6 space-y-6">
//             <div className="flex items-center gap-6">
//               <div className="w-24 h-24 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-3xl">
//                 {data?.profile?.name}
//               </div>
//               <div>
//                 <h3 className="text-2xl text-[#1e3a5f] mb-1">  {data?.profile?.name}</h3>
//                 <p className="text-gray-600">{data?.profile?.role}</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Full Name"
//                   value={profile.fullName}
//                   onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
//                 />
//                 <InputField
//                   label="Email"
//                   type="email"
//                   value={profile.email}
//                   onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Phone"
//                   type="tel"
//                   value={profile.phone}
//                   onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//                 />
//                 <InputField
//                   label="Company"
//                   value={profile.company}
//                   onChange={(e) => setProfile({ ...profile, company: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">Address</label>
//                 <textarea
//                   className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
//                   rows={3}
//                   value={profile.address}
//                   onChange={(e) => setProfile({ ...profile, address: e.target.value })}
//                 />
//               </div>

//               <button
//                 onClick={handleUpdateProfile}
//                 className="bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
//               >
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* Small helper */
// function InputField({ label, type = 'text', value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm text-gray-700 mb-2">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
//       />
//     </div>
//   );
// }

import React from 'react';
import { User, Mail, ShieldCheck, Award } from 'lucide-react';

function Profile() {
    const demoUser = {
        name: "Demo User",
        email: "demo@edu-pilot.app",
        role: "Demo Student & Creator",
        status: "Open Access Activated"
    };

    return (
        <div className='max-w-2xl'>
            <h2 className='font-bold text-3xl mb-7'>Manage Your Profile</h2>
            
            <div className='bg-white border rounded-2xl p-6 shadow-sm flex flex-col gap-6'>
                <div className='flex items-center gap-4 pb-6 border-b'>
                    <div className='w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md'>
                        DU
                    </div>
                    <div>
                        <h3 className='text-xl font-bold text-gray-900'>{demoUser.name}</h3>
                        <p className='text-sm text-gray-500'>{demoUser.role}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl border'>
                        <User className='w-5 h-5 text-blue-600' />
                        <div>
                            <p className='text-xs text-gray-500 uppercase font-semibold'>Full Name</p>
                            <p className='text-sm font-medium text-gray-800'>{demoUser.name}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl border'>
                        <Mail className='w-5 h-5 text-purple-600' />
                        <div>
                            <p className='text-xs text-gray-500 uppercase font-semibold'>Email Address</p>
                            <p className='text-sm font-medium text-gray-800'>{demoUser.email}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl border'>
                        <ShieldCheck className='w-5 h-5 text-green-600' />
                        <div>
                            <p className='text-xs text-gray-500 uppercase font-semibold'>Account Mode</p>
                            <p className='text-sm font-medium text-gray-800'>{demoUser.status}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl border'>
                        <Award className='w-5 h-5 text-amber-600' />
                        <div>
                            <p className='text-xs text-gray-500 uppercase font-semibold'>Plan</p>
                            <p className='text-sm font-medium text-gray-800'>Unlimited Full Access</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;


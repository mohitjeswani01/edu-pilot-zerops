import { Sparkles, CheckCircle2 } from 'lucide-react';
import React from 'react';

function Billing() {
    return (
        <div className='max-w-3xl'>
            <h2 className='font-bold text-2xl mb-2'>Edu-Pilot 🚀 Subscription Status</h2>
            <p className='text-gray-500 mb-6'>All features and course generation capabilities are unlocked for open demo access.</p>

            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <span className='px-3 py-1 bg-white/20 text-xs font-semibold uppercase tracking-wider rounded-full'>Active Plan</span>
                        <h3 className='text-3xl font-extrabold mt-2'>Open Access Demo</h3>
                    </div>
                    <Sparkles className='w-12 h-12 text-yellow-300' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/20'>
                    <div className='flex items-center gap-2'>
                        <CheckCircle2 className='w-5 h-5 text-green-300' />
                        <span>Unlimited Course Generation</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <CheckCircle2 className='w-5 h-5 text-green-300' />
                        <span>Gemini Multi-Key AI Pipeline</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <CheckCircle2 className='w-5 h-5 text-green-300' />
                        <span>Interactive Learning & Video Embeds</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <CheckCircle2 className='w-5 h-5 text-green-300' />
                        <span>Full Dashboard & Explore Access</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billing;


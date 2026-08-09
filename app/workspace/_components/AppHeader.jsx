import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { UserCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function AppHeader({ hideSidebar = false }) {
    return (
        <div className='p-4 flex justify-between items-center bg-white shadow-sm border-b z-20'>
            {hideSidebar ? (
                <Link href="/workspace" className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors'>
                    <div className='p-1.5 hover:bg-gray-100 rounded-lg flex items-center gap-2'>
                        <ArrowLeft className='w-5 h-5 text-gray-600' />
                        <span className='font-semibold'>Back to Dashboard</span>
                    </div>
                </Link>
            ) : (
                <SidebarTrigger />
            )}
            <div className='flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200'>
                <UserCircle className='w-5 h-5 text-blue-600' />
                <span>Demo User</span>
            </div>
        </div>
    );
}

export default AppHeader;


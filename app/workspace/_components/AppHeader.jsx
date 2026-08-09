import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { UserCircle } from 'lucide-react';

function AppHeader({ hideSidebar = false }) {
    return (
        <div className='p-4 flex justify-between items-center bg-white shadow-md'>
            {!hideSidebar ? <SidebarTrigger /> : <div />}
            <div className='flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200'>
                <UserCircle className='w-5 h-5 text-blue-600' />
                <span>Demo User</span>
            </div>
        </div>
    );
}

export default AppHeader;


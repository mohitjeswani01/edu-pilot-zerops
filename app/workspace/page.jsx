"use client"
import React, { useRef } from 'react';
import WelcomeBanner from './_components/WelcomeBanner'; // ✅ adjust the path if needed
import CourseList from './_components/CourseList';
import EnrollCourseList from './_components/EnrollCourseList';

function Workspace() {
    const enrollListRef = useRef();

    const handleCourseDeleted = () => {
        // Refresh the "Continue Learning" section when a course is deleted
        enrollListRef.current?.refreshEnrolledCourses();
    };

    return (
        <div>
            <WelcomeBanner />
            <EnrollCourseList ref={enrollListRef} />
            <CourseList onCourseDeleted={handleCourseDeleted} />
        </div>
    );
}

export default Workspace;

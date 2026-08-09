"use client"
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import axios from 'axios';
import EnrollCourseCard from './EnrollCourseCard';

const EnrollCourseList = forwardRef(function EnrollCourseList({ userEnrolledCourses }, ref) {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const isUsingProp = userEnrolledCourses !== undefined;

    // Expose a refresh method so parent components can trigger re-fetch
    useImperativeHandle(ref, () => ({
        refreshEnrolledCourses: fetchEnrolledCourses
    }));

    useEffect(() => {
        if (isUsingProp) {
            // Use the data passed from parent (e.g. my-learning page)
            setEnrolledCourses(userEnrolledCourses);
        } else {
            // Self-fetch when used standalone (e.g. Dashboard)
            fetchEnrolledCourses();
        }
    }, [userEnrolledCourses]);

    const fetchEnrolledCourses = async () => {
        try {
            const result = await axios.get('/api/enroll-course');
            setEnrolledCourses(result.data);
        } catch (error) {
            console.error("Failed to fetch enrolled courses:", error);
        }
    }

    return enrolledCourses?.length > 0 && (
        <div className='mt-3'>
            <h2 className='font-bold text-xl'> Continue Learning Your Course </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                {enrolledCourses?.map((course, index) => (
                    <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
                ))}
            </div>
        </div>
    )
});

export default EnrollCourseList

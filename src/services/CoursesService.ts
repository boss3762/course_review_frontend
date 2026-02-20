import { Course } from "../interfaces";
import { baseUrl } from "../config/const";
import { Review } from "../interfaces";

export async function fetchCourse(): Promise<Course[]> {
    const res = await fetch(baseUrl + '/courses')
    const courses = await res.json();
    return courses;
}

export async function createCourse(newCourse: Course): Promise<Course|null> {
    const res = await fetch(baseUrl + '/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        })
    const savedNewCourse: Course = await res.json()
    if (savedNewCourse.id !== undefined){
        return savedNewCourse;
    } else {
        return null;
    }
}

export async function fetchReview(courseId: string): Promise<Review[]> {
    const res = await fetch(baseUrl + '/courses/' + courseId + '/reviews')
    const reviews = await res.json();
    return reviews;
}
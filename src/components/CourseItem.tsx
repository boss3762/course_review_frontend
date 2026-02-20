import { Course } from "../interfaces";
import { useState } from "react";
import { Review } from "../interfaces";
import { fetchReview } from "../services/CoursesService";


type CourseItemProps = {
    course: Course;
};

const CourseItem = (props: CourseItemProps) => {
    const course = props.course;

    const [reviewsVisible, setReviewsVisible] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    
    const handleReviewsVisibleToggle = () => {
        if(!reviewsVisible){
            if(course.id !== undefined){
                fetchReview(course.id)
                .then(reviews => {
                    setReviews(reviews);
                    console.log(reviews);
                    setReviewsVisible(true);
                });
            }else {
                setReviewsVisible(true);
            }
        } else{
            setReviewsVisible(false);
        }
    };


    return (
        <li className="Course">{course.number} - {course.title}
        &nbsp;
        <button onClick={handleReviewsVisibleToggle}>{reviewsVisible? "hide reviews" : "show reviews"}</button>
        {reviewsVisible && (
            <div>
                <ul>
                    {reviews.map(review => (
                        <li>
                            {review.comments} ({review.score})
                        </li>
                    ))}
                    {reviews.length === 0 && (
                        <li>No reviews</li>
                    )}
                </ul>
            </div>
        )}
        </li>

    );
};

export default CourseItem;
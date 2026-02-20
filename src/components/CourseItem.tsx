import { Course } from "../interfaces";
import { useState } from "react";
import { Review } from "../interfaces";
import { fetchReview } from "../services/CoursesService";
import { saveReview } from "../services/CoursesService";


type CourseItemProps = {
    course: Course;
};

const CourseItem = (props: CourseItemProps) => {
    const course = props.course;

    const [reviewsVisible, setReviewsVisible] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);

    const [newReviewComments, setNewReviewComments] = useState<string>('');
    const [newReviewScore, setNewReviewScore] = useState<number>(1);

    const fetchReviews = () => {
        if(course.id){
            fetchReview(course.id)
            .then(reviews => {
                setReviews(reviews);
            });
        }
    }

    const clearNewReviewForm = () => {
        setNewReviewComments('');
        setNewReviewScore(1);
    }
    
    const handleReviewsVisibleToggle = () => {
        if(!reviewsVisible){
            fetchReviews();
            setReviewsVisible(true);
        } else{
            setReviewsVisible(false);
        }
    };

    const handleNewReviewSaveClicked = () => {
        if (course.id !== undefined){
            const newReview: Review = {
            comments: newReviewComments,
            score: newReviewScore,
            courseId: course.id
        }
        saveReview(newReview,course.id)
            .then(savedNewReview => {
                if(savedNewReview){
                    fetchReviews();
                    clearNewReviewForm();
                }
            })
        }
    }

    const newReviewScoreOptions = [1,2,3,4,5];
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
                <b>New Review:</b><br/>
                Comments: &nbsp;
                <input value={newReviewComments} onChange={(e) => setNewReviewComments(e.target.value)}/>
                &nbsp; Score &nbsp;
                <select value={newReviewScore} onChange={(e) => setNewReviewScore(Number(e.target.value))}>
                    {newReviewScoreOptions.map(score => (
                        <option value={score}>{score}</option>
                    ))}
                </select>
                &nbsp;
                <button onClick={handleNewReviewSaveClicked}>Save</button>
            </div>
        )}
        </li>

    );
};

export default CourseItem;
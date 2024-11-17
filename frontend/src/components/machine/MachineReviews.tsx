import React, { useContext, useState, useEffect } from 'react';
import {
  getMachineReviews,
  deleteMyMachineReview,
  deleteMachineReviewForce,
} from '../../api/axiosMachine';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import '../../assets/scss/machine/MachineReviews.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import LoadingIcon from '../public/LoadingIcon';

interface Review {
  _id: string;
  reviewerId: string;
  reviewerName: string;
  content: string;
  rating: number;
  createdAt: string;
  // Add other review properties as needed
}

interface MachineReviewsProps {
  machineId: string;
}

const MachineReviews: React.FC<MachineReviewsProps> = ({ machineId }) => {
  const { currentUser, isLoading, error: userError } = useContext(AuthUserContext)!;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getMachineReviews(machineId);
      setReviews(data.reviews);
    } catch (err: any) {
      setFetchError(err.msg || 'Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (machineId) {
      fetchReviews();
    }
  }, [machineId]);

  const handleDelete = async (reviewId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return;

    try {
      if (currentUser?.isAdmin) {
        // Admin can delete any review
        await deleteMachineReviewForce(machineId, reviewId);
      } else if (currentUser) {
        // Users can delete their own review
        await deleteMyMachineReview(machineId);
      }
      // Remove the deleted review from the state
      setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      alert('Review deleted successfully.');
    } catch (err: any) {
      setDeleteError(err.msg || 'Failed to delete the review.');
    }
  };

  if (loading || isLoading) return <LoadingIcon />;
  if (fetchError) return <p>{fetchError}</p>;
  if (userError) return <p>{userError}</p>;

  return (
    <div className='machine-reviews'>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review._id} className='review-item'>
              <div className='review-header'>
                <strong>{review.reviewerName}</strong>
                <span> - {new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <div className='review-body'>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <Rating
                    name={`read-only-rating-${review._id}`}
                    value={Number(review.rating)}
                    precision={0.5}
                    readOnly
                  />
                </Box>
                <p>{review.content}</p>
              </div>
              {/* Conditionally render the delete button */}
              {(currentUser?.id === review.reviewerId || currentUser?.isAdmin) && (
                <button
                  className='delete-review-button'
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {deleteError && <p className='error'>{deleteError}</p>}
    </div>
  );
};

export default MachineReviews; 
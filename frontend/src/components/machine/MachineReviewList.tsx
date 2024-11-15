import React, { useState, useEffect } from 'react';
import { getMachineReviews } from '../../api/axiosMachine';
import '../../assets/scss/machine/MachineReviewList.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import { Review } from '../../types/Machine';
import '../../assets/scss/machine/MachineReviewList.scss';

interface MachineReviewListProps {
  machineId: string;
}

const MachineReviewList: React.FC<MachineReviewListProps> = ({ machineId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!machineId) {
        setError('Machine ID is missing.');
        setLoading(false);
        return;
      }
      try {
        const data = await getMachineReviews(machineId);
        setReviews(data.reviews);
        setLoading(false);
      } catch (error: any) {
        setError(`Error fetching reviews: ${error.msg}`);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [machineId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='machine-review-list'>
      <h3>Reviews</h3>
      <table className='machine-review-table'>
        {reviews.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={3} className='no-data'>No reviews available.</td>
            </tr>
          </tbody>
        ) : (
          <>
            <thead>
              <tr>
                <th className='machine-review-username'>Username</th>
                <th className='machine-review-rating'>Rating</th>
                <th className='machine-review-comment'>Comment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.reviewerName}</td>
                  <td>
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
                  </td>
                  <td>{review.content}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default MachineReviewList;

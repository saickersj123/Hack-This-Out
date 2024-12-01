import React, { useState, useEffect, useRef } from 'react';
import { postMachineReview } from '../../api/axiosMachine';
import { Review } from '../../types/Machine';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import '../../assets/scss/machine/MachineReviewForm.scss';
import LoadingIcon from '../public/LoadingIcon';
import Modal from '../modal/Modal';

interface MachineReviewFormProps {
  onReviewAdded: (review: Review) => void;
  machineId: string;
  isModalOpen: boolean;
  onClose: () => void;
}

interface FormData {
  rating: number;
  review: string;
}

const MachineReviewForm: React.FC<MachineReviewFormProps> = ({ 
  machineId, 
  onReviewAdded, 
  isModalOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    review: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

  const { rating, review } = formData;

  const adjustTextareaHeight = () => {
    if (reviewContentRef.current) {
      reviewContentRef.current.style.height = 'auto';
      reviewContentRef.current.style.width = '100%';
      reviewContentRef.current.style.height = `${reviewContentRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [review]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));
  };

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newValue || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate rating
    if (rating < 1.0 || rating > 5.0) {
      setError('Rating must be between 1.0 and 5.0.');
      return;
    }

    // Validate one decimal place
    if (!Number.isInteger(rating * 10)) {
      setError('Rating must have at most one decimal place.');
      return;
    }

    if (!review.trim()) {
      setError('Please write your review.');
      return;
    }

    setLoading(true);
    try {
      const newReview = await postMachineReview(machineId, formData);
      onReviewAdded(newReview);
      setFormData({ rating: 0, review: '' });
      onClose(); // Close modal after successful submission
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(`Error submitting review: ${err.response.data.msg}`);
      } else if (err.msg) {
        setError(`Error submitting review: ${err.msg}`);
      } else {
        setError('Error submitting review: Unknown error.');
      }
    } finally {
      setLoading(false);
      //reload page
      window.location.reload();
    }
  };

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <form className='machine-review-form' onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>New Review</h2>
        </div>
      
        {error && <p className='error-message'>{error}</p>}
      
        <div className='machine-review-form-rating'>
          <label htmlFor='rating' className='rating'>Rating</label>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="rating"
              className="test"
              value={rating}
              precision={0.5}
              onChange={handleRatingChange}
            />
          </Box>
        </div>
      
        <div className='machine-review-form-content'>
          <label htmlFor='review'>Comment</label>
          <textarea 
            ref={reviewContentRef} 
            id='review' 
            name='review' 
            value={review} 
            placeholder='Please write your review here'
            onChange={handleChange} 
            required 
          />
        </div>
      
        <div className="modal-footer">
          <button 
            className='machine-review-form-submit' 
            type='submit' 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MachineReviewForm;
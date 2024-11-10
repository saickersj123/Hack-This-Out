import React, { useState, useEffect, useRef } from 'react';
import { postMachineReview } from '../../api/axiosMachine';
import { Review } from '../../types/Machine';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface MachineReviewFormProps {
  onReviewAdded: (review: Review) => void;
  machineId: string;
}

interface FormData {
  rating: number;
  review: string;
}

const MachineReviewForm: React.FC<MachineReviewFormProps> = ({ machineId, onReviewAdded }) => {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    review: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();
  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

  const { rating, review } = formData;

  const adjustTextareaHeight = () => {
    if (reviewContentRef.current) {
      reviewContentRef.current.style.height = 'auto';
      reviewContentRef.current.style.width = '50%';
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
      setError('Please write a review.');
      return;
    }

    setLoading(true);
    try {
      const newReview = await postMachineReview(machineId, formData);
      onReviewAdded(newReview);
      setFormData({ rating: 0, review: '' });
      navigate(`/machine/${machineId}`);
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
    }
  };

  return (
    <form className='machine-review-form' onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>
      
      {error && <p className='error-message'>{error}</p>}
      
      <div className='machine-review-form-rating'>
        <label htmlFor='rating'>Rating</label>
        <input 
          type='number' 
          id='rating' 
          name='rating' 
          value={rating === 0 ? '' : rating}
          onChange={handleChange}
          min={1.0}
          max={5.0}
          step={0.1}
          required 
          placeholder='1.0 - 5.0'
        />
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
      
      <button className='machine-review-form-submit' type='submit' disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default MachineReviewForm;
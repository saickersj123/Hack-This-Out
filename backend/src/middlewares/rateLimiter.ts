import rateLimit from 'express-rate-limit';

export const flagSubmissionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: { msg: 'Too many flag submission attempts. Please try again later.' }
});


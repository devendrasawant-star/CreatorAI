import Stripe from 'stripe';
import logger from '../utils/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

logger.info('✅ Stripe Configured');

export default stripe;

/**
 * animelyrical Vercel Serverless Function entry point
 * Author: lyrical
 */

import express from 'express';
import { apiRouter } from '../src/server/routes.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle direct /api prefix and root rewrites on Vercel
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;

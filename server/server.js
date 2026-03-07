
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth, createClerkClient } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });


const app = express();

await connectCloudinary();

// Enable Cross-Origin Resource Sharing (CORS) for the application
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send('Welcome to the server!'));

app.get('/api/stats/user-count', async (req, res) => {
    try {
        const count = await clerkClient.users.getCount();
        res.json({ success: true, count });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.use(requireAuth());

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
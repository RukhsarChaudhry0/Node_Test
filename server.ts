import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User';
import authenticate from './middlewares/auth';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Replace mongodb connection string
mongoose.connect('mongodb://localhost/shopping-list', { })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


  // use this route to create token 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });

  res.status(200).json({
    message: 'Authentication successful',
    token
  });
});

// 
app.post('/shopping-lists', authenticate, async (req, res) => {
  const userId = req.user._id;
  // TODO: implement endpoint
});

app.post('/share-shopping-lis', authenticate, async (req, res) => {
  const userId = req.user._id;
  // TODO: implement endpoint
});




app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;

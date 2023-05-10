import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User';
import ShoppingCart from './models/Shopping';
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

app.get('/shopping-lists/:userId', authenticate, async (req, res) => {
  try {
    // Check if the authenticated user is authorized to access this endpoint
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find all shopping lists that have been shared with the user
    const shoppingLists = await ShoppingCart.find({ "sharedWith.userId": req.params.userId });

    return res.json(shoppingLists);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/share-shopping-list', authenticate, async (req, res) => {
  try {
    const { listId, sharedWith, permission } = req.body;

    // Find the shopping List
    const shoppingCart = await ShoppingCart.findById(listId);
    if (!shoppingCart) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    // Check if the authenticated user is the owner of the shopping cart
    if (shoppingCart.userId !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner of this shopping cart' });
    }

    // Find the user to share the shopping cart with
    const userToShareWith = await User.findOne({ email: sharedWith });
    if (!userToShareWith) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the shopping cart is already shared with the user
    const existingShare = shoppingCart.sharedWith.find(
      (share) => share.userId === userToShareWith._id.toString()
    );
    if (existingShare) {
      return res.status(400).json({ message: 'Shopping cart is already shared with this user' });
    }

    // Add the user to the sharedWith array
    shoppingCart.sharedWith.push({
      userId: userToShareWith._id.toString(),
      permission,
    });

    // Save the updated shopping cart
    await shoppingCart.save();

    res.status(200).json({ message: 'Shopping cart shared successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;

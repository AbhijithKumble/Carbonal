import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

router.post('/footprint', async (req, res) => {
  const { email, image, score, datejoined, name, footprint } = req.body;
  try {
    await User.updateOne(
      { email: email },
      { $set: { footprint } }
    );
    res.send({ status: 'ok', data: 'Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

export default router;

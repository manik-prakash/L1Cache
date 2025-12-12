import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Profile } from '../models/Profile';
import mongoose from 'mongoose';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne({ user_id: req.user!.id });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json({
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to get profile', message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { display_name, avatar_url } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    const updateData: any = {};
    if (display_name !== undefined) updateData.display_name = display_name || null;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url || null;

    const profile = await Profile.findOneAndUpdate(
      { user_id: userId },
      updateData,
      { new: true, upsert: true }
    );

    res.json({
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
};



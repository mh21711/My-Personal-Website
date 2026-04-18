import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// helper to extract public ID from a Cloudinary URL
function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email })
      .select('name email image createdAt');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, imageBase64 } = await request.json();

    // get current user to access old image
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let newImageUrl = currentUser.image;

    if (imageBase64) {
      // delete old image from Cloudinary if it exists and is a Cloudinary URL
      if (currentUser.image && currentUser.image.includes('cloudinary.com')) {
        const oldPublicId = extractPublicId(currentUser.image);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId);
        }
      }

      // upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imageBase64, {
        folder: 'my_personal_website/avatars',
      });

      newImageUrl = uploadResult.secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, image: newImageUrl },
      { new: true }
    ).select('-password');

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}


// ## What Happens Step by Step When User Changes Picture

// User picks a new photo on frontend
//           ↓
// Frontend converts it to base64 string
//           ↓
// Sends base64 + name to PATCH /api/user/profile
//           ↓
// API gets current user's old image URL from DB
//           ↓
// Extracts public ID from old URL
//           ↓
// Deletes old image from Cloudinary ← prevents storage waste
//           ↓
// Uploads new image to Cloudinary
//           ↓
// Gets back new secure URL
//           ↓
// Saves new URL + name to MongoDB
//           ↓
// Returns updated user profile to frontend
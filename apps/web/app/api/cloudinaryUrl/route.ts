import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryMediaUrlParams = {
  media: string;
  width: number;
};

async function uploadToCloudinary(media: string, width: number) {
  try {
    const result = await cloudinary.uploader.upload(media, {
      resource_type: 'auto',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      transformation: {
        width: width,
      },
    });

    return result;
  } catch (error) {
    console.log('Failed to upload asset', error);
    return false;
  }
}

async function getCloudinaryMediaUrl({ media, width }: CloudinaryMediaUrlParams) {
  console.log({ media, width });

  const cloudinaryUpload = await uploadToCloudinary(media, width);

  if (cloudinaryUpload) {
    return cloudinaryUpload.secure_url;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { media, width } = body as unknown as CloudinaryMediaUrlParams;

    if (!media || !width) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const cloudinaryUrl = await getCloudinaryMediaUrl({ media, width });

    return NextResponse.json({ url: cloudinaryUrl });
  } catch (error) {
    console.error('Error processing Cloudinary URL:', error);
    return NextResponse.json({ error: 'Failed to process Cloudinary URL' }, { status: 500 });
  }
}

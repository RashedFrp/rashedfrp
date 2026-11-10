import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

// ফায়ারবেস অ্যাডমিন ইনিশিয়ালাইজেশন
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // tech-alpha-57fd1-এর সার্ভিস অ্যাকাউন্ট ইমেইল
      privateKey: process.env.FIREBASE_PRIVATE_KEY 
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
        : undefined,
    }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers সেট করা
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, title, body, url } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'FCM Token is required' });
  }

  const message = {
    token: token,
    notification: {
      title: title || 'নতুন পোস্ট প্রকাশিত হয়েছে!',
      body: body || 'আমাদের ব্লগ সাইটে নতুন আপডেট দেখতে ভিজিট করুন।',
    },
    webpush: {
      fcmOptions: {
        link: url || 'https://yourblog.blogspot.com',
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    return res.status(200).json({ success: true, messageId: response });
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
}

import { NextResponse } from "next/server";
import admin from "firebase-admin";

// ফায়ারবেস অ্যাডমিন এসডিকে ইনিশিয়ালাইজ করা (ডাবল ইনিশিয়ালাইজেশন এড়াতে চেক করা হয়)
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // প্রাইভেট কে গুলোর ভেতরের নতুন লাইনগুলো ঠিক রাখার জন্য replace ব্যবহার করা হয়েছে
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : undefined,
      }),
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
}

export async function POST(request: Request) {
  // CORS হেডার যুক্ত করা যাতে ব্লগার বা অন্য ডোমেন থেকে রিকোয়েস্ট ব্লক না হয়
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    const body = await request.json();
    const { token, title, message, url } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "FCM token is missing" },
        { status: 400, headers }
      );
    }

    const payload = {
      token: token,
      notification: {
        title: title || "New Notification",
        body: message || "You have a new update!",
      },
      webpush: {
        fcmOptions: {
          link: url || "https://rashedfrp.vercel.app/",
        },
      },
    };

    const response = await admin.messaging().send(payload);

    return NextResponse.json(
      { success: true, messageId: response },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers }
    );
  }
}

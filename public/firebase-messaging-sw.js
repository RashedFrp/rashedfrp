navigator.serviceWorker.register('https://rashedfrp.vercel.app/firebase-messaging-sw.js')
.then((registration) => {
    return getToken(messaging, { 
        vapidKey: 'BLiYO5Md2lCyuGbll9E2-APFDFey9NpFD_FswSTbkSifxY2ukqY4bwz0oJRKk4VfarUm-S8ptnOWOqAJ18NA3G8',
        serviceWorkerRegistration: registration 
    });
});

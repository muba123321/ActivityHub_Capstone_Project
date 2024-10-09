// config/firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "../../firebaseServiceAccountKey.js";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };

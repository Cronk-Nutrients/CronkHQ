module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyCWksF-L5FQkrEXbviMVadKHni-smNdeWo") || "AIzaSyCWksF-L5FQkrEXbviMVadKHni-smNdeWo",
    authDomain: ("TURBOPACK compile-time value", "cronk-wms.firebaseapp.com") || "cronk-wms.firebaseapp.com",
    projectId: ("TURBOPACK compile-time value", "cronk-wms") || "cronk-wms",
    storageBucket: ("TURBOPACK compile-time value", "cronk-wms.firebasestorage.app") || "cronk-wms.firebasestorage.app",
    messagingSenderId: ("TURBOPACK compile-time value", "1085255099980") || "1085255099980",
    appId: ("TURBOPACK compile-time value", "1:1085255099980:web:ce50bce603dc23560a76e9") || "1:1085255099980:web:ce50bce603dc23560a76e9",
    measurementId: ("TURBOPACK compile-time value", "G-DGHP1Y66PT") || "G-DGHP1Y66PT"
};
// Initialize Firebase only once
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
// Use emulators in development (optional)
if (("TURBOPACK compile-time value", "development") === 'development' && process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["connectAuthEmulator"])(auth, 'http://localhost:9099');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["connectFirestoreEmulator"])(db, 'localhost', 8080);
}
const __TURBOPACK__default__export__ = app;
}),
"[project]/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// Demo account credentials
const DEMO_EMAIL = 'demo@cronknutrients.com';
const DEMO_PASSWORD = 'demo1234';
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Demo user profile (mock)
const DEMO_USER_PROFILE = {
    uid: 'demo-user-id',
    email: DEMO_EMAIL,
    displayName: 'Demo User',
    photoURL: null,
    role: 'admin',
    company: 'Cronk Nutrients (Demo)',
    organizationId: 'demo-org-id',
    organizations: [
        'demo-org-id'
    ],
    isDemo: true
};
// Create a mock User object for demo mode
const createDemoUser = ()=>({
        uid: 'demo-user-id',
        email: DEMO_EMAIL,
        emailVerified: true,
        displayName: 'Demo User',
        photoURL: null,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        phoneNumber: null,
        providerId: 'demo',
        delete: async ()=>{},
        getIdToken: async ()=>'demo-token',
        getIdTokenResult: async ()=>({}),
        reload: async ()=>{},
        toJSON: ()=>({})
    });
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDemo, setIsDemo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check for persisted demo session on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const demoSession = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Fetch user profile from Firestore
    const fetchUserProfile = async (uid)=>{
        try {
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid));
            if (userDoc.exists()) {
                return userDoc.data();
            }
            return null;
        } catch (err) {
            console.error('Error fetching user profile:', err);
            return null;
        }
    };
    // Create or update user profile in Firestore
    const createOrUpdateUserProfile = async (user, additionalData)=>{
        const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', user.uid);
        const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(userRef);
        if (!userDoc.exists()) {
            // Create new user profile
            const newProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || additionalData?.displayName || null,
                photoURL: user.photoURL,
                role: 'admin',
                createdAt: new Date(),
                lastLoginAt: new Date(),
                ...additionalData
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                ...newProfile,
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            return newProfile;
        } else {
            // Update last login
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
            return userDoc.data();
        }
    };
    // Listen for auth state changes (only for non-demo users)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Skip Firebase listener if in demo mode
        if (isDemo) return;
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], async (firebaseUser)=>{
            // Don't override demo session
            const demoSession = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            setUser(firebaseUser);
            if (firebaseUser) {
                const profile = await fetchUserProfile(firebaseUser.uid);
                if (profile) {
                    setUserProfile(profile);
                } else {
                    // Create profile if doesn't exist
                    const newProfile = await createOrUpdateUserProfile(firebaseUser);
                    setUserProfile(newProfile);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        isDemo
    ]);
    // Login
    const login = async (email, password, rememberMe = true)=>{
        try {
            setError(null);
            setLoading(true);
            // Check for demo login
            if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
                // Demo mode - no Firebase auth needed
                setUser(createDemoUser());
                setUserProfile(DEMO_USER_PROFILE);
                setIsDemo(true);
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                setLoading(false);
                return;
            }
            // Regular Firebase login
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
            // Update last login in Firestore
            await createOrUpdateUserProfile(result.user);
            setIsDemo(false);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (err) {
            const errorMessage = getAuthErrorMessage(err.code || '');
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    // Logout
    const logout = async ()=>{
        try {
            setError(null);
            // Clear demo session if active
            if (isDemo) {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                setUser(null);
                setUserProfile(null);
                setIsDemo(false);
                return;
            }
            // Regular Firebase logout
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]);
            setUser(null);
            setUserProfile(null);
        } catch (err) {
            setError('Failed to log out. Please try again.');
            throw err;
        }
    };
    // Register new user
    const register = async (email, password, displayName)=>{
        try {
            setError(null);
            setLoading(true);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
            // Update display name
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(result.user, {
                displayName
            });
            // Create user profile in Firestore
            await createOrUpdateUserProfile(result.user, {
                displayName
            });
        } catch (err) {
            const errorMessage = getAuthErrorMessage(err.code || '');
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    // Reset password
    const resetPassword = async (email)=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPasswordResetEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email);
        } catch (err) {
            const errorMessage = getAuthErrorMessage(err.code || '');
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };
    // Update user profile
    const updateUserProfile = async (data)=>{
        if (!user) throw new Error('No user logged in');
        // Demo users can't update profile in Firestore
        if (isDemo) {
            setUserProfile((prev)=>prev ? {
                    ...prev,
                    ...data
                } : null);
            return;
        }
        try {
            setError(null);
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', user.uid);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(userRef, data, {
                merge: true
            });
            // Update local state
            setUserProfile((prev)=>prev ? {
                    ...prev,
                    ...data
                } : null);
            // Update Firebase Auth profile if name changed
            if (data.displayName) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(user, {
                    displayName: data.displayName
                });
            }
        } catch (err) {
            setError('Failed to update profile');
            throw err;
        }
    };
    // Clear error
    const clearError = ()=>setError(null);
    const value = {
        user,
        userProfile,
        loading,
        error,
        isDemo,
        login,
        logout,
        register,
        resetPassword,
        updateUserProfile,
        clearError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
// Helper to get user-friendly error messages
function getAuthErrorMessage(code) {
    switch(code){
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        case 'auth/invalid-credential':
            return 'Invalid email or password.';
        default:
            return 'An error occurred. Please try again.';
    }
}
}),
"[project]/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "conditionFields",
    ()=>conditionFields,
    "useApp",
    ()=>useApp,
    "useInventory",
    ()=>useInventory,
    "useLocationStock",
    ()=>useLocationStock,
    "useLocations",
    ()=>useLocations,
    "useOrders",
    ()=>useOrders,
    "useProductStock",
    ()=>useProductStock,
    "useProducts",
    ()=>useProducts,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const conditionFields = {
    order: [
        {
            value: 'channel',
            label: 'Sales Channel'
        },
        {
            value: 'total',
            label: 'Order Total'
        },
        {
            value: 'item_count',
            label: 'Item Count'
        },
        {
            value: 'shipping_country',
            label: 'Ship To Country'
        },
        {
            value: 'shipping_state',
            label: 'Ship To State'
        },
        {
            value: 'customer_email',
            label: 'Customer Email'
        },
        {
            value: 'contains_sku',
            label: 'Contains SKU'
        },
        {
            value: 'weight',
            label: 'Total Weight'
        },
        {
            value: 'is_prime',
            label: 'Is Amazon Prime'
        },
        {
            value: 'requires_signature',
            label: 'Requires Signature'
        }
    ],
    inventory: [
        {
            value: 'sku',
            label: 'Product SKU'
        },
        {
            value: 'category',
            label: 'Category'
        },
        {
            value: 'quantity',
            label: 'Quantity'
        },
        {
            value: 'location',
            label: 'Location'
        },
        {
            value: 'cost',
            label: 'Product Cost'
        }
    ]
};
// Reducer
function appReducer(state, action) {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_INITIALIZED':
            return {
                ...state,
                isInitialized: action.payload
            };
        case 'RESET_STATE':
            return {
                ...initialState,
                isLoading: false,
                isInitialized: true
            };
        // Products
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((p)=>p.id === action.payload.id ? action.payload : p)
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((p)=>p.id !== action.payload)
            };
        // Inventory
        case 'SET_INVENTORY':
            return {
                ...state,
                inventory: action.payload
            };
        case 'UPDATE_INVENTORY':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? action.payload : inv)
            };
        case 'ADJUST_STOCK':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? {
                        ...inv,
                        quantity: inv.quantity + action.payload.adjustment,
                        updatedAt: new Date()
                    } : inv)
            };
        // Locations
        case 'SET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };
        case 'ADD_LOCATION':
            return {
                ...state,
                locations: [
                    ...state.locations,
                    action.payload
                ]
            };
        case 'UPDATE_LOCATION':
            return {
                ...state,
                locations: state.locations.map((l)=>l.id === action.payload.id ? action.payload : l)
            };
        case 'DELETE_LOCATION':
            return {
                ...state,
                locations: state.locations.filter((l)=>l.id !== action.payload)
            };
        // Orders
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload
            };
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.payload
                ]
            };
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.id ? action.payload : o)
            };
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.orderId ? {
                        ...o,
                        status: action.payload.status,
                        updatedAt: new Date()
                    } : o)
            };
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: state.orders.filter((o)=>o.id !== action.payload)
            };
        // Purchase Orders
        case 'SET_PURCHASE_ORDERS':
            return {
                ...state,
                purchaseOrders: action.payload
            };
        case 'ADD_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: [
                    ...state.purchaseOrders,
                    action.payload
                ]
            };
        case 'UPDATE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.map((po)=>po.id === action.payload.id ? action.payload : po)
            };
        case 'DELETE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.filter((po)=>po.id !== action.payload)
            };
        // Work Orders
        case 'SET_WORK_ORDERS':
            return {
                ...state,
                workOrders: action.payload
            };
        case 'ADD_WORK_ORDER':
            return {
                ...state,
                workOrders: [
                    ...state.workOrders,
                    action.payload
                ]
            };
        case 'UPDATE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.map((wo)=>wo.id === action.payload.id ? action.payload : wo)
            };
        case 'DELETE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.filter((wo)=>wo.id !== action.payload)
            };
        // Bundles
        case 'SET_BUNDLES':
            return {
                ...state,
                bundles: action.payload
            };
        case 'ADD_BUNDLE':
            return {
                ...state,
                bundles: [
                    ...state.bundles,
                    action.payload
                ]
            };
        case 'UPDATE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.filter((b)=>b.id !== action.payload)
            };
        // Shipments
        case 'SET_SHIPMENTS':
            return {
                ...state,
                shipments: action.payload
            };
        case 'ADD_SHIPMENT':
            return {
                ...state,
                shipments: [
                    ...state.shipments,
                    action.payload
                ]
            };
        case 'UPDATE_SHIPMENT':
            return {
                ...state,
                shipments: state.shipments.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        // Boxes
        case 'SET_BOXES':
            return {
                ...state,
                boxes: action.payload
            };
        case 'ADD_BOX':
            return {
                ...state,
                boxes: [
                    ...state.boxes,
                    action.payload
                ]
            };
        case 'UPDATE_BOX':
            return {
                ...state,
                boxes: state.boxes.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BOX':
            return {
                ...state,
                boxes: state.boxes.filter((b)=>b.id !== action.payload)
            };
        // Suppliers
        case 'SET_SUPPLIERS':
            return {
                ...state,
                suppliers: action.payload
            };
        case 'ADD_SUPPLIER':
            return {
                ...state,
                suppliers: [
                    ...state.suppliers,
                    action.payload
                ]
            };
        case 'UPDATE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        case 'DELETE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.filter((s)=>s.id !== action.payload),
                productSuppliers: state.productSuppliers.filter((ps)=>ps.supplierId !== action.payload)
            };
        case 'SET_PRODUCT_SUPPLIERS':
            return {
                ...state,
                productSuppliers: action.payload
            };
        case 'ADD_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: [
                    ...state.productSuppliers,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.map((ps)=>ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId ? action.payload : ps)
            };
        case 'REMOVE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.filter((ps)=>!(ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId))
            };
        // Settings
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        // Picking Batches
        case 'SET_PICKING_BATCHES':
            return {
                ...state,
                pickingBatches: action.payload
            };
        case 'ADD_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: [
                    ...state.pickingBatches,
                    action.payload
                ]
            };
        case 'UPDATE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.filter((b)=>b.id !== action.payload),
                // Also remove batch assignment from orders
                orders: state.orders.map((o)=>o.pickingBatchId === action.payload ? {
                        ...o,
                        pickingBatchId: undefined
                    } : o)
            };
        case 'ASSIGN_ORDER_TO_BATCH':
            {
                const { orderId, batchId } = action.payload;
                // Update the order's pickingBatchId
                const updatedOrders = state.orders.map((o)=>o.id === orderId ? {
                        ...o,
                        pickingBatchId: batchId || undefined
                    } : o);
                // Update the batch's orderIds
                let updatedBatches = state.pickingBatches;
                if (batchId) {
                    updatedBatches = state.pickingBatches.map((b)=>{
                        if (b.id === batchId && !b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: [
                                    ...b.orderIds,
                                    orderId
                                ]
                            };
                        }
                        // Remove from other batches
                        if (b.id !== batchId && b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: b.orderIds.filter((id)=>id !== orderId)
                            };
                        }
                        return b;
                    });
                } else {
                    // Remove from all batches
                    updatedBatches = state.pickingBatches.map((b)=>({
                            ...b,
                            orderIds: b.orderIds.filter((id)=>id !== orderId)
                        }));
                }
                return {
                    ...state,
                    orders: updatedOrders,
                    pickingBatches: updatedBatches
                };
            }
        // Returns
        case 'SET_RETURNS':
            return {
                ...state,
                returns: action.payload
            };
        case 'ADD_RETURN':
            return {
                ...state,
                returns: [
                    ...state.returns,
                    action.payload
                ]
            };
        case 'UPDATE_RETURN':
            return {
                ...state,
                returns: state.returns.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        // Stock Counts
        case 'SET_STOCK_COUNTS':
            return {
                ...state,
                stockCounts: action.payload
            };
        case 'ADD_STOCK_COUNT':
            return {
                ...state,
                stockCounts: [
                    ...state.stockCounts,
                    action.payload
                ]
            };
        case 'UPDATE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.map((sc)=>sc.id === action.payload.id ? action.payload : sc)
            };
        case 'DELETE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.filter((sc)=>sc.id !== action.payload)
            };
        // Transfers
        case 'SET_TRANSFERS':
            return {
                ...state,
                transfers: action.payload
            };
        case 'ADD_TRANSFER':
            return {
                ...state,
                transfers: [
                    ...state.transfers,
                    action.payload
                ]
            };
        case 'UPDATE_TRANSFER':
            return {
                ...state,
                transfers: state.transfers.map((t)=>t.id === action.payload.id ? action.payload : t)
            };
        // Automation Rules
        case 'SET_AUTOMATION_RULES':
            return {
                ...state,
                automationRules: action.payload
            };
        case 'ADD_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: [
                    ...state.automationRules,
                    action.payload
                ]
            };
        case 'UPDATE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        case 'DELETE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.filter((r)=>r.id !== action.payload)
            };
        case 'TOGGLE_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload ? {
                        ...r,
                        enabled: !r.enabled,
                        updatedAt: new Date()
                    } : r)
            };
        // Serial Numbers
        case 'SET_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: action.payload
            };
        case 'ADD_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: [
                    ...state.serialNumbers,
                    ...action.payload
                ]
            };
        case 'UPDATE_SERIAL_NUMBER':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.id === action.payload.id ? action.payload : sn)
            };
        case 'RESERVE_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'reserved',
                        salesOrderId: action.payload.orderId
                    } : sn)
            };
        case 'SELL_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'sold',
                        salesOrderId: action.payload.orderId,
                        soldAt: new Date()
                    } : sn)
            };
        case 'RETURN_SERIAL':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.serial === action.payload.serial ? {
                        ...sn,
                        status: action.payload.condition,
                        salesOrderId: undefined,
                        soldAt: undefined
                    } : sn)
            };
        case 'ADD_SERIAL_MOVEMENT':
            return {
                ...state,
                serialMovements: [
                    ...state.serialMovements,
                    action.payload
                ]
            };
        // Lots
        case 'SET_LOTS':
            return {
                ...state,
                lots: action.payload
            };
        case 'ADD_LOT':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    action.payload
                ]
            };
        case 'ADD_LOTS':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    ...action.payload
                ]
            };
        case 'UPDATE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.id ? action.payload : lot)
            };
        case 'PICK_FROM_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        quantity: lot.quantity - action.payload.quantity,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RESERVE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: lot.reservedQty + action.payload.quantity
                    } : lot)
            };
        case 'RELEASE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RECALL_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'recalled',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'QUARANTINE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'quarantine',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'ADD_LOT_MOVEMENT':
            return {
                ...state,
                lotMovements: [
                    ...state.lotMovements,
                    action.payload
                ]
            };
        // Picking Totes
        case 'SET_PICKING_TOTES':
            return {
                ...state,
                pickingTotes: action.payload
            };
        case 'ADD_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: [
                    ...state.pickingTotes,
                    action.payload
                ]
            };
        case 'UPDATE_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: state.pickingTotes.map((t)=>t.id === action.payload.id ? action.payload : t)
            };
        case 'DELETE_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: state.pickingTotes.filter((t)=>t.id !== action.payload)
            };
        // Fulfillment Rules
        case 'SET_FULFILLMENT_RULES':
            return {
                ...state,
                fulfillmentRules: action.payload
            };
        case 'ADD_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: [
                    ...state.fulfillmentRules,
                    action.payload
                ]
            };
        case 'UPDATE_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: state.fulfillmentRules.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        case 'DELETE_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: state.fulfillmentRules.filter((r)=>r.id !== action.payload)
            };
        default:
            return state;
    }
}
// Initial State
const initialState = {
    products: [],
    inventory: [],
    locations: [],
    orders: [],
    purchaseOrders: [],
    workOrders: [],
    bundles: [],
    shipments: [],
    boxes: [],
    pickingBatches: [],
    pickingTotes: [],
    fulfillmentRules: [],
    returns: [],
    stockCounts: [],
    transfers: [],
    automationRules: [],
    serialNumbers: [],
    serialMovements: [],
    lots: [],
    lotMovements: [],
    suppliers: [],
    productSuppliers: [],
    settings: {
        companyName: 'Cronk Nutrients',
        defaultLocation: 'loc-1',
        gripperStickerEnabled: true,
        gripperStickerSku: 'LAB010R',
        smartBoxEnabled: true,
        lowStockThreshold: 50,
        // Picking Settings
        pickingMode: 'multi_tote',
        maxOrdersPerBatch: 20,
        maxItemsPerBatch: 100,
        autoReallocateIncomplete: true
    },
    isLoading: true,
    isInitialized: false
};
// Context
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    const { isDemo, loading: authLoading, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Initialize data - mock data for demo, empty for real users
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Wait for auth to finish loading
        if (authLoading) return;
        const initializeData = async ()=>{
            try {
                // If not demo mode, reset to empty state for real users
                if (!isDemo) {
                    // For real users: empty state, they import their own data
                    // This also clears any demo data if switching from demo to real user
                    // In the future, this would load from Firestore per user
                    dispatch({
                        type: 'RESET_STATE'
                    });
                    return;
                }
                // Demo mode: Import mock data dynamically to avoid circular dependencies
                const { products, locations, inventory, orders, purchaseOrders, workOrders, bundles, shippingBoxes } = await __turbopack_context__.A("[project]/data/mockData.ts [app-ssr] (ecmascript, async loader)");
                // Transform existing mock data to match new interfaces
                const transformedLocations = locations.map((loc)=>({
                        id: loc.id,
                        name: loc.name,
                        type: loc.type,
                        address: undefined,
                        isDefault: loc.id === 'loc-1'
                    }));
                const transformedProducts = products.map((p)=>({
                        id: p.id,
                        name: p.name,
                        sku: p.sku,
                        barcode: p.barcode,
                        category: p.category,
                        description: undefined,
                        cost: {
                            rolling: p.costs.base,
                            fixed: p.costs.base
                        },
                        prices: {
                            msrp: p.prices.msrp,
                            shopify: p.prices.shopify,
                            amazon: p.prices.amazon,
                            wholesale: p.prices.wholesale
                        },
                        weight: {
                            value: p.weight || 0,
                            unit: 'lbs'
                        },
                        dimensions: p.dimensions || {
                            length: 0,
                            width: 0,
                            height: 0
                        },
                        reorderPoint: p.reorderPoint,
                        supplier: p.defaultVendor,
                        skus: {
                            shopify: `SHOP-${p.sku}`,
                            amazon: `AMZ-${p.sku}`
                        },
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt)
                    }));
                const transformedInventory = inventory.map((inv)=>({
                        productId: inv.productId,
                        locationId: inv.locationId,
                        quantity: inv.quantity,
                        binLocation: inv.binLocation,
                        updatedAt: new Date()
                    }));
                // Map mockData status to AppContext status
                const mapOrderStatus = (status)=>{
                    const statusMap = {
                        'ready_to_ship': 'ready',
                        'in_progress': 'picking'
                    };
                    return statusMap[status] || status;
                };
                const transformedOrders = orders.map((o)=>({
                        id: o.id,
                        orderNumber: o.orderNumber,
                        veeqoId: o.externalId,
                        channel: o.channel,
                        status: mapOrderStatus(o.status),
                        customer: {
                            name: o.customer.name,
                            email: o.customer.email,
                            phone: o.customer.phone,
                            address: {
                                street: o.shippingAddress.line1,
                                city: o.shippingAddress.city,
                                state: o.shippingAddress.state,
                                zip: o.shippingAddress.postalCode,
                                country: o.shippingAddress.country
                            }
                        },
                        items: o.items.map((item)=>({
                                productId: item.productId || item.bundleId || '',
                                productName: item.name,
                                sku: item.sku,
                                quantity: item.quantity,
                                price: item.price,
                                cost: item.cost,
                                picked: false
                            })),
                        subtotal: o.subtotal,
                        shipping: o.shipping,
                        tax: o.tax,
                        discount: 0,
                        total: o.total,
                        cogs: o.cogs,
                        profit: o.profit,
                        margin: o.marginPercent,
                        trackingNumber: o.shipments?.[0]?.trackingNumber,
                        carrier: o.shipments?.[0]?.carrier,
                        createdAt: new Date(o.createdAt),
                        updatedAt: new Date(o.updatedAt)
                    }));
                const transformedPOs = purchaseOrders.map((po)=>({
                        id: po.id,
                        poNumber: po.poNumber,
                        supplier: po.supplier.name,
                        status: po.status,
                        currency: po.currency,
                        expectedDate: po.expectedDate ? new Date(po.expectedDate) : undefined,
                        items: po.items.map((item)=>({
                                productId: item.productId,
                                productName: item.product?.name || '',
                                sku: item.product?.sku || '',
                                quantity: item.quantity,
                                receivedQty: item.quantityReceived,
                                unitCost: item.unitCost
                            })),
                        subtotal: po.subtotal,
                        shipping: 0,
                        total: po.subtotalUSD,
                        notes: po.notes,
                        createdAt: new Date(po.createdAt),
                        updatedAt: new Date(po.createdAt)
                    }));
                const transformedWOs = workOrders.map((wo)=>({
                        id: wo.id,
                        woNumber: wo.woNumber,
                        status: wo.status,
                        outputProductId: wo.outputProductId,
                        outputProductName: wo.outputProduct?.name || '',
                        quantityToProduce: wo.outputQuantity,
                        quantityProduced: wo.status === 'completed' ? wo.outputQuantity : 0,
                        priority: 'normal',
                        components: wo.inputs.map((input)=>({
                                productId: input.productId,
                                productName: input.product?.name || '',
                                quantityRequired: input.quantityRequired,
                                quantityUsed: input.quantityUsed
                            })),
                        notes: wo.notes,
                        createdAt: new Date(wo.createdAt),
                        completedAt: wo.completedAt ? new Date(wo.completedAt) : undefined
                    }));
                const transformedBundles = bundles.map((b)=>({
                        id: b.id,
                        name: b.name,
                        sku: b.sku,
                        type: 'virtual',
                        description: b.description,
                        prices: {
                            msrp: b.prices.msrp,
                            shopify: b.prices.shopify,
                            amazon: b.prices.amazon,
                            wholesale: b.prices.wholesale || b.prices.msrp * 0.6
                        },
                        compareAtPrices: b.compareAtPrices || {
                            msrp: b.prices.msrp * 1.2,
                            shopify: (b.prices.shopify || b.prices.msrp) * 1.2,
                            amazon: (b.prices.amazon || b.prices.msrp) * 1.2
                        },
                        components: (b.components || []).map((c)=>({
                                productId: c.productId,
                                productName: c.product?.name || '',
                                quantity: c.quantity
                            })),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }));
                const transformedBoxes = shippingBoxes.map((box)=>({
                        id: box.id,
                        name: box.name,
                        sku: box.sku,
                        innerLength: box.dimensions.length,
                        innerWidth: box.dimensions.width,
                        innerHeight: box.dimensions.height,
                        maxWeight: box.maxWeight,
                        cost: box.cost,
                        smartBoxEligible: box.isSmartBoxEligible
                    }));
                // Create mock shipments from shipped orders
                const mockShipments = transformedOrders.filter((o)=>o.status === 'shipped' || o.status === 'delivered').map((o)=>({
                        id: `ship-${o.id}`,
                        orderId: o.id,
                        orderNumber: o.orderNumber,
                        carrier: o.carrier || 'usps',
                        service: o.service || 'Priority Mail',
                        trackingNumber: o.trackingNumber || `TRK${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
                        customerPaid: o.shipping,
                        actualCost: o.shipping * 0.7,
                        profit: o.shipping * 0.3,
                        weight: 2.5,
                        status: o.status === 'delivered' ? 'delivered' : 'in_transit',
                        customerName: o.customer.name,
                        customerCity: o.customer.address.city,
                        customerState: o.customer.address.state,
                        shippedAt: new Date(o.updatedAt),
                        deliveredAt: o.status === 'delivered' ? new Date() : undefined
                    }));
                // Create mock picking batches
                const mockPickingBatches = [
                    {
                        id: 'batch-1',
                        batchNumber: 'PB-001',
                        status: 'open',
                        orderIds: [],
                        createdAt: new Date()
                    },
                    {
                        id: 'batch-2',
                        batchNumber: 'PB-002',
                        status: 'in_progress',
                        orderIds: [],
                        assignedTo: 'John',
                        createdAt: new Date(Date.now() - 86400000)
                    }
                ];
                // Create mock returns
                const mockReturns = [
                    {
                        id: 'return-1',
                        returnNumber: 'RET-0001',
                        orderId: 'order-5',
                        orderNumber: 'SH-4518',
                        channel: 'shopify',
                        status: 'requested',
                        customer: {
                            name: 'James Wilson',
                            email: 'jwilson@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-mic-1l',
                                productName: '1L Micro 5-0-1',
                                sku: 'CNMIC1L',
                                quantity: 1,
                                quantityReceived: 0,
                                reason: 'damaged_in_transit',
                                refundAmount: 12.99
                            }
                        ],
                        returnShipping: {},
                        refund: {
                            subtotal: 12.99,
                            shipping: 0,
                            restockingFee: 0,
                            total: 12.99
                        },
                        createdAt: new Date(Date.now() - 86400000),
                        updatedAt: new Date(Date.now() - 86400000)
                    },
                    {
                        id: 'return-2',
                        returnNumber: 'RET-0002',
                        orderId: 'order-6',
                        orderNumber: 'AZ-8833',
                        channel: 'amazon_fbm',
                        status: 'in_transit',
                        customer: {
                            name: 'Lisa Chen',
                            email: 'lchen@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-bb-500',
                                productName: '500mL Bud Booster 0-1-3',
                                sku: 'CNBB500ML',
                                quantity: 2,
                                quantityReceived: 0,
                                reason: 'changed_mind',
                                refundAmount: 45.76
                            }
                        ],
                        returnShipping: {
                            trackingNumber: 'RET123456789',
                            carrier: 'usps'
                        },
                        refund: {
                            subtotal: 45.76,
                            shipping: 0,
                            restockingFee: 4.58,
                            total: 41.18
                        },
                        createdAt: new Date(Date.now() - 172800000),
                        updatedAt: new Date(Date.now() - 86400000)
                    },
                    {
                        id: 'return-3',
                        returnNumber: 'RET-0003',
                        orderId: 'order-7',
                        orderNumber: 'SH-4517',
                        channel: 'shopify',
                        status: 'received',
                        customer: {
                            name: 'Tom Brady',
                            email: 'tbrady@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-gro-1l',
                                productName: '1L Grow 2-1-6',
                                sku: 'CNGRO1L',
                                quantity: 1,
                                quantityReceived: 1,
                                reason: 'defective',
                                refundAmount: 12.99
                            }
                        ],
                        returnShipping: {
                            trackingNumber: 'RET987654321',
                            carrier: 'ups'
                        },
                        refund: {
                            subtotal: 12.99,
                            shipping: 6.99,
                            restockingFee: 0,
                            total: 19.98
                        },
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date()
                    }
                ];
                // Create mock stock counts
                const mockStockCounts = [
                    {
                        id: 'sc-1',
                        countNumber: 'SC-0001',
                        name: 'Weekly Cycle Count - Zone A',
                        type: 'cycle',
                        status: 'in_progress',
                        location: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        assignedTo: 'John',
                        items: [
                            {
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                binLocation: 'A1-01',
                                systemQty: 150,
                                countedQty: 148,
                                variance: -2,
                                varianceValue: -10.50,
                                status: 'counted',
                                countedAt: new Date(Date.now() - 3600000)
                            },
                            {
                                productId: 'prod-mic-1l',
                                productName: '1L Micro 5-0-1',
                                sku: 'CNMIC1L',
                                binLocation: 'A1-02',
                                systemQty: 75,
                                countedQty: null,
                                variance: 0,
                                varianceValue: 0,
                                status: 'pending'
                            }
                        ],
                        summary: {
                            totalItems: 15,
                            countedItems: 8,
                            matchedItems: 6,
                            discrepancyItems: 2,
                            totalVariance: -24.50
                        },
                        startedAt: new Date(Date.now() - 86400000),
                        createdAt: new Date(Date.now() - 86400000),
                        updatedAt: new Date()
                    },
                    {
                        id: 'sc-2',
                        countNumber: 'SC-0002',
                        name: 'Monthly Full Count - December',
                        type: 'full',
                        status: 'completed',
                        location: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        items: [],
                        summary: {
                            totalItems: 45,
                            countedItems: 45,
                            matchedItems: 42,
                            discrepancyItems: 3,
                            totalVariance: -156.75
                        },
                        startedAt: new Date(Date.now() - 604800000),
                        completedAt: new Date(Date.now() - 518400000),
                        createdAt: new Date(Date.now() - 604800000),
                        updatedAt: new Date(Date.now() - 518400000)
                    }
                ];
                // Create mock transfers
                const mockTransfers = [
                    {
                        id: 'trf-1',
                        transferNumber: 'TRF-0001',
                        status: 'in_transit',
                        fromLocation: 'loc-warehouse',
                        fromLocationName: 'Texas Warehouse',
                        toLocation: 'loc-fba',
                        toLocationName: 'FBA Inbound',
                        items: [
                            {
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                requestedQty: 50,
                                shippedQty: 50,
                                receivedQty: 0,
                                status: 'shipped'
                            },
                            {
                                productId: 'prod-bb-500',
                                productName: '500mL Bud Booster 0-1-3',
                                sku: 'CNBB500ML',
                                requestedQty: 30,
                                shippedQty: 30,
                                receivedQty: 0,
                                status: 'shipped'
                            }
                        ],
                        notes: 'FBA replenishment shipment',
                        shippedAt: new Date(Date.now() - 172800000),
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date(Date.now() - 172800000)
                    },
                    {
                        id: 'trf-2',
                        transferNumber: 'TRF-0002',
                        status: 'received',
                        fromLocation: 'loc-warehouse',
                        fromLocationName: 'Texas Warehouse',
                        toLocation: 'loc-fba',
                        toLocationName: 'FBA Inbound',
                        items: [
                            {
                                productId: 'prod-gro-1l',
                                productName: '1L Grow 2-1-6',
                                sku: 'CNGRO1L',
                                requestedQty: 100,
                                shippedQty: 100,
                                receivedQty: 98,
                                status: 'short'
                            }
                        ],
                        notes: 'Weekly FBA restock',
                        shippedAt: new Date(Date.now() - 604800000),
                        receivedAt: new Date(Date.now() - 518400000),
                        createdAt: new Date(Date.now() - 691200000),
                        updatedAt: new Date(Date.now() - 518400000)
                    }
                ];
                // Create mock automation rules
                const mockAutomationRules = [
                    {
                        id: 'rule-1',
                        name: 'Tag Amazon Prime orders',
                        description: 'Automatically add PRIME tag to Amazon Prime orders for priority handling',
                        enabled: true,
                        trigger: {
                            type: 'order_created'
                        },
                        conditions: [
                            {
                                id: 'cond-1',
                                field: 'channel',
                                operator: 'equals',
                                value: 'amazon_fbm'
                            }
                        ],
                        actions: [
                            {
                                id: 'act-1',
                                type: 'set_order_tag',
                                config: {
                                    tag: 'PRIME'
                                }
                            },
                            {
                                id: 'act-2',
                                type: 'set_priority',
                                config: {
                                    priority: 'high'
                                }
                            }
                        ],
                        priority: 1,
                        createdAt: new Date(Date.now() - 604800000),
                        updatedAt: new Date(Date.now() - 604800000)
                    },
                    {
                        id: 'rule-2',
                        name: 'Auto-assign USPS for small orders',
                        description: 'Orders under $50 and less than 1lb ship USPS First Class',
                        enabled: true,
                        trigger: {
                            type: 'order_created'
                        },
                        conditions: [
                            {
                                id: 'cond-2',
                                field: 'total',
                                operator: 'less_than',
                                value: 50
                            }
                        ],
                        actions: [
                            {
                                id: 'act-3',
                                type: 'assign_carrier',
                                config: {
                                    carrier: 'usps'
                                }
                            },
                            {
                                id: 'act-4',
                                type: 'assign_service',
                                config: {
                                    service: 'first_class'
                                }
                            }
                        ],
                        priority: 2,
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date(Date.now() - 259200000)
                    },
                    {
                        id: 'rule-3',
                        name: 'Low stock notification',
                        description: 'Send email when stock falls below 50 units',
                        enabled: false,
                        trigger: {
                            type: 'low_stock',
                            threshold: 50
                        },
                        conditions: [],
                        actions: [
                            {
                                id: 'act-5',
                                type: 'send_notification',
                                config: {
                                    message: 'Stock is running low!'
                                }
                            },
                            {
                                id: 'act-6',
                                type: 'create_po_draft',
                                config: {
                                    quantity: 100
                                }
                            }
                        ],
                        priority: 3,
                        createdAt: new Date(Date.now() - 172800000),
                        updatedAt: new Date(Date.now() - 172800000)
                    }
                ];
                // Create mock lots
                const mockLots = [
                    {
                        id: 'lot-1',
                        lotNumber: 'LOT-20241215-001',
                        productId: 'prod-mic-500',
                        productName: '500mL Micro 5-0-1',
                        sku: 'CNMIC500ML',
                        quantity: 100,
                        reservedQty: 5,
                        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        supplierLotNumber: 'HG-2024-1234'
                    },
                    {
                        id: 'lot-2',
                        lotNumber: 'LOT-20241201-001',
                        productId: 'prod-mic-500',
                        productName: '500mL Micro 5-0-1',
                        sku: 'CNMIC500ML',
                        quantity: 50,
                        reservedQty: 0,
                        expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        supplierLotNumber: 'HG-2024-1198'
                    },
                    {
                        id: 'lot-3',
                        lotNumber: 'LOT-20241220-001',
                        productId: 'prod-gro-1l',
                        productName: '1L Grow 2-1-6',
                        sku: 'CNGRO1L',
                        quantity: 75,
                        reservedQty: 10,
                        expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse'
                    },
                    {
                        id: 'lot-4',
                        lotNumber: 'LOT-20241101-001',
                        productId: 'prod-bb-500',
                        productName: '500mL Bud Booster 0-1-3',
                        sku: 'CNBB500ML',
                        quantity: 25,
                        reservedQty: 0,
                        expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        status: 'expired',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        notes: 'Expired - pending disposal'
                    },
                    {
                        id: 'lot-5',
                        lotNumber: 'LOT-20241210-001',
                        productId: 'prod-mic-1l',
                        productName: '1L Micro 5-0-1',
                        sku: 'CNMIC1L',
                        quantity: 40,
                        reservedQty: 0,
                        receivedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
                        status: 'quarantine',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        notes: 'Quality check pending - suspected contamination'
                    }
                ];
                dispatch({
                    type: 'SET_LOCATIONS',
                    payload: transformedLocations
                });
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: transformedProducts
                });
                dispatch({
                    type: 'SET_INVENTORY',
                    payload: transformedInventory
                });
                dispatch({
                    type: 'SET_ORDERS',
                    payload: transformedOrders
                });
                dispatch({
                    type: 'SET_PURCHASE_ORDERS',
                    payload: transformedPOs
                });
                dispatch({
                    type: 'SET_WORK_ORDERS',
                    payload: transformedWOs
                });
                dispatch({
                    type: 'SET_BUNDLES',
                    payload: transformedBundles
                });
                dispatch({
                    type: 'SET_BOXES',
                    payload: transformedBoxes
                });
                dispatch({
                    type: 'SET_SHIPMENTS',
                    payload: mockShipments
                });
                dispatch({
                    type: 'SET_PICKING_BATCHES',
                    payload: mockPickingBatches
                });
                dispatch({
                    type: 'SET_RETURNS',
                    payload: mockReturns
                });
                dispatch({
                    type: 'SET_STOCK_COUNTS',
                    payload: mockStockCounts
                });
                dispatch({
                    type: 'SET_TRANSFERS',
                    payload: mockTransfers
                });
                dispatch({
                    type: 'SET_AUTOMATION_RULES',
                    payload: mockAutomationRules
                });
                dispatch({
                    type: 'SET_LOTS',
                    payload: mockLots
                });
                // Create mock suppliers
                const mockSuppliers = [
                    {
                        id: 'sup-hgc',
                        name: 'HIGROCORP INC.',
                        code: 'HGC',
                        contactName: 'John Martinez',
                        email: 'john@higrocorp.com',
                        phone: '(555) 123-4567',
                        website: 'https://higrocorp.com',
                        address: {
                            street: '123 Industrial Blvd',
                            city: 'Houston',
                            state: 'TX',
                            zip: '77001',
                            country: 'US'
                        },
                        currency: 'USD',
                        paymentTerms: 'Net 30',
                        leadTimeDays: 14,
                        minimumOrderValue: 500,
                        notes: 'Primary nutrient supplier',
                        isActive: true,
                        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: 'sup-btl',
                        name: 'Bottle Supply Co',
                        code: 'BTL',
                        contactName: 'Sarah Chen',
                        email: 'sarah@bottlesupply.com',
                        phone: '(555) 987-6543',
                        currency: 'USD',
                        paymentTerms: 'Net 15',
                        leadTimeDays: 7,
                        minimumOrderValue: 250,
                        isActive: true,
                        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: 'sup-lbl',
                        name: 'Label Pros International',
                        code: 'LBL',
                        contactName: 'Mike Wilson',
                        email: 'mike@labelpros.com',
                        phone: '(555) 456-7890',
                        currency: 'USD',
                        paymentTerms: 'COD',
                        leadTimeDays: 10,
                        isActive: true,
                        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                ];
                // Create mock product-supplier relationships
                const mockProductSuppliers = [
                    {
                        productId: 'prod-mic-500',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-MIC-500',
                        unitCost: 3.50,
                        currency: 'USD',
                        minimumOrderQty: 100,
                        leadTimeDays: 14,
                        isPrimary: true,
                        lastOrderedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    },
                    {
                        productId: 'prod-mic-1l',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-MIC-1L',
                        unitCost: 5.75,
                        currency: 'USD',
                        minimumOrderQty: 50,
                        leadTimeDays: 14,
                        isPrimary: true
                    },
                    {
                        productId: 'prod-gro-1l',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-GRO-1L',
                        unitCost: 5.50,
                        currency: 'USD',
                        minimumOrderQty: 50,
                        isPrimary: true
                    },
                    {
                        productId: 'prod-bb-500',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-BB-500',
                        unitCost: 4.25,
                        currency: 'USD',
                        minimumOrderQty: 100,
                        isPrimary: true
                    }
                ];
                dispatch({
                    type: 'SET_SUPPLIERS',
                    payload: mockSuppliers
                });
                dispatch({
                    type: 'SET_PRODUCT_SUPPLIERS',
                    payload: mockProductSuppliers
                });
                dispatch({
                    type: 'SET_LOADING',
                    payload: false
                });
                dispatch({
                    type: 'SET_INITIALIZED',
                    payload: true
                });
            } catch (error) {
                console.error('Failed to initialize app data:', error);
                dispatch({
                    type: 'SET_LOADING',
                    payload: false
                });
            }
        };
        initializeData();
    }, [
        isDemo,
        authLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AppContext.tsx",
        lineNumber: 1976,
        columnNumber: 5
    }, this);
}
function useApp() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
function useProducts() {
    const { state } = useApp();
    return state.products;
}
function useOrders() {
    const { state } = useApp();
    return state.orders;
}
function useInventory() {
    const { state } = useApp();
    return state.inventory;
}
function useLocations() {
    const { state } = useApp();
    return state.locations;
}
function useSettings() {
    const { state } = useApp();
    return state.settings;
}
function useProductStock(productId) {
    const { state } = useApp();
    return state.inventory.filter((inv)=>inv.productId === productId).reduce((total, inv)=>total + inv.quantity, 0);
}
function useLocationStock(productId, locationId) {
    const { state } = useApp();
    const inv = state.inventory.find((i)=>i.productId === productId && i.locationId === locationId);
    return inv?.quantity || 0;
}
}),
"[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, message, duration = 4000)=>{
        const id = Math.random().toString(36).substring(7);
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    type,
                    message,
                    duration
                }
            ]);
        if (duration > 0) {
            setTimeout(()=>{
                setToasts((prev)=>prev.filter((t)=>t.id !== id));
            }, duration);
        }
    }, []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    }, []);
    // Convenience methods
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('success', message, duration);
    }, [
        addToast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('error', message, duration);
    }, [
        addToast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('info', message, duration);
    }, [
        addToast
    ]);
    const warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('warning', message, duration);
    }, [
        addToast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toasts,
            addToast,
            removeToast,
            success,
            error,
            info,
            warning
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContainer, {
                toasts: toasts,
                removeToast: removeToast
            }, void 0, false, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function useToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
// Toast icons mapping
const toastIcons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
};
// Toast colors mapping
const toastColors = {
    success: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
    },
    error: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        text: 'text-red-400'
    },
    info: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
    },
    warning: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
    }
};
// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 space-y-2 max-w-md",
        children: toasts.map((toast)=>{
            const colors = toastColors[toast.type];
            const icon = toastIcons[toast.type];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
              animate-in slide-in-from-right-full duration-300
              ${colors.bg} ${colors.border} ${colors.text}
            `,
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${icon} flex-shrink-0`
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm flex-1",
                        children: toast.message
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>removeToast(toast.id),
                        className: "ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0",
                        "aria-label": "Dismiss",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-times text-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Toast.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this)
                ]
            }, toast.id, true, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ToastProvider;
}),
"[project]/components/ui/ConfirmDialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmProvider",
    ()=>ConfirmProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useConfirm",
    ()=>useConfirm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ConfirmContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ConfirmProvider({ children }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolvePromise, setResolvePromise] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((opts)=>{
        setOptions(opts);
        setIsOpen(true);
        return new Promise((resolve)=>{
            setResolvePromise(()=>resolve);
        });
    }, []);
    const handleConfirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        resolvePromise?.(true);
        setIsOpen(false);
        setOptions(null);
    }, [
        resolvePromise
    ]);
    const handleCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        resolvePromise?.(false);
        setIsOpen(false);
        setOptions(null);
    }, [
        resolvePromise
    ]);
    // Handle escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleEscape = (e)=>{
            if (e.key === 'Escape' && isOpen) {
                handleCancel();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return ()=>document.removeEventListener('keydown', handleEscape);
    }, [
        isOpen,
        handleCancel
    ]);
    // Prevent body scroll when dialog is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmContext.Provider, {
        value: {
            confirm
        },
        children: [
            children,
            isOpen && options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                onClick: handleCancel,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        options.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-12 rounded-full flex items-center justify-center mb-4 ${options.destructive ? 'bg-red-500/20' : 'bg-blue-500/20'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas ${options.icon} text-xl ${options.destructive ? 'text-red-400' : 'text-blue-400'}`
                            }, void 0, false, {
                                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 82,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-2",
                            children: options.title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 mb-6",
                            children: options.message
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors",
                                    children: options.cancelText || 'Cancel'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    className: `px-4 py-2 rounded-lg transition-colors font-medium ${options.destructive ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`,
                                    children: options.confirmText || 'Confirm'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ConfirmDialog.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
function useConfirm() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within ConfirmProvider');
    }
    return context.confirm;
}
const __TURBOPACK__default__export__ = ConfirmProvider;
}),
"[project]/components/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ConfirmDialog.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfirmProvider"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/Providers.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Providers.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Providers.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Providers.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Providers;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fea20eb4._.js.map
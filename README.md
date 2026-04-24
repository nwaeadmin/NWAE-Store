# NWAE Store

A dark-themed online store with falling snow, Firebase-powered accounts, an admin panel, and live chat for every order.

Hosting: GitHub Pages (free) · Backend: Firebase (free Spark plan)

---

## What you'll set up (one time, ~15 minutes)

1. A free Firebase project (handles accounts, products, orders, chats)
2. A GitHub repository with this code
3. GitHub Pages, which auto-deploys every time you push

After setup you can:

- Sign up with your **admin email** → automatically see the **Admin** link in the header
- Add / edit / delete products in the **Admin → Products** tab
- Watch new orders appear live in **Admin → Orders & Chats**, with a built-in chat for each one
- Set your PayPal email once in **Admin → Settings**

Buyers can:

- Browse without signing in
- Click **Buy** on any product → a sign-in / sign-up popup appears
- After signing up, get an automatic anonymous nickname (e.g. *FrostyFox482*)
- For PayPal: see your PayPal link to send payment
- For Robux: get auto-redirected to the Roblox gamepass
- Either way, an order opens in their **My Orders** with a live chat to you

---

## Step 1 — Create a Firebase project

1. Go to https://console.firebase.google.com and sign in with a Google account.
2. Click **Add project** → give it a name (e.g. `nwae-store`) → keep Google Analytics off (not needed) → **Create project**.

### Step 1a — Enable Email/Password sign-in

1. In the left sidebar, click **Build → Authentication → Get started**.
2. Click **Email/Password** → toggle **Enable** → **Save**.

### Step 1b — Create the database

1. In the sidebar, click **Build → Firestore Database → Create database**.
2. Choose any region close to your buyers (e.g. `eur3`, `nam5`) → **Next**.
3. Pick **Production mode** → **Create**.

### Step 1c — Get your Firebase config

1. In the sidebar, click the **gear icon → Project settings**.
2. Scroll to **Your apps** → click the **`</>`** (Web) icon.
3. Give the app any nickname → click **Register app** (skip Hosting).
4. You'll see a `firebaseConfig` block. Keep this tab open — you'll paste these values in Step 2.

---

## Step 2 — Configure this project

Open these two files in this folder and edit them:

### `src/config.ts`

Change the admin email to YOUR email (the one you'll sign up with):

```ts
export const ADMIN_EMAIL = "you@yourdomain.com";
```

### `src/firebase-config.ts`

Paste in the values from Step 1c:

```ts
export const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nwae-store.firebaseapp.com",
  projectId: "nwae-store",
  storageBucket: "nwae-store.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef",
};
```

### `firestore.rules`

Open this file and change the email on this line to the SAME email as `src/config.ts`:

```javascript
function adminEmail() {
  return "you@yourdomain.com";
}
```

---

## Step 3 — Publish the database rules

1. Back in the Firebase console, go to **Firestore Database → Rules** tab.
2. Delete everything in the editor.
3. Open `firestore.rules` from this folder, copy ALL of it, and paste into the editor.
4. Click **Publish**.

---

## Step 4 — Push to GitHub

### Option A — drag-and-drop (easiest, no command line)

1. Go to https://github.com/new → name it (e.g. `nwae-store`) → **Public** → don't add README/.gitignore → **Create repository**.
2. On the empty repo page click **uploading an existing file**.
3. Drag the **contents** of this folder (not the folder itself) into the upload box.
4. Scroll down → **Commit changes**.

### Option B — git on your computer

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

---

## Step 5 — Turn on GitHub Pages

1. In your repo, click **Settings → Pages** in the left sidebar.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it.

---

## Step 6 — Add your domain to Firebase

(So Firebase accepts sign-ups from your live site.)

1. In the Firebase console go to **Authentication → Settings → Authorized domains**.
2. Click **Add domain** → paste `YOUR-USERNAME.github.io` → **Add**.

(If you later use a custom domain like `nwaestore.com`, add that here too.)

---

## Step 7 — Wait for the build

1. Click the **Actions** tab of your repo.
2. The "Deploy to GitHub Pages" workflow will run for ~1 minute.
3. When it turns green, your site is live at:

   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

---

## Step 8 — Become the admin

1. Open the live URL.
2. Click **Sign In** (top right) → switch to **Sign up** → use the EXACT email you put in `src/config.ts` → pick a password → **Create Account**.
3. You're now signed in as admin — the **Admin** link appears in the header.
4. Open **Admin → Settings** and add your PayPal email.
5. Open **Admin → Products** and click **Add product** to list your first item.

That's everything!

---

## How buying works

**For PayPal products:**
1. Buyer clicks **Buy** → if not signed in, a sign-up popup appears.
2. Buyer is shown YOUR PayPal link with the amount pre-filled.
3. Buyer copies/opens the link to send you the money.
4. An order opens in **My Orders** with a private chat to you.
5. You see the same order in **Admin → Orders & Chats**, can mark it "Paid" once you've received the money, and chat with the buyer.

**For Robux products:**
1. Buyer clicks **Buy** → signs in if needed.
2. Buyer is auto-redirected to the gamepass URL you set.
3. An order opens in their **My Orders** with a chat to you.
4. You see it in **Admin → Orders & Chats** and can confirm + chat.

In both cases buyers are anonymous — they get a random name like `SnowyFox482` so you don't see their real email.

---

## Editing the site

| What you want to change | File to edit |
|---|---|
| Store name / tagline / admin email | `src/config.ts` |
| Firebase keys | `src/firebase-config.ts` |
| Database rules | `firestore.rules` (re-publish in console) |
| Home page hero / "Why we're different" | `src/pages/Home.tsx` |
| Top promo banner | `src/components/PromoBanner.tsx` |
| Footer links / social | `src/components/Footer.tsx` |
| Snow density | `count` prop in `src/components/Layout.tsx` |
| Colors / theme | `src/index.css` (`:root` block) |
| Terms / Privacy / Refund | `src/pages/Terms.tsx`, `Privacy.tsx`, `Refund.tsx` |

After any edit, commit/push (or edit in the GitHub web UI and commit) — the site auto-redeploys in about a minute.

---

## Optional: custom domain

1. Buy a domain.
2. In **Settings → Pages**, type your domain in the **Custom domain** box.
3. In `.github/workflows/deploy.yml`, change `BASE_PATH: /${{ github.event.repository.name }}/` to `BASE_PATH: /`.
4. Add a `CNAME` file in this folder with just your domain.
5. In Firebase **Authentication → Settings → Authorized domains**, add your custom domain too.
6. Point your DNS to GitHub Pages (GitHub shows the records).

---

## Local development (optional)

```bash
npm install
npm run dev
```

Open http://localhost:5173

To build a production version locally:

```bash
npm run build
npm run preview
```

Enjoy ❄

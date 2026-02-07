# How to Enable Payments (Stripe Guide)

Hi [Client Name],

To make the **Apple Pay** and **Google Pay** "Impulse Buy" buttons work on the live website, we need to connect the website to your Stripe account.

Since the account is currently inactive, we just need access to the "Test Keys" or "Developer Mode" first so we can finish building the feature.

Please follow **Option A** (Easiest) or **Option B** below.

---

### Option A: Invite Us as a Developer (Recommended)
This is the safest method. It gives us access to the technical settings without sharing your password.

1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Click on the **Settings** (gear icon) in the top right.
3.  Look for **Team** or **Team Members** under the "Business" or "Account" section.
4.  Click **+ New Member**.
5.  Enter our email address: `[Insert Developer Email Here]`
6.  Select the role: **Developer**.
7.  Click **Invite**.

---

### Option B: Send Us the API Keys Directly
If you prefer not to add users, you can copy and send the keys we need.

1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Click on the **Developers** tab (top right corner).
3.  Click on **API keys** in the left menu.
4.  **Important:** Make sure the "View test data" toggle (orange switch) is **ON** for now (so we can test without real money).
5.  Copy the **Publishable key** (starts with `pk_test_...`).
6.  Click "Reveal live key" for the **Secret key** (starts with `sk_test_...`).
7.  Copy both keys and send them to us securely.

---

### A Note on "Inactive" Status
If your account says "Inactive", you can still invite us or send the keys above! 

However, before we can accept **real money** from customers:
1.  You will need to click **"Activate your account"** in the dashboard.
2.  Fill in your business details and bank account info so Stripe knows where to send the payouts.

Let us know if you have any questions!

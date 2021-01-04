# Switching to Production Mode
<hr>

This document is designed to assist you in switching from *Sandbox* environment to *Production* environment, in order to start accepting real world payment for your business. This is also known as "Going Live".


### 1. Login to Your Midtrans Production Environment Dashboard

To login to your Midtrans *Production* environment, follow the steps given below.

1. Login to your account at https://account.midtrans.com. 
   - For more information, refer to [Access Midtrans Administration Portal](/en/midtrans-account/overview.md#accessing-midtrans-administration-portal) for more details.
2. Select **Production** Environment.
   - For more information, refer to [Switching Environment](/en/midtrans-account/overview.md#switching-environment) for more details.

### 2. Checking Your Production Account

To make sure your production account is active, follow the steps given below.

1. On the home page, go to **SETTINGS > SNAP PREFERENCES**.
   - *SNAP Preferences* page is displayed.
2. Select **Payment Channels** tab.
   - A list of active payment methods is displayed.

### 3. Retrieving Server Key and Client Key

Server Key and Client Key for *Production* environment and *Sandbox* environment are different. For more information, refer to [Retrieving API access keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).

### 4. Configuring HTTP Notification Webhooks URL

- For more information on how to configure HTTP notification URL, refer to [Configuring HTTP Notifications On MAP](/en/after-payment/http-notification.md).

- For **Snap Integration** you can opt to configure redirect URL. For more information, refer to [Configuring Redirect URL](/en/snap/advanced-feature.md#configure-redirection-url).

### 5. Configuring the Integration

Based on your requirement, please select the best suitable integration method from the following options.

<!-- tabs:start -->
#### **Language Libraries**

If you are using Language Libraries provided by Midtrans (Midtrans PHP, Midtrans Ruby, Midtrans NodeJS, and so on), follow the steps given below.

1. Replace `isProduction` variable on Backend with value `true`.
2. Replace `ServerKey` variable value on the Backend with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
3. Replace `data-client-key` variable value on Frontend with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).

#### **Manual API Request**

To integrate by directly making API calls or requests, follow the steps given below.

1. Replace API domain destination to Production API on Backend by removing `.sandbox` from the domain.
   - For example, change the API domain from `app.sandbox.midtrans.com/` to `app.midtrans.com/`.
2. Replace the `ServerKey` variable value used for API auth on the Backend with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
3. Replace the `data-client-key` variable value on Frontend with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).

#### **WordPress WooCommerce CMS**

To integrate Midtrans with your WordPress WooCommerce CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to Midtrans plugin configuration page.
3. Go to **Settings > Payment**.
4. Select **Production** from Environment drop-down list.
5. Enter the **Merchant Key**.
6. Enter **Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
7. Enter **Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).

Your website is now integrated with Midtrans. For more information, refer to [Configuring WooCommerce Plugin Notification](/en/snap/with-plugins).

#### **Magento CMS**

To integrate Midtrans with your Magento CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to Midtrans plugin configuration page.
3. Go to **Sales > Payment Method**.
4. Select **Production** from Environment drop-down list.
5. Enter **Sandbox Client Key**.
6. Enter **Sandbox Server Key.**
7. Enter **Production Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
8. Enter **Production Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
   
Your website is now integrated with Midtrans. For more information, refer to [Configuring Magento CMS Notification](/en/snap/with-plugins).

#### **PrestaShop CMS**

To integrate Midtrans with your PrestaShop CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to the Midtrans plugin configuration page.
3. Select **Production** from Environment drop-down list.
4. Enter the **Merchant ID**.
5. Enter **Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
6. Enter **Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).

Your website is now integrated with Midtrans. For more information, refer to [Configuring PrestaShop CMS Notification](/en/snap/with-plugins).

#### **OpenCart CMS**

To integrate Midtrans with your OpenCart CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to the Midtrans plugin configuration page.
3. Enter the **Merchant Id**.
4. Select **Production** from Environment drop-down list.
5. Enter **Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
6. Enter **Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).

Your website is now integrated with Midtrans. For more information, refer to [Configuring OpenCart CMS Notification](/en/snap/with-plugins).

#### **WordPress Easy Digital Download CMS**

To integrate Midtrans with your WordPress EDD CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to the Midtrans plugin configuration page.
3. Go to **Settings > Payment Gateway > General**.
4. Enter the **Merchant ID**.
5. Enter **Production Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
6. Enter **Production Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
7. Enter **Sandbox Server Key.**
8. Enter **Sandbox Client Key**.

Your website is now integrated with Midtrans. For more information, refer to [Configuring WordPress Easy Digital Download CMS Notification](/en/snap/with-plugins).

#### **WHMCS CMS**

To integrate Midtrans with your WHMCS CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to the Midtrans plugin configuration page.
3. Enter **Midtrans Client Key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
4. Enter **Midtrans Server Key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
5. Select **Production Mode** checkbox.
6. Click **Save Changes**.

Your website is now integrated with Midtrans. For more information, refer to [Configuring WHMCS CMS Notification](/en/snap/with-plugins).



#### **Drupal CMS**

To integrate Midtrans with your Drupal CMS, follow the steps given below.

1. Login to your website as an administrator.
2. Go to the **Commerce > Configuration > Payment > Payment Gateways**.
3. Enter your name.
4. Click **Midtrans** *Plugin* option button.
5. Click **Production** *Mode* option button.
6. Enter **Server key** with the *Server Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
7. Enter **Client key** with the *Client Key* retrieved from [Step 3 above](#_3-retrieving-server-key-and-client-key).
8. Click **Save**.

Your website is now integrated with Midtrans. For more information, refer to [Configuring Drupal CMS Notification](/en/snap/with-plugins).

<!-- tabs:end -->

### 6. Done! Ready for Production Mode

Now you are ready to accept real world payments in Production mode! You can test it yourself.

?> If further assistance is required, please contact your Midtrans Business PIC or write to us at [support@midtrans.com](mailto:support@midtrans.com).
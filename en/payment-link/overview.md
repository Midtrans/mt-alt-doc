# Payment Link Overview
<hr>
Payment link provides an easy way to accept payments from your customers. Midtrans generates a link which redirects the customer to Midtrans payment page. No technical integration is required. It is suitable for small business owners or sellers on social media platforms such as Instagram, Facebook, WhatsApp and so on.

## Creating a Payment Link
To create a _Payment Link_, [login to your MAP account](/en/overview.md#accessing-midtrans-administration-portal), (optionally [switch to your desired environment mode](/en/midtrans-account/overview.md#switching-environment)) and follow the steps given below.
1. Click **Payment Link** on the left sidebar.
2. Click **Create** button as shown below.

![Payment Link New](../../asset/image/paymentlink_new.png)

After clicking the **Create** button, you are redirected to Payment Link page. To create a link, the fields such as Order ID, Payment Link ID, Usage Limit, Item Name, and Item Price are required.

![Create Payment Link](../../asset/image/paymentlink_create.png)

| Label | Field | Description | Remarks |
| ----- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1 | Order ID | It is unique ID for each *Payment link*.| Each time, when you create a *Payment Link*, Order Id gets generated.|
| 2 | Payment Link ID | It is the URL address of the *Payment link*.| You can share the URL of *Payment Link* with your customers or on any social media platform. |
| 3 | Usage Limit | It is a maximum number of times the *Payment link* can be used.| If this field is set, then you can use the *Payment Link* for specified number of times.|
| 4 | Item Name | It is the name of the product or service you are selling.| - |
| 5 | Item Price | It is the price of the product or service you are charging.| - |

Additional options are available if (a) you want to send the *Payment Link* to a specific customer or (b) you want to include an expiration time and date.

![Options Payment Link](../../asset/image/paymentlink_options.png)

If the transaction is intended for a specific customer, the *Payment Link* is sent straight to the specified customer’s email address. 
- *Expiration Date* field contains the date and time until when the Payment Link is valid. 
- *Maximum Usage* field indicates the number of times the link can be accessed. 

The Payment Link is valid until either the *Maximum Usage* number is reached, or the *expiration date/time* is reached, whichever occurs first.

## Managing Payment Link
After creating the *Payment Link*, you are redirected to the Payment Link List page where you can view a list of *Payment Links* created. You can copy and share any of your links to your customers. You can see details of the links as well as you can delete your links from this page.

![List Payment Link](../../asset/image/paymentlink_list.png)

When you click Details, a page with all of the details of the *Payment Link* is displayed. Here, you can view the number of orders of the *Payment Link* and clicking the number shows you the orders on the transaction page.

![Details Payment Link](../../asset/image/paymentlink_details.png)

## Payment Link Page
When you send the *Payment Link* to customers, they can open the link and it will direct them to Midtrans Payment Page. If there is no specified customer, the customer first needs to enter their details such as Name, Phone, and Email to continue. Next, the customer needs to select a payment method and follow the payment instructions. Once the customer has completed the payment, you will receive a notification of the transaction.

![Create Payment Link](../../asset/image/paymentlink-test-payment.png ':size=400')

## Next Step

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans Merchant Administration Portal (MAP) account, to get access to your own account dashboard, and *Sandbox* environment and to test around for free on Sandbox.
</div>

If you are planning only to use Payment Link without any other technical integration (non-programmer or don't have any website), most of the time you only need to: 
1. [Sign Up](/en/midtrans-account/overview.md), 
2. Learn how to [create payment link explained above](#payment-link-overview), 
3. Briefly [understand the Midtrans Dashboard](/en/after-payment/dashboard-usage.md).

If you are also planning to use other technical integration method, you may want to [explore more integration options.](/en/payments/overview.md)

## Optional: Payment Link via API
Instead, if you prefer to integrate programmatically via API, you can refer to the following section linked below. It can be more suitable if you have an SMB/Enterprise business that you already have your own commerce system.


<div class="my-card">

#### [Payment Link via API](/en/payment-link/with-api.md)
Explains how merchants can create & manage **Payment Link** using API <span class="badge badge-yellow">BETA</span>.
</div>
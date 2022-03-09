# Integrate Midtrans Snap to 3rd Party Ecommerce Platform
<hr>

Midtrans Snap can be integrated with third party E-commerce platform or SaaS like Shopify, Sirclo, and Jejualan. 

Midtrans is partnered with various platforms to make integration process as easy as possible. This page contains a list of platforms that have partnered with Midtrans. If you are using third party platforms that are not listed here, and would like for Midtrans to integrate with it, please contact us at [support@midtrans.com](mailto:support@midtrans.com "email support")

Step by step guide to integrate Snap to the platform of your choice, is explained below. 
#### Choose from any platform of your choice:
<br>

<div class="my-card">

#### [ Shopify](#shopify)
</div>
<div class="my-card">

#### [ Sirclo](#sirclo)
</div>
<div class="my-card">

#### [ Jejualan](#jejualan)
</div>

<hr><br><br>

## Shopify

?> Limitation & Disclaimer:<br>
As [announced by Shopify](https://shopify.dev/apps/payments/hosted-payment-sdk), Shopify planned to deprecate the previous payment integration platform (Hosted Payment SDK)  by March 31, 2022. Shopify has urged Midtrans (and other payment gateways) to migrate to their new [Payment Platform integration](https://shopify.dev/beta/payments-apps/). In compliance with it, Midtrans has migrated to the new platform, as a result of the new mechanism, __you__ as a __Midtrans’ merchants will need to migrate by installing Midtrans as Shopify Payment App__.<br><br>
__If by March 31, 2022 you have not done so__, Midtrans payment integration (installed using the previous mechanism) __may no longer work for your Shopify store__.<br><br>
Due to the current limitation of the Shopify’s new payment platform, here is limitation that should be expected:<br>
__Only supports Production environment__ (real payment mode), not Sandbox environment yet (test payment mode). Due to the complexity of the new platform to connect with Midtrans’ sandbox environment.<br><br>
You can try to contact Shopify regarding the limitation, should you have any concern about them.<br><br>
Later when the Shopify platform starts to uplift the limitations, only then Midtrans will be able to start adding other async payment methods support. Sandbox environment mode is also planned to be supported (but, likely as a separate payment app).

Please complete the steps given below:

1. Create an online store with [Shopify](https://shopify.com).
2. Register for [Midtrans account](https://dashboard.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use **SHOPIFY - URL Name** as a subject header and mention your registered _Midtrans Merchant ID_.

Note: 

- You can try with Shopify Trial plan to test payment integration in *Sandbox mode*. 
- You may be required by Shopify to have an active paid-plan in order to allow your customer to do checkout on *Production mode*.

### Integrating Midtrans to Shopify Platform: 

To integrate Midtrans to Shopify platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production environment*. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Select __Settings -> Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

On **Production** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

On **Sandbox** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.sandbox.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

3. Select __Settings -> Access Keys__.

	Copy Midtrans __Merchant ID__ and __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)<br>

4. Login to your [Shopify Store](https://www.shopify.com/login).

5. On your Shopify Store- admin page, go to __Settings -> Payments__.

	![Settings menu](./../../../asset/image/shopify-new-01-settings.png ':size=400')
	![Payment providers menu](./../../../asset/image/shopify-new-02-payments.png ':size=400')

6. Under __Alternative payment methods__, click __Choose alternative payment__.
	![Third-party providers](./../../../asset/image/shopify-new-03-alternative-payment.png ':size=400')

7. Enter __Midtrans__ in the search bar, __Midtrans Payment Gateway__ will show there, and click it.
	![Search Midtrans](./../../../asset/image/shopify-new-04-search-midtrans.png ':size=400')

8. Midtrans Payment Gateway page, to install, click __Connect__.
	![Midtrans Page](./../../../asset/image/shopify-new-05-connect.png ':size=400')

9. Midtrans Payment Gateway need permissions to access Shopify account data and other data, click __Install app__ to continue the installation.
	![Install Midtrans](./../../../asset/image/shopify-new-06-install.png ':size=400')

10. Shopify will redirect to the Onboarding page, please fill by your __Merchant ID__ and __Server Key__. Then click __Register__.
	![Register](./../../../asset/image/shopify-new-07-register.png ':size=400')

11. Installation will redirect back to Shopify admin, inform that your Shopify store is already connected to Midtrans Payment Gateway.
	![Connected to Midtrans](./../../../asset/image/shopify-new-08-success-install.png ':size=400')

12. To start accepting payment, click __Activate Midtrans Payment Gateway__.

13. Done! Now your Shopify online shop is ready to use Midtrans as payment gateway. Your customer will see __Midtrans Payment Gateway__ as payment method on the checkout page.
	![Midtrans show in checkout page](./../../../asset/image/shopify-new-10-order.png ':size=400')


### Integrating Midtrans to Shopify Platform (deprecated): 

?> Shopify planned to [deprecate the previous payment integration platform](#shopify), please follow how to integrate the new shopify app [here](#integrating-midtrans-to-shopify-platform)

To integrate Midtrans to Shopify platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production environment*. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Select __Settings -> Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

On **Production** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

On **Sandbox** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.sandbox.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

3. Select __Settings -> Access Keys__.

	Copy Midtrans __Merchant ID__ and __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to your [Shopify Store](https://www.shopify.com/login).

5. On your Shopify Store- admin page, go to __Settings -> Payment providers__.
	
	![Settings menu](./../../../asset/image/shopify-1.png ':size=400')
	![Payment providers menu](./../../../asset/image/shopify-2.png ':size=400')

6. Under __Third-party providers__, click __Choose third-party provider__.
	![Third-party providers](./../../../asset/image/shopify-3.png ':size=400')

7. Enter **Midtrans** in search bar and click **Search**.
	![Search Midtrans](./../../../asset/image/shopify-4.png ':size=400')

8. Complete the configuration by filling in your __Merchant ID__ and __server key__. Then click __Activate__. 

 **Note:**

  - Select the __Enable test mode__ check box and clear it to allow real transaction.
  - Select the __Enable test mode__ check box if you want to test transaction without actual payment (using test credentials provided by Midtrans).

 __Server key__ for *Sandbox*/testing is different from *production*. You may obtain your *Merchant ID* and *server key* from Midtrans MAP (after logging in) from the following links:

  - For *Sandbox*/testing: [Click here](https://dashboard.sandbox.midtrans.com/settings/config_info)
  - For *Production*/real transaction: [Click here](https://dashboard.midtrans.com/settings/config_info)

  ![shopify](./../../../asset/image/shopify-5.png ':size=400')

Done! Now your Shopify online shop is ready to use Midtrans as payment gateway. Your customer will see Online Payment as payment method on the checkout page.

  ![shopify](./../../../asset/image/shopify-6.png ':size=400')

Midtrans Snap payment page will be displayed to the customer. Payment methods that are available on Snap product, are explained on [this page](https://midtrans.com/payments). These methods are available for integration. 

![shopify](./../../../asset/image/shopify-7.png ':size=400')

With this integration, your customer will be redirected to Snap Redirect payment page. Customer payment data is safely managed by Midtrans hosted payment web page, outside of your Shopify store web domain.

<hr><br><br>

### Available Payment Methods
All payment methods available on Snap, are explained on [this page](https://midtrans.com/payments), and are available for integration.

### Specific Payment Methods (deprecated)

?> Shopify planned to [deprecate the previous payment integration platform](#shopify), the specific payment methods will not available anymore.

You can optionally follow these steps, if **you prefer to have the payment methods displayed on your shopify checkout page** instead.

Sample shopify checkout page is shown below.

For example:
![shopify](./../../../asset/image/shopify-17.png ':size=400')

1. Select your preferred payment methods, and **click the links below to install the individual payment method**:
	- [Bank Transfer BNI](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055281)
	- [Bank Transfer BCA](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055283)
	- [Bank Transfer BRI](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1056041)
	- [Bank Transfer Permata](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055285)
	- [Bank Transfer Mandiri Bill](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055287)
	- [Gopay & QRIS](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055289)
	- [ShopeePay & QRIS](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1056193)
	- [Indomaret](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055291)
	- [Alfamart](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055293)
	- [Akulaku](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055295)
	- [Other bank transfer & debit](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055297)
	- [Card Payment](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055299)
	- [Card Installment Payment](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055413)
	- Note: BCA Klikpay is not available due to the Shopify's payment flow does not meet the [extensive requirements listed by BCA Team](https://support.midtrans.com/hc/en-us/articles/360024549814-What-if-I-want-to-use-BCA-Klikpay-as-a-payment-channel-).

2. When prompted, login with your Shopify account. Click **Install** on the payment gateway.
![shopify](./../../../asset/image/shopify-13.png ':size=400')

3. You will be navigated to payment settings page (`Settings > Payments` on your Shopify admin page). Click **Choose Alternative Payments**.
![shopify](./../../../asset/image/shopify-14.png ':size=400')

4. In the search bar, enter `Midtrans`. The methods which you installed previously, will appear.
![shopify](./../../../asset/image/shopify-15.png ':size=400')
*for example that is if you install all of it, you can install just 1 or few of it*.

5. Enter Midtrans **Merchant ID** and **Server Key**.
	![shopify](./../../../asset/image/shopify-16.png ':size=400')

	Get it from [Merchant Administration Portal](https://dashboard.midtrans.com).
	You will find your online shop name with *Sandbox/Production* *environment*. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')
	
	under **Settings -> Access Keys**.
	![access key](./../../../asset/image/sirclo-2.png)

6. Setup Notification URL on [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production* *environment*. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

	Select __Settings ->Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

On **Production** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

On **Sandbox** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://vt-pixels.sandbox.midtrans.com/veritrans/callback_url` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

Done! Now your Shopify online shop is ready to use Midtrans as payment gateway.
![shopify](./../../../asset/image/shopify-17.png ':size=400')

<hr>

#### Unable to Install Specific Payment Methods (deprecated)

?> Shopify planned to [deprecate the previous payment integration platform](#shopify), this workaround was not relevant for the new shopify app

In the rare case that you are not able to install specific payment methods, such as you are not presented with the install button on Step 2. Please try the following alternatives:
1. It is possible that the payment method already installed, please manually continue to [step number 3](#specific-payment-methods) by navigating to Settings > Payments menu, the payment method will be shown there.
2. Another alternative:
	- Logout from Shopify
	- Install the desired payment method by clicking the link provided [here](#specific-payment-methods)
	- Proceed login to Shopify when prompted

<hr>

### Advanced
<br>

<details>
<summary>Matching Order ID Between Shopify and Midtrans</summary>
<article>
Order ID created on Midtrans *Dashboard* for each transaction is based from reference auto generated by Shopify platform, to ensure uniqueness per transaction. It can be different with the order id shown on Shopify platform.

To find order on Shopify platform, based on Order ID from Midtrans, first find the transaction Order ID from Midtrans *Dashboard* on **Transactions**.
![shopify](./../../../asset/image/shopify-8.png ':size=400')

##### From Order menu
1. On your Shopify admin area (administration page), go to __Orders->All Orders__. 
2. In the search bar, input order id from Midtrans. 
3. Click on the shown order.

![shopify](./../../../asset/image/shopify-9.png ':size=400')

##### From General Search
1. On your Shopify admin area, there is general __search__ bar on top of the page.
2. In the search bar, input order id from Midtrans.
3. Click on the shown order.

![shopify](./../../../asset/image/shopify-10.png ':size=400')

##### Order detail
Inside the order found by the search result, you can see the reference number.

![shopify](./../../../asset/image/shopify-11.png ':size=400')

From the order details' `Timeline` you can also review the order status history. You can also click one of them to expand to see more details. You will see the Midtrans order ID shown as `Authorization Key` or `X Reference`.
![shopify](./../../../asset/image/shopify-20.png ':size=400')

?> Due to Shopify's payment UX flow which may allow 1 Shopify order to generate multiple payment id (order_id on Midtrans side), you may see multiple different `Authorization Key` or `X Reference` shown. Usually the most valid/recent one is the one from the latest (top-most) history shown on the Shopify’s order timeline.

Known case that may cause "1 Shopify order to generate multiple payment id (order_id on Midtrans side)":
- After customer did first payment attempt and reach Midtrans's payment page, merchant trigger `Resend Invoice` from Shopify's order page. This action will send email to the customer with another payment url. Which will generate another payment page (and another order_id) on Midtrans side.

You should avoid this scenario, if you find it cause a confusing situation.

##### From Exported Order
You can also find the reference number on the exported CSV file using Shopify export feature: __All Orders->Export->Export Orders.__ Then search within the CSV file.

![shopify](./../../../asset/image/shopify-12.png ':size=400')
</article>
</details>


<details>
<summary>Customize Shopify Order Confirmation Email Template</summary>
<article>

When customer is proceeding to check out from your Shopify store into Midtrans Snap payment page, order is "confirmed" on Shopify side, and they will send "order confirmation" email notification to customer.

But you may find the wording of the email is confusing for customer, for example: 
> Hi John, we're getting your order ready to be shipped. We will notify you when it has been sent.

You may notice that email is being sent **before customer completes the payment**, so it may not be true that the order is ready for shipping, **the order needs to be paid first**. Unfortunately that's how the default Shopify "order confirmation notification" behavior works. We can try to customize the message to be less confusing. 

Shopify explained how to customize notification [on their documentation here](https://help.shopify.com/en/manual/sell-online/notifications/edit-template). We try to summarize it for you.

1. Login to your Shopify admin page.
2. Go to `Settings > Notifications`.
3. Click `Order Confirmation`.
4. Search for `{% capture email_body %}` text.
5. Input or copy this sentence just below/after that text:
```
If you have completed your payment, then you are done. If you have not completed your payment, please complete it soon to avoid auto-cancelation.<br><br>
```
You can customize the message to your own preference. Or even modify it as "payment reminder".
![shopify](./../../../asset/image/shopify-18.png ':size=400')
6. Click `Save`. You can also `Preview` the email.
7. Done.
![shopify](./../../../asset/image/shopify-19.png ':size=400')

</article>
</details>

<details>
<summary>Additional Notes</summary>
<article>

##### Cancel and Refund via Shopify admin panel
Within Shopify admin panel's order details view, there are actions of `cancel` and `refund`. When triggering `cancel` or `refund`, Midtrans order status will try to sync with the Shopify status, if it met the criteria for payment cancel or refund.

For example:
- Canceling `pending` order on Shopify, will also make Midtrans order status to be marked as `cancel`.
- Refunding `paid` order on Shopify, will also make Midtrans order status to be marked as `refund`/`cancel`.

Limitations:
- Not all payment methods support online `refund` on Midtrans side, capability is mostly limited to Card & e-money/QRIS transaction.
- Will only works if your Midtrans account is allowed to trigger online refund.
- Shopify's refund UI/UX can be a little bit confusing, after clicking refund it may not tell you whether the refund is successful or not. It only shows `refund processing` which **should not be confused as an indication of success**. You can follow the refund status from the Shopify Order’s timeline. If it is marked as `pending` or failure, the refund is not successful.
- It is more recommended to manage payment refund & cancellation from Midtrans Dashboard instead. As it will have a better indication of refund success and failure.
- `cancel` or `refund` action triggered on Midtrans dashboard/API, may or may not be synced to Shopify due to some limitation.

?> The more accurate payment status is the one shown on Midtrans dashboard. You should refer to it in case there are discrepancies on Shopify's side. Because in some rare case payment status syncing to Shopify's system may fail, and Shopify's order details UI can be confusing to read.

##### Note on Canceling Order
Canceling a paid order will auto trigger attempt to refund/cancel payment on Payment Gateway (Midtrans) side. That is the flow of Shopify that Merchant and Payment Gateway follows. Please avoid canceling a paid order when you mean to edit/customize the item or size.

As per Shopify docs, `cancel order` are not supposed to be used to change item/size:
https://help.shopify.com/en/manual/orders/refund-cancel-order#cancel-an-order

Merchants supposed to `edit order` if they need to change the item/size:
https://help.shopify.com/en/manual/orders/edit-orders

Or archive the order, if they really need to remove it from order list:
https://help.shopify.com/en/manual/orders/manage-orders#archive-a-fulfilled-order

##### Item Stock & Status
Few points to understand about order status & item stock management that is managed automatically with this integration:
- Item stock will be reduced whenever order status become `pending` on Shopify side.
- Item stock will be reduced immediately after the customer reaches Snap payment page, regardless of whether he/she will proceed to actual payment or not. This is to prevent "oversell" issue, by reserving the item stock for the duration of this payment. 
  - To ensure the item stock is allocated for that customer. If that customer decides to abandon payment on Snap payment page, after a certain period the item stock will be released, and marked as canceled on the Shopify side.
  - Example of "oversell" issue prevented by this mechanism: This happens when item stock is 1 left, but there are 2 (or more) customers racing to complete the payment, if both complete the payments, and both are accepted by Shopify, then the item stock will be negative. Which will cause issues on its own. So to prevent this, item stock is reserved (and marked as pending on Shopify side) as early as the customer is redirected to the payment page.
- Card transaction with `deny` status will be updated as failed on Shopify by Midtrans after two hours if left without any success attempt. If success pay attempt is found, it will be updated as success on Shopify.
- Abandoned Snap payment page (customer left without proceeding with any payment method) will be updated as canceled on Shopify after two hours, and will be restocked. Order may not show up in Midtrans Dashboard.
- When customer reaches Snap payment page (status `pending` and stock reduced). Shopify may send email to customer which says "order ready to be shipped", although from Shopify side it is still waiting for payment. Refer to section above about this behavior.
- It is recommended to **avoid manual order status changes (manual intervention)** from Shopify Admin Panel at least between period of the order first created as `pending` and it finally become `paid/canceled` (about 0-26 hours), in order for payment integration with Midtrans to perform smoothly. Which the order status and item stock will be managed automatically based on the flow explained on this page.
  - Manual order status changes may cause unexpected behaviour in terms of order status & item stock management, such as order status stuck at certain state. Do this at your own risk. Midtrans may not be in position to help/explain with the consequences.

##### Basic Status Mapping
Condition | Midtrans Status | Shopify Order Status
--- | --- | ---
Customer redirected to Snap payment page. | \- | Payment Pending
Customer proceeds with asynchronous payment <br>For example: Bank Transfer, Gopay. | Pending | Payment Pending
Customer proceeds with asynchronous payment <br>but does not pay until expiry time reached.<sup>[1]</sup> | Expire | Canceled
Customer successfully makes payment. | Settlement/Capture | Paid
Customer abandoned Snap payment page <br>without proceeding with payment. | \- | Canceled
Customer abandoned or denied card transaction. | Deny | Canceled
Merchant cancels/refunds order via Shopify. | Cancel/Refund | Canceled/Refunded

<br>

<sup>[1]</sup> The expiry time calculation starts at the moment when the customer proceeds with the payment method (not necessarily from when redirected to Snap payment page). The payment expiry will then follow what is defined on Snap Preference for each payment method, you can [customize the Snap Preference](/en/after-payment/dashboard-usage.md#configuring-custom-payment-expiry-settings-on-snap) to your needs. When the payment expiry time is reached and the customer does not complete the payment, the transaction will be updated to `Canceled` on Shopify side & `Expire` on Midtrans side. 

</article>
</details>

<hr><br><br>

<!-- @TODO: explain if payment page closed, it may lost forever -->
<!-- @TODO: explain shopify void & refund feature -->
<!-- @TODO: explain item stock deduction / restock scenarios -->


## Sirclo

Please complete the following steps:

1. Create an online store with Sirclo.
2. Register to [Midtrans account](https://dashboard.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use __SIRCLO - URL Name__ as a subject header and mention your registered _Midtrans Merchant ID_. 

### Integrating Midtrans to Sirclo Platform:

To integrate Midtrans to Sirclo platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production* *environment*. Please make sure that you are in __Production environment__.

	![environment switch](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Select __Settings->Configuration__.

	![Setting](./../../../asset/image/sirclo-1.png ':size=400')

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/payment_ipn/veritrans/notify |
| Finish Redirect URL | [your-site-url]/payment_ipn/veritrans/completed |
| Error Redirect URL | [your-site-url]/payment_ipn/veritrans/error |
| Unfinish Redirect URL | [your-site-url]/payment_ipn/veritrans/unfinish |

> **Note:**
>
> Please make sure to input **http://** or **https://** when filling Notification URL and Redirect URL, according to your web-server configuration. 
>
> If you are not sure, try opening your web URL in a browser, and check the URL is **http** or **https** on the address bar.


3. Select __Settings->Access Keys__.

	Copy Midtrans __Merchant ID__ and __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Sirclo Admin Panel of your Sirclo store.

	![sirclo](./../../../asset/image/sirclo-3.png ':size=400')

5. Select __Settings->Payment Settings__.

	![sirclo](./../../../asset/image/sirclo-4.png ':size=400')

	Find Midtrans field, then enter Midtrans Production _Merchant ID_ and _Server Key_.

	![sirclo](./../../../asset/image/sirclo-5.png ':size=400')

6. Select the checkbox, corresponding to payment method, to enable it. 

> **Note:** 
>
> You can enable all registered payment methods at Midtrans by clearing all payment methods.

7. You can select installment payment method by filling installment period in _Veritrans Installment period for [Bank Name]_. 

> **Note for installment:**
> 
>- You need to agree and negotiate with the Bank regarding interest rate and installment period.
> - Please contact Midtrans at [activation@midtrans.com](mailto:activation@midtrans.com) for further inquiry.

8. Click **Save** or **Update**.
<hr><br><br>

## Jejualan

Please complete the following steps:

1. Create an online store account with [Jejualan](https://jejualan.com/daftar), and choose Beta, Gamma, or Delta in order to use Midtrans service.
2. Register to [Midtrans account](https://dashboard.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use __Jejualan – URL Name__ as subject header and mention your registered _Midtrans Merchant ID_. 

### Integrating Midtrans to Jejualan Platform:

To integrate Midtrans to Jejualan platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production* environment. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Select __Settings->Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url] |
| Finish Redirect URL | [your-site-url]/store/payment/veritrans/success |
| Error Redirect URL | [your-site-url]/store/payment/veritrans/failed |
| Unfinish Redirect URL | [your-site-url]/store/payment/ |

> **Note:** 
>
> Please make sure to input **http://** or **https://** when filling Notification URL and Redirect URL, according to your web-server configuration. 
>
> If you are not sure, try opening your web URL in a browser, and check the URL is **http** or **https** on the address bar.

3. Select __Settings->Access Keys__.

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Jejualan Admin Panel of your store 

	![jejualan](./../../../asset/image/jejualan-1.png ':size=400')

5. Select __Konfigurasi->Pembayaran__.

	![jejualan](./../../../asset/image/jejualan-2.png ':size=400')

	Click Midtrans field, then change mode from `Tidak Aktif` to `Aktif`. Ensure that the button is now colored in blue.

6. Enter Midtrans __Production Server Key__. Then select the desired payment method. 

	![jejualan](./../../../asset/image/jejualan-3.png ':size=400')

> You can enable only registered payment methods. For Credit Card, 3D Secure mode is recommended.
>

7. Click **Simpan**.


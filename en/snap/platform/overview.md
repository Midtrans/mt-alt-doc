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
As [announced by Shopify](https://shopify.dev/apps/payments/hosted-payment-sdk), Shopify planned to deprecate the previous payment integration platform (Hosted Payment SDK) by June 30, 2022. Shopify has urged Midtrans (and other payment gateways) to migrate to their new [Payment Platform integration](https://shopify.dev/beta/payments-apps/). In compliance with it, Midtrans has migrated to the new platform, as a result of the new mechanism, __you__ as a __Midtrans’ merchants will need to migrate by installing Midtrans as Shopify Payment App__.<br><br>
__If by June 30, 2022 you have not done so__, Midtrans payment integration (installed using the previous mechanism) __may no longer work for your Shopify store__.<br><br>
Due to the current limitation of the Shopify’s new payment platform, here is limitation that should be expected:<br>
__Only supports Production environment__ (real payment mode), not Sandbox environment yet (test payment mode). Due to the complexity of the new platform to connect with Midtrans’ sandbox environment.<br>
__Restock Feature is not yet available__, in previous integration, if customer left Snap page without proceeding with any payment method, order will be updated as canceled on Shopify after two hours, and will be restocked. For this new integration, restock is not yet available, for an alternative, you need to cancel the order manually from Shopify admin, to release the stock that previously is allocated for customer.
<br><br>
You can try to contact Shopify regarding the limitation, should you have any concern about them.<br><br>
Later when the Shopify platform starts to uplift the limitations, only then Midtrans will be able to start adding restock feature. Sandbox environment mode is also planned to be supported (but, likely as a separate payment app).

Please complete the steps given below:

1. Create an online store with [Shopify](https://shopify.com) if you haven't.
2. Register for [Midtrans account](https://dashboard.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use **SHOPIFY - URL Name** as a subject header and mention your registered _Midtrans Merchant ID_.

Note: 

- You can try with Shopify Trial plan to test payment integration in *Sandbox mode*. 
- You may be required by Shopify to have an active paid-plan in order to allow your customer to do checkout on *Production mode*.

### Integrating Midtrans to Shopify Platform

To integrate Midtrans to Shopify platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://dashboard.midtrans.com/login).

	You will find your online shop name with *Sandbox/Production environment*. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Select __Settings -> Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

On **Production** mode:

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | `https://pixel.midtrans.com/payments/notification` |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

3. Select __Settings -> Access Keys__.

	Copy Midtrans __Merchant ID__ and __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)<br>

4. Login to your [Shopify Store](https://www.shopify.com/login).

5. On your Shopify Store admin page, go to __Settings -> Payments__.

	![Settings menu](./../../../asset/image/shopify-new-01-settings.png ':size=400')
	![Payment providers menu](./../../../asset/image/shopify-new-02-payments.png ':size=400')

6. Under __Supported payment methods__, click __Add payment methods__.
	![Third-party providers](./../../../asset/image/shopify-new-03-supported-payment-methods.png ':size=400')

7. Input __Midtrans Payment Gateway__ in the search bar, __Midtrans Payment Gateway__ will be shown, then click activate button.
	![Search Midtrans](./../../../asset/image/shopify-new-04-search-midtrans.png ':size=400')

8. In the displayed Midtrans Payment Gateway page, click __Connect__.
	![Midtrans Page](./../../../asset/image/shopify-new-05-connect.png ':size=400')

9. You can review the displayed information, then click __Install app__ to install.
	![Install Midtrans](./../../../asset/image/shopify-new-06-install.png ':size=400')

10. You will be redirect to the Onboarding page, please fill by your Midtrans __Merchant ID__ and __Server Key__. Then click __Register__.
	![Register](./../../../asset/image/shopify-new-07-register.png ':size=400')

11. You will be redirect back to Shopify, and the page will indicates that your Shopify store is connected to Midtrans Payment Gateway.
	![Connected to Midtrans](./../../../asset/image/shopify-new-08-success-install.png ':size=400')

12. To activate, click __Activate Midtrans Payment Gateway__.

13. Done! Now your Shopify online shop is ready to start accepting payments with Midtrans as payment gateway. Your customer will see __Midtrans Payment Gateway__ as payment method on the checkout page.
	![Midtrans show in checkout page](./../../../asset/image/shopify-new-10-order.png ':size=400')

Midtrans Snap payment page will be displayed to the customer. Payment methods that are available on Snap product, are explained on [this page](https://midtrans.com/payments). These methods are available for integration. 

![shopify](./../../../asset/image/shopify-new-19-snap-page.png ':size=400')

With this integration, your customer will be redirected to Snap Redirect payment page. Customer payment data is safely managed by Midtrans hosted payment web page, outside of your Shopify store web domain.


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


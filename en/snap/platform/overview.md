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

!> As [announced by Shopify](https://shopify.dev/apps/payments/hosted-payment-sdk), Shopify planned to deprecate the previous payment integration platform (Hosted Payment SDK) by July 31st, 2022. Shopify has urged Midtrans (and other payment gateways) to migrate to their new [Payment Platform integration](https://shopify.dev/beta/payments-apps/). In compliance with it, Midtrans is currently migrating to the new platform.
\
\
Unfortunately **currently during the migration, you may not be able to integrate Midtrans** to your Shopify store just yet. The new integration is **almost ready!** Our team is currently prioritizing in ensuring that it will run smooth, secure, & reliable as ever. 
\
\
We **will announce & update this docs as soon as Midtrans is publicly available** to be integrated to your Shopify store (before July 31st 2022). We apologize for the delay & any inconvinence.

<hr><br><br>

## Sirclo

Please complete the following steps:

1. Create an online store with Sirclo.
2. Register to [Midtrans account](https://account.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use __SIRCLO - URL Name__ as a subject header and mention your registered _Midtrans Merchant ID_. 

### Integrating Midtrans to Sirclo Platform:

To integrate Midtrans to Sirclo platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login).

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
2. Register to [Midtrans account](https://account.midtrans.com/register).
3. Complete the account registration form. For any help, you can contact [Midtrans activation team](mailto:activation@midtrans.com). Use __Jejualan – URL Name__ as subject header and mention your registered _Midtrans Merchant ID_. 

### Integrating Midtrans to Jejualan Platform:

To integrate Midtrans to Jejualan platform, follow the steps given below.

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login).

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


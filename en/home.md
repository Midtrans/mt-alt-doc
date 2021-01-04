<hr>

[![Midtrans Logo](/asset/image/main/midtrans-logo.png ':size=220')](https://midtrans.com)<hr>

# Get Started with Midtrans
<hr>
Keeping track of payments and funds is one of the crucial activities for any business. It is a parameter to measure the business growth. With a wide range of products from Midtrans, you can grow your business easily. Midtrans provides products and services to accept and disburse payments and keep a track of them. Depending on your business requirements, you can select a suitable Midtrans product. 
To know more about products and their technical details refer to the document below.

<!-- TODO: add more image for each product so it doesn't look to plain? -->

## Accept Online Payments on Your Website and App {docsify-ignore}

<div class="my-card">

#### [Add Payment Page on Your Website or Web Application (Snap)](/en/snap/overview.md)
Snap user interface helps to securely accept payments on your website and mobile app with a few simple steps. Your customer is presented with a sleek, mobile-friendly interface to make payments. With simple integration, Snap user interface allows you to accept payments with [Midtrans’s various payment methods ](https://midtrans.com/payments).
<br> <!-- TODO: use better CORS proxy, cors-anywhere is limited per referrer domain  -->

<p style="text-align: center;">
  <button onclick="
  event.target.innerText = `Processing...`;
  var reqHeaders = new Headers();
  reqHeaders.append('Accept', 'application/json');
  reqHeaders.append('Content-Type', 'application/json');
  reqHeaders.append('Authorization', 'Basic '+btoa('SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA:'));
  var reqOpts = {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify({
      'transaction_details':{
        'order_id':'demo-docs-main-'+Math.round((new Date()).getTime()/1),
        'gross_amount':10000
      },
      'credit_card':{
        'secure':true
      }
    })
  };
  fetch('https://cors-anywhere.herokuapp.com/https://app.sandbox.midtrans.com/snap/v1/transactions', reqOpts)
    .then(res=>res.json())
    .then(res=>{
      let snapToken = res.token;
      snap.pay(snapToken,{
        onSuccess: function(res){ console.log('Snap result:',res) },
        onPending: function(res){ console.log('Snap result:',res) },
        onError: function(res){ console.log('Snap result:',res) },
      });
    })
    .catch( e=>{ console.error(e); window.open('https://demo.midtrans.com', '_blank'); } )
    .finally( e=>{ event.target.innerText = `Pay with Snap ⎋` })
  " class="my-btn">Try Snap Payment Interface ⎋</button>
</p>
<div style="text-align: center;">

<sup>[Try out the quick (less than 5 mins) integration sample!](/en/snap/interactive-demo.md)</sup>
</div>
</div>

<div class="my-card">

#### [Payment Page For Your Native Mobile App (Payment Mobile SDK)](https://mobile-docs.midtrans.com)
You can accept payments within your app by easily embedding our Android and iOS Mobile SDK within your app. Similar to Snap, the Mobile SDK also provides drop-in user interface to accept payments using [Midtrans’s various payment methods](https://midtrans.com/payments).
<details>
<summary><b>Try Mobile SDK via Android Simulator</b></summary>
<article>
<div style="text-align: center;">
<iframe src="https://appetize.io/embed/9r0b89zu862f8eu1ukd0ecpgxc?device=nexus5&scale=75&orientation=portrait&osVersion=8.1"width="300px" height="600px" frameborder="0" scrolling="no"></iframe>
</div>
</article>
</details>
</div>

<div class="my-card">

#### [Customize Your Own Payment Page (Core API)](/en/core-api/overview.md)
If you need to customize the payment-flow or the user interface to fit your unique needs, use our Core API. Core API can be used for your website, web application, point of sales, IoT (Internet of Things) or any other internet-capable device, to connect with Midtrans and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Use CMS Payment Plugin](/en/snap/with-plugins.md)
If you are already using e-commerce Content Management System like Magento 2, WooCommerce, etc., you can easily integrate with Midtrans payment page by installing plugin in a few simple clicks.
</div>

<div class="my-card">

#### [Create Invoice via Payment Link](/en/payment-link/overview.md)
If you do not have a website yet, you can still receive payments by sharing a link that redirects your customer to Midtrans payment page. This does not require any technical integration. A link can be created on the  dashboard with customizable payment details like an invoice.
</div>

## Pay Outs / Disburse Fund {docsify-ignore}

<div class="my-card">

#### [Pay Outs via Iris Disbursement System](https://iris-docs.midtrans.com/)

Send money to your partners, sellers, customers, vendors or any third parties with our Iris Disbursement System. Whether you have a marketplace or a retail business, you can send money to your sellers, do payrolls transfers to your employees, and so on. Iris can cater to all of your payout needs. Iris supports disbursing money to GoPay accounts or any popular bank accounts in Indonesia.
</div>

## Misc {docsify-ignore}


<!-- TODO: write this page -->
<div class="my-card">

<!-- #### [Integrate Payment to POS](/en/pos/overview.md) -->
#### [Integrate Payment to POS (Point of Sales)](#accept-payment-on-point-of-sales-vending-machines-iot-devices)

For conventional business with no website or apps, as long as the Point of Sales (POS) peripherals are connected through the Internet, it can be integrated with Midtrans Core API.  The device can easily integrate to the Core API via API calls. There is a specific GoPay guide for this type of integration.

</div>

<br> <br>
## Choose based on Top Business Use Cases {docsify-ignore}

Here are some popular use-cases that may help you choose the best product for your business.

#### Accept payment on your e-commerce website or app or both

Accept payment from your customer within your website or application with Card Transaction, Bank Transfer, Direct Debit, E-Money, [and more](https://midtrans.com/payments). Choose [Beautiful Snap user interface](/en/snap/overview.md) or [Customizable Core API](/en/core-api/overview.md) to enable your website and app to accept payment securely in a few simple steps.

#### Subscription / Recurring Service

According to your business needs, you can charge your customer for recurring payments like subscription, membership, or billing with flexible interval period. Your customer can be automatically charged via Midtrans. Your customers don' t have to do these recurring payments manually. Recurring payment is possible via [Snap](/en/snap/advanced-feature.md#recurring-subscription-card-transaction) and [Core API](/en/core-api/advanced-features.md#recurringone-click-transaction). 

> **Note**: Recurring services are available only for some specific payment channels.

#### Send Payment Invoices as Links
<!-- <TODO: elaborate payment link or maybe also selly?> -->
Whether you are a freelancer, service provider, teacher or have a business selling stuff on social media, you need to quickly create invoice and accept payment. You can send invoices and accept payments from your customers via [Payment Link](/en/payment-link/overview.md). All you need to do is to login to Midtrans Dashboard via browser, generate payment link, and then send the link to your customers through any messaging app of your choice.

#### Accept payment on Point of Sales, Vending Machines, IoT devices

For business without a website or application platforms (vending machine, TV box, IoT, point of sales, and so on), as long as the device is connected to the Internet, it can be integrated with [Midtrans Core API](/en/core-api/overview.md) to start accepting payment on the device. With Core API, devices can easily integrate via API calls. There is [specific GoPay guide for this type of integration](https://midtrans-advanced-faq.netlify.com/#/partner-gopay-pos).

#### Pay out users/merchants on your platform
<!-- <TODO: elaborate iris> -->
Ecommerce marketplace/platform (whether it is B2C, B2B, or any other model) that connects services/goods seller to buyer, requires solution to easily manage payout or disburse fund to huge number of sellers and buyers. We got this covered with easy to use, automation ready [Fund Disbursement System: Iris](https://midtrans.com/iris).

#### Pay out vendors/contractors of your business
<!-- <TODO: elaborate iris> -->
Owning big business (whether online, offline, or traditional business) means having to deal with a lot of vendors, contractors, and suppliers. It requires solution to easily manage and transfer of fund. We got this covered with easy to use, automation ready [Fund Disbursement System: Iris](https://midtrans.com/iris).

<!-- < TODO:Add More Use Case> -->
<!-- Case Topup -->

## Non Technical Person? {docsify-ignore}

<!-- <TODO: elaborate plugin, payment link, or snap plugin for non-dev reader> -->

  Not familiar with programming, technical integration, and all the complexity? Here are a few  ways for you to integrate with Midtrans without any technical knowledge:

- Simplest way to use Midtrans to accept payment without website or technical knowledge is via [**Payment Link**](/en/payment-link/overview.md). You only need to login via a web browser to Midtrans Dashboard, generate payment link, and then send the link to your customers.

- You can use ready to use Content Management System (CMS) to create online store. If you are familiar with setting up CMS (**WordPress - WooCommerce, Magento, PrestaShop, OpenCart, WHMCS**, and so on), you can install Midtrans plugin/extension to start accepting payment right away! The payment status feature on the CMS will automatically be updated in real time using the payment status provided by Midtrans. Check out [Midtrans list of supported CMS plugin/extension](/en/snap/with-plugins.md).

- You can also integrate Midtrans to third party e-commerce solution (**Shopify, Sirclo, Jejualan**, and so on) to start accepting payments. These third-party e-commerce solutions are user-friendly and require very minimal setup. Check out [Midtrans list of supported 3rd party Ecommerce platform](/en/snap/platform/overview.md).


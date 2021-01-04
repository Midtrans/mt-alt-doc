# Midtrans Payments Overview {docsify-ignore}
<hr>

Midtrans helps your business to accept payment methods such as [card payment, bank transfer, e-money, over the counter, cardless credits, direct debit, and other methods](https://midtrans.com/payments). 

<!-- TODO: put image of all payment methodss icon here? -->
<!-- ![payment methods](https://midtrans.com/assets/images/channels/payment-channels-sprite-v4.png) -->

Along with giving your customer freedom to pay with their favorite payment methods, Midtrans also offers you various integration options. You can pick the best suited option for your needs.

<!-- Decide which is best suited for your needs. Or, if you're looking for integration method [for offline usecases, see here](#other-options). -->

## Integration Options {docsify-ignore}

<div class="my-card">

#### [Built-In Interface (Snap) for Your Web & App](/en/snap/overview.md)
Snap user interface helps to securely accept payments on your website and mobile app with a few simple steps. Your customer is presented with a sleek, mobile-friendly interface to make payments. With simple integration, Snap user interface allows you to accept payments with [Midtrans' various payment methods](https://midtrans.com/payments).
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

#### [Native Mobile App SDK](https://mobile-docs.midtrans.com)
Native Mobile App SDK helps you to accept payments within your mobile app. You can embed our Android and iOS Mobile SDK within your app. Similar to Snap, the Mobile SDK also provides drop-in user interface to accept payments using [Midtrans’s various payment methods](https://midtrans.com/payments).
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

#### [Custom Interface (Core API)](/en/core-api/overview.md)
Core API enables you to customize the payment-flow or the user interface to fit your unique needs. Use the Core API for your website, web application, Point of Sales, IoT (Internet of Things) or any other internet-capable device to connect with us and start accepting payments. Core API uses REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Payment Link](/en/payment-link/overview.md)
The Midtrans Payment Link method helps you to invoice your customers receive payments without having a website. Share a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details.
</div>

<div class="my-card">

#### [CMS Payment Plugins](/en/snap/with-plugins.md)
If you are already using e-commerce Content Management System (CMS) such as **Wordpress-Woocommerce, Magento, Prestashop, Opencart, WHMCS**, and so on, you can easily integrate with Midtrans payment page by installing plugin in a few simple clicks. 
</div>

<div class="my-card">

#### [Ecommerce Platform](/en/snap/platform/overview.md)
You can integrate with Midtrans to start accepting payment with third-party platform such as **Shopify, Sirclo, Jejualan**, and so on. It is ready-to-use, user friendly, and requires minimal setup. 
</div>

## Comparison of Integration Options {docsify-ignore}

| Integration Type | Features | Sample Use Case |
| --- | --- | --- |
| **Built-in Interface** (Snap) | • All-in-one payment UI that can display all available payment methods. <br/>• Quick, you can integrate just one time, and new payment methods will be auto added within it. <br/>• Can customize the displayed payment methods, and expiry time via Dashboard or API calls. <br/>• Customizable display name, brand logo, and theme color. | • You want an easy way to integrate payment quickly, which allow some customization. <br>• Your platform is web based or able to display web based payment page (webview). <br>• You want to Embed payment page directly within your web & app (via webview) using our Javascript library, or <br>• Redirect customer to Midtrans-hosted payment web page. |
| **Native Mobile App SDK** | • All the features of *Built-in Interface (Snap)*, optimized for native Android & iOS app, instead of website. <br/>• It is integrated by importing Midtrans SDK within your application codebase. | • Yours is a native mobile app based business, for Android & iOS. <br/>• You want to integrate payment quickly for mobile app, with a native performance & feels. |
| **Custom Interface** (Core API) | • Render and customize your own payment interface (UI).<br/> • Build your own payment interface (UI) for different payment methods. <br/>• Can be used for non-web applications such as hardware devices or custom software. <br />See [GoPay Integration for POS](#GoPay Integration for POS) for more details.<br/>• It has advanced features like on-demand recurring charges. | • You want to fully customize the payment interface/UI, for each payment methods. <br/>• Your business is unable to use website or application based integration like Vending Machine, POS, hardware devices, and so on. <br/>• Your business is PCI compliant. |
| **Payment Link** | • Does not require coding or programming.<br/>• Can be used to create payment link from the  *Dashboard*. <br/> • The link created using this method can be used in your Blog post, Social Media page, Messenger, WhatsApp, Email, and so on. | • You want to send invoice to your customer quickly, without any complex system or integration. <br/>• You sell on social media sites. <br/>• You are selling a product <!--or service--> (webinar tickets, virtual products, and so on) at a certain price for many potential customers. |
| **CMS Payment Plugins** | • Does not require coding or programming.<br/>• It has all the features of *Built-in Interface (Snap)*<br/>• It is simple to install and easy to use. | • You want all the features of  *Built-in Interface (Snap)*, without the complexity of manual programming or integration.<br/>• You are currently using (or want to use) CMS such as WordPress, Magento, PrestaShop, WHMCS, and so on. |
| **E-commerce Platform** | • Does not require coding or programming.<br/>• It has all the features of *Built-in Interface (Snap)*<br/>• It is simple to install and use, for third-party E-commerce platforms. | • You want all the features of  *Built-in Interface (Snap)*, without the complexity of manual programming or integration.<br/>• You are currently using (or want to use) ready-to-use Platform such as Shopify, Sirclo, Jejualan, and so on. |

?> **Note:** Those sample use case **does not limit** how you could fit the integration-type with your own unique requirement. You can get creative and go beyond those sample use case, and invent your own use case for that type of integration.

## Other Options to Integrate {docsify-ignore}
- [**Gopay Integration for POS**](https://midtrans-advanced-faq.netlify.com/#/partner-gopay-pos): The non-conventional web/app platforms (vending machine, TV box, IoT, point of sales, and so on) can be integrated with **Core API** as long as they are connected to the Internet. 
  These devices can easily start accepting payments using the API calls.

## Next Step {docsify-ignore}
<br>

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans account to get your *Sandbox* API keys ready to test integration. To start accepting real payments, sign up for *Production*.
</div>

<div class="my-card">

#### [Explore Integration Options](#choose-integration-options)
Check out all the available choices and learn the integration.
</div>
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
  <button onclick="previewSnap(this)" class="my-btn">Preview Snap UI ⎋</button>
</p>
<div style="text-align: center;">

[Try it yourself with this (less than 5 mins) integration sample! ↗](/en/snap/interactive-demo.md)
<small>

***Tips:*** Snap can also be embedded within your mobile app [using WebView](/en/snap/integration-guide.md#display-snap-via-mobile-apps-webview). Check [demo of Snap displayed in a WebView](https://sample-demo-dot-midtrans-support-tools.et.r.appspot.com/snap-webview)
</small>
</div>
</div>

<div class="my-card">

#### [Native Mobile App SDK](https://mobile-docs.midtrans.com)
Native Mobile App SDK helps you to accept payments within your mobile app. You can embed our Android and iOS Mobile SDK within your app. Similar to Snap, the Mobile SDK also provides drop-in user interface to accept payments using [Midtrans’s various payment methods](https://midtrans.com/payments).
<details>
<summary><b>Try Mobile SDK via Simulator</b></summary>
<article>
<div style="text-align: center;">
<!-- @TODO: make this lazily load only if this details tag is open -->
<iframe src="https://appetize.io/embed/9r0b89zu862f8eu1ukd0ecpgxc?device=pixel4&scale=71&orientation=portrait"width="300px" height="600px" frameborder="0" scrolling="no"></iframe>
<iframe src="https://appetize.io/embed/x4ace4dndczdbg1j633nq4cgbw?device=iphone11pro&scale=70&orientation=portrait"width="300px" height="600px" frameborder="0" scrolling="no"></iframe>
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
</div><div class="my-card">

#### [Payment Link via API Integration](/en/payment-link/with-api.md)
It is also possible to integrate programmatically via API <span class="badge badge-yellow">BETA</span>, and have the same featues as Payment Link above.
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

<table>
  <thead>
    <tr>
      <th>Integration Type</th>
      <th>Features</th>
      <th>Sample Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Built-in Interface</strong> (Snap) </th>
      <td>
        <ul>
          <li>All-in-one payment UI that can display all available payment methods.</li>
          <li>Quick, integrate just one time, then any new payment methods can be auto added.</li>
          <li>Customizable payment methods, expiry time, & more via Dashboard/API.</li>
          <li>Customizable display name, brand logo, & theme color.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Easy way to integrate payment quickly, & customizable. </li>
          <li>

Embed payment page directly within your web (or mobile app, via [webview](/en/snap/integration-guide.md#display-snap-via-mobile-apps-webview))</li>
          <li>Or redirect customer to Midtrans-hosted payment page.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Native Mobile App SDK</strong></th>
      <td>
        <ul>
          <li>All the features of <strong>Snap</strong>, optimized for native Android & iOS app.</li>
          <li>Via importing Midtrans SDK within app codebase.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>For native mobile app based business (Android & iOS)</li>
          <li>Integrate quickly on mobile app, with a native performance & feels.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Custom Interface</strong>(Core API)</th>
      <td>
        <ul>
          <li>Render and customize your own payment interface (UI).</li>
          <li>Customize interface for each payment methods.</li>
          <li>Advanced features like on-demand recurring charges.</li>
          <li>

Compatible with web and non-web applications (hardware devices or custom software). Like [GoPay Integration for POS](#other-options-to-integrate)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Fully customize the payment interface/UI, for each payment methods. </li>
          <li>Your business is PCI compliant.</li>
          <li>Custom integration like Vending Machine, POS, hardware devices, and so on. </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Payment Link</strong></th>
      <td>
        <ul>
          <li>No coding or programming needed.</li>
          <li>Create payment link from <strong>Dashboard</strong>.</li>
           <li>Payment link can be shared in your Blog, Social Media, Messenger, WhatsApp, Email, etc.</li>
          <li>Customizable number of payment (usage), URL part, & longer lifetime</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Send invoice to customer quickly, without complex integration. </li>
          <li>Sell on social media. </li>
          <li>Create once & use it for many customers, for products like tickets, virtual products, etc.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Payment Link via API Integration</strong></th>
      <td>
        <ul>
          <li>Similar features & benefits as Payment Link, but easily integrated via API just like Snap.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Can cover both use cases of Snap & Payment Link.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>CMS Payment Plugins</strong></th>
      <td>
        <ul>
          <li>No coding or programming needed.</li>
          <li>Simple to install & use.</li>
          <li>The features of  <strong>Snap</strong>, without complex integration.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>You are using CMS like WordPress, Magento, PrestaShop, WHMCS, etc.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>E-commerce Platform </strong></th>
      <td>
        <ul>
          <li>No coding or programming needed.</li>
          <li>Simple install & use, for third-party E-commerce platforms.</li>
          <li>The features of  <strong>Snap</strong>, without complex integration.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>You are using ready-to-use Platform like Shopify, Sirclo, Jejualan, etc.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

?> **Note:** Those sample use case **does not limit** how you could fit the integration-type with your own unique requirement. You can get creative and go beyond those sample use case, and invent your own use case for that type of integration.

## Other Options to Integrate {docsify-ignore}
- [Gopay Integration for POS](/en/other/faq/gopay-pos.md): The non-conventional web/app platforms (vending machine, TV box, IoT, point of sales, and so on) can be integrated with **Core API** as long as they are connected to the Internet. 
  These devices can easily start accepting payments using the API calls.
- If you are using non-native/hybrid mobile based app framework (such as React Native, Flutter, etc.) [you can try to follow this suggestion to integrate](/en/other/faq/technical.md#does-midtrans-support-flutter-react-native-or-other-hybridnon-native-mobile-framework).

## Next Step {docsify-ignore}
<br>

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans account to get your *Sandbox* API keys ready to test integration. To start accepting real payments, sign up for *Production*.
</div>

<div class="my-card">

#### [Explore Integration Options](#integration-options)
Check out all the available choices and learn the integration.
</div>
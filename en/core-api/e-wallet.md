

# Core API E-Money Integration

<hr>

?>***Note:*** This payment method is compatible with [QR Code Indonesian Standard (QRIS)](https://www.bi.go.id/QRIS/default.aspx), and can be paid with **any QRIS compatible e-Money or banking app**.

GoPay is an *E-Money* payment method by Gojek. Users can pay using the Gojek-GoPay app, or any QRIS compatible app. The user flow is different for web browser (on a computer or a tablet) and smartphone:

1. **QR Code** - This is the user flow on a web browser (on a computer or a tablet). User is shown a QR code and asked to scan using any QRIS compatible app, such as Gojek-GoPay app.
2. **Deeplink** - This is the user flow on a SmartPhone/mobile device. User gets redirected to the Gojek-GoPay app to finish payment.

?>***Note:*** Please make sure to create your [Midtrans account](/en/midtrans-account/overview.md), before proceeding with this section.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall GoPay end-to-end payment process can be illustrated in following sequence diagram.

<!-- tabs:start -->

#### **QR Code Mode (Default)**

![Core API Gopay QR sequence diagram](./../../asset/image/core-api_sequence_qr.png)

#### **Deeplink Mode**

![Core API Gopay Deeplink sequence diagram](./../../asset/image/core-api_sequence_deeplink.png)
<!-- tabs:end -->
</article>
</details>

## Sandbox Environment
The steps given below use [Midtrans *Sandbox* environment](https://account.midtrans.com/) to test the integration process. Please make sure that you use the *Server Key* and *Client Key* for the *Sandbox* environment. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).

Basic integration process of GoPay is explained in this section.

## Steps for Integration
To integrate with *E-Money* Payment method, follow the steps given below.

## 1. Sending Transaction Data to API Charge
API request should be done from merchant backend to acquire QR code and deeplink URL to Gojek-GoPay app. The table given below describes the various elements required for sending the transaction data to the *Charge API*.  

| Requirement    | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Server Key     | The server key. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys). |
| `order_id`     | The order_id of the transaction.                             |
| `gross_amount` | The total amount of transaction.                             |
| `payment_type` | The payment method. Note: Here, set to `gopay`               |

#### Sample Request
The sample *Charge API request* implementation is given below.  You can choose/implement according to your backend language. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library).

<!-- tabs:start -->

#### **CURL**
#### Request Details

| Environment | Method | URL                                        |
| ----------- | ------ | ------------------------------------------ |
| Sandbox     | POST   | https://api.sandbox.midtrans.com/v2/charge |
| Production  | POST   | https://api.midtrans.com/v2/charge         |

#### HTTP Headers

```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64Encode(`"YourServerKey"+":"`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your **Server Key** while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](/en/technical-reference/api-header.md).

#### Sample Request
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
    "payment_type": "gopay",
    "transaction_details": {
        "order_id": "order-101",
        "gross_amount": 44000
    }
}'

```
</article>
</details>

#### **PHP**
Install [**midtrans-php**](https://github.com/Midtrans/midtrans-php) library.
```bash
composer require midtrans/midtrans-php
```

> Alternatively, if you are not using **Composer**, you can [download midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require the file manually.
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

Sample Request
```php
// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';

$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => 10000,
    ),
    'payment_type' => 'gopay',
    'gopay' => array(
        'enable_callback' => true,                // optional
        'callback_url' => 'someapps://callback'   // optional
    )
);

$response = \Midtrans\CoreApi::charge($params);
```

#### **Node JS**
Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package.
```bash
npm install --save midtrans-client
```

Sample Request
```javascript
const midtransClient = require('midtrans-client');
// Create Core API instance
let core = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

let parameter = {
    "payment_type": "gopay",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "gopay": {
        "enable_callback": true,                // optional
        "callback_url": "someapps://callback"   // optional
    }
};

// charge transaction
core.charge(parameter)
    .then((chargeResponse)=>{
        console.log('chargeResponse:');
        console.log(chargeResponse);
    });
```

#### **Java**
Install [**midtrans-java**](https://github.com/Midtrans/midtrans-java) library.

<details>
<summary><b>Maven</b></summary>
<article>

If you are using Maven as the build tool for your project, please add the following dependency to your project's build definition (pom.xml).
```xml
<dependencies>
    <dependency>
      <groupId>com.midtrans</groupId>
      <artifactId>java-library</artifactId>
      <version>3.0.0</version>
    </dependency>
</dependencies>
```

</article>
</details><br>

<details>
<summary><b>Gradle</b></summary>
<article>

If you are using Gradle as the build tool for your project, please add following dependency to your project's build definition (build.gradle).
```bash

dependencies {
	implementation 'com.midtrans:java-library:3.0.0'
}
```

</article>
</details>

**Sample Request**

You can also check the [functional tests](https://github.com/Midtrans/midtrans-java/blob/master/library/src/test/java/com/midtrans/java/CoreApiTest.java) for more examples.

```java
import com.midtrans.Midtrans;
import com.midtrans.httpclient.SnapApi;
import com.midtrans.httpclient.error.MidtransError;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;


public class MidtransExample {

    public static void main(String[] args) throws MidtransError {
      // Set serverKey to Midtrans global config
      Midtrans.serverKey = "YOUR_SERVER_KEY";

      // Set value to true if you want Production Environment (accept real transaction).
      Midtrans.isProduction = false;

        UUID idRand = UUID.randomUUID();
        Map<String, Object> chargeParams = new HashMap<>();

        Map<String, String> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", idRand.toString());
        transactionDetails.put("gross_amount", "265000");

        chargeParams.put("transaction_details", transactionDetails);
        chargeParams.put("payment_type", "gopay");

            JSONObject result = CoreApi.chargeTransaction(chargeParams);
            System.out.println(result);
    }
}
```
#### **Python**

Install [**midtransclient**](https://github.com/Midtrans/midtrans-python-client) PIP package.

```bash
pip install midtransclient
```

Sample Request
```python
import midtransclient
# Create Core API instance
core_api = midtransclient.CoreApi(
    is_production=False,
    server_key='YOUR_SERVER_KEY',
    client_key='YOUR_CLIENT_KEY'
)
# Build API parameter
param = {
    "payment_type": "gopay",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "gopay": {
        "enable_callback": true,                # optional
        "callback_url": "someapps://callback"   # optional
    }
}

# charge transaction
charge_response = core_api.charge(param)
```

<!-- @TODO: add Golang code example tab here-->
#### **Other**

- Please check Midtrans [available **language libraries**](/en/technical-reference/library-plugin.md)

<!-- tabs:end -->

<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Requirement         | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| transaction_details | Details of the transaction such as order_id and gross_amount. | -      | Required |
| order_id            | Transaction order ID, defined from your side.                | String | Required |
| gross_amount        | Total amount of transaction, defined from your side.         | String | Required |
| payment_type        | Set to `gopay`.                                              | String | Required |

</article>
</details>

?>***Tips***: You can [include more information](/en/core-api/advanced-features.md#recommended-parameters) such as `customer_details`, `item_details`, and so on. It is recommended to send more details regarding the transaction, so that these details will be captured on the transaction record. Which can be [viewed on the Midtrans Dashboard](/en/after-payment/dashboard-usage.md#transaction).

Learn more on why this API request [should be securely managed from your backend](/en/security/overview#keep-sensitive-parameters-secured).

#### Sample response
A sample *Charge API* response is shown below.

```json
{
  "status_code": "201",
  "status_message": "GO-PAY transaction is created",
  "transaction_id": "231c79c5-e39e-4993-86da-cadcaee56c1d",
  "order_id": "order-101h-1570513296",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "payment_type": "gopay",
  "transaction_time": "2019-10-08 12:41:36",
  "transaction_status": "pending",
  "fraud_status": "accept",
  "actions": [
      {
        "name": "generate-qr-code",
        "method": "GET",
        "url": "https://api.sandbox.veritrans.co.id/v2/gopay/231c79c5-e39e-4993-86da-cadcaee56c1d/qr-code"
      },
      {
        "name": "deeplink-redirect",
        "method": "GET",
        "url": "https://simulator.sandbox.midtrans.com/gopay/ui/checkout?referenceid=Y0xwjoQ9uy&callback_url=someapps%3A%2F%2Fcallback%3Forder_id%3Dorder-101h-1570513296"
      },
      {
        "name": "get-status",
        "method": "GET",
        "url": "https://api.sandbox.veritrans.co.id/v2/231c79c5-e39e-4993-86da-cadcaee56c1d/status"
      },
      {
        "name": "cancel",
        "method": "POST",
        "url": "https://api.sandbox.veritrans.co.id/v2/231c79c5-e39e-4993-86da-cadcaee56c1d/cancel"
      }
  ]
}
```
You will get the `actions` attribute to complete the transaction.

<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID*.                                     | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order.      | String | -                                                            |
| currency           | The unit of currency used for the transaction.               | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction. | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud_status of the transaction is displayed.            | String | -                                                            |
| actions            | The set of actions.                                          | Array  | It is the set of actions that can be retrieved through this attribute. Merchant chooses the action according to his/her need. |
| name               | The name of the action.                                      | String | -                                                            |
| method             | The type of the method.                                      | String | -                                                            |
| url                | The redirect URL.                                            | String | -                                                            |

</article>
</details>

## 2. Altering Payment Flow Depending on the Device Used
Depending on which platform (Desktop or Mobile) you are integrating this payment method for your customer to pay, the payment flow will be different between *computer/tablet* versus *smartphone/mobile*. Choose from the flows below accordingly.
### Show QR Code Image (on computer or tablet)
To display transaction QR Code image, use the URL from `generate-qr-code` actions retrieved from API response. Simplest way is to **"hotlink"** the image URL. If the frontend is HTML, put the URL in image tag `<img src="THE_QR_CODE_URL_HERE">`, or display it on a similar component downloading.

If the frontend does not support such scenario, you may need to locally download the QR code image from that URL, then display it on your frontend.

Once the QR Code for payment is displayed to customer, it will be available for customer to pay.

?> Read [here to simulate/test success payment on Sandbox](/en/technical-reference/sandbox-test.md#e-money).

Payment flow example for customer on Production environment:

1. On Merchant web/app, choose **GoPay/QRIS** as payment method.
2. Continue checkout until the payment QR code displayed.
3. Open any **QRIS compatible app**, installed in your phone, for example Gojek-GoPay.
4. Use "Scan to Pay" feature to scan the **QR code**.
5. Click **Pay**, after checking and verifying your payment details.
6. You may be prompted to input **Security PIN** to finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-qr-pay.png)

### Redirecting to Gojek-GoPay App Deeplink (on smartphone)
To redirect the customer to Gojek-GoPay app, use URL from `deeplink-redirect` actions retrieved from API response. Then customer can be redirected via server-side redirect, using JavaScript, such as `window.location=[DEEPLINK URL]`, or using HTML link, `<a href="[DEEPLINK URL]">Pay with GoPay</a>`.

?> Read [here to simulate/test success payment on Sandbox](/en/technical-reference/sandbox-test.md#e-money).

Payment flow example for customer on Production Environment:

1. On Merchant web/app, choose **GoPay** as payment method.
2. Continue checkout until you are redirected to **Gojek-GoPay** app.
3. Click **Pay**, after checking and verifying your payment details.
4. You may be prompted to input **Security PIN** to finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-deeplink-pay.png)

#### Implementing Finish Redirect Callback Handler
In addition to app deeplink flow above, you can optionally implement finish redirect callback. Which after payment, the customer will be redirected back from Gojek-GoPay to your app.

Add the following parameters within the `gopay` object in the [Charge API request](#sample-request).
```json
  "gopay": {
      "enable_callback": true,
      "callback_url": "tokokuapp://gopay-finish"
  }
  //you can also use web url like "https://myshop.com/gopay-finish"
```
| JSON Attribute | Description |
| -------------- | ----------- |
| enable_callback | To determine whether customer will be redirected to the callback URL after payment. Default value: `false`. |
| callback_url | To determine where Gojek-GoPay app will redirect customer after payment. Can be HTTP or app deeplink URL. Default value: `callback_url` in dashboard settings. |

You will need to implement callback url handler on your web/app. Customer will be redirected to this URL once payment is completed. The redirect will also automatically appended with query parameters below.

| Parameter | Description |
| --------- | ----------- |
| order_id | Order ID sent on the Charge Request|
| result | Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`|

The final url will become for example `tokokuapp://gopay-finish?order_id=123&result=success`. So make sure your app can handle the finish redirect url properly.

?>***Note*** : To update the **Transaction Status** on merchant backend/database, **do not** solely rely on frontend callbacks. For security reasons, to make sure that the **Transaction Status** is authentically coming from Midtrans, you can update **Transaction Status** by waiting for [HTTP Notification](/en/after-payment/http-notification.md) or timely call [API Get Status](/en/after-payment/get-status) on your backend.

If you don't implement finish redirect callback, after payment completed, customer can manually dismiss GoPay success/failure screen, then navigate back to your app manually.

## 3. Handling Post-Transaction
When the transaction status changes, Midtrans notifies you at the *Redirect URL* and sends HTTP notification to the merchant backend. This ensures that you are updated of the transaction status securely.

HTTP POST request with JSON body will be sent to your server's *Notification URL* configured on dashboard.

<details>
<summary><b>Configuring Payment Notification URL</b></summary>
<article>

To configure the Payment Notification URL, follow the steps given below.
1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**. *Configuration* page is displayed.
3. Enter **Payment Notification URL**.
4. Click **Update**. <br>A confirmation message is displayed.
 ![Core API](./../../asset/image/coreapi/core-api-payment-notification-1.png)
 <br>The *Payment Notification URL* is configured.

</article>
</details>

 <br>

<div class="my-card">

#### [HTTP(S) Notification/Webhooks](/en/after-payment/http-notification.md)
</div>

## 4. Switching to Production Mode
In this section, you will learn how to switch to Midtrans Production environment and to accept real payments from real customers. This is also known as "Going Live".

<br>

<div class="my-card">

#### [Going Live](/en/technical-reference/going-live.md)
Learn how to switch from Sandbox to Production environment, to start accepting real payment

</div>


#### Transaction Status Description
The table given below explains `transaction_status` values for Ewallet transaction.

| Transaction Status | Description |
| ------------------ | ----------- |
| settlement | Transaction is successfully paid, customer has completed the transaction. |
| pending | Transaction is successfully created to payment provider but it's not yet completed by the customer. |
| expire | Transaction is failed as the payment is not done by customer within the given time period. |
| cancel | Transaction is canceled by you. |
| deny | Transaction is rejected by the payment provider. |
| refund | Transaction is refunded by you. |

## Additional Notes
#### Allowing App Redirect for Mobile Platform App
If app deeplink redirect method is being used within WebView, you may need to include additional configurations to ensure that your app will be able to redirect customer to Gojek-GoPay app. Please make sure that the WebView allows opening app redirect link urls.

<!-- tabs:start -->

#### **Android Native**
On **Android** if using WebView, please make sure that the WebView allows opening other app redirect link urls.

As a reference/example please follow [this FAQ on how to allow Gojek-GoPay app redirect link.](/en/other/faq/technical.md#android)

#### **iOS Native**
On **iOS** if using WebView, please make sure that the WebView allows opening other app redirect link urls.

As a reference/example please follow [this FAQ on how to allow Gojek-GoPay app redirect link.](/en/other/faq/technical.md#ios-webview-specific)

#### **WebView & Other**
If you are using other framework such as React Native, Flutter, etc. Please follow [this FAQ on how to allow Gojek-GoPay app redirect link.](/en/other/faq/technical.md#customer-fails-to-be-redirected-to-gojek-deeplink-on-mobile-app-what-should-i-do)

<!-- tabs:end -->
<br>

Link: [*More detailed definition of transaction_status & fraud_status*](/en/after-payment/status-cycle.md)

#### Making Sure App Redirect Works on Web Based Mobile Platform App
If you are implementing redirect using web based code (Browser, PWA, React Native, within WebView, etc.) on a Mobile App, sometimes the platform may block you from redirecting customer to another app. 

Please follow [this FAQ on how to allow deep/universal link redirect.](/en/other/faq/technical.md#customer-fails-to-be-redirected-to-gojek-deeplink-on-mobile-app-what-should-i-do)

#### Payment via QRIS
Please note that **if the payment transaction is paid by customer via QRIS** scanning method, then:
- Midtrans will send **webhook/HTTP notification with `"payment_type": "qris"` instead of `gopay`**. This is to indicate that the payment is via QRIS.

Please **ensure that your system can handle this behavior**, although it may seem unusual that you send payment_type as `gopay` but may receive back as `qris`.


## Next Step
<br>

<div class="my-card">

#### [Taking Action of Payment](/en/after-payment/overview.md)
</div>

<div class="my-card">

#### [Core API Advanced Feature](/en/core-api/advanced-features.md)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action](/en/after-payment/status-cycle.md)
</div>

<hr>

For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)

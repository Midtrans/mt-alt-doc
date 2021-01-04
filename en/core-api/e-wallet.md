

# Core API E-Money Integration

<hr>

?>***Note:*** This payment method is compatible with [QR Code Indonesian Standard (QRIS)](https://www.bi.go.id/id/ruang-media/siaran-pers/Pages/SP_216219.aspx), and can be paid with **any QRIS compatible e-Money or banking app**.

GoPay is an *E-Money* payment method by Gojek. Users can pay using the Gojek apps, or any QRIS compatible app. The user flow is different for web browser (on a computer or a tablet) and smartphone:

1. **QR Code** - This is the user flow on a web browser (on a computer or a tablet). User is shown a QR code and asked to scan using any QRIS compatible app, such as Gojek app.
2. **Deeplink** - This is the user flow on a SmartPhone/mobile device. User gets redirected to the Gojek apps to finish payment.

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
API request should be done from merchant backend to acquire QR code and deeplink to Gojek app. The table given below describes the various elements required for sending the transaction data to the *Charge API*.  

| Requirement    | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Server Key     | The server key. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys). |
| `order_id`     | The order_id of the transaction.                             |
| `gross_amount` | The total amount of transaction.                             |
| `payment_type` | The payment method. Note: Here, set to `gopay`               |

#### Sample Request
 APIs are implemented in some of the commonly used languages.  You can implement according to your backend language. The sample request for *Charge API* is given below. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library).

<!-- tabs:start -->

#### **CURL**
#### Request Details

| Environment | Method | URL                                        |
| ----------- | ------ | ------------------------------------------ |
| Sandbox     | POST   | https://api.sandbox.midtrans.com/v2/charge |
| Production  | POST   | https://api.midtrans.com/v2/charge         |

#### Headers

| Header Name   | Description                                            | Required | Values                |
| ------------- | ------------------------------------------------------ | -------- | --------------------- |
| Accept        | The format of the data to be returned.                 | Required | application/json      |
| Content-Type  | The format of the data to be posted.                   | Required | application/json      |
| Authorization | The authentication method used to access the resource. | Required | Basic **AUTH_STRING** |

**AUTH_STRING**: Base64(`ServerKey + :`)<br>Midtrans API validates HTTP request by using Basic Authentication method. The username is your *Server Key* while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by a colon symbol (**:**). For more details, refer to [ API Authorization and Headers](https://docs.midtrans.com/en/technical-reference/api-header).

?> ***Note***: *Server Key* is required to authenticate the request. For more details, refer to [HTTPS Header](https://api-docs.midtrans.com/#http-s-header).<br>

Sample Request
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
    'gopay': {
        'enable_callback': true,                // optional
        'callback_url': 'someapps://callback'   // optional
    }
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

If you are using Maven as the build tool for your project, please add JCenter repository to your build definition, then add the following dependency to your project's build definition (pom.xml).
```xml
<repositories>
    <repository>
        <id>jcenter</id>
        <name>bintray</name>
        <url>http://jcenter.bintray.com</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
      <groupId>com.midtrans</groupId>
      <artifactId>java-library</artifactId>
      <version>1.1.0</version>
    </dependency>
</dependencies>
```

</article>
</details><br>

<details>
<summary><b>Gradle</b></summary>
<article>

If you are using Gradle as the build tool for your project, please add JCenter repository to your build script then add the following dependency to your project's build definition (build.gradle).
```bash
repositories {
    maven {
        url  "http://jcenter.bintray.com"
    }
}

dependencies {
    compile 'com.midtrans:java-library:1.1.0'
}
```

</article>
</details>

Sample Request

```java
import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.service.MidtransCoreApi;
import com.midtrans.httpclient.error.MidtransError;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;


public class MidtransExample {

    public static void main(String[] args) throws MidtransError {
        MidtransCoreApi coreApi = new ConfigFactory(new Config("YOU_SERVER_KEY","YOUR_CLIENT_KEY", false)).getCoreApi();

        UUID idRand = UUID.randomUUID();
        Map<String, Object> chargeParams = new HashMap<>();

        Map<String, String> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", idRand.toString());
        transactionDetails.put("gross_amount", "265000");

        chargeParams.put("transaction_details", transactionDetails);
        chargeParams.put("payment_type", "gopay");

            JSONObject result = coreApi.chargeTransaction(chargeParams);
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

?>***Tips***: You can customize the `transaction_details` to include more information such as `customer_details`, `item_details`, and so on. For more details, refer to [Transaction Details Object](https://api-docs.midtrans.com/#json-object). It is recommended to add more details regarding transaction, so that these details can get added to the report. This report can be viewed from the dashboard.

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
The user flow is different on a computer or a tablet and a smartphone.
### Show QR Code Image (on computer or tablet)
To display transaction QR Code image, use the URL from `generate-qr-code` actions retrieved from API response. Simplest way is to **"hotlink"** the image URL. If the frontend is HTML, put the URL in image tag `<img src="[QR CODE URL]">`, or display it on a similar component without downloading.
If the frontend does not support such scenario, download the QR code image from that URL, then display it on frontend.

Instruction Example for **QR Code** :

1. Tap **Pay using GoPay**.
2. Click **Pay Now**. QR code will be displayed.
3. Open any **QRIS compatible app**, installed in your phone, for example Gojek.
4. Scan the **QR code**.
5. Click **Pay**, after checking and verifying your payment details.
6. Verify your **Security PIN** and finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-qr-pay.png)

### Creating Redirect Link to Gojek Apps (on smartphone)
To redirect the customer to Gojek app, use URL from `deeplink-redirect` actions retrieved from API response. Then customer can be redirected via server-side redirect, using JavaScript, such as `window.location=[DEEPLINK URL]`, or using HTML link, `<a href="[DEEPLINK URL]">Pay with GoPay</a>`.

The steps for **Deeplink** are as given below.

1. Tap **Pay using GoPay**.
2. You will be redirected to **Gojek** app.
3. Click **Pay**, after checking and verifying your payment details.
4. Verify your **Security PIN** and finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-deeplink-pay.png)

?> Read [here to simulate/test success payment](/en/technical-reference/sandbox-test.md#e-money).

### Implementing GoPay Deeplink Callback
In addition to the standard mobile apps flow, you may opt in to implement a deeplink callback to redirect customer back from Gojek to their apps.
Add `gopay` parameter in the [Charge API request](#sample-request).
```json
  "gopay": {
      "enable_callback": true,
      "callback_url": "someapps://callback" //you can also use web url like https://myshop.com/finish
  }
```
| JSON Attribute | Description |
| -------------- | ----------- |
| enable_callback | To determine appending callback URL in the deeplink. Default value: `false`. |
| callback_url | To determine where Gojek apps will redirect after successful payment. Can be HTTP or deeplink URL. Default value: `callback_url` in dashboard settings. |

You need to prepare an implementation of `callback_url` on your web/app. Customer will be redirected to this URL once payment is completed, with some parameters as the result. It should accept two query parameters which are explained in the table given below.

| Parameter | Description |
| --------- | ----------- |
| order_id | Order ID sent on the Charge Request|
| result | Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`|

?> ***Note:*** To update transaction status on your backend/database, DO NOT solely rely on frontend callbacks! For security reason to make sure the status is authentically coming from Midtrans, only update transaction status based on [HTTP Notification](#_3-handling-post-transaction) or [API Get Status](https://api-docs.midtrans.com/#get-transaction-status)

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

## Additional Notes
If GoPay deeplink is being used on smartphone application (Android/iOS app), you need to include additional configurations to ensure that your app will be able to redirect customer to Gojek app. Please make sure that the WebView allows opening `gojek://` deeplink protocol.

<!-- tabs:start -->

#### **Android**
On **Android** if using WebView, please make sure that the WebView allows opening `gojek://` deeplink protocol. You need to modify your web view `shouldOverrideUrlLoading` functions as shown below.

```java
 @Override
 public boolean shouldOverrideUrlLoading(WebView view, String url) {
        LogUtils.info(TAG, "shouldOverrideUrlLoading: " + url);
        Intent intent;

        if (url.contains("gojek://")) {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            startActivity(intent);

            return true;
        }
 }
```

#### **iOS**

On **iOS**, you will need to add `LSApplicationQueriesSchemes` key to your app's `Info.plist`.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
<string>gojek</string>
</array>
```
<!-- tabs:end -->

## Description
The table given below explains `transaction_status` values for GoPay transaction.

| Transaction Status | Description |
| ------------------ | ----------- |
| settlement | Transaction is successful, customer has completed the transaction. |
| pending | Transaction is successfully created to GoPay but it not completed by the customer. |
| expire | Transaction is failed as the payment is not done by customer within the given time period. |
| cancel | Transaction is canceled by you. |
| deny | Transaction is rejected by the bank. |
| refund | Transaction is refunded by you. |

<br>

Link: [*More detailed definition of transaction_status & fraud_status*](/en/after-payment/status-cycle.md)

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

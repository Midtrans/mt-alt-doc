# Snap Integration Guide
<hr>

The steps for technical integration of Snap are explained below.

?>***Note:***
In this section, Midtrans *Sandbox* environment is used to test the integration process. Please refer [preparation section](/en/snap/preparation.md), before proceeding to this section.

## Preparation

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans Merchant Administration Portal (MAP) account, to get your API Keys for *Sandbox* environment and to test integration.
</div>

<div class="my-card">

#### [Retrieving API Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
Retrieve Sandbox mode API keys that will be used for this guide.
</div>

<details>
<summary><b>Sequence Diagram</b></summary>
<article>

The overall Snap end-to-end payment process is illustrated in following sequence diagram:

<!-- tabs:start -->
#### **Snap Popup Mode (Default)**
![Snap JS sequence diagram](./../../asset/image/snap_sequence_regular.png)

#### **Snap Redirect Mode**
![Snap Redirect sequence diagram](./../../asset/image/snap_sequence_redirect.png)
<!-- tabs:end -->
</article>
</details>

## Steps for integration

To integrate with Snap payment method, follow the steps given below.

## 1. Acquiring Transaction Token on Backend

API request should be done from merchant backend to acquire Snap transaction `token` by providing payment information and *Server Key*. There are at least three components that are required to obtain the Snap token which are explained in the table given below.

| Element        | Description                                                  | Requirement |
| -------------- | ------------------------------------------------------------ | ----------- |
| `Server Key`   | The server key. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys) | Required    |
| `order_id`     | Unique transaction order ID, defined from your side. One ID could be used only once for the order of the material. Allowed character are Alphanumeric, dash(-), underscore(_), tilde (~), and dot (.) String, max 50. | Required    |
| `gross_amount` | Total amount of transaction, defined from your side. Integer. | Required    |

#### Sample Request

<!-- TODO add more lang like ruby, link Postman to postman page -->

The sample request for *Charge API* is given below. APIs are implemented in some of the commonly used languages. You may implement according to your backend language. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library).
<!-- tabs:start -->

#### **CURL**

#### Endpoints

| Environment | Method | URL                                                     |
| ----------- | ------ | ------------------------------------------------------- |
| Sandbox     | POST   | `https://app.sandbox.midtrans.com/snap/v1/transactions` |
| Production  | POST   | `https://app.midtrans.com/snap/v1/transactions`         |

#### HTTP Headers

| Header Name   | Description                                            | Required | Values                |
| ------------- | ------------------------------------------------------ | -------- | --------------------- |
| Accept        | The format of the data to be returned.                 | Required | application/json      |
| Content-Type  | The format of the data to be posted.                   | Required | application/json      |
| Authorization | The authentication method used to access the resource. | Required | Basic **AUTH_STRING** |

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](https://docs.midtrans.com/en/technical-reference/api-header).

?> ***Note***: *Server Key* is required to authenticate the request. For more details, refer to [HTTPS Header](https://api-docs.midtrans.com/#http-s-header).<br>

The example below shows a sample code to obtain transaction token.

Sample request in CURL:
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}'
```

#### **PHP**

Install [**midtrans-php**](https://github.com/Midtrans/midtrans-php) library.
```bash
composer require midtrans/midtrans-php
```

> Alternatively, if you are not using **Composer**, you can [download midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require the file manually
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

Sample Request
```php
// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => 10000,
    ),
    'customer_details' => array(
        'first_name' => 'budi',
        'last_name' => 'pratama',
        'email' => 'budi.pra@example.com',
        'phone' => '08111222333',
    ),
);

$snapToken = \Midtrans\Snap::getSnapToken($params);
```

#### **Node JS**

Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package.
```bash
npm install --save midtrans-client
```

Sample Request
```javascript
const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY'
    });

let parameter = {
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
};

snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:',transactionToken);
    })
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
      <version>2.1.1</version>
    </dependency>
</dependencies>
```
</article>
</details><br>

<details>
<summary><b>Gradle</b></summary>
<article>

If you are using Gradle as the build tool for your project, please add JCenter repository to your build script then add the following dependency to your project's build definition (build.gradle):

```bash
repositories {
    maven {
        url  "http://jcenter.bintray.com"
    }
}

dependencies {
    compile 'com.midtrans:java-library:2.1.1'
}
```

</article>
</details>

Sample Request

```java
import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.service.MidtransSnapApi;
import com.midtrans.httpclient.error.MidtransError;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;

public class MidtransExample {

    public static void main(String[] args) throws MidtransError {
      // Create new Object SnapAPI
      MidtransSnapApi snapApi = new ConfigFactory(new Config("YOU_SERVER_KEY","YOUR_CLIENT_KEY", false)).getSnapApi();
      // Set 3rd param to true if you want Production Environment (accept real transaction).

      // Create params JSON Raw Object request
      public Map<String, Object> requestBody() {
          UUID idRand = UUID.randomUUID();
          Map<String, Object> params = new HashMap<>();

          Map<String, String> transactionDetails = new HashMap<>();
          transactionDetails.put("order_id", idRand);
          transactionDetails.put("gross_amount", "265000");

          Map<String, String> creditCard = new HashMap<>();
          creditCard.put("secure", "true");

          params.put("transaction_details", transactionDetails);
          params.put("credit_card", creditCard);

          return params;
      }

      // Create Token and then you can send token variable to FrontEnd,
      // to initialize Snap JS when customer click pay button
      String transactionToken = snapApi.createTransactionToken(requestBody())
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
# Create Snap API instance
snap = midtransclient.Snap(
    # Set to true if you want Production Environment (accept real transaction).
    is_production=False,
    server_key='YOUR_SERVER_KEY'
)
# Build API parameter
param = {
    "transaction_details": {
        "order_id": "test-transaction-123",
        "gross_amount": 200000
    }, "credit_card":{
        "secure" : True
    }, "customer_details":{
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}

transaction = snap.create_transaction(param)

transaction_token = transaction['token']
```

#### **Postman**

Postman is an API development tool which is used to build, test and modify APIs. You can view our Postman Collection with the steps given below.

1. Download and open [Postman](https://www.getpostman.com).
2. Use this button to import our Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/af068be08b5d1a422796)

3. Navigate to `1.a.  SNAP transaction token request (minimum)`.
4. For more details, refer to [Postman Collection](/en/technical-reference/postman-collection.md).

#### **Other**

- Please check Midtrans [available **language libraries**](/en/technical-reference/library-plugin.md)

<!-- tabs:end -->

?>***Tips***: You can customize the `transaction_details` to include more information such as `customer_details`, `item_details`, and so on. For more details, refer to [Transaction Details Object](https://api-docs.midtrans.com/#json-object). It is recommended to add more details regarding transaction, so that these details can get added to the report. This report can be viewed from the dashboard. For more details, refer to [Advanced Features](/en/snap/advanced-feature.md).

#### Sample Response

The API response for a successful API request is shown below.
```json
{
  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
}
```

<details>
<summary><b>Status Codes and Errors</b></summary>
<article>

Status Code | Description | Example
--- | --- | ---
201 | Successful creation of token. | "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862"
401 | Failed to create a token, as wrong authorization is sent. | "Access denied, please check client or server key"
4xx | Failed to create a token, as wrong parameter is sent. Follow the error_message and check your parameter. | "transaction_details.gross_amount is not equal to the sum of item_details"
5xx | Failed to create a token, because of  Midtrans internal error. Most of the time this is temporary, you can retry later. | "Sorry, we encountered internal server error. We will fix this soon."

</article>
</details>

<br>

## 2. Displaying Snap Payment Page on Frontend

To display Snap payment page within your site, include `snap.js` library into your payment page HTML.

?> ***Note:*** Alternatively, you can also use `redirect_url` retrieved from backend in the previous step to redirect customer to payment page hosted by Midtrans. This is useful if you do not want or can not display payment page on your web page.

The table given below describes the components which are required to display Snap payment page.

Element | Description
--- | ---
Client Key | The *Client Key*. For more details refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
`snap.js` url | `https://app.sandbox.midtrans.com/snap/snap.js`
transaction `token` | Retrieved from backend in [previous step](#_1-acquiring-transaction-token-on-backend)

Enter your *Client Key* as the value of `data-client-key` attribute in snap.js script tag. Start the payment process by calling `snap.pay` with transaction `token`.

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script
      type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SET_YOUR_CLIENT_KEY_HERE"
    ></script>
  </head>

  <body>
    <button id="pay-button">Pay!</button>
    <script type="text/javascript">
      var payButton = document.getElementById('pay-button');
      // For example trigger on button clicked, or any time you need
      payButton.addEventListener('click', function () {
        snap.pay('SNAP_TRANSACTION_TOKEN'); // Replace it with your transaction token
      });
    </script>
  </body>
</html>
```

>**Viewport Meta Tag:** To ensure that Snap popup modal is displayed correctly on a mobile device, please include the viewport meta tag inside your `<head>` tag. The most common implementation:
>`<meta name="viewport" content="width=device-width, initial-scale=1">`

After following the steps given above, the sample Snap page is displayed as shown below.

![Snap Popup Preview](./../../asset/image/snap-popup-preview.gif)

Or try the demo here:

<p style="text-align: center;">
  <button onclick="
  event.target.innerText = `Processing...`;
  fetch(`https://cors-anywhere.herokuapp.com/https://midtrans.com/api/request_snap_token`)
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
    .finally( e=>{ event.target.innerText = `Pay with Snap &#9099;` })
  " class="my-btn">Try Snap Demo &#9099;</button>
</p>

After the payment is completed, customer is redirected back to `Finish URL`. It is specified on [Midtrans Dashboard](/en/snap/advanced-feature.md#configure-redirection-url), under menu **Settings > Snap Preference > System Settings > `Finish URL`**.

<details>
<summary><b>Configuring Finish Redirect URL</b></summary>
<article>To configure the <b>Finish Redirect URL</b>, follow the steps given below.

1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
   *Configuration* page is displayed.   
3. Enter **Finish Redirect URL** with your landing page endpoint.
4. Click **Update**.
   A confirmation message is displayed.

   ![Core API](./../../asset/image/coreapi/core-api-finish-redirect-url-2.png)

   The *Finish Redirect URL* is configured.

</article>
</details>

?>***Tips***: Optionally, you can also use [JavaScript callbacks](/en/snap/advanced-feature.md#javascript-callback) to handle payment events triggered from customer finishing interaction with Snap payment page.

## 3. Creating Test Payment
Create a test payment to make sure you have integrated Snap successfully. There are various payment methods available on Snap. You can choose any one of them to create a test payment. Following are the test credentials for Card payment.

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month in MM format. For example, `02`
Exp Year | Any future year, in YYYY format. For example, `2025`
OTP/3DS | `112233`

Above test credentials are for Card payment. In addition to that, there are test credentials provided for other payment methods. For more details, refer to [Testing Payments on Sandbox](/en/technical-reference/sandbox-test.md).

![Snap Test Transaction](./../../asset/image/snap-test-transaction.gif)

## 4. Handling After Payment
When the transaction status changes, customer is redirected to *Redirect URL* and Midtrans sends HTTP notification to the merchant backend. This ensures that you are updated of the transaction status securely.

HTTP POST request with JSON body will be sent to your server's *Notification URL* configured on dashboard.

<details>
<summary><b>Configuring Payment Notification URL</b></summary>
<article>

To configure the Payment Notification URL, follow the steps given below.
1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
   *Configuration* page is displayed.
3. Enter **Payment Notification URL**.
4. Click **Update**.

![Core API](./../../asset/image/coreapi/core-api-payment-notification-1.png)

The URL is updated and a confirmation message is displayed.

</article>
</details>

<br>

<div class="my-card">

#### [HTTP(S) Notification/Webhooks](/en/after-payment/http-notification.md)
</div>

## Next Step
<br>

<div class="my-card">

#### [Taking Action of Payment](/en/after-payment/overview.md)
In this section, you will learn how to handle events of payment completed by customer and other status changes.
</div>

<div class="my-card">

#### [Snap Advanced Feature](/en/snap/advanced-feature.md)
In this section, you will learn the various useful features that are provided by Snap API.
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action](/en/after-payment/status-cycle.md)
In this section, you will learn, how transaction status can change, and what are the available actions to take.
</div>

<hr>

#### Reference:

> Integration sample codes are also available on our [GitHub repos](/en/technical-reference/library-plugin.md#sample-integration-code).

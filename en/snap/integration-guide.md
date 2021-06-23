# Snap Integration Guide
<hr>

The steps for technical integration of Snap are explained below.

## Preparation
?>***Note:***
In this section, Midtrans *Sandbox* environment is used to test the integration process. 

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans Merchant Administration Portal (MAP) account, to get your API Keys for *Sandbox* environment and to test integration.
</div>

<div class="my-card">

#### [Retrieving API Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
Retrieve Sandbox mode API keys that will be used for this guide.
</div>

## Integration Steps Overview
1. Acquire Snap transaction token on your backend
2. Display Snap payment page on frontend
3. Customer perform payment on payment page
4. Handling payment status update on your backend

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

## 1. Acquiring Transaction Token on Backend

API request should be done from merchant backend to acquire Snap transaction `token` by providing payment information and *Server Key*. There are at least three components that are required to obtain the Snap token which are explained in the table given below.

| Element        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `Server Key`   | API server key. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys) |
| `order_id`     | Unique transaction order ID, defined from your side. One ID could be used only once for the order of the material. Allowed character are Alphanumeric, dash(-), underscore(_), tilde (~), and dot (.) String, max 50. |
| `gross_amount` | Total amount of transaction, defined from your side. Integer. |

#### Sample Request

<!-- TODO add more lang like ruby, link Postman to postman page -->

The sample request for *Charge API* is given below. Choose your preferred programming language on the "tab" below.
<!-- tabs:start -->

#### **CURL**

#### Endpoints

| Environment | Method | URL                                                     |
| ----------- | ------ | ------------------------------------------------------- |
| Sandbox     | POST   | `https://app.sandbox.midtrans.com/snap/v1/transactions` |
| Production  | POST   | `https://app.midtrans.com/snap/v1/transactions`         |

#### HTTP Headers

```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64Encode(`"YourServerKey"+":"`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your **Server Key** while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](/en/technical-reference/api-header.md).

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
</details>

<details>
<summary><b>Gradle</b></summary>
<article>

If you are using Gradle as the build tool for your project, please add the following dependency to your project's build definition (build.gradle):

```bash
dependencies {
	implementation 'com.midtrans:java-library:3.0.0'
}
```

</article>
</details>

**Sample Request**

You can also check the [functional tests](https://github.com/Midtrans/midtrans-java/blob/master/library/src/test/java/com/midtrans/java/SnapApiTest.java) for more examples.

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
      String transactionToken = SnapApi.createTransactionToken(requestBody())
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

#### **Go**

Import [**Midtrans Go**](https://pkg.go.dev/github.com/midtrans/midtrans-go) module package to your project. Via terminal:
```bash
go get -u github.com/midtrans/midtrans-go
```
and/or on your project code:
```golang
import (
    "github.com/midtrans/midtrans-go"
    "github.com/midtrans/midtrans-go/coreapi"
    "github.com/midtrans/midtrans-go/snap"
    "github.com/midtrans/midtrans-go/iris"
)
```

Sample request
```golang
// 1. Initiate Snap client
var s = snap.Client
s.New("YOUR-SERVER-KEY", midtrans.Sandbox)
// Use to midtrans.Production if you want Production Environment (accept real transaction).

// 2. Initiate Snap request param
req := & snap.RequestParam{
    TransactionDetails: midtrans.TransactionDetails{
      OrderID:  "YOUR-ORDER-ID-12345",
      GrossAmt: 100000,
    }, 
    CreditCard: &snap.CreditCardDetails{
      Secure: true,
    },
    CustomerDetail: &midtrans.CustomerDetails{
      FName: "John",
      LName: "Doe",
      Email: "john@doe.com",
      Phone: "081234567890",
    },
  }

// 3. Execute request create Snap transaction to Midtrans Snap API
snapResp, _ := s.CreateTransaction(req)
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

?>***Tips***: You can [include more information](/en/snap/advanced-feature.md#recommended-parameters) such as `customer_details`, `item_details`, and so on. It is recommended to send more details regarding the transaction, so that these details will be captured on the transaction record. Which can be [viewed on the Midtrans Dashboard](/en/after-payment/dashboard-usage.md#transaction).

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
201 | Successful creation of Snap token. | "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862"
401 | Failed to create a token, as wrong authorization is sent. | "Access denied, please check client or server key"
4xx | Failed to create a token, as wrong parameter is sent. Follow the error_message and check your parameter. | "transaction_details.gross_amount is not equal to the sum of item_details"
5xx | Failed to create a token, because of  Midtrans internal error. Most of the time this is temporary, you can retry later. | "Sorry, we encountered internal server error. We will fix this soon."

</article>
</details>

<br>

## 2. Displaying Snap Payment Page on Frontend

To display Snap payment page within your site, include `snap.js` library into your payment page HTML.

?> ***Note:*** Alternatively, you can also use `redirect_url` retrieved from backend in the previous step to redirect customer to payment page hosted by Midtrans. This is useful if you do not want or can not display payment page on your web page via snap.js. [Learn more in this alternative section](#alternative-way-to-display-snap-payment-page-via-redirect).

The table given below describes the components which are required to display Snap payment page.

Element | Description
--- | ---
Client Key | The *Client Key*. For more details refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
`snap.js` url | `https://app.sandbox.midtrans.com/snap/snap.js`
transaction `token` | Retrieved from backend in [previous step](#_1-acquiring-transaction-token-on-backend)

Enter your *Client Key* as the value of `data-client-key` attribute in snap.js script tag. Start the payment process by calling `window.snap.pay` with transaction `token`.

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SET_YOUR_CLIENT_KEY_HERE"></script>
    <!-- Note: replace with src="https://app.midtrans.com/snap/snap.js" for Production environment -->
  </head>

  <body>
    <button id="pay-button">Pay!</button>
    <script type="text/javascript">
      var payButton = document.getElementById('pay-button');
      // For example trigger on button clicked, or any time you need
      payButton.addEventListener('click', function () {
        window.snap.pay('SNAP_TRANSACTION_TOKEN'); // Replace it with your transaction token
      });
    </script>
  </body>
</html>
```
Note: If you are using frontend framework such as ReactJS and struggling to include the script tag, please [refer to this recommendation](/en/other/faq/technical?id=my-developer-uses-react-js-frontend-framework-and-is-unable-to-use-midtransminjssnapjs-what-should-i-do).

>**Tips:** To ensure that Snap popup modal is displayed correctly on a mobile device, please include the viewport meta tag inside your `<head>` tag. The most common implementation:
>`<meta name="viewport" content="width=device-width, initial-scale=1">` (included on sample above).

After following the steps given above, the sample Snap page is displayed as shown below.

![Snap Popup Preview](./../../asset/image/snap-popup-preview.gif)

Or try the demo here:

<p style="text-align: center;">
  <button onclick="previewSnap(this)" class="my-btn">Preview Snap UI ⎋</button>
</p>

After the payment is completed, customer is redirected back to `Finish URL`. It is specified on [Midtrans Dashboard](/en/snap/advanced-feature.md#configure-redirection-url), under menu **Settings > Snap Preference > System Settings > `Finish URL`**.

?>***Tips***: Optionally, you can also use [JavaScript callbacks](/en/snap/advanced-feature.md#javascript-callback) to handle payment events triggered from customer finishing interaction with Snap payment page.

## 3. Creating Test Payment
Create a test payment to make sure you have integrated Snap successfully. Following are the test credentials for Card payment.

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month in MM format. For example, `02`
Exp Year | Any future year, in YYYY format. For example, `2025`
OTP/3DS | `112233`

In addition to that, there are various payment methods available on Snap. You can choose any one of them to create a test payment. For more details, refer to [Testing Payments on Sandbox](/en/technical-reference/sandbox-test.md).

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

Integration sample codes are also available on our [GitHub repos](/en/technical-reference/library-plugin.md#sample-integration-code).

#### Alternative way to Display Snap Payment Page via Redirect

Alternatively, you can also use `redirect_url` retrieved from backend in the 1st step to redirect customer to payment page hosted by Midtrans. This is useful if you do not want or can not display payment page on your web page via snap.js.

Additionally, you can configure where customer will be redirected after the payment page, by: Login to your MAP/Midtrans Dashboard account, then go to **SETTINGS > CONFIGURATION**. Then please configure the Finish, Unfinish, Error Redirection URLs. 

[Learn more here on configuring Snap Redirect url configuration](/en/snap/advanced-feature.md#configuring-redirect-url), after clicking that link please choose the `Snap Redirect (Alternative)` tab.

<details>
<summary><b>Configuring Finish Redirect URL</b></summary>
<article>To configure the <b>Finish Redirect URL</b>, follow the steps given below.

1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
   *Configuration* page is displayed.   
3. Enter **Finish, Unfinish, and Error Redirect URL** with your landing page url.
4. Click **Update**.
   A confirmation message is displayed.

   ![Core API](./../../asset/image/coreapi/core-api-finish-redirect-url-2.png)

   The *Finish Redirect URL* is configured.

</article>
</details>
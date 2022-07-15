# Core API Direct Debit Payment Integration
<hr>


*Direct Debit* is one of the payment methods offered by Midtrans. Using this payment method, the customer can pay using their E-Banking debit account. Midtrans sends real-time notifications when the customer completes the payment. Currently, Midtrans can integrate with the following *Direct Debit* payment methods such as BCA KlikPay, CIMB Clicks, Danamon Online Banking, and BRImo (previously known as e-Pay BRI).

<div class="cards-r-4">
  <div>

![bca klikpay](./../../asset/image/coreapi/bca_klikpay.svg ":size=120")
  </div>
  <div>

![cimb clicks](./../../asset/image/coreapi/cimb_clicks.svg ":size=120")
  </div>
  <div>

![danamon online banking](./../../asset/image/coreapi/danamon.png ":size=120")
  </div>
  <div>

![BRImo](./../../asset/image/coreapi/epay_bri.png?dummyParamToPurgeCFCache=1 ":size=120")
  </div>
</div>

<details>
<summary><b>Sequence Diagram Transaction Flow</b></summary>
<article>

![Direct Debit Payment Flow](./../../asset/image/coreapi/direct_debit.png)

</article>
</details>

## Sandbox Environment
The steps given below uses Midtrans *Sandbox* environment to test the integration process. Please make sure that you use the *Server Key* and *Client Key* for the *Sandbox* environment. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).

## Steps for Integration
To integrate with *Direct Debit* payment method, follow the steps given below.

### 1. Sending transaction data to Charge API
The *Charge API* request is sent with the transaction details, from the merchant backend.

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
The sample CURL request for *Charge API* for *Direct Debit* payment methods are shown below. You may implement according to your backend language. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library).
<!-- tabs:start -->

#### **BCA KilkPay**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bca_klikpay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bca_klikpay": {
      "description": "Pembelian Barang"
  }
}'
```

#### **CIMB Clicks**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "cimb_clicks",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "cimb_clicks": {
      "description": "Purchase of a Food Delivery"
  }
}'
```

#### **Danamon Online Banking**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "danamon_online",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
#### **BRImo**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bri_epay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
<!-- tabs:end -->

<details>
<summary><b>POST JSON Body Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | Direct Debit payment type.                                   | String | Required |
| transaction_details | The details of the transaction like the order_id and gross_amount. | Object | Required |
| order_id            | The order_id of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction.                             | Long   | Required |

</article>
</details>

?>***Tips***: You can [include more information](/en/core-api/advanced-features.md#recommended-parameters) such as `customer_details`, `item_details`, and so on. It is recommended to send more details regarding the transaction, so that these details will be captured on the transaction record. Which can be [viewed on the Midtrans Dashboard](/en/after-payment/dashboard-usage.md#transaction).

Learn more on why this API request [should be securely managed from your backend](/en/security/overview#keep-sensitive-parameters-secured).

#### Sample Response and Response Body
The sample API responses and a description of the response body for the available *Direct Debit* payment methods are shown below.
<!-- tabs:start -->

#### **BCA KilkPay**
**Sample Response**
```json
{
    "status_code": "201",
    "status_message": "OK, BCA KlikPay transaction is successful",
    "transaction_id": "d19a4bcd-ae30-49dc-bde7-57749aede090",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bca/klikpay/redirect/d19a4bcd-ae30-49dc-bde7-57749aede090",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bca_klikpay",
    "transaction_time": "2019-12-12 11:03:55",
    "transaction_status": "pending",
    "fraud_status": "accept",
}
```

<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element    | Description    | Type   | Notes   |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | This is the status of the API call.                          | String | For more details, refer to [Error Code and Response Code](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | A message from BCA KlikPay describing the status of the transaction. | String |                                                              |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String |                                                              |
| order_id           | The specific *Order ID*.                                     | String |                                                              |
| redirect_url       | The URL to which the customer is redirected from the bank's website. | String |                                                              |
| merchant_id        | Your merchant ID.                                            | String |                                                              |
| gross_amount       | The total amount of transaction for the specific order.      | String |                                                              |
| currency           | The unit of currency used for the transaction.               | String |                                                              |
| payment_type       | The type of payment method used.                             | String |                                                              |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |
| redirect_data      | Technical information from BCA such as transaction number, total amount, currency, and so on. | Object |                                                              |

</article>
</details>

#### **CIMB Clicks**
**Sample Response**

```json
{
    "status_code": "201",
    "status_message": "Success, CIMB Clicks transaction is successful",
    "redirect_url": "https://api.sandbox.veritrans.co.id/cimb-clicks/request?id=2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "transaction_id": "2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "order_id": "order-101i-1576124787",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "cimb_clicks",
    "transaction_time": "2019-11-11 11:26:27",
    "transaction_status": "pending",
    "merchant_id": "G812785002"
}
```

<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | This is the status of the API call.                          | String | For more details, refer to [Error Code and Response Code](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | A message from CIMB Clicks describing the status of the transaction. | String |                                                              |
| redirect_url       | The URL to which the customer is redirected from the bank's website. | String |                                                              |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String |                                                              |
| order_id           | The specific *Order ID*.                                     | String |                                                              |
| gross_amount       | The total amount of transaction for the specific order.      | String |                                                              |
| currency           | The unit of currency used for the transaction.               | String |                                                              |
| payment_type       | The type of payment method used by the customer for the transaction. | String |                                                              |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| merchant_id        | Your merchant ID.                                            | String |                                                              |

</article>
</details>

#### **Danamon Online Banking**
**Sample Response**

```json
{
    "status_code": "201",
    "status_message": "Success, Danamon Online transaction is successful",
    "transaction_id": "9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "order_id": "order-101p-1576124871",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v2/danamon/online/redirect/9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "danamon_online",
    "transaction_time": "2019-11-11 11:27:50",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | This is the status of the API call.                          | String | For more details, refer to [Error Code and Response Code](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | A message from Danamon Online Bank describing the status of the transaction. | String |                                                              |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String |                                                              |
| order_id           | The specific *Order ID*.                                     | String |                                                              |
| redirect_url       | The URL to which the customer is redirected from the bank's website. | String |                                                              |
| merchant_id        | Your merchant ID.                                            | String |                                                              |
| gross_amount       | The total amount of transaction for the specific order.      | String |                                                              |
| currency           | The unit of currency used for the transaction.               | String |                                                              |
| payment_type       | The type of payment method used by the customer for the transaction. | String |                                                              |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |

</article>
</details>

#### **BRImo**
**Sample Response**

```json
{
    "status_code": "201",
    "status_message": "Success, BRI E-Pay transaction is successful",
    "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bri/epay/redirect/01c03b08-5e77-40d3-b1df-972f20a92e09",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bri_epay",
    "transaction_time": "2019-11-11 15:09:35",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | This is the status of the API call.                          | String | For more details, refer to [Error Code and Response Code](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | A message from BRImo describing the status of the transaction. | String |                                                              |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String |                                                              |
| order_id           | The specific *Order ID*.                                     | String |                                                              |
| redirect_url       | The URL to which the customer is redirected from the bank's website. | String |                                                              |
| merchant_id        | Your merchant ID                                             | String |                                                              |
| gross_amount       | The total amount of transaction for the specific order.      | String |                                                              |
| currency           | The unit of currency used for the transaction.               | String |                                                              |
| payment_type       | The type of payment method used by the customer for the transaction. | String |                                                              |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |

</article>
</details>

<!-- tabs:end -->
?>***Note***: The `redirect_url` attribute for the transaction is received.

#### Status Codes and Errors

| Code | Description                            | Notes                                                     |
| ---- | -------------------------------------- | --------------------------------------------------------- |
| 201  | Successful transaction                 | –                                                         |
| 400  | The `transaction_details` are missing. | Make sure the `order_id` and `gross_amount` are included. |
| 413  | There is syntax error.                 | Check the syntax.                                         |
| 500  | Internal system error occurred.        | You can try again later.                                  |

### 2. Redirecting the customer to bank's website
The `redirect_url` retrieved from the previous step is used to redirect the customer to the bank's website.
You can redirect the customer through server-side redirect, using JavaScript like `window.location=[REDIRECT URL]`, or using HTML link `<a href="[REDIRECT URL]">Pay Here!</a>`.
The customer can complete the payment on this page.

For more details, refer to [Testing Payment on Sandbox](/en/technical-reference/sandbox-test.md#cardless-credit).

### 3. Configuring landing page
After the customer completes the payment, the bank's website redirects the customer to *Finish Redirect URL* which can be configured on MAP (Merchant Administration Portal).

<details>
<summary><b>Configuring Finish Redirect URL</b></summary>
<article>

To configure the *Finish Redirect URL*, follow the steps given below.
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

?>***Note***: Please make sure the *Finish Redirect URL* endpoint can receive the POST request .

The sample code in *PHP* is given below as reference. Please make appropriate changes according to your environment & language.

#### Sample Code

```php
<?php
    $response = $_POST['response']; //get the json response
    $decoded_response = json_decode($response);
    $order_id = $decoded_response->order_id;//how to access
?>
```
#### Sample Response

```json
{
    "status_code" : "200",
    "status_message" : "Success, transaction is found",
    "transaction_id" : "58b48d1c-3e51-46f8-a2fb-ad5fa668f534",
    "order_id" : "34",
    "gross_amount" : "19999998.00",
    "payment_type" : "cimb_clicks",
    "transaction_time" : "2018-01-26 08:57:45",
    "transaction_status" : "settlement",
    "approval_code" : "1516957074590",
    "signature_key" : "30b048ffff95e08c34cf265268224f0b6460d7716b3d70424a7203609a78b335280fe6137a9938cd3af24533fdafcfe8771203f6f30f21fd141a378bba1685fb"
}
```

#### BCA KlikPay Specific
Specific to **BCA KlikPay** you will need to implement a bit differently, click below to see in details.
<details>
<summary><b>Implementing BCA KlikPay Landing Page</b></summary>
<article>

You will need to:
- First, BCA KlikPay only eligible if you fullfil this [list of BCA KlikPay requirements](https://support.midtrans.com/hc/en-us/articles/360024549814-What-if-I-want-to-use-BCA-Klikpay-as-a-payment-channel-).
- Follow [BCA KlikPay landing page development guideline](https://support.midtrans.com/hc/en-us/articles/115004580573-BCA-KlikPay-Landing-Page-Development-Guideline).
<!-- @HACK: link below is using absolute domain url to avoid docsify unexpectedly try to parse it as a web page, which throw 404 -->
- Click here to [see detailed sequence diagram on the end-to-end BCA KlikPay flow](https://docs.midtrans.com/asset/image/core-api_sequence_bca_klikpay.jpeg ':target=_blank').
</article>
</details>


### 4. Handling post-transaction
When the transaction status changes, you are directly notified about the changes in the transaction through redirect URL and also on merchant backend. Midtrans sends HTTP notification to merchant backend. This ensures that you are updated of the transaction status securely.

HTTP POST request with JSON body is sent to your *Payment Notification URL* configured on *Dashboard*.

<details>
<summary><b>Configuring Payment Notification URL</b></summary>
<article>

To configure the Payment Notification URL, follow the steps given below.
1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
   *Configuration* page is displayed.
3. Enter **Payment Notification URL**.
4. Click **Update**.
   A confirmation message is displayed.

   ![Core API](./../../asset/image/coreapi/core-api-payment-notification-1.png)

   The *Payment Notification URL* is configured.

</article>
</details>

The sample HTTP notification request received at merchant backend for *Direct Debit* payment method is given below.

<!-- tabs:start -->

#### **BCA KilkPay**
```json
{
  "transaction_time": "2019-12-11 16:20:48",
  "transaction_status": "settlement",
  "transaction_id": "34be81bd-1e4f-46b6-80f0-3e0f29776c63",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f75192079b47bb2a55d8307d443388f418d139bd13b447b2521fd9fe7b33ffddf9435afaa212f4ef67452fb2f2f109c1852ddd7567bb2d74cefeb2f5aa995de6",
  "settlement_time": "2019-12-11 16:21:38",
  "payment_type": "bca_klikpay",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "112233"
}
```

#### **CIMB Clicks**
```json
{
  "transaction_time": "2019-12-11 16:23:18",
  "transaction_status": "settlement",
  "transaction_id": "89cb0bfd-675b-4d4a-942c-7e19ba66d442",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "65e02e423cca2618a8d9ec201768438684bbf7218b27ab6f05a2197ce5b3c44fc9f4a157dce5a42d49f3ed6b88ac7a163f7e6b532d876d57a4a9297c5802639c",
  "settlement_time": "2019-12-11 16:24:00",
  "payment_type": "cimb_clicks",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "approval_code": "1576142640542"
}
```

#### **Danamon Online Banking**
```json
{
   "transaction_time": "2019-12-11 16:25:34",
   "transaction_status": "settlement",
   "transaction_id": "e7eb187b-c54c-4960-8558-a995253d61ca",
   "status_message": "midtrans payment notification",
   "status_code": "200",
   "signature_key": "928775783adf67b0578340dc616a30d2c2b307350475fbfbcc5bc1a5ac94892bb6bb972b7fe2394509c32fd431fd3494a358f25e24456f7414b473989ab1e66f",
   "settlement_time": "2019-12-11 16:25:49",
   "payment_type": "danamon_online",
   "order_id": "order-101p-1576142735",
   "merchant_id": "G812785002",
   "gross_amount": "44000.00",
   "fraud_status": "accept",
   "currency": "IDR",
   "approval_code": "uRaSu1XAnIm56i"
 }
```
#### **BRImo**
```json
{
  "transaction_time": "2019-11-11 15:09:35",
  "transaction_status": "settlement",
  "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f0abe6507f42019839e028f9c5da723ff7c220c962af1f1f8fc25ac5a773c1123fd680602443e7cece83d059b9f9c13078d74cc4a79948214059394ec5d18c4b",
  "settlement_time": "2019-11-11 15:13:51",
  "payment_type": "bri_epay",
  "order_id": "order-101h-1576483775",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "1576483775235"
}
```
<!-- tabs:end -->

<div class="my-card">

#### [HTTP(S) Notification/Webhooks](/en/after-payment/http-notification.md)
</div>

### 5. Switching to Production Mode
In this section, you will learn how switching from Sandbox environment to Production environment, in order to start accepting real world payment for your business. This is also known as "Going Live".

<br>

<div class="my-card">

#### [Going Live](/en/technical-reference/going-live.md)
Best practices to build a production-ready

</div>

## Note & Limitation

#### BRImo Rebranding
Since November 2021 *E-Pay* BRI has been rebranded as *BRImo*. If you have it integrated on your side, please adjust your frontend/UI accordingly. For example by changing the text & logo displayed to customer side, as for the backend side, you are not required to change.

## Next Step:
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


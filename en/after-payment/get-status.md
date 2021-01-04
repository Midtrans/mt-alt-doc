# GET Status API Requests
<hr>

To get the status of a transaction, you can send a request to Midtrans API. It will then send back the transaction status. This method requires the transaction `order_id` (or `transaction_id`) as an identifier.

### Endpoint

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| GET    | https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status |

 This retrieves the transaction details for a specified *ORDER_ID*.

### Path Parameters

 Parameters | Description                                          
--- | ---
 ORDER_ID   | The order id of the transaction you want to look up. 

### Headers

| Header Name   | Description                                            | Required | Values                |
| ------------- | ------------------------------------------------------ | -------- | --------------------- |
| Accept        | The format of the data to be returned.                 | Required | application/json      |
| Content-Type  | The format of the data to be posted.                   | Required | application/json      |
| Authorization | The authentication method used to access the resource. | Required | Basic **AUTH_STRING** |

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your *Server Key* while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by a colon symbol (**:**) (colon symbol). For more information, refer to [ API Authorization and Headers](https://docs.midtrans.com/en/technical-reference/api-header).

### Sample Request

<!-- tabs:start -->

#### **Curl**

```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

In the above request, replace `[ORDER_ID]` with your Order ID or Transaction ID.

#### **PHP**

```php
<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status');
$request->setMethod(HTTP_Request2::METHOD_GET);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Accept' => 'application/json',
  'Content-Type' => 'application/json',
  'Authorization' => 'Basic Og=='
));
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}
```

#### **Python**

```python
import requests

url = "https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status"

payload = {}
headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic Og=='
}

response = requests.request("GET", url, headers=headers, data = payload)

print(response.text.encode('utf8'))

```

#### **Ruby**

```ruby
require "uri"
require "net/http"

url = URI("https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status")

https = Net::HTTP.new(url.host, url.port);
https.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Accept"] = "application/json"
request["Content-Type"] = "application/json"
request["Authorization"] = "Basic Og=="

response = https.request(request)
puts response.read_body

```

#### **NodeJS**

```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status',
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic Og=='
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

<!-- tabs:end -->

?> Each of the official [Midtrans Language Library](/en/technical-reference/library-plugin.md) has *status* function to call Get Status API.

#### Sample Response

The sample response from `[ORDER_ID]/status` endpoint is shown below.

```json
{
  "masked_card": "481111-1114",
  "approval_code": "1578569243927",
  "bank": "bni",
  "eci": "05",
  "channel_response_code": "00",
  "channel_response_message": "Approved",
  "transaction_time": "2020-01-09 18:27:19",
  "gross_amount": "10000.00",
  "currency": "IDR",
  "order_id": "Postman-1578568851",
  "payment_type": "credit_card",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "status_code": "200",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "settlement_time": "2020-01-10 16:15:31",
  "status_message": "Success, transaction is found",
  "merchant_id": "M004123",
  "card_type": "credit"
}
```

The table given below describes elements in the response.

| Element                  | Description                                                  | Type   |
| ------------------------ | ------------------------------------------------------------ | ------ |
| approval_code            | The approval code for the transaction.                       | String |
| bank                     | Name of the bank through which the transaction was done.     | String |
| card_type                | The type of card used for the transaction.                   | String |
| channel_response_code    | The response code from the payment channel.                  | String |
| channel_response_message | The response message from the payment channel is specified.  | String |
| currency                 | The type of currency in which the transaction was done is shown here. | String |
| eci                      | The 3D secure ECI Code for card transaction                  | String |
| fraud_status             | The fraud status indicates if the transaction was flagged by the Fraud detection system. For more information, refer to [Fraud Status](/en/after-payment/http-notification.md#status-definition). | String |
| gross_amount             | The total amount of transaction for the specific order.      | String |
| merchant_id              | The merchant ID is shown here.                               | String |
| masked_card              | The first six-digit and last four-digit of customer's credit card number | String |
| order_id                 | The specific *Order ID*.                                     | String |
| payment_type             | The type of payment used by the customer for the transaction. | String |
| settlement_time          | The date and time of settlement of the transaction. The date is in `YYYY-MM-DD` form and the time is in `HH:MM:SS` form. The time zone is (GMT+7). | String |
| signature_key            | This is generated by appending `order_id`, `status_code`, `gross_amount`, and *Server Key* into a string | String |
| status_code              | This is the status of the API call. For more information, refer to [Status Codes and Error](#status-codes-and-errors). | String |
| status_message           | The status message is shown here.                            | String |
| transaction_id           | The specific *Transaction ID*.                               | String |
| transaction_status       | The status of the transaction. For more information, refer to [Transaction Status](/en/after-payment/http-notification.md#status-definition). | String |
| transaction_time         | The date and time of the transaction. The date is in YYYY-MM-DD form and the time is in HH:MM:SS form. The time zone is (GMT+7) | String |

### Status Codes and Errors

| Status Code | Message                              |
| ----------- | ------------------------------------ |
| 400         | Missing or invalid data.             |
| 401         | Authentication error.                |
| 404         | The requested resource is not found. |

### Sample Error Response

 Sample error response is given below.

```json
{
  "status_code": "404",
  "status_message": "The requested resource is not found"
}
```

#### **Transaction Status**

The following table describes the transaction status.

| Transaction Status | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| cancel             | The transaction is canceled. It can be triggered by you.<br> You can trigger *Cancel* status in the following cases:<br> 1. If you cancel the transaction after *Capture* status.<br> 2. If you deny a transaction after *Challenge* status.<br>If you fail to respond to a transaction with *Challenge* status within one day, it is automatically canceled by Midtrans. |
| capture            | Transaction is successful and card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your parner bank. Then the  transaction status changes to  *settlement*. <br/>It is safe to assume a successful payment. |
| deny               | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for the denied transaction, see the `status_message` in the response. |
| expire             | Transaction is not available for processing, because the payment was delayed. |
| pending            | The transaction is created and is waiting to be paid by the customer at the payment providers like ATM, Internet banking, E-money, and so on. |
| refund             | Transaction is marked to be refunded. Refund status is triggered by you. |
| settlement         | The transaction is successfully settled. Funds have been received. |

#### **Fraud Status**

The following table describes the fraud status.

| Fraud Status | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| accept       | Transaction is safe to proceed. It is not considered as fraud. |
| deny         | Transaction is considered as fraud. It is rejected by Midtrans. |
| challenge    | Transaction is flagged as potential fraud, but cannot be determined precisely. <br>You can *Accept* or *Deny* the transaction from MAP account or using [Approve Transaction API ](https://api-docs.midtrans.com/#approve-transaction)or [Deny Transaction API](https://api-docs.midtrans.com/#deny-transaction).<br>If no action is taken, the transaction is denied automatically. |



The same [status definition with notification](/en/after-payment/http-notification?id=status-definition) applies.


### Other API Action / Method

Other API actions that you can perform to an transaction are listed in this section:

<div class="my-card">

#### [API Action / Method](/en/after-payment/status-cycle.md#api-action-method)
</div>
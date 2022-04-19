# Core API Bank Transfer Integration
<hr>

Basic integration process for Bank Transfer (Virtual Account) is explained in this section.
Your customers can make payments using the *Bank Transfer* payment method provided by Midtrans. You will be notified when customer completes the transaction using this option. A list of VA acquiring banks supported by Midtrans is given below.

- BCA Virtual Account
- BNI Virtual Account
- BRI Virtual Account
- Mandiri Bill Payment
- Permata Virtual Account

VA can be paid from any banks (support inter-bank transfer) for BNI, BRI, and Permata, as long as the transferred fund is received in time.

?>***Note:*** Please make sure to create your [Midtrans account](/en/midtrans-account/overview.md), before proceeding with this section.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>

The overall *Bank Transfer* end-to-end payment process is illustrated in following sequence diagram.

![bank transfer sequence diagram](./../../asset/image/core_api-sequence_bank_transfer.png)
</article>
</details>

## Sandbox Environment
The steps given below use [Midtrans *Sandbox* environment](https://account.midtrans.com/) to test the integration process. Please make sure that you use the *Server Key* and *Client Key* for the *Sandbox* environment. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).
##  Steps for Integration
To integrate with *Bank Transfer* payment method, follow the steps given below.
## 1. Sending Transaction Data to API Charge
Charge API request should be performed from your backend. The request is authenticated with API server key, which can be accessed through the account. After the request is sent, you will get the `va_number`.

The table given below describes the various elements required for sending the transaction data to the *Charge API*.  

| Requirement    | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Server Key     | The server key. For more details, refer to [Retrieving API Access Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys). |
| `order_id`     | The order_id of the transaction.                             |
| `gross_amount` | The total amount of transaction.                             |
| `payment_type` | The payment method.                                          |

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

#### Sample Request and Request Body
The sample request for *Charge API* is given below. The request is in CURL but you can implement it according to your backend language. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library). The example below shows a sample code to obtain the VA number.
<!-- tabs:start -->

#### **BCA**
This is the sample charge request for BCA.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "bank_transfer":{
      "bank": "bca"
  }
}'
```
<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | The *Bank Transfer* payment method.                          | String | Required |
| transaction_details | The details of the transaction like the order_id and gross_amount. | -      | Required |
| order_id            | The order ID of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction, defined from your side.     | String | Required |
| bank_transfer       | The bank transfer details such as name of the bank.          | -      | Required |
| bank                | The name of the acquiring bank which process the transaction.| String | Required |

</article>
</details>

#### **BNI**
This is the sample charge request for BNI.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "bank_transfer":{
      "bank": "bni"
  }
}'
```
<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | The *Bank Transfer* payment method.                          | String | Required |
| transaction_details | The details of the transaction such as the order_id and gross_amount. | -      | Required |
| order_id            | The order ID of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction, defined from your side.     | String | Required |
| bank_transfer       | The bank transfer details such as name of the bank.          | -      | Required |
| bank                | The name of the acquiring bank which process the transaction.| String | Required |

</article>
</details>

#### **BRI**
This is the sample charge request for BRI.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "bank_transfer":{
      "bank": "bri"
  }
}'
```
<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | The *Bank Transfer* payment method.                          | String | Required |
| transaction_details | The details of the transaction such as the order_id and gross_amount. | -      | Required |
| order_id            | The order ID of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction, defined from your side.     | String | Required |
| bank_transfer       | The bank transfer details such as name of the bank.          | -      | Required |
| bank                | The name of the acquiring bank which process the transaction.| String | Required |

</article>
</details>

#### **Mandiri Bill**
This is the sample charge request for Mandiri.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "echannel",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "echannel" : {
      "bill_info1" : "Payment:",
      "bill_info2" : "Online purchase"
  }
}'
```

<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | The *E-channel* payment method.                          | String | Required |
| transaction_details | The details of the transaction like the order_id and gross_amount. | -      | Required |
| order_id            | The order ID of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction, defined from your side.     | String | Required |
| echannel            | Charge details using Mandiri Bill Payment.                   | [Object](https://api-docs.midtrans.com/#e-channel-object) | Required |
| bill_info1          | Label 1. Mandiri allows only 10 characters. Exceeding characters will be truncated.                   | String | Required |
| bill_info2          | Value for Label 1. Mandiri allows only 30 characters. Exceeding characters will be truncated.         | String | Required |

You can customize with your own message to the customer on the `bill_info` params. It will usually shown when customer attempt to pay via ATM or MBanking app, during confirmation of transfer. For example you can show something like `Payment:` `Purchase at myonlinestore.com`, or `Deposit:` `John Doe at myinvestment.com`

</article>
</details>

#### **Permata**
This is the sample charge request for Permata.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "permata",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```

<details>
<summary><b>Post Body JSON Attribute Description</b></summary>
<article>

| Element             | Description                                                  | Type   | Required |
| ------------------- | ------------------------------------------------------------ | ------ | -------- |
| payment_type        | The *Bank Transfer* payment method.                          | String | Required |
| transaction_details | The details of the transaction like the order_id and gross_amount. | -      | Required |
| order_id            | The order ID of the transaction.                             | String | Required |
| gross_amount        | The total amount of transaction, defined from your side.     | String | Required |

</article>
</details>

<!-- tabs:end -->

?>***Tips***: You can [include more information](/en/core-api/advanced-features.md#recommended-parameters) such as `customer_details`, `item_details`, and so on. It is recommended to send more details regarding the transaction, so that these details will be captured on the transaction record. Which can be [viewed on the Midtrans Dashboard](/en/after-payment/dashboard-usage.md#transaction).

You can also customize the output virtual account number for the transaction. For more details, please refer to [Specifying VA Number](#Specifying-VA-Number).

Learn more on why this API request [should be securely managed from your backend](/en/security/overview#keep-sensitive-parameters-secured).

#### Sample Response and Response Body
The sample response and description of response body for *Bank Transfer* payment method is shown below.

<!-- tabs:start -->

#### **BCA**
This is the sample response for BCA.
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "be03df7d-2f97-4c8c-a53c-8959f1b67295",
    "order_id": "1571823229",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:33:49",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bca",
            "va_number": "812785002530231"
        }
    ],
    "fraud_status": "accept"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID.*                                     | String | -                                                            |
| merchant_id        | Your merchant ID.                                            | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order.      | String | -                                                            |
| currency           | The unit of currency used for the transaction.               | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction. | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| va_number          | The virtual account number consisting of bank name and account number. | String | -                                                            |
| bank               | The name of the acquiring bank which process the transaction.| String | -                                                            |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |

</article>
</details>

?>***Note:*** You will get the `va_numbers` attribute.

#### **BNI**
This is the sample response for BNI.
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "2194a77c-a412-4fd8-8ec8-121ff64fbfee",
    "order_id": "1571823369",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:08",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bni",
            "va_number": "9888500212345678"
        }
    ],
    "fraud_status": "accept"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID.*                                     | String | -                                                            |
| merchant_id        | Your merchant ID.                                            | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order.      | String | -                                                            |
| currency           | The unit of currency used for the transaction.               | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction. | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| va_number          | The virtual account number consisting of bank name and account number. | String | -                                                            |
| bank               | The name of the acquiring bank which process the transaction.| String | -                                                            |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |

</article>
</details>

?>***Note:*** You will get the `va_numbers` attribute.

#### **BRI**
This is the sample response for BRI.
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
    "order_id": "1466323342",
    "gross_amount": "20000.00",
    "payment_type": "bank_transfer",
    "transaction_time": "2016-06-19 15:02:22",
    "transaction_status": "pending",
    "va_numbers": [
      {
        "bank": "bri",
        "va_number": "8578000000111111"
      }
    ],
    "fraud_status": "accept",
    "currency": "IDR"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>                                

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID.*                                     | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order.      | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction. | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| va_number          | The virtual account number consisting of bank name and account number. | String | -                                                            |
| bank               | The name of the acquiring bank which process the transaction.| String | -                                                            |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |
| currency           | The unit of currency used for the transaction.               | String | -                                                            |

</article>
</details>

?>***Note:*** You will get the `va_numbers` attribute.

#### **Mandiri Bill**
This is the sample response for Mandiri.
```json
{
    "status_code": "201",
    "status_message": "OK, Mandiri Bill transaction is successful",
    "transaction_id": "abb2d93f-dae3-4183-936d-4145423ad72f",
    "order_id": "1571823332",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "echannel",
    "transaction_time": "2019-10-23 16:35:31",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "bill_key": "778347787706",
    "biller_code": "70012"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID.*                                     | String | -                                                            |
| merchant_id        | Your merchant ID.                                            | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order.      | String | -                                                            |
| currency           | The unit of currency used for the transaction.               | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction. | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |
| va_number          | The virtual account number consisting of bank name and account number. | String | -                                                            |
| bill_key           | Midtrans company code.                                       | String | -                                                            |
| biller_code        | The payment (bill) number.                                   | String | -                                                            |

</article>
</details>

?>***Note:*** You will get the `bill_key` and `bill_code` attribute.

#### **Permata**
This is the sample response for Permata.
```json
{
    "status_code": "201",
    "status_message": "Success, PERMATA VA transaction is successful",
    "transaction_id": "035ca76c-b814-4264-9e63-68142351df83",
    "order_id": "1571823410",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:49",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "permata_va_number": "850003072869607",
    "merchant_id": "G812785002"
}
```
<details>
<summary><b>Response Body JSON Attribute Description</b></summary>
<article>

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | The message describing the status of the transaction.        | String | -                                                            |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | -                                                            |
| order_id           | The specific *Order ID*                                      | String | -                                                            |
| gross_amount       | The total amount of transaction for the specific order       | String | -                                                            |
| currency           | The unit of currency used for the transaction                | String | -                                                            |
| payment_type       | The type of payment method used by the customer for the transaction | String | -                                                            |
| transaction_time   | The date and time at which the transaction occurred          | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7). |
| transaction_status | The status of the transaction                                | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud status of the transaction                          | String | For more details, refer to [Fraud Status](/en/after-payment/get-status.md#fraud-status). |
| va_number          | The virtual account number consisting of bank name and account number | String | -                                                            |
| merchant_id        | Your merchant ID                                             | String | -                                                            |

</article>
</details>

?>***Note:*** You will get the `permata_va_number` attribute.

<!-- tabs:end -->

## 2. Displaying Virtual Account Number and Expiry Time
To display the virtual account number, use the value of `va_number` retrieved from API response.

By default the expiry time for Bank Transfer / VA is **24 hours**. Follow the link given below to customize the expiry time:
<div class="my-card">

#### [Set Custom Expiry](/en/core-api/advanced-features.md#custom-transaction-expiry)
</div>


### Creating Test Payment

?>***Note:*** Read [here to simulate/test success payment on sandbox environment](/en/technical-reference/sandbox-test.md#bank-transfer).

## 3. Handling Transaction Notification
When the transaction status changes, Midtrans notifies you at the *Redirect URL* and sends HTTP notification to the merchant backend. This ensures that you are updated of the transaction status securely.

HTTP POST request with JSON body will be sent to your server's *Notification URL* configured on dashboard.

<details>
<summary><b>Configuring Payment Notification URL</b></summary>
<article>

To configure the Payment Notification URL, follow the steps given below.
1. Log in to your MAP account.
2. On the Home page, go to **Settings > Configuration**. *Configuration* page is displayed.
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

#### Transaction Status Description
The description of `transaction_status` value for *Bank Transfer* payment method is given below.

| Transaction Status | Description |
| ------------------ | ----------- |
| settlement | Transaction is successfully paid, customer has completed the transaction. |
| pending | Transaction is created successfully but it is not completed by the customer. |
| expire | Transaction is failed as the payment is not done by customer within the given time period. |
| cancel | Transaction is cancelled by you. |
| deny | Transaction is rejected by the bank. |

Link: [*More detailed definition of transaction_status & fraud_status*](/en/after-payment/status-cycle.md)

## Specifying VA Number
Virtual Account number which is displayed to customer, contains two parts. for example, in `{91012}{12435678}` , the first part is the company-prefix-number and the second part is a unique-va-number. The second part can be customized. Following conditions need to be followed while customizing VA number:

* Only digits are allowed.
* Different banks have different specifications for their custom VA numbers. Please go through the documentation of the respective banks. Note: for **Permata, only B2B VA type** support custom VA numbers, so by default your sandbox account may not support Permata custom VA, please contact us if you wish to have this feature.
* If the number provided is currently active for another order, then a different unique number will be used instead.
* If the number provided is longer than required, then the unnecessary digits in the end will be trimmed.
* If the number provided is shorter than required, then the number will be prefixed with zeros.

Midtrans creates a random VA number for transaction using *Bank Transfer* payment method. You can customize this VA Number, by adding`bank_transfer` parameters in the Charge API Request Body as shown below.

Please add **bank_transfer** parameter during [Charge API Request](/en/core-api/bank-transfer.md#sample-request-and-request-body).
<!-- tabs:start -->

#### **BCA**
```json
...
  "bank_transfer":{
    "bank": "bca",
    "va_number": "12345678911",
    "bca": {
      "sub_company_code": "00000" //NOTE: Don't send this field unless BCA give you sub company code
    }
  }
...
```

#### **BNI**
```json
...
  "bank_transfer":{
    "bank": "bni",
    "va_number": "12345678"
  }
...
```

#### **BRI**
```json
...
  "bank_transfer":{
    "bank": "bri",
    "va_number": "12345678"
  }
...
```

#### **Permata**
```json
...
  "bank_transfer":{
    "bank": "permata",
    "va_number": "1234567890"
  }
...
```

#### **Mandiri Bill**
```json
...
  "echannel" : {
    "bill_info1" : "Payment:",
    "bill_info2" : "Online purchase",
    "bill_key" : "081211111111"
}
...
```

<!-- tabs:end -->

#### VA Number Specification

Parameter | Type | Required | Description
--- | --- | --- | ---
BCA `va_number`| String | Optional | Length should be within 1 to 11.
BCA `sub_company_code` | String | Optional | BCA sub company code directed for this transactions. <br>NOTE: Don't send this field unless BCA give you sub company code.
Permata `va_number` | String | Optional | Length should be 10. Only supported for b2b VA type.
BNI `va_number` | String | Optional | Length should be within 1 to 8.
BRI `va_number` | String | Optional | Length should be within 1 to 13.
Mandiri Bill `bill_key` | String | Optional | Length should be within 6 to 12.

?>***Note***: In *Production* environment, not every bank may support custom VA number (e.g. Permata), as the default state. It depends on the type of VA configured for your merchant account & your business agreement with the bank. Please consult Midtrans Activation team for further information.

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

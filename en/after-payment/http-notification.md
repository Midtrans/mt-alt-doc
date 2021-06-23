# HTTP(S) Notification / Webhooks of Payment Status
<hr>

HTTP(S) POST notifications or Webhooks are sent to your server when the customer completes the payment process or when transaction status changes. These notifications help you to update payment status or take suitable actions in real-time.

Midtrans HTTP(S) POST Notification can be configured by configuring the *Payment Notification URL* from SETTINGS on *Dashboard*.

?> Currently this explanation is valid for Midtrans Payment related products. If you are looking for Iris Disbursement [please check on Iris docs](https://iris-docs.midtrans.com/#getting-notifications), although the basic concepts are the same.

## Configuring HTTP Notifications On MAP

To receive notifications of transactions, HTTP notifications are configured as explained in the steps given below.

1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
3. Enter Required fields.
4. Click **Update**.
  ![HTTP Notification Configuration](./../../asset/image/after-payment_http_notification_redirect_settings.png)

> ***Note***: URL protocol prefix `https://` or `http://` are required. We highly recommended to use `https://` for security purposes.

<details>
<summary><b>Definition Table</b></summary>
<article>
  
The table given below describes the fields that can be configured from the Merchant Administrative Portal (MAP).

| Field                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Payment Notification URL   | The URL to which notification is to be sent when a payment is made by a customer. |
| Recurring Notification URL | The URL to which notification is to be sent when a payment recurs. |
| Finish Redirect URL        | The URL to which the customer is redirected when a transaction is finished. |
| Unfinished Redirect URL    | The URL to which the notifications are sent when a transaction is unfinished or if the customer clicks *Back* to order. |
| Error Redirect URL         | The URL to which the notifications are sent when an error occurs during payment or if the payment is unsuccessful. |

</article>
</details>

!> Make sure that the Notification URL **can be reached from Public Internet**. Midtrans **cannot send notifications to localhost**, URL protected with authorization or password, URL behind VPN, unusual destination port, and so on. You can then utilize *signature_key* or method that is explained below as security measures.

?> **Tips**: If you are still running/developing your notification handler on localhost, you can utilize the services (such as [Ngrok](https://ngrok.com/), [Serveo](http://serveo.net/), [Localhost.Run](http://localhost.run/), and so on) to expose your localhost server to public Internet. Once you have obtained the Internet accessible URL, you can add it to the *Notification URL* field on *Dashboard*.

## Sample HTTP Notifications Sent From Midtrans

Key | Type
--- | ---
Kind | HTTP Request
Request Method | `POST`
Request Header | `Content-Type: application/json`
Request Body | `string` of JSON

### Sample in CURL

Some example of how the HTTP notification will be sent from Midtrans side:

<details open>
<summary><b>Sample Notification Request in CURL</b></summary>
<article>

```bash
curl -X POST \
  https://tokoecommerc.com/payment-notification-handler/ \
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "M004123",
  "masked_card": "481111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}'
```

</article>
</details>

### Sample of Different Payment Channels

Some sample HTTP notifications for a successful transaction on different payment channels are given below.

<!-- TODO: Update the notification sample with actual test result-->

<!-- tabs:start -->

#### **Card**

```json
{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "M004123",
  "masked_card": "481111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}
```

#### **GoPay**

```json
{
  "transaction_time": "2021-06-15 18:45:13",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "2496c78cac93a70ca08014bdaaff08eb7119ef79ef69c4833d4399cada077147febc1a231992eb8665a7e26d89b1dc323c13f721d21c7485f70bff06cca6eed3",
  "settlement_time": "2021-06-15 18:45:28",
  "payment_type": "gopay",
  "order_id": "Order-5100",
  "merchant_id": "G141532850",
  "gross_amount": "154600.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **Permata VA**

```json
{
  "transaction_time": "2021-06-23 11:18:59",
  "transaction_status": "settlement",
  "transaction_id": "6fd88567-62da-43ff-8fe6-5717e430ffc7",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "0c0df82489931602577d9e434966c0540249b7c0aeaae2b718305af89a11e2bf9b4008aba07d1b3b248b15b4fbecdd15e81dbb2648b974efc4e0656e8c976094",
  "settlement_time": "2021-06-23 11:20:06",
  "permata_va_number": "8562000087926752",
  "payment_type": "bank_transfer",
  "order_id": "permata-va-01",
  "merchant_id": "M004123",
  "gross_amount": "185000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **BCA VA**

```json
{
  "va_numbers": [
    {
      "va_number": "333333333333333",
      "bank": "bca"
    }
  ],
  "transaction_time": "2021-06-23 11:27:20",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:27:50",
  "payment_type": "bank_transfer",
  "payment_amounts": [],
  "order_id": "bca-va-01",
  "merchant_id": "M004123",
  "gross_amount": "100000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **BNI VA**

```json
{
  "va_numbers": [
    {
      "va_number": "3333000000111111",
      "bank": "bni"
    }
  ],
  "transaction_time": "2021-06-23 11:41:33",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:42:03",
  "payment_type": "bank_transfer",
  "payment_amounts": [
    {
      "paid_at": "2021-06-23 11:42:02",
      "amount": "150000.00"
    }
  ],
  "order_id": "bni-va-01",
  "merchant_id": "M004123",
  "gross_amount": "150000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **BRI VA**

```json
{
  "va_numbers": [
    {
      "va_number": "123456789123456789",
      "bank": "bri"
    }
  ],
  "transaction_time": "2021-06-23 11:53:34",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:53:34",
  "payment_type": "bank_transfer",
  "payment_amounts": [],
  "order_id": "bri-va-01",
  "merchant_id": "M004123",
  "gross_amount": "300000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **Mandiri Bill**

```json
{
  "transaction_time": "2021-06-23 11:57:49",
  "transaction_status": "settlement",
  "transaction_id": "883af6a4-c1b4-4d39-9bd8-b148fcebe853",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "bbceb3724b0b2446c59435795039fed2d249d3438f06bf90c999cc9d383b95170b7b58f9412fba25ce7756da8075ab1d78a48800156380a62dc84eb22b3f7de9",
  "settlement_time": "2021-06-23 11:58:44",
  "payment_type": "echannel",
  "order_id": "mandiri-bill-01",
  "merchant_id": "M004123",
  "gross_amount": "30000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "biller_code": "70012",
  "bill_key": "990000000260"
}
```


#### **BCA Klikpay**

```json
{
  "transaction_time": "2021-06-23 09:26:08",
  "transaction_status": "settlement",
  "transaction_id": "ada84cd9-2233-4c67-877a-01884eece45e",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "35c4111539e184b268b7c1cd62a9c254e5d27c992c8fd55084f930b69b09eaafcfe14b0d512c697648295fdb45de777e1316b401f4729846a91b3de88cde3f05",
  "settlement_time": "2021-06-23 09:26:51",
  "payment_type": "bca_klikpay",
  "order_id": "bca-klikpay-01",
  "merchant_id": "M004123",
  "gross_amount": "912844.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": ""
}
```

#### **KlikBCA**

```json
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "c0ba3583-5111-45a5-9f1c-84c9de7cb2f6",
  "order_id": "3176440",
  "gross_amount": "50000.00",
  "payment_type": "bca_klikbca",
  "transaction_time": "2016-06-19 15:58:15",
  "transaction_status": "settlement",
  "approval_code": "YCRHOM160704",
  "signature_key": "ef0f472fa8a5165dc9f2ff6300832eb28657e88b9f3335ae5ebb27c8ef258d203c6da18ac6cd5738d2e38c54dfec860d8e067bdbc759a1268ab04218ccab93cc",
}

```

#### **Mandiri ClickPay**

```json
{
  "approval_code": "166JF5644001",
  "transaction_time": "2016-06-19 15:56:45",
  "gross_amount": "156216.00",
  "order_id": "100248319",
  "payment_type": "mandiri_clickpay",
  "signature_key": "1e5d08e7f53cf0d4d07c85ad807fc091e59f579807b5a2e9728cb8d9ab11431d61673450944ef3fa7a87d7d2dbce8e90dc96012fc9950e3eb2d52521d5120a57",
  "status_code": "200",
  "transaction_id": "3bdddabe-a4ea-4233-81cc-09578178909f",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **CIMB Clicks**

```json
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "226f042f-020e-4829-8bd7-2de64b8673ce",
  "order_id": "1000156414164125",
  "gross_amount": "392127.00",
  "payment_type": "cimb_clicks",
  "transaction_time": "2016-06-19 16:45:21",
  "transaction_status": "settlement",
  "approval_code": "RB5031388093",
  "signature_key": "3bcdf0700d3c8a288f279e4fe27a4012e916cb44120d541f6e4c48c83a107b605fdb063ae7c8744d15891047aeb1fc8d2e95741c0abc5f67e10e0b60244bc441"
}
```

#### **Danamon Online Banking**

```json
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "226f042f-020e-4829-8bd7-2de64b8673ce",
  "order_id": "1000156414164125",
  "gross_amount": "392127.00",
  "payment_type": "danamon_online",
  "transaction_time": "2016-06-19 16:45:21",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "approval_code": "RB5031388093",
  "signature_key": "3bcdf0700d3c8a288f279e4fe27a4012e916cb44120d541f6e4c48c83a107b605fdb063ae7c8744d15891047aeb1fc8d2e95741c0abc5f67e10e0b60244bc441"
}
```

#### **Indomaret**

```json
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "order_id": "order04",
  "gross_amount": "162500.00",
  "payment_type": "cstore",
  "transaction_time": "2016-06-20 11:44:07",
  "transaction_status": "settlement",
  "approval_code": "59061607081045705101",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "payment_code": "25709650945026",
  "store": "indomaret"
}
```

#### **Alfamart**

```json
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "order_id": "order04",
  "gross_amount": "162500.00",
  "payment_type": "cstore",
  "transaction_time": "2016-06-20 11:44:07",
  "transaction_status": "settlement",
  "approval_code": "59061607081045705101",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "payment_code": "25709650945026",
  "store": "alfamart"
}
```

#### **Akulaku**

```json
{
  "transaction_time": "2021-06-23 10:55:24",
  "transaction_status": "settlement",
  "transaction_id": "b3a40398-d95d-4bb9-afe8-9a57bc0786ea",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "35c4111539e184b268b7c1cd62a9c254e5d27c992c8fd55084f930b69b09eaafcfe14b0d512c697648295fdb45de777e1316b401f4729846a91b3de88cde3f05",
  "settlement_time": "2021-06-23 10:56:55",
  "payment_type": "akulaku",
  "order_id": "akulaku-01",
  "merchant_id": "M004123",
  "gross_amount": "130000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **BRI Epay**

```json
{
  "approval_code": "201373311528",
  "transaction_time": "2016-06-19 16:04:02",
  "gross_amount": "145000.00",
  "order_id": "2014111702",
  "payment_type": "bri_epay",
  "signature_key": "13b6b8a2da46428812e7685463770e3704ece7fc3242a5f016f068b7b135e12a71afd02259fe4dbd8c97d747ae9cf8e13412842325ea8da4cf6d7177e32b7e31",
  "status_code": "200",
  "transaction_id": "f8635cd7-615d-4a6d-a806-c9ca4a56257e",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```
<!-- tabs:end -->

<details>
<summary><b>Definition Table</b></summary>
<article>

<!-- tabs:start -->
#### **Card**

#### POST Body 

| Element                  | Description                                                  | Type   | Notes                                                        |
| ------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| transaction_time         | Time at which the transaction happened.                      | String | –                                                            |
| transaction_status       | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](#status-definition). |
| transaction_id           | The transaction id of the specific transaction.              | String | –                                                            |
| status_message           | The status message.                                          | String | –                                                            |
| status_code              | The transaction status code.                                 | String | –                                                            |
| signature_key            | The Signature Key.                                           | String | This is a very important data that informs you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| payment_type             | The type of payment method used.                             | String | –                                                            |
| order_id                 | The order id of the transaction.                             | String | –                                                            |
| merchant_id              | Your merchant ID.                                            | String | –                                                            |
| masked_card              | The first six-digit and last four-digit of customer's credit card number. | String | –                                                            |
| gross_amount             | Total amount for which the transaction was done.             | String | –                                                            |
| fraud_status             | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#status-definition).    |
| eci                      | The 3D secure ECI code for a card transaction.               | String | –                                                            |
| currency                 | The unit of currency used for the transaction.               | String | –                                                            |
| channel_response_message | The response from payment channel.                           | String | –                                                            |
| channel_response_code    | The response code from the payment channel.                  | String | –                                                            |
| card_type                | The type of card used for the transaction.                   | String | Possible values are Credit, Debit.                           |
| bank                     | Name of the bank through which the transaction was processed. | String | –                                                            |
| approval_code            | The approval code from the bank.                             | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |

#### **GoPay**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| fraud_status             | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#status-definition).    |
| merchant_id              | Your merchant ID.                                            | String | –                                                            |
| currency                 | The unit of currency used for the transaction.               | String | –                                                            |

#### **Permata VA**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| permata_va_number  | The Permata VA number.                           | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |

#### **BCA VA**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| :----------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| bank               | The name of the acquiring bank which process the transaction.| String | –                                                            |
| va_number          | The virtual account number.                      | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| status_message     | The status message.                              | String | –                                                            |

#### **Mandiri Bill**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| bill_key           | The bill key number.                             | String | –                                                            |
| biller_code        | The code for the biller.                         | String | –                                                            |

#### **BNI VA**

#### POST Body 

| Element            | Description                                                  | Type   | Notes                                                        |
| :----------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| bank               | Name of the bank.                                            | String | –                                                            |
| va_number          | VA number.                                                   | String | –                                                            |
| payment_amounts    | Payment details such as the amount paid and the time of payment. | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*                |
| paid_at            | The time and date at which the payment was done.            | String | –                                                            |
| amount             | The amount paid.                                             | String | –                                                            |
| transaction_time   | Time at which the transaction happened.                      | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done.             | String | –                                                            |
| order_id           | The order id of the transaction.                             | String | –                                                            |
| payment_type       | The type of payment method used.                             | String | –                                                            |
| signature_key      | The Signature Key.                                           | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                                 | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.              | String | –                                                            |
| transaction_status | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#status-definition).    |
| bank               | Name of the bank through which the transaction was processed. | String | –                                                            |
| status_message     | The status message.                                          | String | –                                                            |

#### **BCA Klikpay**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| status_message     | The status message.                              | String | –                                                            |

#### **KlikBCA**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |

#### **Mandiri ClickPay**

#### POST Body

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| status_message     | The status message.                              | String | –                                                            |

#### **CIMB Clicks**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |

#### **Danamon Online Banking**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |

#### **Indomaret**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied. |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| payment_code       | 14 digit payment code.                           | String | –                                                            |
| store              | Name of the store.                               | String | –                                                            |

#### **Alfamart**

#### POST Body

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied. |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| payment_code       | 14 digit payment code.                           | String | –                                                            |
| store              | Name of the store.                               | String | –                                                            |

#### **Akulaku**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| status_message     | The status message.                              | String | –                                                            |

#### **BRI Epay**

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| merchant_id        | Your merchant ID.                                | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#verifying-notification-authenticity). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#status-definition). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#status-definition).    |
| status_message     | The status message.                              | String | –                                                            |
<!-- tabs:end -->

</article>
</details>

?> It's recommended to check the `transaction_status` as reference of the most accurate transaction status. Transaction can be considered **success** if `transaction_status` value is `settlement` (or `capture` in case of card transaction) **and if** `fraud_status` exists ensure the value is `accept`. Then you are safe to deliver good/service to customer.

Please note that not every payment methods may return `fraud_status` field. Some payment methods (like Indomaret, Alfamart, etc.) which considered have lower risk of fraud, may not be evaluated by *Fraud Detection System*, and may not return `fraud_status`. In this case, the transaction can be considered as relatively safe from fraud.

## Status Definition

<!-- tabs:start -->

#### **Transaction Status**

Transaction Status | Fund Received | Description 
--- | --- | ---
`capture` | ✅ | Transaction is successful and card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your partner bank. Then the  transaction status changes to  *settlement*. <br/>It is safe to assume a successful payment. 
`settlement` | ✅ | The transaction is successfully settled. Funds have been credited to your account. 
`pending` | 🕒 | The transaction is created and is waiting to be paid by the customer at the payment providers like Direct debit, Bank Transfer, E-money, and so on. 
`deny` | ❌ | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for the denied transaction, see the `status_message` in the response. 
`cancel` | ❌ | The transaction is canceled. It can be triggered by merchant.<br/> You can trigger *Cancel* status in the following cases:<br/> 1. If you cancel the transaction after *Capture* status.<br/> 2. If you deny a transaction after *Challenge* status.<br/>If you fail to respond to a transaction with *Challenge* status within one day, it is automatically canceled by Midtrans. 
`expire` | ❌ | Transaction is not available for processing, because the payment was delayed. 
`refund` | ↩️ | Transaction is marked to be refunded. Refund status can be triggered by merchant. 
`partial_refund` | ↩️ | Transaction is marked to be refunded partially (if you choose to refund in amount less than the paid amount). Refund status can be triggered by merchant. 
`authorize` | 🕒 | Only available specifically only if you are using pre-authorize feature for card transactions (an advanced feature that you will not have by default, so in most cases are safe to ignore). Transaction is successful and card balance is reserved (authorized) successfully. You can later perform API “capture” to change it into `capture`, or if no action is taken will be auto released. Depending on your business use case, you may assume `authorize` status as a successful transaction.

#### **Fraud Status**

Fraud Status | Fund Received | Description 
--- | --- | ---
`accept` | ✅ | Transaction is safe to proceed. It is not considered as a fraud. 
`deny` | ❌ | Transaction is considered as fraud. It is rejected by Midtrans. 
`challenge` | ⚠️ | Transaction is flagged as potential fraud, but cannot be determined precisely. <br/>You can *Accept* or *Deny* the transaction from MAP account or using [Approve Transaction API](https://api-docs.midtrans.com/#approve-transaction) or [Deny Transaction API](https://api-docs.midtrans.com/#deny-transaction).<br/>If no action is taken, the transaction is denied automatically. 
<!-- tabs:end -->

#### Notes When Using Snap API
<br>

<details>
<summary><b>Notes When Using Snap API</b></summary>
<article>

When a transaction is created on Snap API, it does not immediately assign any payment status on*Core API* *GET Status* response. 

Even if the payment page is activated on Snap API, you might encounter `404` or *Payment not found* response while calling *Core API GET Status*.

This is because the customer is yet to choose any payment method within the Snap payment page. Once the customer chooses and proceeds with a payment method, then the transaction status will be assigned and available on *Core API GET Status*.
</article>
</details>

## Verifying Notification Authenticity

To ensure the integrity of the notifications and the content, it is recommended to verify the notification using one of the following mechanisms.

<!-- tabs:start -->
#### **Verifying Signature Key**

In the notification response body, Midtrans provides `signature_key` which is generated by appending `order_id`, `status_code`, `gross_amount`, and `ServerKey` into a string. *ServerKey* is confidential information known only to Midtrans and you. Thus, you can verify the `signature_key` to ensure that the notification is signed by Midtrans.

The logic to generate or calculate signature_key is explained below:

```
SHA512(order_id+status_code+gross_amount+ServerKey)
```

> It basically means append the value of `order_id`,`status_code`,`gross_amount`,`ServerKey` into one string, then use it as input to SHA512 hash function. Then the output should match with `signature_key` from notification.

Try out *signature_key* calculation using the tool given below.


<details>
<summary><b>Signature Key Calculator</b></summary>
<article>

[Signature Key Calculator](https://jsfiddle.net/5amr8cov/6/embedded/result,html/dark ':include :type=iframe width=100% height=800px')
</article>
</details>
<br>

#### **Verify Using GET Status API Call**

You can verify authenticity using the [GET status API Request](/en/after-payment/get-status.md). This means the request is directly responded by Midtrans. The JSON response will be the same as the notification status. This process of verification is illustrated below.

![Verify Notification Diagram](./../../asset/image/after-payment-notif-diag.png)

?> **Tips**: Official Midtrans language library will perform "Verify Directly to Midtrans API" mechanism automatically within the built in `notification` function. As well as official Midtrans CMS plugin.
<!-- tabs:end -->

Verifying notification/response data is recommended for the kind of data flow that is coming to you from an unknown source. This also includes frontend callback data, as frontend data can be modified by the user, you should verify it by querying the Midtrans API. For example, javascript callback data of payment status triggered by Snap.js should be verified via API get-status to Midtrans.

For API requests that are performed synchronously (from your) backend-to-backend (to Midtrans API), the response should already be trustworthy. You don’t have to re-query the Midtrans API, unless you want to check for latest updates at some later time.

## Responding HTTP Notification from Midtrans

To confirm that you received the notification, your notification URL or backend must respond to the HTTP notification with HTTP `status code: 200`. On most backend or web frameworks you can achieve that by printing a string similar to *OK*. This will automatically sends HTTP `status code: 200` to Midtrans. 

<details>
<summary><b>Status Codes and Errors</b></summary>
<article>

#### Status Codes and Errors

Your server can respond with the following status and error codes, which will trigger Midtrans' Notification engine to perform following actions.

| Code        | Midtrans Will Perform                                        |
| ----------- | ------------------------------------------------------------ |
| 2XX         | No retries, it is considered successful.                     |
| 500         | Retry only *once*.                                           |
| 503         | Retry *four* times.                                          |
| 400/404     | Retry *two* times.                                           |
| 301/302/303 | No retries. Update notification endpoint in SETTINGS menu, instead of replying to these status codes. |
| 307/308     | Follow the new URL with POST method and the same notification body. Maximum number of redirect is five times. |
| Other       | Retry five times.                                            |

</article>
</details>

### Best Practice to Handle Notification

<br>

<details>
<summary><b>Best Practices</b></summary>
<article>

- Always use an HTTPS endpoint. It is secure and there cannot be Man-in-the-Middle (MITM) attacks because we validate the certificates match with the hosts. Also do not use self signed certificates.
- Use standard port (80/443) for notification callback URL.
- Always implement notification in an idempotent way. In extremely rare cases, we may send multiple notifications for the same transaction event. It should not cause duplicate entries at your end, The simple way of achieving this is to use *order_id* as the key to track the entries.
- Always check the signature hash of the notification, This will confirm that the notification was actually sent by Midtrans, because we encode the *Server Key*. Nobody else can build this signature hash.
- Always check the following three fields for confirming success transactions:
	- `status_code`: Should be 200 for successful transactions
	- `fraud_status`: ACCEPT
	- `transaction_status` : *settlement* or *capture*
- We strive to send the notification immediately after the transaction has occurred. In extremely rare cases, it may be delayed because of transaction spikes. If you have not received a notification, please use the *GET Status API* to check for current status of the transaction.
- It is safe to call *GET Status API* to get the latest status of a transaction or an order.
- The HTTP timeout is configured for 15 seconds. Please respond as soon as possible, ideally, within 5 seconds, to reduce the load on Midtrans' infrastructure. 
- In extremely rare cases we may send the HTTP notifications out of order - a `settlement` status for a notification before the notification for `pending` status. It's important that such later notifications are ignored. Here's the state transition diagram that you could use. But it is recommended to use *GET Status API* to confirm the actual status.
- We send the notification body as JSON, please parse the JSON with a JSON parser. Always expect new fields will be added to the notification body, so parse it in a non strict format. This prevents the parser from throwing an exception for new fields. It should gracefully ignore the new fields. This allows us to extend our notification system for newer use cases without breaking old clients.
- Always use the right HTTP Status code for responding to the notifications. 
- we handle retry for error cases differently based on the status code.
	- for `2xx`: No retries, it is considered success
	- for `500`: Retry only once
	- for `503`: Retry 4 times
	- for `400/404`: Retry 2 times
	- for `301/302/303`: No retries. We suggest the notification endpoint should be update in setting instead of reply these status code.
	- for `307/308`: Follow the new URL with POST method and same notification body. Max redirect is 5 times
	- for all other failures: Retry 5 times
- We do retry at most 5 times with following policy.
- Different retry intervals are:
  - First time - two minutes
  - Second time - ten minutes
  - Third time - 30 minutes (0.5 hours)
  - Fourth time - 90 minutes (1.5 hours)
  - Fifth time - 210 minutes (3.5 hours)
- Put a random time shift for each time retry base on above interval. For example, the first time retry might be 33s (at most 2m) after the job failed.
</article>
</details>

### Example on Handling HTTP Notifications

Some sample codes to handle HTTP(S) POST and JSON object by utilizing **Midtrans Official Library** are given below. Assume that this code will be executed when the notification URL endpoint (https://yourwebsite.com/notification) is accessed.

<!-- tabs:start -->

#### **Node JS**
```javascript
const midtransClient = require('midtrans-client');
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

apiClient.transaction.notification(notificationJson)
    .then((statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture'){
            if (fraudStatus == 'challenge'){
                // TODO set transaction status on your database to 'challenge'
                // and response with 200 OK
            } else if (fraudStatus == 'accept'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
            }
        } else if (transactionStatus == 'settlement'){
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
          // TODO set transaction status on your database to 'failure'
          // and response with 200 OK
        } else if (transactionStatus == 'pending'){
          // TODO set transaction status on your database to 'pending' / waiting payment
          // and response with 200 OK
        }
    });
```
#### **PHP**
```php
<?php

require_once(dirname(__FILE__) . '/Midtrans.php');
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$serverKey = '<your serverkey>';
$notif = new \Midtrans\Notification();

$transaction = $notif->transaction_status;
$type = $notif->payment_type;
$order_id = $notif->order_id;
$fraud = $notif->fraud_status;

if ($transaction == 'capture') {
  // For credit card transaction, we need to check whether transaction is challenge by FDS or not
  if ($type == 'credit_card'){
    if($fraud == 'challenge'){
      // TODO set payment status in merchant's database to 'Challenge by FDS'
      // TODO merchant should decide whether this transaction is authorized or not in MAP
      echo "Transaction order_id: " . $order_id ." is challenged by FDS";
      }
      else {
      // TODO set payment status in merchant's database to 'Success'
      echo "Transaction order_id: " . $order_id ." successfully captured using " . $type;
      }
    }
  }
else if ($transaction == 'settlement'){
  // TODO set payment status in merchant's database to 'Settlement'
  echo "Transaction order_id: " . $order_id ." successfully transfered using " . $type;
  }
  else if($transaction == 'pending'){
  // TODO set payment status in merchant's database to 'Pending'
  echo "Waiting customer to finish transaction order_id: " . $order_id . " using " . $type;
  }
  else if ($transaction == 'deny') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is denied.";
  }
  else if ($transaction == 'expire') {
  // TODO set payment status in merchant's database to 'expire'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is expired.";
  }
  else if ($transaction == 'cancel') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is canceled.";
}
?>
```
<!-- tabs:end -->

## Advanced

### Customizing Notification URL via API
<br>
<details>
<summary><b>Customize Notification URL via API</b></summary>
<article>

Optionally, if required Merchant can opt-in to change or add custom notification URLs on each transaction. It can be achieved by adding additional HTTP(s) headers on the API request.

There are two optional headers that we can accept:
- `X-Append-Notification` : to add new notification url(s) alongside the settings on dashboard
- `X-Override-Notification` : to use new notification url(s) disregarding the settings on dashboard

Both header can only receive up to maximum of 2 URLs, separated by coma(`,`).

#### Example in CURL

This is sample API request of Snap a transaction with override-notification url:

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -H 'X-Override-Notification: https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }
}'
```

#### Sample Case

Assuming merchant has set `https://example.com` as notification url on the dashboard. If merchant set header `X-Append-Notification: https://example.com/test1,https://example.com/test2`. Then, every HTTP(s) notification for that specific transaction will be sent to:
- https://example.com,
- https://example.com/test1, and
- https://example.com/test2

Else if merchant set header `X-Override-Notification: https://example.com/test1,https://example.com/test2`. Then, every HTTP(s) notification for that specific transaction will be sent to:
- https://example.com/test1 and
- https://example.com/test2

</article>
</details>

### Viewing Notification History
<br>
<details>
<summary><b>Viewing Notification History</b></summary>
<article>

In some cases you might want to know if HTTP notification is successfully sent to your notification url or backend server.

To audit if notification is sent, and if it sent successfuly or not you can login to your Midtrans Dashboard. Go to menu `Settings > Configuration > See History`. You will find HTTP Notification as well as email notification records for each Order ID, and you can see the status if it successfully sent or not. You can also search by Order ID.

- If notification fails to be sent,  your notification URL might be rejecting the HTTP notification delivery. Please check your notification URL implementation on your backend server. For more information, refer to [Best Practices](#best-practice-to-handle-notification).
- If you find that the notification has been sent (shown as `success`), but your server wasn't able to change the payment status on your backend, it might be because of an issue in the implementation on your backend server.
- If you face any delay or issue that Midtrans is unable to send the HTTP Notification, you can use [Get Status API](/en/after-payment/get-status.md) approach to sync payment status on Midtrans side to your system.
- You can further see the HTTP notification details, choose one of the table row entries that have `HTTP` value as **TYPE**, scroll right and click `Details`. You will be able to see a popup, and under `Request Body` section, you will see the details including the URL & HTTP request body JSON.

</article>
</details>

### Delayed or Missed Notification 

Although Midtrans strives for its best to keep notification service reliable, there may be some exceptional cases that can cause failure in sending notification from Midtrans or failure in receiving from merchant side.

This can happen due to cases such as delay, network/infra issues, unexpected downtime, vendor/service disruption, and so on. In this exceptional case, use [Get Status API call](/en/after-payment/get-status.md) to reconcile payment status between your backend and Midtrans.

Your backend can perform [GET Status API call](/en/after-payment/get-status.md), for example in any of the following point in time:

- When notification is not received within the defined time (24 hours, 12 hours, and so on).
- Before a transaction is considered as failure/canceled on your side.
- When your operations team wants to trigger status reconciliation.
- When customer claims funds are deducted from them but the transaction status is not updated to *success*.

Please make sure to check if the notification issue is not from your end. For more information, please refer to the [Best Practices to Handle Notification](#best-practice-to-handle-notification) and [View Notification History](#viewing-notification-history) sections explained earlier.

### Suggestion on Troubleshooting HTTP Notification Failures

Please refer to this FAQ about [troubleshooting HTTP Notification failures](/en/other/faq/technical?id=how-to-troubleshoot-http-notification-failures).
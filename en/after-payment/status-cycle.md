# Midtrans Transaction Status Cycle Description
<hr>
<!-- TODO: create status diagram similar to this https://docs.woocommerce.com/wp-content/uploads/2013/05/woocommerce-order-process-diagram.png -->

The table given below describes the life cycle of *Transaction Status* and its possible changes.


## Transaction Status

Transaction Status | Description | Possible changes(s)
--- | --- | ---
`pending` | Transaction is created and available/waiting to be paid by customer at the payment provider (ATM/Internet banking/E-money app/store). | settlement, <br>expire,<br>cancel, <br>deny 
`capture` | Transaction is successful and credit card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the next day and transaction status will change to *settlement*.<br />It is safe to assume a successful payment. | settlement, <br />cancel 
`settlement` | Transaction is successfully settled. Funds have been received. | refund, chargeback, partial_refund, partial_chargeback, deny\*
`deny` | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for denied transaction, see the `status_message` field in the response. |
`cancel` | Transaction is cancelled. Can be triggered by Midtrans or merchant themselves.<br>Cancelled transaction can be caused by various reasons:<br> 1. `Capture` transaction is cancelled before Settlement.<br> 2. `Challenge` Transaction is denied by merchant. |
`expire` | Transaction no longer available to be paid or processed, because the payment is not completed within the expiry time period. |
`failure` | The transaction status is caused by unexpected error during transaction processing. <br/>Failure transaction can be caused by various reasons, but mostly it is caused when bank fails to respond.<br/>This occurs rarely. |
`refund` | Transaction is marked to be refunded. Refund can be requested by Merchant. | 
`chargeback` | Transaction is marked to be charged back. | 
`partial_refund` | Transaction is marked to be partially refunded. | 
`partial_chargeback` | Transaction is marked to be partially charged back. | 
`authorize` | Only available specifically only if you are using pre-authorize feature for card transactions (an advanced feature that you will not have by default, so in most cases are safe to ignore). Transaction is successful and card balance is reserved (authorized) successfully. You can later perform API “capture” to change it into `capture`, or if no action is taken will be auto released. Depending on your business use case, you may assume `authorize` status as a successful transaction. | capture, <br>deny, <br>cancel, <br>expire

#### Reversal Case
\*Note: Known specific to payment methods of Permata Bank Transfer, Mandiri Bill Payment, and Indomaret; In some very rare cases, there is a possibility where `settlement` can later change into `deny`, also known as "Reversal". It may happen usually within the span of 1-5 minutes. It is caused by reversal triggered by the corresponding payment provider (issuing/acquiring bank), due to the nature of their payment networks. This status change will trigger [HTTP(s) notification/webhook](/en/after-payment/http-notification.md) from Midtrans to your server.
 
The change of status to `deny` means the transaction fund is reversed back to the customer, no fund is received on the merchant side. So merchants should treat the transaction as "not paid" (or rejected) and should not proceed the customer's order (do not deliver the goods/service to the customer).

The fund will bounce-back to the customer's account automatically, but it may take time depending on the process/policy of the payment provider and their chain of networks. Customers can be advised to contact the payment provider for the status.

#### Status When Using Snap API
<details>
<summary><b>Notes When Using Snap API</b></summary>
<article>

When a transaction is created on Snap API, it does not immediately assign any payment status on *Core API GET Status* response. Even if the payment page is activated on Snap API, you might encounter `404` or *Payment not found* response while calling *Core API GET Status*.

This is because the customer did not yet choose any payment method within the Snap payment page (idling or abandoning the Snap payment page). Once the customer proceeds with a payment method, then the transaction status is assigned and is available on *Core API GET Status*. 
</article>
</details>

## Fraud Status

The table given below describes the Fraud status.

| Fraud Status | 🔍    | Description                                                  |
| ------------ | ---- | ------------------------------------------------------------ |
| `accept`     | ✅    | Transaction is safe to proceed. It is not considered as fraud. Refer to [Accepting Fraudulent Transaction](en/after-payment/dashboard-usage.md#accepting-fraudulent-transaction) for more details. |
| `deny`       | ❌    | Transaction is considered as fraud and is denied/rejected for security reasons. For more information, refer to [Denying Fraudulent Transaction](en/after-payment/dashboard-usage.md#accepting-fraudulent-transaction). |
| `challenge`  | ⚠️    | Transaction is flagged as potential fraud, but cannot be determined precisely. <br> You can accept or deny via Dashboard, or via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API.<br />If no action is taken, the transaction is denied automatically. |

<!-- TODO explain how to do refund, approve, deny, cancel, etc -->

## API Action / Method
<!-- FIX THIS APTDOCS -->
You can perform a number of actions on *Transaction Status* through API calls. 

The header for all backend requests is described below.

| Header Name   | Description                                           | Required | Values            |
| ------------- | ----------------------------------------------------- | -------- | ----------------- |
| Accept        | The format of the data to be returned.                | Required | application/json  |
| Content-Type  | The format of the data to be posted                   | Required | application/json  |
| Authorization | The authentication method used to access the resource | Required | Basic AUTH_STRING |

**AUTH_STRING**: For more information, refer to [API Authorization and Header](https://docs.midtrans.com/en/technical-reference/api-header).

**Example**:

A sample Curl code given for an API request to cancel a pending transaction is given below.

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/myCustOrder123/cancel \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json'
```



**API Base URL:**
- Sandbox Environment : [https://api.sandbox.midtrans.com](https://api.sandbox.midtrans.com)
- Production Environment : [https://api.midtrans.com](https://api.midtrans.com)

Endpoint URL | HTTP Method | Description
--- | --- | ---
/v2/[ORDER_ID]/status | GET | Get information status of a transaction with a `order_id`. <br>For more information, refer to [GET Status](/en/after-payment/get-status.md). 
/v2/[ORDER_ID]/cancel | POST | Cancel a transaction with `order_id`. <br>Cancelation can only be done before `settlement`. <br>For more information, refer to [Cancel Transaction](https://api-docs.midtrans.com/#cancel-transaction). 
/v2/[ORDER_ID]/refund | POST | Mark `order_id` with `settlement` status to be marked as `refund`. <br>For more information, refer to [Refund Transaction](https://api-docs.midtrans.com/#refund-transaction). 
/v2/[ORDER_ID]/refund/online/direct | POST | Attempt to send refund to bank or payment provider directly and update the transaction status to `refund` if it succeeded. <br>For more information, refer to [Direct Refund Transaction](https://api-docs.midtrans.com/#direct-refund-transaction) for more information. 
/v2/[ORDER_ID]/expire | POST | Update `order_id` with pending status to be marked as `expired`. <br>For more information, refer to [Expire Transactions](https://api-docs.midtrans.com/#expire-transaction). 
/v2/[ORDER_ID]/approve | POST | Approve a transaction with `order_id` which gets `challenge` status from Fraud Detection System. <br>For more information, refer to [Approve Transactions](/en/after-payment/dashboard-usage.md). 
/v2/[ORDER_ID]/deny | 	POST | Deny a transaction with `order_id` which gets `challenge` status from Fraud Detection System. <br>For more information, refer to [Deny Transaction](https://api-docs.midtrans.com/#deny-transaction). 
/v2/[ORDER_ID]/status/b2b | GET | Get information status of multiple B2B transactions related to `order_id`. <br>For more information, refer to [GET transaction status for B2B](https://api-docs.midtrans.com/#get-transaction-status-b2b). 
/v2/capture	| POST | Capture a pre-authorized transaction for card payment. <br>For more information, refer to [Capture Transaction](https://api-docs.midtrans.com/#capture-transaction). 

For a full list and details of APIs, refer to [API docs](https://api-docs.midtrans.com/#payment-api).

?> Note: You can also replace `order_id` used in API urls with `transaction_id`, which uniquely generated from Midtrans side and you received as response when creating transaction, and from HTTP Notification. This is useful if your `order_id` contains unusual character (such as `#`) that may result in an invalid URL pattern.


?>***Tips:*** Each of the official [Midtrans Language Libraries](/en/technical-reference/library-plugin.md) has easy-to-use functions implementing most of the endpoints above. Please refer to the library's GitHub Repository for usage example.




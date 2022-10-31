# Snap Advanced Features
<hr>
<!-- TODO:add sample code for lang other than CURL? -->
Snap has various optional parameters. These optional parameters can be utilized for more advanced use cases that can help your integration.

## General

### Recommended Parameters
You can  include more information such as `customer_details`, `item_details`, and so on along side `transaction_details`. While sending API requests, it is recommended to send more details regarding the transaction, so that these details will be captured on the transaction record. Which can be [viewed on the Midtrans Dashboard](/en/after-payment/dashboard-usage.md#transaction).

The recommended JSON parameters for general use are given below. These parameters are used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend).
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}'
```
<!-- tabs:end -->

For more details, refer to [Snap Docs](https://snap-docs.midtrans.com/#json-objects).

You can also [add fee, tax, discount, etc. to item_details](/en/other/faq/technical.md#how-should-i-include-internal-fee-tax-discount-in-item_details-api-params) if you need.

### Configuring Redirect URL
Redirect URL is used to redirect your customer after the payment process is complete through *Snap*.

<!-- tabs:start -->
#### **Snap Popup (Default)**
This is the default method. In this method, payment page is embedded in merchant website/app. To set your redirect URL, in pop-up mode, go to [**Settings - Snap Preference - System Settings**](https://dashboard.sandbox.midtrans.com/settings/snap_preference).

![Redirect URL Configuration Snap JS](./../../asset/image/snap-prep-redirect-url-snapjs.png)

The diagram given below explains the working of redirect URL.

![Diagram Snap JS](./../../asset/image/snap-prep-diagram-snapjs.png)

#### **Snap Redirect (Alternative)**
In this method, the customer will be redirected to Midtrans hosted payment page. To set your redirect URL in redirect mode, go to [**Settings - Configuration**](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration).

![Redirect URL Configuration Snap Redirect](./../../asset/image/snap-prep-redirect-url-snapredir.png)

The diagram given below explains the working of redirection URLs.

![Diagram Snap Redirect](./../../asset/image/snap-prep-diagram-snapredir.png)

<!-- tabs:end -->

?> ***Note***:
The final redirect URL is appended with query parameter like `?order_id=xxx&status_code=xxx&transaction_status=xxx`.

For example the final redirect URL may look like this: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102123123&status_code=200&transaction_status=capture`.

You may use this information to display custom message to your customer on your finish URL.

Note: Specific if the payment method is Credit Card & processed via [3DS 2](https://api-docs.midtrans.com/#card-feature-3d-secure-3ds) (when the acquiring bank and the MID support), there's small possibility of the transaction is still waiting for the card's 3DS provider to process/verify it, which then Snap will trigger redirect with `?transaction_status=pending` instead of `capture/settlement`. To handle the payment success update, as usual you should [handle HTTP Notification](/en/snap/integration-guide.md#_4-handling-after-payment).

--------------------
### Snap.js Function and Options
Snap.js supports various useful options, such as specifying language, specifying GoPay payment mode to deeplink, and so on. You can use these options according to your requirement.

For more details, refer to [Snap Docs](https://snap-docs.midtrans.com/#frontend-integration).

?>***Note***: If you are using Snap Redirect mode, you can append options as Query parameter at the end of the Snap `redirect_url`:

```text
[redirect_url]?[options1]=[value]&[options2]=[value]
```
Which for example (using both `language=en` & `gopayMode=deeplink` options) the final result url as shown below.

```text

https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?language=en&gopayMode=deeplink
```

### Snap.js main functions
Including Snap.js on your frontend will expose `snap` object as global JS object accessible with `window.snap`. These are some main functions that you can access from your frontend codes:
- `window.snap.pay('SNAP_TRANSACTION_TOKEN', options)`: Will open payment page for that specific Snap Token, which is tied to specific Order ID. Also useful if you want to re-open that same payment page again e.g. when you allow another attempt of payment for that same Order ID, in case of closed earlier. Second parameter is optional `options` object [explained further here](https://snap-docs.midtrans.com/#snap-js).
- `window.snap.hide()`: Will close the Snap payment page popup. Useful if you want to close the payment page from customers, e.g. when you/customers want to cancel the payment.

For more details, refer to [Snap Docs](https://snap-docs.midtrans.com/#frontend-integration).

### JavaScript Callback
Snap.js supports callbacks. It can be used to trigger your custom JavaScript implementation on each event. The available callbacks are given below.

* `onSuccess`: Function that will be triggered when payment is successful.
* `onPending`: Function that will be triggered when payment is pending, which is for payment that requires further customer action, such as bank transfer / VA, or waiting for 3DS/OTP process\*.
* `onError`: Function that will be triggered when there is a payment failure after several attempts.
* `onClose`: Function that will be triggered when customer has closed the Snap popup.

Example of the Snap.js callback option usage while calling `window.snap.pay(...)` is given below. This parameter is used during [Snap frontend implementation](/en/snap/integration-guide.md#_2-show-snap-payment-page-on-frontend).

<!-- tabs:start -->
#### **Frontend JS**
```javascript
window.snap.pay('SNAP_TRANSACTION_TOKEN', {
  onSuccess: function(result){
    /* You may add your own implementation here */
    alert("payment success!"); console.log(result);
  },
  onPending: function(result){
    /* You may add your own implementation here */
    alert("wating your payment!"); console.log(result);
  },
  onError: function(result){
    /* You may add your own implementation here */
    alert("payment failed!"); console.log(result);
  },
  onClose: function(){
    /* You may add your own implementation here */
    alert('you closed the popup without finishing the payment');
  }
})
```
<!-- tabs:end -->

For more details on Snap JS callback's result JSON properties & the samples, refer to [this section of Snap Docs](https://snap-docs.midtrans.com/#js-callback).

\*Specific if the payment method is Credit Card & processed via [3DS 2](https://api-docs.midtrans.com/#card-feature-3d-secure-3ds) (when the acquiring bank and the MID support), there's small possibility of the transaction is still waiting for the card's 3DS provider to process/verify it, which then Snap will trigger `onPending` callback instead of `onSuccess`. To handle the payment success update, as usual you should [handle HTTP Notification](/en/snap/integration-guide.md#_4-handling-after-payment).

### Custom Finish URL
By default, Snap will redirect the customer to [Finish Redirect URL configured on Dashboard](#configuring-redirect-url). But you can override that configuration by specifying `callbacks.finish` parameter. This will allow you to have specific redirect for each specific payment.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}'
```
<!-- tabs:end -->

### Specify Payment Channel
On Snap payment selection screen, all available payments for the merchant are activated by default. Under some conditions, you may need to display only some of the payment methods available. There are two ways to achieve this, which are given below.

#### A) Specify Payment Channel via Dashboard
You can configure Enable Payment with Snap Preference on Midtrans *Dashboard*. This will apply to all Snap transactions for the Merchant account.

1. Login to your Midtrans Dashboard.
2. Go to **Settings - Snap Preferences - Payment Channels Tab**
3. Click [x] icon to disable payment channel.
4. Click [+] icon To enable payment channel.
5. Click **Apply Recommended Sorting** to use Midtrans recommended sorting. Or drag/drop manually to sort payment channel.
6. Click **Save**.

![snap preference payment channels](./../../asset/image/snap-adv-enabled-payment-dash.png)

?> ***Note:*** the configuration that is set using this method will only be applied to Snap payment transaction that is being opened via Snap Popup method (frontend javascript implementation method with snap.js). If your implementation is via Snap Redirect mode, please use configuration on the next section.

#### B) Specify Payment Channel via API Request
You can add and customize `enabled_payments` parameter. That will apply specifically for the transaction.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.

<!-- tabs:start -->

#### **JSON Parameters**
```json
...
"enabled_payments": [
    "credit_card",
    "gopay",
    "shopeepay",
    "permata_va",
    "bca_va",
    "bni_va",
    "bri_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
]
...
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "enabled_payments": [
    "credit_card",
    "gopay",
    "shopeepay",
    "permata_va",
    "bca_va",
    "bni_va",
    "bri_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
  ],
  "credit_card": {
    "secure": true
  },
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789"
  }
}'
```
<!-- tabs:end -->

`enabled_payments` also support alias, which refers to a list of payment types. Adding an alias is the equivalent of adding all the payment types it refers to. Supported aliases:
* `bank_transfer` = `permata_va, bca_va, bni_va, bri_va, echannel`
* `store` = `kioson, indomaret, alfamart`.

Use of `enabled_payments` is shown in the sample CURL request shown below.
<!-- tabs:start -->

#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "enabled_payments": [
    "credit_card"
  ],
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

This code will display only the credit card payment method on Snap as shown below.

![enabled payment card](./../../asset/image/snap-adv-enabled-payment.png)

### Custom Transaction Expiry
Custom Expiry feature enables you to set an expiry time of payment for each transaction. When the time elapses, customer will no longer be able to pay the transaction. There are two ways to configure expiry time, which are given below.

#### A) Custom Expiry via Dashboard
You can set custom expiry with Snap Preference on Midtrans Dashboard. This will apply to all Snap transactions for the Merchant account.
1. Login to your MAP account.
2. On the home page, go to **Settings- Snap Preferences**. *Snap Preferences* page is displayed.
3. Select **System Settings** tab.
4. Select **Default** check box.
5. Select duration unit from the drop-down menu.
6. Click **Save**.

![snap preference expiry](./../../asset/image/snap-adv-custom-expiry-dash.png)

#### B) Custom Expiry via API Request
This method is used to configure expiry time for a specific transaction.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.

<!-- tabs:start -->
#### **JSON Parameters**
```json
...
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
...
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
}'
```
<!-- tabs:end -->

Parameter|Description| Type | Required
---|---|---|---
`start_time` |Timestamp in `YYYY-MM-DD HH:MM:SS +0700`.<br/>If not specified, transaction time will be used as start time (when customer confirm payment channel). Time Zone is Western Indonesian Time (WIT). | String(255) | Optional\*
`duration` |Expiry duration | Integer | Required
`unit` |Expiry unit. Options: `day, hour, minute` (plural term also accepted). | String | Required

\*The `start_time` parameter is optional, but if you don’t include it, asynchronous payment methods like Bank Transfer, Gopay, etc. (payment methods that have `pending` status) will start the expiry duration only when the customer has proceeded to select & confirm payment on Snap payment screen. Thus the total expiry duration may not be as you were expecting due to Snap payment screen not immediately completed by customer. To avoid this, it is recommended to include the `start_time` on the API request.

### Custom Fields
Custom fields allow you to send your own (custom) data to Snap API, and then it will be sent back from Midtrans to your backend on HTTP notification. It will be displayed on Dashboard under the *order detail*.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.

<!-- tabs:start -->

#### **JSON Parameters**
```json
...
  "custom_field1": "this is custom text defined by merchant",
  "custom_field2": "order come from web",
  "custom_field3": "customer selected blue color variant"
...
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "custom_field1": "this is custom text defined by merchant",
  "custom_field2": "order come from web",
  "custom_field3": "customer selected blue color variant"
}'
```
<!-- tabs:end -->

Parameter|Description| Type | Required
---|---|---|---
custom_field1 |Custom field 1 for custom parameter from merchant. <br/>Input any information you want. | String(255) | Optional
custom_field2 |Custom field 2 for custom parameter from merchant. <br/>Input any data you want. | String(255) | Optional
custom_field3 |Custom field 3 for custom parameter from merchant.<br/>Input any data you want. | String(255) | Optional

## Credit Card
### 3 Domain Secure (3DS)
Three Domain Secure (3DS) feature can be enabled/disabled for specific transactions on Snap. By default you **should always enable 3DS whenever possible**, to prevent unnecessary security and chargeback risks. Understand the risks in disabling 3DS. To disable 3DS for specific business needs, you require agreement and approval. Consult Midtrans Activation team to allow disabling 3DS.

* To enable 3DS, set the `secure` value to `true`.
* To disable 3DS, set the `secure` value to `false`.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
...
  "credit_card": {
    "secure": true
  }
...
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

<!-- TODO: explain about 3DS and non 3DS save card feature -->
### Save Card for Seamless Subsequent Payments
You can allow customer to save their card credentials within Snap payment page, for easier and faster future transactions. Card credentials will be saved securely on Midtrans side, and will not require merchant to manage the card data.

Merchant will only need to store and associate each unique customer with unique `user_id` defined by merchant.

* Add `"save_card" : true` and `user_id`

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->

?> **Note:** During the first payment when a customer is intended to save their card, **they must tick the “Save this card” check box on Snap payment page**, in order for the card to be saved. This is to **ensure that the customer explicitly gives consent** that they are ok that their card will be securely saved.

![save card checkbox](./../../asset/image/snap-adv-save-card-checkbox.png ':size=350')

Use the same `user_id` API params for that particular customer on future transactions. Their card will be previewed on Snap card payment page, on future transactions.

![saved card preview](./../../asset/image/snap-adv-save-card-preview.jpg)

For more use cases, refer to [One Click, Two Click, and Recurring Transaction](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction).

### Recurring / Subscription Card Transaction (Tokenization)
?> This feature is also known as Card Tokenization. Which simply means a method to replace sensitive information value (card credentials) with a `token` (a placeholder) value, but also allowing it to still be associated with the actual value. Generally to keep sensitive information safely kept within secure environments, but still accessible for authorized parties.

Snap can be utilized to **initialize** subscription or recurring payment flow. Note that:

* You will require [Core API](/en/core-api/overview.md) to do the recurring charge.
* The recurring charge should be scheduled & triggered by your (merchant's) system/backend.
* Currently, recurring transaction supports only card transactions.

Please refer to the sequence diagram given below to understand the recommended flow.

<details>
<summary><b>Snap Recurring Sequence Diagram</b></summary>
<article>

![snap recurring sequence](./../../asset/image/snap-adv-snap-recurring-sequence.png)
</article>
</details>


Example of the JSON param for the first or initial transaction is given below. This param is used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend).
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->

Then you will proceed with [displaying Snap payment page](/en/snap/integration-guide.md#_2-displaying-snap-payment-page-on-frontend) as usual. After customer proceed with payment and result in successful first transaction, you will receive `saved_token_id` & `saved_token_id_expired_at` in the JSON of HTTP notification. `saved_token_id` is unique for each customer's card. Store this `saved_token_id` in your database and associate that card token to your customer.

!> Important: Be sure to store the card's `saved_token_id_expired_at`. When that date time has been surpassed, the card's `saved_token_id` will be no longer usable, it means the card is expired. In that case you will need to ask your customer to re-do the card saving process with their re-newed card.

#### Sample HTTP Notification with `saved_token_id`
```json
{
  "saved_token_id":"481111xDUgxnnredRMAXuklkvAON1114",
  "saved_token_id_expired_at": "2020-12-31 07:00:00",
  "status_code": "200",
  "status_message": "Success, Credit Card transaction is successful",
  ...
}
```

When you want to charge that particular customer, you will need to proceed with [Charge API request via Core API](/en/core-api/advanced-features.md#charge-api-request-for-recurring-transactions). The recurring transaction is non 3DS and will directly deduct customer's fund associated with the card.

?> Note: This feature requires special MID from acquiring bank, this utilize what bank usually call as "recurring MID". Which may means additional business agreement with the acquiring bank, you should consult Midtrans Activation team to activate this feature.

For more use cases, refer to [One Click, Two Click, and Recurring Transaction](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction).

#### Recurring / Subscription Transaction with Predefined Schedule

Note that the [Recurring / Subscription mentioned above](#recurring-subscription-card-transaction) is relying on your system/backend to schedule and trigger the recurring charges. Additionally, Midtrans also **support automatically charge recurring for you based on your specified schedule**.

Follow the same implementation as [mentioned above](#recurring-subscription-card-transaction), to the point your system retrieved the `saved_token_id`. Then you can proceed with [Core API's Recurring API feature here](https://api-docs.midtrans.com/#subscription-api). To specify the schedule of when Midtrans should charge recurringly to your customer.

?> Note: This feature requires special MID from acquiring bank, this utilize what bank usually call as "recurring MID". Which may means additional business agreement with the acquiring bank, you should consult Midtrans Activation team to activate this feature.

This method also support [GoPay payment method](https://api-docs.midtrans.com/#gopay-tokenization). Please contact Midtrans Activation Team or your Sales Representative before using this feature.

### Routing Transactions to Specific Acquiring
You can specify the preferred *Acquiring Bank* for specific Snap transaction. Transaction fund will be routed to that specific acquiring bank. Consult Midtrans Activation team to get information about the availability of the *Acquiring Bank*.

* Specify the bank name inside the `bank` parameter.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "bank": "bca"
  }
}
```
#### **Sample Charge API Request**

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "bank": "bca"
  }
}'
```
<!-- tabs:end -->

### BIN Filter
BIN (Bank Identification Number) filter is a feature that allows the merchant to accept only Credit Cards within specific set of BIN numbers. It is useful for certain bank promo/discount payment by accepting only credit cards issued by that bank. BIN (Bank Identification Number) is the **first 1-8 digits of a card number**, which identifies the bank that issues the card. A bank generally has more than one BIN.

To use this feature, you need to accumulate the list of BIN that accepts the promotion or uses the issuing bank's name. This list of BIN or issuing bank name will then become a transaction parameter `whitelist_bins`. This transaction can only be performed exclusively by using the credit card that is included in the BIN list or BIN under the particular defined issuing bank.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}'
```
<!-- tabs:end -->

?> ***Note:*** We already pre-populate BIN number for BNI, Mandiri, CIMB, BCA, and other partner banks. You can add the bank name as whitelist bins value.

The sample Snap payment page with BIN Filter feature is displayed below.
![snap bin filter](./../../asset/image/snap-adv-bin-filter.png)

### Card Installment Payment
#### Online Installment
This is the type of installment where the Card Issuer and Acquiring Bank is the same entity. For example, if a customer makes an installment payment using BNI Card, then *Acquiring Bank* is also BNI.

For online installments, the bank will issue special MID for installment. This installment MID is used to automatically convert the transaction into installments. To activate the installment feature, you are required to have agreement with the bank. Please consult Midtrans Activation Team for installment MID. If MID is ready, merchant simply needs to add the `installment` parameter.

```json
...
  "credit_card": {
    "secure": true,
    "installment": {
      // set to `true` to force customer pay with installment for this transaction
      // set to `false` to add option for customer to pay with regular fullpayment
      "required": true,
      "terms": {
        // input the desired bank & installment terms
        "<bank-name>": [ <installment terms as array of integers> ]
      }
    }
  }
...
```

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "bca": [3,6,12],
        "bni": [3,6,12],
        "mandiri": [3,6,12],
        "cimb": [3,6,12],
        "bri": [3,6,12],
        "maybank": [3,6,12],
        "mega": [3,6,12]
      }
    }
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "bca": [6,12],
        "bni": [6,12],
        "mandiri": [3,6,12]
      }
    }
  }
}'
```
<!-- tabs:end -->

The sample Snap payment page with online installment feature is displayed below.
![snap online installment](./../../asset/image/snap-adv-online-installment.png)

?> ***Note:*** Installment term will show in the Snap payment page after the customer enters the installment-compatible credit card number. For testing this method, refer to [Sandbox test card](/en/technical-reference/sandbox-test.md#card-number).

#### Offline Installment
*Offline Installment* is the type of payment where *Card Issuing Bank* used for making an installment payment and the *Acquiring Bank* need not be the same. For example, a customer makes an installment payment using BNI Card and the *Acquiring Bank* is Mandiri.

To allow installment feature with banks which do not issue Installment MID, merchant can use offline installment feature. With offline installment feature, the transaction will initially be charged in full amount and will be converted into installment later. To activate the installment feature, you are required to have agreement with the bank. Please consult Midtrans Activation Team for installment MID.

You have to add the `installment` parameter with combination of `whitelist_bins` feature. The purpose of Whitelist BIN is to allow only certain acceptable cards to proceed with offline installment payment, based on the agreement between you and issuing banks.

Usually you will also need to add `bank` parameter to specify which card acquirer bank should be used for the offline installment payment.

```json
...
  "credit_card": {
    "secure": true,
    "installment": {
      // set to `true` to force customer pay with installment for this transaction
      // set to `false` to add option for customer to pay with regular fullpayment
      "required": true,
      "terms": {
        // input the desired installment terms
        "offline": [ <installment terms as array of integers> ]
      }
    },
    "whitelist_bins": [ <card BINs as array of strings> ],
    "bank": <specify acquirer bank> // input the destination card acquirer bank that will be used
  }
...
```

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "offline": [3,6,12]
      }
    },
    "whitelist_bins": [
      "481111",
      "410505"
    ],
    "bank": "mandiri"
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "offline": [3,6,12]
      }
    },
    "whitelist_bins": [
      "481111",
      "410505"
    ],
    "bank": "mandiri"
  }
}'
```
<!-- tabs:end -->

The sample Snap payment page with offline installment feature is displayed below.
![snap offline installment](./../../asset/image/snap-adv-offline-installment.png)

#### Definition

Parameter | Description
--- | ---
`required` | If `true`, the customer must pay as installment for that specific transaction. <br>If `false`, the customer can choose to pay as installment or regular full payment for that specific transaction.
`terms` | under `terms` array, on online installment, you can specify the bank name <br>(For example- BNI, BCA, CIMB, Mandiri, and so on)

!> Important: When you use `whitelist_bins` to create a Snap transaction, it will be applied to all card transaction for that Snap transaction. It could means that you will not be able to mix offline installment with online installment or regular full payment into one Snap transaction. Read [further recommendations here](/en/other/faq/technical.md#how-should-i-implement-offline-installment-card-payment).

### Pre-Authorization Payment
Pre-authorization feature means customer's fund will not be directly deducted after transaction, but its amount/limit will be temporary reserved (blocked). Then you can initiate "capture" action later via [Core API](https://api-docs.midtrans.com/#capture-transaction). By default, if there is no "capture" action for the transaction for 7 days, reserved fund will be released after 7 days.

To use this feature, you need to add `"type": "authorize"` parameter.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "type": "authorize"
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "type": "authorize"
  }
}'
```
<!-- tabs:end -->

<!-- ### Enabling Payments using Card Loyalty Points // TODO Is it available on Snap ???-->

## GoPay
### Redirect Customer From Gojek App
After completing payment using GoPay payment method, by default, the customer will remain on Gojek app. They need to manually close Gojek app to switch back to merchant website or application. The `gopay.callback_url` parameter will allow customers to be automatically redirected from the Gojek app to the merchant website/application.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/gopay_finish"
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/gopay_finish"
  }
}'
```
<!-- tabs:end -->

You can input `callback_url` value with http/https URL protocol for website, or deeplink protocol for mobile App. For example, you can specify deeplink to your app: `"callback_url": "tokoecommerce://gopay_finish/"`

?>***Note***:
The final redirect URL will be appended with query parameter like `?order_id=xxx&result=xxx`. 

For example the final redirect URL might look like this:
```
https://tokoecommerce.com/gopay_finish/?order_id=CustOrder-102123123&
result=success
```

Query Parameter | Description| Type
--- | --- | ---
order_id |  Order ID sent on the Charge Request.  |  String  
result  |  Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`.| String

You could utilize those information to display custom message to your customer on your finish URL.

?>***Note:*** `gopay.callback_url` will only affect customer who pays with deeplink mode. Customer who pays with QR scan mode, will be redirected to Snap finish redirect URL, which you can [specify here](/en/snap/advanced-feature.md#custom-finish-url).

### Specify GoPay Mode
Snap payment screen by default will automatically detect customer device being used for transaction. If the device is detected as a mobile device, Snap will use deeplink mode to redirect customer to Gojek app (if installed on the device). If the device is detected as a non mobile device, Snap will use QR mode to display QR Code for customer to be paid from their mobile device.

You can specify options `gopayMode` on Snap.js to force Snap to use QR or deeplink as specified.

Option | Description | Type | Required
--- | --- | --- | ---
gopayMode | Choose the UI mode for GoPay. <br/>Supported values are `deeplink`, `qr`, and `auto`. Set to auto by default. | String | Optional

Example of the Snap.js callback option usage (this parameter is used during [Snap frontend implementation](/en/snap/integration-guide.md#_2-show-snap-payment-page-on-frontend)), while calling `window.snap.pay(...)` is given below.

<!-- tabs:start -->

#### **Frontend JS**
```javascript
window.snap.pay('SNAP_TRANSACTION_TOKEN', {
  gopayMode: "deeplink"
})
```

#### **Snap Redirect Mode**
If you are using Snap Redirect Mode, you can append options as Query parameter `?gopayMode=deeplink` at the end of the Snap `redirect_url`, which for example the final result url as shown below.
```
https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?gopayMode=deeplink
```
<!-- tabs:end -->

For more details, refer to [GoPay](https://snap-docs.midtrans.com/#gopay).

## Bank Transfer / VA

### Specify VA Number
By default Midtrans will randomize VA number used for bank transfer transaction. In some cases, you might want to specify/customize VA Number for Bank Transfer payment channels. You can do that with the following parameters.

Example of the JSON parameter used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameter**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000" //NOTE: Don't send this field unless BCA give you sub company code
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "bri_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}
```

#### **Sample Charge API Request**

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000"
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "bri_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}'
```

<!-- tabs:end -->

Virtual Account number displayed to customer contains two parts. for example, in `{91012}{12435678}` , the company-prefix-number and the second part is a unique-va-number. The second part is the part that can be customized.
* Only digits are allowed.
* Different banks have different specifications on their custom VA numbers. Please see the documentation of the respective banks. Note: for **Permata, only B2B VA type** support custom VA numbers.
* If the number provided is already utilized for another order, then a different unique number will be used instead.
* If the number provided is longer than required, then the unnecessary digits in the end will be trimmed.
* If the number provided is shorter than required, then the number will be prefixed with zeros.

Parameter |Description | Type | Required
--- | --- | --- | ---
BCA `va_number`|Length should be within 1 to 11.| String | Optional
BCA `sub_company_code` |BCA sub company code directed for this transactions. <br/>NOTE: Don't use it if you don't know. | String | Optional
Permata `va_number` |Length should be 10. Only supported for B2B VA type. | String | Optional
BNI `va_number` |Length should be within 1 to 8. | String | Optional


?>***Note:*** In *Production* mode, each and every bank may not support custom VA number. It depends on the agreement. Please consult Midtrans Activation team for further information.

### Specify VA Description
Some VA description and recipient name can be customized.

Example of the JSON param for the first or initial transaction is given below. This param is used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend).
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}'
```
<!-- tabs:end -->

BCA VA:
* **Inquiry** free text is list of text that will be displayed on ATM (if supported) when customer attempts to check/enquire the VA number.
* **Payment** free text is list of text that will be displayed on ATM (if supported) when customer attempts to pay the VA number.

BCA VA Free Text Array:

Parameter |Description | Type | Required
--- | --- | --- | ---
inquiry |Max item for array is 10 | Array of FreeTextItem | Optional
payment |Max item for array is 10 | Array of FreeTextItem | Optional

BCA VA Free Text Item:

| Parameter | Description                           | Type   | Required |
| --------- | ------------------------------------- | ------ | -------- |
| en        | Size should not exceed 50 characters. | String | Required |
| id        | Size should not exceed 50 characters. | String | Required |

Permata VA:

Parameter |Description | Type | Required
--- | --- | --- | ---
recipient_name |Recipient name shown on the on the bank’s payment prompt. <br/>It is shown as 20 character uppercase string. <br/>Anything over 20 characters will be truncated. NOTE: Default is merchant name. | String | Optional

## Convenience Store
### Specify Alfamart Free Text
The text printed on Alfamart receipt can be customized.

Example of the JSON parameters used during [backend API request step](/en/snap/integration-guide.md#_1-acquiring-transaction-token-on-backend) is given below.
<!-- tabs:start -->

#### **JSON Parameters**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}
```
#### **Sample Charge API Request**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}'
```
<!-- tabs:end -->

Parameter | Description| Type | Required
--- | --- | --- | ---
alfamart_free_text_1 | First row of printed receipt description| String(40) | Optional
alfamart_free_text_2 | Second row of printed receipt description| String(40) | Optional
alfamart_free_text_3 | Third row of printed receipt description| String(40) | Optional

## Consideration and Limitation
There are a few limitations to consider while using Midtrans API. These limitations are given below.

### Maximum Request Size Limit
Midtrans API allows maximum size of **16kb** per request (**\~16000 total characters**). Please try to keep it under the limit to avoid request failures.

?>***Tip***: Limit the number of `item_details` from your request, or group it into fewer `item_details`.

### Snap Token Expiry Time
The default lifetime for regular Snap transaction, Snap `token` and also the `redirect_url`, is **24 hours**. It can be customized. To customize Snap `token` and `redirect_url`, refer to [Custom Expiry](#custom-transaction-expiry) section.

Within the set time limit, the payment page is available for customer to proceed payment. After the limit exceeds, it will show that the payment page is no longer available.

### Allowing Customer to Re-pay The Same Order
If your customer journey allow customer to close the payment page, and you want to allow customer to retry payment for that same order, you can follow this tips. When you sent request to Snap API and received Snap Token, you can keep/store that Snap Token associated with your Order ID. You can re-call `window.snap.pay(SNAP_TRANSACTION_TOKEN')` again on frontend with that same Snap Token to open the payment page popup, as [long as it is not expired](#snap-token-expiry-time).

Alternatively if you prefer to create another Snap Token, you can [follow the next section.](#re-creating-snap-token-for-particular-order)

### Re-creating Snap Token for Particular Order
At the state of customer have not chosen/proceed with any payment method within the Snap payment page, you can still re-initiate create Snap transaction using the *same Order ID*, since the Order ID is not yet utilized. New Snap token & url will be generated, and the older token & url will no longer be valid.

But that will no longer work if the customer has proceeded to choose/confirm to pay with certain payment methods, the status may have changed to `pending`. This also applies to when the customer has successfully paid the transaction. You will get API error message `transaction_details.order_id sudah digunakan`. This is to prevent duplication of payment order id on Midtrans side.

To avoid Order ID duplication, you can also change your implementation logic to allow one Order ID on your system to have-many payment Order ID on Midtrans (one-to-many relationship). e.g. for Order ID: `web-order-321` your system can send request to Snap API with timestamp suffix on Order ID param like `web-order-321-{$timestamp}`. So that you can have many Snap Token recreated for that one particular order.

### Note on Card Transaction Expire Notification
Card transaction payment status will become `pending` once it is proceeded into 3DS/OTP phase. If the transaction is abandoned or not completed within 10-15 minutes, its status will become `expire`. For more details [please refer here](https://snap-docs.midtrans.com/#code-2xx).

### Multiple Payment Attempts
Snap is designed to maximize conversion rate of customer payment, it has built-in behavior: 
- In which **1 Snap order-id is allowed to be retried multiple times** by the customer as long as it is not yet finally paid or expired.

Example scenario:
- Customer attempted to pay a Snap Order ID using card payment, then his card declined 2x. 
- Then he choose another payment method, Akulaku, in which he got 1x another declined payment. 
- Then finally he chose another payment method, Gopay, in which his payment is successfully accepted.
- In summary: 3x deny attempts, 1x final success attempt.

Thus may result in:
- On **Midtrans dashboard you may see for 1 Snap Order ID, it can have multiple attempts recorded**.
  - In the example scenario above, you will see 2x denied card transactions + 1x denied Akulaku transactions + finally 1x successful Gopay transactions. This is **normal as long as there are only 1 successful transaction** for 1 Order ID. It is expected that the multiple failed transactions are also recorded.
- Your backend/system may **receive multiple webhook/HTTP Notifications** of transaction status for 1 Snap order ID, according to the status of each unique attempts.
  - In the example scenario above, your system will get 2x denied card transactions notif + 1x denied Akulaku transactions notif + finally 1x successful Gopay transactions notif. This is **normal as long as there are only 1 successful transaction** for 1 Order ID. It is expected that the multiple failed transaction notifications are also triggered.

?> Tips: You should implement your backend/system **to allow early failed payment attempts & eventually accept notification of payment success**.

### Note on Wallet & QRIS Deeplink/QR url
Due to the focus of Snap to be simple, easy to integrate, and focus on the customer friendly UI; for GoPay, ShopeePay, and QRIS transactions made within Snap payment UI, currently there is no feature to programmatically retrieve the `actions[].url` (of the payment deeplink/QR url) value from Snap. In case you need to do that scenario, it is recommended to use [Core API](/en/core-api/overview) instead. Though, we are working to improve this in the future Snap version.

You can alternatively store the Snap payment `token` (or `redirect_url`), and use it to re-display the Snap payment UI to the customer, so the GoPay, ShopeePay and QRIS payment page will be re-displayed according to the customer's session.

### QRIS Related Behavior
This behavior is applicable to Snap as per changes introduced on 12 September 2022.

Background condition:
- When you enable `gopay` (or other QRIS compatible e-money methods like `shopeepay`) payment method on Snap, by default Snap UI (whenever possible) will **automatically decide and show two possible scenario** for customer to pay:
  - A) If the customer is detected using **mobile device, App Redirect** payment flow will be presented.
  - B) If the customer is detected using **Desktop/PC, QRIS Scan** payment flow will be presented.

Please note the following behavior:
- Depending on which method the customer pay with (A or B), for each payment attempts:
  - In **scenario A**: Midtrans will **mark the payment_type of the transaction as** `gopay` (or the e-money payment method chosen).
  - In **scenario B**: Midtrans will **mark the payment_type of the transaction as** `qris`.
- This will also impact the following:
  - JSON fields sent on **Webhook/HTTP Notification** of the payment status.
  - **Get Status API** response.
  - The `Payment Type` displayed on **Midtrans Dashboard**, and when you download transactions.
- The JSON fields format (returned on Webhook/HTTP Notifications & Get Status API response) is different between `"payment_type": "qris"` and `"payment_type": "gopay"`. Refer to the [notification example section](/en/after-payment/http-notification.md#sample-for-various-payment-methods) for details.

Compared to previous behavior before this change, it was:
- Regardless of scenario A or B, Midtrans will record it as `gopay` (or the e-money payment method chosen). Which was a bit misleading, because it does not exactly give a proper differentiator if the payment was paid via QRIS.

**Reasons why** this changes was introduced:
- To provide **clearer information whether the payment source** was made via e-money or QRIS.
- The transaction fee for Gopay (e-money) payment method & QRIS is calculated differently. This change will provide **clearer information for the Merchant's side to do reconciliation of transactions fee**.
- The previous flow was based on e-money QR, which was still in its early stages & each e-money has its own different QR standard. As of now QRIS is maturing to become the unifying standard, we have to continuously **optimize our flow to this latest evolving standard**.

Though at first you may find it confusing because you did not explicitly enable `qris` on Snap or the customer did not choose it either, but you are receiving `qris` on notification.

**Recommended action for merchant** side:
- Please **ensure that your system’s implementation can handle this behavior** without breaking your system & its payment flow. Especially on the following parts (if applicable):
  - Your **Notifications Handler implementation** logic.
  - **Get Status API implementation** logic.
  - **Reconciliation implementation** logic.

Tips:
- In terms of payment status, there will be no difference between the mentioned payment_type. Success status will still be `settlement`, unpaid will still be `expire`, waiting will still be `pending`, etc.
  - So it will be safe for you to use the same logic (no changes) to check the payment status.
- It will also generally support the same command such as `refund`, `expire`, etc.
- So the change in `payment_type` will not affect payment status itself. 
- If it helps make your implementation transition easier, 
  - You can disregard the payment_type differences or consider. Or
  - You can internally consider both `gopay` and `qris` payment_type to be one, just like previously.

### Note on Core API Get Status
When a transaction is created on *Snap API*, it does not immediately assign any payment status on *Core API's* Get Status response.

Considering this, you may get `404` or *Payment Not Found* response upon calling *Core API* get-status even if the payment page is activated on *Snap API*.

It is because of customer may not have chosen/proceed with any payment method within the Snap payment page (For example, idling or abandoning the Snap payment page). After customer chooses and proceeds with a payment method, the transaction status will be assigned. It will be available on *Core API* Get Status response. The possible status is as defined in the table above.

### Content Security Policy (CSP) Whitelist
If you are using Content Security Policy (CSP) on your payment web page, please whitelist the domains/URLs given below. This is required by the Snap.js to work properly from within your payment web page.

```
cloudfront.net
*.midtrans.com
*.veritrans.co.id
*.mixpanel.com
*.google-analytics.com
```
Please whitelist the above domains/URLs in your CSP header/rule, to ensure proper working of Snap.js.

### Snap Popup in an IFrame
**Avoid** displaying Snap payment popup within an iframe from your main checkout page. As it may cause unexpected results (known so far):
- Snap UI size may not perfectly fit the size of the browser/device.
  - Snap automatically tries to fit to the webpage’s size, if you put Snap within an iframe, it tries to fit to the iframe size instead. Thus it is not recommended. If you insist on doing it with iframe, you can try to resize the iframe size to fit the main webpage’s.
- Payment methods that require redirect to payment provider's website/app may not work (e.g. Gopay, ShopeePay, etc.).
  - This is mainly because of Web Browser's security limitations, to avoid spam and unwanted pop-up most of modern web browser by default will try to block redirection coming from cross-domain iframe.

We always recommend to follow the basic Snap integration:
- Use Snap’s javascript directly on your checkout webpage, and [make sure to use meta-viewport tag](/en/snap/integration-guide.md#_2-displaying-snap-payment-page-on-frontend).
- Or alternatively use [Snap’s redirect method](/en/snap/integration-guide.md#alternative-way-to-display-snap-payment-page-via-redirect).

## Reference

<div class="my-card">

#### [Snap Docs](https://snap-docs.midtrans.com/#json-objects)
</div>

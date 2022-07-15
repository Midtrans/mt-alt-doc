<!-- 
TODO:
- list out what's the diff with snap & UI PL

 -->
# Payment Link - API Reference 
?> Payment Link API is still in <span class="badge badge-yellow">BETA</span> phase. But is currently usable on Midtrans Production & Sandbox environment. Feel free [to contact our Support Team](https://midtrans.com/contact-us) (or your Midtrans' Sales Account Manager) to share your feedback or question.

You can visit [general overview of Payment Link API](/en/payment-link/with-api.md), in case you haven't.

## Integration Overview
#### Pre-requisite:
- [Midtrans merchant account](/en/midtrans-account/overview.md) & [retrieve API Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).

#### Steps:
1. Merchant's backend sends [request to Create Payment Link API](#create-payment-link-api), in order to retrieve payment URL.
2. Share the payment URL to Customer (e.g. via system, messaging app, or Midtrans automated email), and then wait for them to proceed to payment.
3. Merchant [gets notified of payment status changes & handles](#handling-notifications) accordingly.

- Optional: Merchant can also use other API endpoints to manage Payment Link. For example to read/delete Payment Link as needed.

<!-- 
@TODO:
For guided integration refer please refer to this page
-->
<!-- 
## Integration Overview
Backend integration goal is to get payment-link url by providing payment informations. We provide a HTTP API to do this.

1. Merchant sent req params using server key to get payment link url
2. Midtrans will response payment link url

 -->
## API Reference
The followings reference will explain the Payment Link API.

### API Host URL
| Environment | API Host Base URL                                                    |
| ----------- | -------------------------------------------------------------------- |
| Sandbox     | [https://api.sandbox.midtrans.com](https://api.sandbox.midtrans.com) |
| Production  | [https://api.midtrans.com](https://api.midtrans.com)                 |

<small>

\*Learn more about [what is Sandbox Environment](/en/technical-reference/sandbox-test.md).
</small>

## Create Payment Link API
Merchant sends HTTP API request with the desired transaction details to this endpoint, and will get API response mainly with the Payment Link URL. The URL then should be shared to & opened by Customer, to initiates payment.

### Request
**Endpoints:** `/v1/payment-links`\
**HTTP Method:** `POST`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
`AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your **Server Key** while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](/en/technical-reference/api-header.md).

#### Request Body
```json
{
  "transaction_details": {
    "order_id": "001",
    "gross_amount": 190000,
    "payment_link_id": "for-payment-123"
  },
  "credit_card": {
    "secure": true
  },
  "usage_limit":  1,
  "expiry": {
    "start_time": "2022-04-01 18:00 +0700",
    "duration": 20,
    "unit": "days"
  },
  "enabled_payments": [
    "credit_card",
    "bca_va",
    "indomaret"
  ],
  "item_details": [
    {
      "id": "pil-001",
      "name": "Pillow",
      "price": 95000,
      "quantity": 2,
      "brand": "Midtrans",
      "category": "Furniture",
      "merchant_name": "PT. Midtrans"
    }
  ],
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@midtrans.com",
    "phone": "+62181000000000",
    "notes": "Thank you for your purchase. Please follow the instructions to pay."
  },
"custom_field1": "custom field 1 content", 
"custom_field2": "custom field 2 content", 
"custom_field3": "custom field 3 content"
}
```

#### Request JSON Body Details

<!-- 
@NOTE: some table auto converted w/ https://tabletomarkdown.com/convert-website-table-to-markdown/ from gdocs. To save times.
Also some auto converted from Gdocs to html-markdown to markdown.
-->
| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| [transaction_details](#transaction_details-object)| **required** | Object | Specific information regarding the transaction.|
| [customer_details](#customer_details-object)| optional | Object | Specific information regarding the customer.<br>**Note:** If Merchant sends customer_detail’s email on the request, Midtrans will send the created Payment Link url to the customer’s email.|
| [item_details](#item_details-object)| optional | Object | Details of the purchased items. Will be shown to customer during payment and shown in Midtrans Dashboard.|
| usage_limit | optional | integer | Maximum number of allowed successful/paid transactions. <br>**Note:** Each successful/paid payment will consume a "usage" quota. A `pending` payment (payment attempted, but still waiting for Customer to make payment e.g. waiting Bank Transfer, Gopay, QRIS, etc.) will temporarily hold a usage quota, but if it is abandoned/left-unpaid (becomes `expire`) it will release the usage quota back.|
| [expiry](#expiry-object)| optional | Object | Customizable transaction lifetime. Once the duration exceeded, the link will no longer be available.|
| enabled_payments    | optional | Array | Customizable list of payment methods that will be shown during payment. If not specified, by default all active payment methods are shown.<br>**Options:**<br>credit_card, gopay, cimb_clicks, bca_klikbca, bca_klikpay, bri_epay, telkomsel_cash, echannel, permata_va, other_va, bca_va, bni_va, bri_va, indomaret, danamon_online, akulaku, shopeepay. |
| custom_field1 | optional | String(255) | Retrievable custom text that you can pass to Midtrans on field 1. Wil be shown in Midtrans Dashboard, & sent on HTTP Notification.|
| custom_field2 | optional | String(255) | Retrievable custom text that you can pass to Midtrans on field 2. Wil be shown in Midtrans Dashboard, & sent on HTTP Notification.|
| custom_field3 | optional | String(255) | Retrievable custom text that you can pass to Midtrans on field 3. Wil be shown in Midtrans Dashboard, & sent on HTTP Notification.|
| [credit_card](#credit_card-object)| optional | Object | Credit card payment options.|
| [bni_va](#bni_va-object)| optional | Object | Customizable Virtual Account number & options for BNI VA.|
| [permata_va](#permata_va-object)| optional | Object | Customizable Virtual Account number & options for Permata VA.|
| [bca_va](#bca_va-object)| optional | Object | Customizable Virtual Account number & options for BCA VA.|
| [bri_va](#bri_va-object)| optional | Object | Customizable Virtual Account number & options for BRI VA.|

<!-- 
@TODO: properly convert table to markdown format.
it was auto converted to HTML format from GDocs, as quick solution.
-->
##### transaction_details object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>order_id</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Unique transaction ID. A single ID could be used only once by a Merchant. Allowed Symbols are dash(-), underscore(_), tilde (~), and dot (.).</td>
  </tr>
  <tr>
   <td>gross_amount</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Total payment amount Customer expected to pay. <br><strong>Note:</strong><br> The Sum of Subtotal (item price multiplied by quantity) of all the item details needs to be exactly the same as the gross_amount inside transaction_details object.</td>
  </tr>
  <tr>
   <td>payment_link_id</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Unique Link ID that will be used as part of the resulting payment URL. A single ID could be used only once. Allowed characters are alphanumeric ​​[a-z, 0-9] and hyphens [-].<br><strong>Note:</strong> <br>By default auto generated by midtrans.</td>
  </tr>
</table>

##### credit_card object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>secure</td>
   <td>optional</td>
   <td>Boolean</td>
   <td>Specify whether 3D-Secure authentication should be used for Card payment method. <br><strong>Note:</strong> It is recommended to specify <strong>true</strong> for most cases.  Default: false.</td>
  </tr>
  <tr>
   <td>bank</td>
   <td>optional</td>
   <td>String</td>
   <td>Specify which acquiring bank is preferred for Card payment method. <br>If not specified, Midtrans will auto determine accordingly. It is <strong>recommended to not specify it.</strong> <br><strong>Options</strong>: bca, bni, mandiri, cimb, bri, danamon, maybank, mega.</td>
  </tr>
  <tr>
   <td>channel</td>
   <td>optional</td>
   <td>String</td>
   <td>Specify which acquiring channel is preferred for Card payment method's acquiring bank. <br>If not specified, Midtrans will auto determine accordingly. It is <strong>recommended to not specify it.</strong><br><strong>Options</strong>: migs</td>
  </tr>
  <tr>
   <td>type</td>
   <td>optional</td>
   <td>String</td>
   <td>Card payment transaction type. It is <strong>recommended to not specify it.</strong> <br><strong>Options</strong>: authorize, authorize_capture  <br><strong>Default: </strong>authorize_capture</td>
  </tr>
  <tr>
   <td>whitelist_bins</td>
   <td>optional</td>
   <td>Array</td>
   <td> Specify list of card BIN numbers that will be allowed to pay. The BIN value can be either a prefix(up to 8 digits) of card number or the name of a bank, in which case all the cards issued by that bank will be allowed.</td>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#json-objects">installment.required</a></td>
   <td>optional</td>
   <td>Boolean</td>
   <td>Specify whether Customer is required to pay with installment for card payment method, if installment feature is enabled. It is <strong>recommended to not specify it.</strong><br> <strong>Default</strong>: false</td>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#json-objects">installment.terms</a></td>
   <td>optional</td>
   <td>Object</td>
   <td>Specify list of allowed installment terms, if installment feature is enabled. It is <strong>recommended to not specify it.</strong> </td>
  </tr>
</table>

##### expiry object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>start_time</td>
   <td>optional</td>
   <td>String <br>Timestamp in yyyy-MM-dd HH:mm:ss Z format</td>
   <td>Timestamp of when the expiry period should start. If not specified, transaction time will be used as start time when payment link is created</td>
  </tr>
  <tr>
   <td>duration</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Expiry duration value.</td>
  </tr>
  <tr>
   <td>unit</td>
   <td><strong>required</strong></td>
   <td>String</td>
   <td>Expiry duration unit. <br><strong>Options</strong>: day, hour, minute.</td>
  </tr>
</table>

##### item_details object
The value of these parameters will be specified by Merchant (not Midtrans).

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>id</td>
   <td>optional</td>
   <td>String</td>
   <td>Item ID.</td>
  </tr>
  <tr>
   <td>price</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Price of the item.  <br><strong>NOTE</strong>: Don’t add decimal.</td>
  </tr>
  <tr>
   <td>quantity</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Quantity of the item.  <br><strong>NOTE</strong>: Must be greater than or equal 1.</td>
  </tr>
  <tr>
   <td>name</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Name of the item.</td>
  </tr>
  <tr>
   <td>brand</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Brand of the item.</td>
  </tr>
  <tr>
   <td>category</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Category of the item.</td>
  </tr>
  <tr>
   <td>merchant_name</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Merchant selling the item. Useful if you have multiple sub-merchants within your commerce platform.</td>
  </tr>
</table>

##### customer_details object
The value of these parameters will be specified by Merchant (not Midtrans).

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>first_name</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Customer's first name.</td>
  </tr>
  <tr>
   <td>last_name</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Customer's last name.</td>
  </tr>
  <tr>
   <td>email</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Customer's email address.</td>
  </tr>
  <tr>
   <td>phone</td>
   <td><strong>required</strong></td>
   <td>String(20)</td>
   <td>Customer's phone number.</td>
  </tr>
  <tr>
   <td>notes</td>
   <td>optional</td>
   <td>String(255)</td>
   <td>Customizable email instructions.</td>
  </tr>
</table>

##### bca_va object
BCA Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(11)</td>
   <td>Custom Virtual Account Number.</td>
  </tr>
</table>

##### bni_va object
BNI Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(8)</td>
   <td>Custom Virtual Account Number.</td>
  </tr>
</table>

##### permata_va object
Permata Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(10)</td>
   <td>Custom Virtual Account Number.</td>
  </tr>
</table>

##### bri_va object
BRI Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(13)</td>
   <td>Custom Virtual Account Number.</td>
  </tr>
</table>

### Request Sample
Sample Request including Headers & Body.
#### CURL

```bash
curl --location --request POST 'https://api.sandbox.midtrans.com/v1/payment-links' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
--data-raw '{
 "transaction_details": {
   "order_id": "concert-ticket-05",
   "gross_amount": 190000,
   "payment_link_id": "amazing-ticket-payment-123"
 },
 "credit_card": {
   "secure": true
 },
 "usage_limit":  5,
 "expiry": {
   "duration": 30,
   "unit": "days"
 },
 "item_details": [
   {
     "id": "tix-001",
     "name": "Exclusive Tour Concert Day 1",
     "price": 95000,
     "quantity": 2
   }
 ],
 "customer_details": {
   "first_name": "John",
   "last_name": "Doe",
   "email": "john.doe@example.com",
   "phone": "+62181000000000",
   "notes": "Thank you for your order. Please follow the instructions to complete payment."
 }
}
'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
   "order_id": "concert-ticket-05",
   "payment_url": "https://app.sandbox.midtrans.com/payment-links/amazing-ticket-payment-123"
}
```

#### Sample Failure Response
HTTP Status Code: `409`

```json
{
   "error_messages": [
       "The Order ID 'order-123' has been taken"
   ]
}
```

HTTP Status Code: `401`

```json
{
   "error_messages": "Access denied due to unauthorized request"
}
```

HTTP Status Code: `400`

```json
{
   "error_messages": [
       "Invalid JSON data provided.",
       "This Payment Link ID 'payment-112' has been taken",
       "payment_link_id must only contain alphanumeric characters [a-z, 0-9] and hyphens [-]"
   ]
}

```

#### Response JSON Body Details

<table>
  <tr>
   <th>Property</th>
   <th>Descriptions</th>
  </tr>
  <tr>
   <td>order_id</td>
   <td>Merchant’s Order ID</td>
  </tr>
  <tr>
   <td>payment_url</td>
   <td>The resulting payment url to share with Customer.</td>
  </tr>
  <tr>
   <td>error_messages</td>
   <td>The message describing the error, if any error encountered.</td>
  </tr>
</table>

Response properties are conditional, depending on whether the API response is success or failure. E.g. error_messages may only exists on failure response.

#### HTTP Status Code

<table>
  <tr>
   <th>Status Code</th>
   <th>Descriptions</th>
  </tr>
  <tr>
   <td>200</td>
   <td>Request is successful</td>
  </tr>
  <tr>
   <td>409</td>
   <td>Duplicate order ID. Order ID has already been utilized previously</td>
  </tr>
  <tr>
   <td>401</td>
   <td>Access denied due to unauthorized request</td>
  </tr>
  <tr>
   <td>400</td>
   <td>Validation Error / Invalid JSON</td>
  </tr>
  <tr>
   <td>500</td>
   <td>Internal Server Error</td>
  </tr>
</table>

<!-- @NOTE: postponed from publishing, waiting for product readiness.
## Get List of Payment Links API
Merchant sends HTTP API request to this endpoint to retrieve list of previously created Payment Links.

### Request
**Endpoints:** `/v1/payment-links?{query_parameters}`\
**HTTP Method:** `GET`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
[Authorization]((/en/technical-reference/api-header.md)) `AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

#### Request URL Query Parameter Details
| Query Parameter Key| Required | Type | Descriptions|
| --------------- | -------- | ------- |------------------------- |
| order\_id       | optional | String  | Merchant's Order ID.|
| pagination      | optional | integer | Pagination page number.|
| offset          | optional | integer | Skip specified number of rows.|
| limit           | optional | integer | Retrieve specified number of rows.|

Append query parameter(s) after the `?` character in the endpoint URL. Separate key & value with `=`. Separate keys with `&`. Further [resource on how URL Query Parameter syntax](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#query).

For example: `/v1/payment-links?offset=5&limit=10`.

### Request Sample
Sample Request including Headers & Body.
```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v1/payment-links?pagination=1' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
  "payment_links": [
    {
      "id": "1",
      "payment_link_url": "https://app.midtrans.com/payment-links/abc",
      "order_id": "001",
      "merchant_id": "M001",
      "payment_link_id": "abc",
      "enabled_payments": [
        "credit_card",
        "bca_va",
        "indomaret"
      ],
      "usage_limit": 2,
      "gross_amount": 190000,
      "credit_card_3d_secure": true,
      "whitelist_bins": [
        "4645",
        "4811111",
        "bca",
        "mandiri"
      ],
      "expiry_start": "2020-12-31 18:00 +0700",
      "expiry_duration": 2,
      "expiry_unit": "days",
      "usage": 2,
      "item_details": [
        {
          "id": "1",
          "name": "Pillow",
          "price": 95000,
          "quantity": 2,
          "brand": "Midtrans",
          "category": "Furniture",
          "merchant_name": "PT. Midtrans",
          "item_id": "pil-001",
          "payment_link_id": "1",
          "created_at": "2017-11-02T10:53:21.000Z",
          "updated_at": "2017-11-02T10:53:21.000Z"
        }
      ],
      "customer_details": {
        "id": "1",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@midtrans.com",
        "phone": "+62181000000000",
        "notes": "Thank you for your purchase. Please follow the instructions to pay.",
        "payment_link_id": "1",
        "created_at": "2017-11-02T10:53:21.000Z",
        "updated_at": "2017-11-02T10:53:21.000Z"
      },
      "purchases": []
    }
  ]
}
```
#### Response JSON Body Details
| Parameter         | Type    | Description                                               |
| ----------------- | ------- | --------------------------------------------------------- |
| payment\_links | Array of object | Collection of payment links which match query parameters. |
| id                | String  | Auto-generated ID of Payment Link from Midtrans as internal unique reference.|
| order\_id         | String  | Merchant specified Order ID of the Payment Link.|
| merchant\_id      | String  | Merchant ID who owns the Payment Link.|
| payment\_link\_id | String  | Payment link ID which is on last part of payment link URL.|
| usage\_limit      | integer | Maximum number of allowed successful/paid transactions.|
| usage             | integer | Current count of "usage" quota already consumed.|
| gross\_amount     | integer | Payment amount Customer expected to pay.|
| enabled\_payments | Array   | List of payment methods enabled for this Payment Link.|
| item\_details     | Object  | Details of the purchased items.|
| customer\_details | Object  | Specific information regarding the customer.|
| expiry\_start     | String  | Start of expiry time.|
| expiry\_duration  | Integer | Duration value of expiry time.|
| expiry\_unit      | String  | Duration unit of expiry time.|

## Get Payment Link Details API
Merchant sends HTTP API request to this endpoint with the specified Order ID to retrieve the Payment Link details.

### Request
**Endpoints:** `/v1/payment-links/{order_id}`\
**HTTP Method:** `GET`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
[Authorization]((/en/technical-reference/api-header.md)) `AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

### Request Sample
Sample Request including Headers & Body.
```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v1/payment-links/001' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
  "id": "1",
  "payment_link_url": "https://app.midtrans.com/payment-links/abc",
  "order_id": "001",
  "merchant_id": "M001",
  "payment_link_id": "abc",
  "enabled_payments": [
    "credit_card",
    "bca_va",
    "indomaret"
  ],
  "usage_limit": 2,
  "gross_amount": 190000,
  "credit_card_3d_secure": true,
  "whitelist_bins": [
    "4645",
    "4811111",
    "bca",
    "mandiri"
  ],
  "expiry_start": "2020-12-31 18:00 +0700",
  "expiry_duration": 2,
  "expiry_unit": "days",
  "usage": 2,
  "item_details": [
    {
      "id": "1",
      "name": "Pillow",
      "price": 95000,
      "quantity": 2,
      "brand": "Midtrans",
      "category": "Furniture",
      "merchant_name": "PT. Midtrans",
      "item_id": "pil-001",
      "payment_link_id": "1",
      "created_at": "2017-11-02T10:53:21.000Z",
      "updated_at": "2017-11-02T10:53:21.000Z"
    }
  ],
  "customer_details": {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@midtrans.com",
    "phone": "+62181000000000",
    "notes": "Thank you for your purchase. Please follow the instructions to pay.",
    "payment_link_id": "1",
    "created_at": "2017-11-02T10:53:21.000Z",
    "updated_at": "2017-11-02T10:53:21.000Z"
  },
  "purchases": []
}
```
#### Response JSON Body Details
Refer [to this details](#response-json-body-details-1).
-->

## Delete Payment Link API
Merchant sends HTTP API request to this endpoint with the specified Order ID to delete the Payment Link. Useful to deactivate some specific Payment Links when merchant no longer want Customer to pay for it.

### Request
**Endpoints:** `/v1/payment-links/{order_id}`\
**HTTP Method:** `DELETE`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
[Authorization]((/en/technical-reference/api-header.md)) `AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

### Request Sample
Sample Request including Headers & Body.
```bash
curl --location --request DELETE 'https://api.sandbox.midtrans.com/v1/payment-links/1525840754698' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
   "message": "Payment Link with Order ID 1525840754698-1647594290 deleted"
}
```

#### HTTP Status Code

<table>
  <tr>
   <th>Status Code</th>
   <th>Descriptions</th>
  </th>
  <tr>
   <td>200</td>
   <td>Request is successful</td>
  </tr>
  <tr>
   <td>404</td>
   <td>Not Found</td>
  </tr>
  <tr>
   <td>401</td>
   <td>Access denied due to unauthorized request</td>
  </tr>
  <tr>
   <td>500</td>
   <td>Internal Server Error</td>
  </tr>
</table>

## Other Useful Info
### Managing Payment Links via Dashboard
The created Payment Link(s) will then be available to be [viewed & managed via Midtrans Dashboard](/en/payment-link/overview.md#managing-payment-link).

![List Payment Link](../../asset/image/paymentlink_list.png)

### Redirection After Payment Complete
Merchant can customize the Redirect URL in Dashboard's **Settings > Snap Preference > System Settings** Menu. Redirect URL will be used to redirect your customer after the payment process. [Follow this section to learn the details.](/en/snap/advanced-feature.md#configuring-redirect-url).

### Handling Notifications
[Transaction notification](/en/after-payment/http-notification.md) will be sent to your backend/system when Customer completes the transaction or when the transaction status changes.

Merchant's [HTTP notification URL can be configured on merchant dashboard](/en/after-payment/http-notification.md#configuring-http-notifications-on-map), Midtrans will send HTTP notification to the specified URL.

There are also several ways to [ensure authenticity of the HTTP notifications received by Merchant backend](/en/after-payment/http-notification.md#verifying-notification-authenticity), in order to improve security aspect.

### Order ID Structure
For each payment created/attempted (on any Payment Link) Midtrans will automatically append merchant's original Payment Link's Order ID with a timestamp, from `order_id ` to `order_id-{timestamp}`.

For example from: `order123` to `order123-1647944535605`.

So **Merchant need to make sure that their system is able to handle this change** when processing payment's **HTTP notification**. As Merchant may need to map the resulting Order ID back to the original specified Order ID.

For example, here are some ideas to do that:

#### Using Code Logic Implementation
In Merchant's notification handler code in backend, Merchant can implement logic to convert back the modified Order ID to the original Order ID that their system recognizes.

For example the logic must be able to convert `order123-1647944535605` back to `order123`, by disregarding string after the last occurence of `-` character.

#### Using Custom Field
Alternatively, Merchant can optionally sends `custom_field1` JSON body parameter with the original order_id when create payment link. Like so:
```json
{
 "transaction_details": {
   "order_id": "order123",
   "gross_amount": 10000
 },
 ...
 "custom_field1": "order123"
}
```

So that later when merchant receive the notification from Midtrans, the original order_id will be available on the HTTP Notification within the same `custom_field1` JSON property.

```json
{
 "va_numbers": [
   {
     "va_number": "00018929808",
     "bank": "bca"
   }
 ],
 "transaction_time": "2022-03-22 17:22:21",
 "transaction_status": "pending",
 "transaction_id": "1d02cdda-a424-4e6e-a711-154f004bc26d",
 "status_message": "midtrans payment notification",
 "status_code": 201,
 "signature_key": "caa79748f56892a8664633331d6b719320ccda008d44d10d56156988700ca37067b9d6531d0b4778366707ce0fb859ea6f38499f6f03283f48007e6d77956afe",
 "payment_type": "bank_transfer",
 "payment_amounts": [],
 "order_id": "merchant-order-id-1-1647944535605",
 "merchant_id": "G379181825",
 "gross_amount": 10000,
 "fraud_status": "accept",
 "custom_field1": "order123",
 "currency": "IDR"
}
```

## Advanced Info
### Other API Actions & Payment Handling
<!-- @TODO: link to other available endpoints -->
Once Customer has initiated a payment and payment is created on Midtrans side:
- Merchant can further perform [other API actions to the transaction](/en/after-payment/status-cycle.md#api-action-method).
- Other [After Payment sections explanations](/en/after-payment/overview.md) also applies to the payment transaction.

### Relation to Snap Payment Product
Under the hood, Payment Link product utilize [Snap Payment](/en/snap/overview.md) product to present payment page. So, please note that most configurations, parameters, and behaviours of Snap Payment is also inherited by Payment Link. For example:
- [Finish Redirect configuration](#redirection-after-payment-complete)
- [Notification handling](#handling-notifications)
- [Applicable API Actions](#other-api-actions-amp-payment-handling)
- etc.

### Comparison to Snap Payment
Notable benefits & differences compared to [Snap Payment](/en/snap/overview.md) product:
- Support **more than 7 days link expiry** period. There is no defined maximum expiry period limit.
- Payment Link **can be paid more than once** or any specified limit. Snap Payment link can only be paid once.
- The **created Payment Links are visible and manageable** via Midtrans Dashboard.
- **Automatic email of Payment Link & payment instruction** will be sent to Customer (if merchant specify their email).
- **Link/URL** is customizable. e.g. `https://app.midtrans.com/payment-links/my-product-123`
- The resulting payment Order ID in Midtrans dashboard [will be appended with timestamp suffix.](#order-id-structure)
<!-- @TODO: convert to table like demo slide? -->

### Comparison to Payment Link via Dashboard UI
Notable benefits & differences compared to [Payment Link creation via Midtrans Dashboard](/en/payment-link/overview.md):
- Payment Link creation can be **programmatically automated, via system integration to our API** according to your business needs. Although you will need your development resource to integrate with the API we provide.
- Can be **programmatically integrated to the merchant's system**. Especially the backend system, store CMS, POS, Invoicing system, etc.
- More **suitable for SMB/Enterprise merchant**, that has their own website/system and wants to automate Payment Link creation.

<!-- @TODO: convert to table like demo slide? -->

<!-- 
### Note & Limitation
Notable limitations will be explained below.
-->

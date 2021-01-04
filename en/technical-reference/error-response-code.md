# Error Code And Response Code

<hr>

### Frequently Encountered Error Codes

The table given below explains the reasons and possible solutions for some of the error responses from Midtrans APIs.

| Error Code | Error Message                                                | Reason                                                       | Solution                                                     |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `401`      | "Access denied due to unauthorized transaction, please check client or server key" | Your API request used wrong Authorization, please refer to [Authorization Header](/en/technical-reference/api-header.md) for more details.<br> | Please check your *Server Key* and make sure that you are using appropriate Server Key for the environment. The *Server Key* is different for Sandbox environment and Production environment. Refer to [Retrieving the access keys](/en/midtrans-account/overview?id=retrieving-api-access-keys.md) for more details.<br/>The API URL contains `.sandbox.midtrans.com` for Sandbox environment and `isProduction` variable ,if using language library. |
| `406`      | "order_id has been paid and utilized, please use another order ID" | You are using the same *Order ID* that is currently active or has been paid previously. *Order ID* should be unique for every transaction, and cannot be re-used while it is active or has been paid. | You can call API `/cancel` to re-use the *Order ID* of a transaction with a transaction status:*pending*. <br>Or you can add a suffix (like timestamp) to the *Order ID* to make it unique. For example: `order123-1579080643`, `order123-12012020145221` |
| `503`      | "Bank/partner is experiencing connection issue."             | Temporary issue at bank or the provider side.                | Please retry later.                                          |
| `05`       | "Do not honor"                                               | Card transaction is declined by the Bank. It indicates that the Issuing Bank will not validate the transaction. It is caused by many factors such as mistyping, insufficient funds, etc. | The customer needs to contact the Issuing Bank. Once the problem is solved, customer can complete the transaction. |
| `900`      | "GENERIC_SERVICE_ERROR"                                      | Intermittent service error on provider side.                 | Please retry later.                                          |


For full list of code and response please refer to [Error Code And Response Code](https://api-docs.midtrans.com/#status-code).
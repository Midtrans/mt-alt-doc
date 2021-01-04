# Testing Payment on Sandbox
<hr>

In the Sandbox environment, Midtrans uses web-based simulator to simulate a response from payment provider or bank's system. This helps to test different scenarios that can happen on production, without actually doing real payments.

This is the list of payment credentials that you can use on Midtrans **Sandbox environment**. Please note that, it will not work on Production environment.

Payment category:
- [Card Payment](#card-payments)
- [E-Money](#e-money)
- [Bank Transfer](#bank-transfer)
- [Convenience Store](#convenience-store)
- [Direct Debit](#direct-debit)
- [Cardless Credit](#cardless-credit)

### Card Payments

The table given below lists the details to be entered for simulating credit card transactions.

|Input | Value|
|------|------|
|Expiry Month | `01` (or any month)|
|Expiry Year | `2025` (or any future year)|
|CVV | `123`|
|OTP/3DS | `112233`|
|Card Number | Refer to table given below. |

#### Card Number

<!-- tabs:start -->
#### **General**

|VISA | Description |
|---|---|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 4811 1111 1111 1114 <br> **Denied by Bank Transaction:** 4911 1111 1111 1113|
|Attempted Authentication <br> *Cardholder is not <br> enrolled for 3DS* | **Accept Transaction:** 4411 1111 1111 1118 <br> **Challenge by FDS Transaction:** 4511 1111 1111 1117 <br> **Denied by FDS Transaction:** 4611 1111 1111 1116 <br> **Denied by Bank Transaction:** 4711 1111 1111 1115|

| MASTERCARD | Description|
|-----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 5211 1111 1111 1117 <br> **Denied by Bank Transaction:** 5111 1111 1111 1118|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 5410 1111 1111 1116 <br> **Challenge by FDS Transaction:** 5510 1111 1111 1115 <br> **Denied by FDS Transaction:** 5411 1111 1111 1115 <br> **Denied by Bank Transaction:** 5511 1111 1111 1114|

|JCB | Description|
|----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 3528 2033 2456 4357 <br> **Denied by Bank Transaction:** 3528 5129 4493 2269|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 3528 8680 4786 4225 <br> **Challenge by FDS Transaction:** 3528 6731 1280 9398 <br> **Denied by FDS Transaction:** 3528 1852 6717 1623 <br> **Denied by Bank Transaction:** 3528 9097 7983 7631|

|AMEX | Description|
|----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 3701 9216 9722 458 <br> **Denied by Bank Transaction:** 3742 9635 4400 881|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 3737 4772 6661 940 <br> **Challenge by FDS Transaction:** 3706 6568 4049 309 <br> **Denied by FDS Transaction:** 3780 9621 8340 018 <br> **Denied by Bank Transaction:** 3703 5609 7975 856|

FDS means Fraud Detection System. "Denied by FDS" means to simulate a transaction that is being denied because it is suspected as fraudulent.

> **Note**: Not every acquiring banks might be able to accept JCB and Amex card. You can use BNI & BCA acquiring for JCB. BCA acquiring can accept Amex.

#### **Bank-Specific**

This is useful for Installment/Promo scenario which require bank specific card.

##### Accepted 3D Secure Card

|Bank | Card Number | <span>|
|-----|-------------|-------|
|**Mandiri** <br> *Full Authentication* | <br> 4617 0069 5974 6656\* | <br> 5573 3810 7219 6900|
|*Attempted Authentication* | 4617 0017 4194 2101\* | 5573 3819 9982 5417||
|**Mandiri Debit** <br> *Full Authentication* | <br> 4097 6611 1111 1113\* |
|*Attempted Authentication* | 4097 6611 1111 1139\* ||
|<small>\*Card not available for online installment/promo</small>|
|**CIMB** <br> *Full Authentication* | <br> 4599 2078 8712 2414 | <br> 5481 1698 1883 2479|
|*Attempted Authentication* | 4599 2039 9705 2898 | 5481 1671 2103 2563|
|**BNI** <br> *Full Authentication* | <br> 4105 0586 8948 1467 | <br> 5264 2210 3887 4659|
|*Attempted Authentication* | 4105 0525 4151 2148 | 5264 2249 7176 1016|
|*BNI Private Label* | 1946 4159 8148 7684 ||
|**BCA** <br> *Full Authentication* | <br> 4773 7760 5705 1650 | <br> 5229 9031 3685 3172|
|*Attempted Authentication* | 4773 7738 1098 1190 | 5229 9073 6430 3610|
|**BRI** <br> *Full Authentication* | <br> 4365 0263 3573 7199 | <br> 5520 0298 7089 9100|
|*Attempted Authentication* | 4365 0278 6723 2690 | 5520 0254 8646 8439|
|**MEGA** <br> *Full Authentication* | <br> 4201 9100 0000 0009 | <br> 5221 0300 0000 0009|
|*Attempted Authentication* | 4201 9100 0000 0017 | 5221 0300 0000 0017|
|**Maybank** <br> *Full Authentication* | <br> 4055 7720 2603 6004 | <br> 5520 0867 5210 2334|
|*Attempted Authentication* | 4055 7713 3514 4012 | 5520 0867 7490 8452|

##### Denied Card

|Bank | Card Number | <span>|
|-----|-------------|-------|
|**Mandiri** | 4617 0085 6083 1760 | 5573 3840 4322 4447|
|**Mandiri Debit** | 4097 6676 7217 8631 ||
|**CIMB** | 4599 2060 0973 3090 | 5481 1691 9178 2739|
|**BNI** | 4105 0541 4854 1363 | 5264 2235 3013 1711|
|**BNI Private Label** | 1946 4102 7193 1269 ||
|**BCA** | 4773 7752 0201 1809 | 5229 9034 0542 3830|
|**BRI** | 4365 0286 6251 2583 | 5520 0219 0920 3008|
|**MEGA** | 4201 9100 0000 0025 | 5221 0300 0000 0025|
|**Maybank** | 4055 7796 2846 0474 | 5520 0883 1465 3770|

##### Offline Card 

It is used for testing a specific scenario where the card is not eligible for online transactions, which result in *Deny* transaction status.

| Brand      | Card Number         |
| ---------- | ------------------- |
| VISA       | 4705 8595 1098 4866 |
| MASTERCARD | 5597 5189 2656 1951 |

<!-- tabs:end -->

?> **[General](#card-number)** card number is used for general feature testing of card payment. <br>
**[Bank Specific](#card-number)** card number is useful for testing advanced card features (on-us/off-us installments, whitelist BIN, promo, and so on) that require card from specific bank.

### E-Money

|Payment Methods | Description|
|----------|------------|
|GoPay | On mobile platform you are automatically redirected to GoPay Simulator. <br>On desktop, QR Code image is displayed. To perform a test transaction, enter the QR Code image URL in [QRIS Simulator](https://simulator.sandbox.midtrans.com/qris/index), or [GoPay Simulator](https://simulator.sandbox.midtrans.com/gopay/ui/index). |
|QRIS | To perform a test transaction, copy the QR Code image URL and use it in [QRIS Simulator](https://simulator.sandbox.midtrans.com/qris/index). |
|Indosat Dompetku | **Accept number:** 08123456789 <br>**Deny number:** other than 08123456789 |
|Mandiri E-cash | **Accept number:** 0987654321 <br> **PIN:** 12345 <br> **OTP:** 12123434|

?>***Note***:  On Sandbox, Midtrans uses web-based payment simulator. So, payment that requires app deeplink like GoPay, will use web simulator instead of real app deeplink. To test real app deeplink use cases, please use Midtrans *Production Environment*.

### Bank Transfer

|Payment Methods | Description|
|----------------|------------|
|Permata Virtual Account | Midtrans will generate a dummy Permata Virtual Account Number. To perform a test transaction, use the [Permata Virtual Account Simulator](https://simulator.sandbox.midtrans.com/permata/va/index).|
|BCA Virtual Account | Midtrans will generate a dummy BCA Virtual Account Number. To perform a test transaction, use the [BCA  Virtual Account Simulator](https://simulator.sandbox.midtrans.com/bca/va/index).|
|Mandiri Bill Payment | Midtrans will generate a Payment Code to complete payment via Mandiri e-channel (Internet Banking, SMS Banking, Mandiri ATM). To perform a test transaction, use the [Mandiri Bill Payment Simulator](https://simulator.sandbox.midtrans.com/mandiri/bill/index).|
|BNI Virtual Account | Midtrans will generate a dummy BNI Virtual Account Number. To perform a test transaction, use the [BNI Virtual Account Simulator](https://simulator.sandbox.midtrans.com/bni/va/index).|
|BRI Virtual Account | Midtrans will generate a dummy BRI Virtual Account Number. To perform a test transaction, use the [BRI Virtual Account Simulator](https://simulator.sandbox.midtrans.com/bri/va/index).|

### Convenience Store

| Payment Methods | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| Indomaret       | Midtrans will generate a dummy Indomaret Payment Code. To perform a test transaction, use the [Indomaret Simulator](https://simulator.sandbox.midtrans.com/indomaret/index). |
| Alfamart        | Midtrans will generate a dummy Alfamart Payment Code. To perform a test transaction, use the [Alfamart Simulator](https://simulator.sandbox.midtrans.com/alfamart/index). |
| Kioson          | Midtrans will generate a dummy Kioson Payment Code. To perform a test transaction, use the [Kioson Simulator](https://simulator.sandbox.midtrans.com/kioson/index). |

**Note on Alfamart:** *If you are unable to find out what to input in `Product Code` field, please contact us via support@midtrans.com with subject: `Sandbox Alfamart Product Code` and mention your Merchant ID.*

### Direct Debit

|Payment Methods | Description|
|----------|------------|
|Mandiri Clickpay | **Card Number:** 4111 1111 1111 1111 <br> **Accept Token:** 000000 <br> **Deny Token:** 111111|
|CIMB Clicks | Midtrans will redirect CIMB Clicks test transaction to a payment simulator. <br> **Success Transaction:** testuser00  <br> **Failure Transaction:** testuser01|
|ePay BRI | Midtrans will redirect ePay BRI test transaction to a payment simulator. <br> **Success Transaction:** testuser00 <br> **Failure Transaction:** testuser03|
|BCA Klikpay | Midtrans will redirect BCA Klikpay test transaction to a payment simulator.|
|KlikBCA | Midtrans will register user id filled in KlikBCA input. To perform a test transaction, use the [KlikBca Simulator](https://simulator.sandbox.midtrans.com/bca/klikbca/index).|


?> ***Note on Alfamart:*** *If you are unable to find out what to input in `Product Code` field, please contact us at support@midtrans.com with subject: `Sandbox Alfamart Product Code` and mention your Merchant ID.*


### Cardless Credit 

|Payment Methods | Description|
|----------|------------|
|Akulaku | Midtrans will redirect to Akulaku simulator page.|

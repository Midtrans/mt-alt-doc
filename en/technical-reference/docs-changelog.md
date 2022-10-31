# Docs Changelog
<hr>

<!-- #### Unreleased 
-->
#### 2022/10/31
- update Shopify payment app install guide 
	- to include finish redirect config.
	- to add advanced notes on:
		- payment icons
		- testing order payment fee
		- rare case of Shopify API blocking payment status update

#### 2022/09/13
- add more findings on snap in iframe limitations
- add info on snap multiple order id case
- clarify snap save card ui checkbox
- clarify core api payment type can change from gopay to qris
- improve TLS/HTTPS explanation
- clarify our https recommendation for merchant
- fix grammar on notif best-practice
- highlight recommendation to implement get-status as fallback
- clarify get-status api explanation is just sample
- add info get-status api response will contains refund details

#### 2022/08/24
- tech faq: improve app universal/deep link code snippet & add UOB EzPay prefix

#### 2022/08/16
- add more methods info to match/search Midtrans Order ID on Shopify platform.

#### 2022/08/08
- update Shopify old extension's deprecation date & notice.

#### 2022/08/04
- improve Snap JS callback advanced section by adding link to Snap Docs.
- clarify Shopify partial refund limitations.
- update to 8 digit bins wording & examples.
- clarify save card advanced feature.

#### 2022/07/08
- add further info on Shopify guide: validation error email, payment retry, multiple payment ids, restock limitation. Update images.

#### 2022/07/04
- improve HTTP(s) notification best practice, header, & security aspect

#### 2022/06/23
- remove previous HPSDK version of Shopify integration guide
- add current version of Shopify integration guide & its relevant info

#### 2022/06/10
- add beta Payment Link API reference & overview sections

#### 2022/06/09
- improve frequent false-positive report explanation
- update testing credentials for ShopeePay & Kredivo
- replace some no longer exists external links

#### 2022/04/21
- add custom VA number param support for Mandiri Bill

#### 2022/03/11
- update Sandbox env with new IP adresses, as announced via email previously
- add Snap within iframe limitation

#### 2022/03/01
- update & add more community contributed libraries

#### 2022/01/14
- improve universal/deeplink redirect url FAQ
- add note Snap Preferences only apply to Snap Popup mode
- add faq on available online installment terms on sandbox env
- add note to verify webhook notif authenticity via signature key instead of IP whitelisting
- clarify how to activate CoreAPI on prod env & its default state

#### 2021/12/10
- add faq on how to test offline installment on Sandbox environment

#### 2021/12/06
- add 3DS 2 sandbox test card

#### 2021/11/30
- improve wording & reorder after payment overview
- E-Pay BRI rebrand to BRImo

#### 2021/11/11
- add link & details on CMS demo store

#### 2021/11/04
- add new json field on callback & http notification of card payment 3DS 2
- add faq on how to prepare 3DS 2
- add tips on running example code repo easily via Gitpod
- faq on ShopeePay finish-redirect don't have any appended params
- faq on download-report/reset-password email not received

#### 2021/10/29
- improve wording, description and sample on:
	- Core API bank transfer - Mandiri Bill
	- Core API emoney
- faq on idempotency-key usage scenario on API request

#### 2021/10/19
- improve description and wording on:
	- Snap overview desc
	- Sandbox credentials notice
	- 3DS failure FAQs
	- Custom VA on Permata VA limitation & notes
	- Custom notification url API request headers

#### 2021/09/24
- add emphasis on importance of verifying & handling payment status update
- add link to verify payment status on security page
- add note of 3DS 2 Snap redirect behaviour
- improve snap integration guide section for better snap redirect method visibility
- improve snap integration guide html sample: add sample w/ js callback, improve code readability
- note on FDS deny: will not result in success transaction
- add gopay universal link to deeplink url webview handling sample code faq
- add iris overview section
- add iris account & dashboard usage section

#### 2021/09/17
- update 'pending' notif definition to include 3DS 2 card payment note
- ensure consistency of transaction & fraud status table between different technical reference pages
- ensure each page use h2 instead of h3 as section heading
- right sidebar UI improvement: better visual structure & less crowded feel
- left sidebar UI improvement: remove sub-sidebar nav links, in favor of right sidebar
- faq: add note to handle payment deeplink url on webview topics
- add section about Snap via webview in snap guide
- add link to snap webview section & its demo on relevant pages
- add note of 3DS 2 callback behaviour on snap js callback section
- add link and visibility of GoPay Recurring

#### 2021/09/10
- faq: about granular reason of payment failure on frontend e-money app
- add note of 3DS 2 js callback behaviour on card payment integration guide
- update fragment link to Core API docs according to new urls
- update drupal guide according to latest module, now also support Drupal 9

#### 2021/09/03
- add emphasis to handle API params securely via backend on integration guides
- faq: possibility to use Midtrans WC plugin for other WP based ecommerce CMS plugin
- faq: customer redirected to app store instead directly to e-money app

#### 2021/08/31
- faq: update WC order id duplicate faq with better solution via updating plugin
- add note on shopify 1 order id can sometimes result in many payment id
- add note on shopify UX refund flow limitations
- auto scroll on load will now works for fragment link within collapsed details

#### 2021/08/26
- faq: improve wording on separate installment/promo button
- add note that BCA klikpay is not available for Shopify
- improve CMS payment plugin description
- add section on CMS plugin feedback/feature-request & link to the gform
- fix some migrated links

#### 2021/08/19
- faq: WooCommerce Akulaku payment fail due to duplicated item_id
- faq: customer want to know card payment 3DS verification method
- faq: GoPay acceptance rate drop during promo period
- improve wording on notification url should be public url
- WooCommerce guide: improve notif url config examples
- add note that 3rd party unofficial plugins may exists and is acknowledged
- improve GoPay testing simulator link to prevent mistake of which simulator to use
- limitation note on Snap unable to get direct Gopay deeplink and QRIS url

#### 2021/08/06
- faq: ewallet deeplink encoding potential issue
- update woocommerce guide to v2.30
- advanced note on http notification engine TLS version support
- add WooCommerce Advanced: Customize WooCommerce Order Status upon Payment Paid

#### 2021/07/14
- explain snap advanced scenario: credit card expire notification
- update sample snap advanced scenario: credit card offline installment

#### 2021/07/09
- explain snap advanced scenario: re-pay and re-create token
- improve snap.js main function explanation
- add sample demo core api link
- add qris wording to shopify gopay & shopeepay separated button
- add link to 3rd party platform in plugin & library page
- update some links

#### 2021/06/30
- clarify BCA KlikPay specific requirements
- fix typo on Core API bank transfer code sample
- update snap demo API request
- fix some broken numbering format

#### 2021/06/25
- update all payment type notification sample and definition table
- update POS integration guide, to use newer QRIS payment type

#### 2021/06/16
- clarify custom va limitation, especially Permata
- add note on mTLS on security
- improve visibility on certificate pinning consideration
- update gopay payment type notification sample
- update golang library link to new version
- further explains what kind of data flow need to be verified, notification page

#### 2021/06/11
- faq: add woocommerce frontend popup payment page issue
- faq: add woocommerce duplicate order id issue
- add `window` js object prefix when calling snap js
- further explain what is sandbox env on simulator page
- add warning to not pay sandbox transaction with real payment
- add authorize status description
- improve wording in transaction status definition
- explain recommendation including start_time on snap expiry and the consequence

#### 2021/04/14
- improve save card related feature structure & description
- clarify snap token lifetime
- clarify risk of whitelist by CF IP range
- clarify shopify oversell issue prevention mechanism
- clarify shopify transaction expiry time for async payment methods
- clarify gopay unknown url scheme issue faq
- update java lib repo, version, & sample usage
- improve reversal-status section details & wording
- add faq: can recurring MID used for non3DS txn
- add iOS demo app sample on Payment Overview
- describe about shopify manual order status change
- update how to import js lib on reactJS w/ latest method & add sample

#### 2021/03/19
- enhance quote, tip, warn UI element
- clarify bank json response attribute is acquiring bank
- add settlement reversal explanation

#### 2021/03/17
- clarify shopify advanced section, add info about order timeline
- payment link add next step for tech and non tech user
- clarify MAP sandbox & production env basic difference
- clarify API param order id can be replaced with transaction id, to avoid breaking api url valid pattern
- optimize right sidebar nav link scrolling performance & feel

#### 2021/03/10
- improve recurring advanced feature
- enhance table, inline code, tabs dark UI element
- fix minor formatting and links

#### 2021/03/01
- overall improve, simplify, clarify on integration guides
- improve frequently encountered error codes

#### 2021/02/25
- improve Snap Redirect explanation
- improve Snap advanced feature wording
- improve going live section
- simplify http header tables to code snippet and standardize
- fix non-standard and invalid links
- improve how to troubleshoot notification failures

#### 2021/02/15
- enhance content search indexing for CMS plugins
- enhance tabs UI element
- update feedback gform url
- fix minor bug on search clear button doesn't unhide sidebar nav links
- update sidebar-collapse dependency: fix minor search result click break sidebar issue

#### 2021/02/11
- add community contributed TypeScript library
- fix external navbar links fails to open
- enhance performance
	- fix duplicated scroll listener on each route load
	- remove heavy transition of main content on sidebar open-close, on mobile
	- remove unused css
	- remove unused js
- partial update dependencies
- replace revamped navbar with more performant and less complicated mobile-desktop implementation 
- enhance dark mode toggle to be more compact and intuitive
- enhance dark mode text selection & search highlight color
- move search bar back to sidebar, limit height for better visibility

#### 2021/02/05
- merge tech faq into tech docs
- adjust sidebar font-size & style
- restructure tech faq
- minor enhance search index & input ui
- fix sitemap duplicate entries

#### 2021/02/04
- overall UI rebrand
- homepage restructure
- add product illustrations
- search enhancement
- adjust font-size
- enhance sidebar
- enhance Snap interactive demo section

#### 2021/01/04
- copy writing improvement on Snap plugins, interactive demo, & payment link
- fix echannel Core API sample json

#### 2020/12/22
- copy writing improvement on Core API bank transfer, e-money, overview
- copy writing improvement on Snap advanced feature, guide, overview
- improve content on e-money

#### 2020/11/14
- update midtrans logo with latest branding
- enhance midtrans logo's link to docs' homepage

#### 2020/11/12
- fix section link and clarify FDS on test card creds
- copy writing improvement on Snap Overview, preparation, interactive-demo
- UI font and transition adjustment

#### 2020/10/26
- clarify fraud_status field may not always exist
- minor formatting fix

#### 2020/10/19 
- general copy writing & explanation improvements

#### 2020/10/13
- adjustment on Snap built-in demo button

#### 2020/10/08 
- general copy writing & explanation improvements
- some minor formatting & internal ref link fix

#### 2020/10/05 
- add shopeepay separated gateway on Shopify guide
- update Shopify separated gateway image preview

#### 2020/09/28 
- general copy writing & explanation improvements
- add docs changelog page

#### 2020/09/17 
- update notification endpoint opencart to include each version

#### 2020/09/16 
- add Snap CSP whitelist resource

#### 2020/09/08 
- add how to handle http notification not sent

#### 2020/09/04 
- add bri va as new payment method

#### 2020/08/27 
- add shopify briva separated payment method

#### 2020/08/18 
- fix target link of sample code repos

#### 2020/08/13 
- add note how to get sbox alfamart code test creds
- fix missing link target due to restructure

#### 2020/08/12 
- add page about basic steps to go live
- add info on default token expiry for cc & snap
- cc core api clarify with more sample response

#### 2020/08/11 
- overall improvement & seo optimization

#### 2020/08/07 
- update wc plu menu
- clarify status cycle on Snap API upon get-status

#### 2020/07/27 
- fix accidental publish of not-working demo

#### 2020/07/22 
- highlight important keyword on ip reference

#### 2020/07/20 
- add mobile & iris docs link on tech ref overview page

#### 2020/07/17 
- add symbol indication to sidebar links that open external url
- fix wording to match improved snap codesandbox demo
- remove all manual unicode symbols of link indication
- rearrange mobile sdk & fix sidebar link
- add mobile & iris docs link as sidebar ext link
- rephrase & reword according to feedback

#### 2020/07/14 
- restructure snap preparation to use card link
- restructure & rephrase snap interactive demo
- minor improvement on wording & structure
- add note on shopify paid & trial plan
- improve structure and add subtitle details to snap overview
- declutter by moving configure redirect-url from snap prep to advanced feature
- add subtitle on next step in snap & account sections
- smaller back-home & add tech ref on payments sidebar
- add preparation step on plugins, snap guide & snap demo
- improve wording on plugins, library, platform
- clarify IP address section by adding API domain wording
- add overview page for technical reference

#### 2020/07/13 
- improve payment overview descriptions
- reposition cms & platform integration optionfor better discoverability
- move out cms & platform from snap sidebar to its own grouping

#### 2020/07/09 
- remove missing id from payment overview sidebar link
- fill in basic payment overview page

#### 2020/07/08 
- remove specific id on snap guide link
- clarify param on snap installment feature
- improve details & notes on snap guide
- sync add sdk simulator to ID home
- add small product label on sidebar

#### 2020/07/02 
- fix broken advanced feature links core api section

#### 2020/06/30 
- add note on card `authentication` param
- add how to view notification history to handle failed notif
- payments sidebar improvement

#### 2020/06/26 
- replace http notif url in shopify advanced section with https

#### 2020/06/15 
- improve wording

#### 2020/06/12 
- add shopify stock & status notes

#### 2020/06/10 
- add dedicated qris sim url list
- add notice and link for magento 1
- add qris simulator url

#### 2020/06/08 
- add magento marketplace link, wordpress edd and fix line break
- add note on Shopify cancel order

#### 2020/06/05 
- update shopify url to use https

#### 2020/06/04 
- add missing lib links

#### 2020/06/02 
- add more advanced shopify docs

#### 2020/05/20 
- clarify shopify will use Snap redirect

#### 2020/05/18 
- add shopify specific payment: installment

#### 2020/05/05 
- pretify shopify guide spacing
- replace main shopify notif url with pixelv2
- add shopify specific payment methods guide

#### 2020/04/01 
- add Iris Postman Collection, and improve the section wording

#### 2020/03/27 
- midtransJs card register function on coreapi

#### 2020/03/17 
- fix invalid sample payload snap installment

#### 2020/03/12 
- fix typo & unnecessary clutter
- more visible link to testing credentials page for each coreapi guide
- add max API request size to snap and core

#### 2020/03/10 
- remove trailing `.` behind notif url guide, to prevent confusion

#### 2020/01/02 
- add snap adv feature completing the rest

#### 2019/12/31 
- add snap adv feature General & Card section


## Security in Midtrans

##### *Security is the top priority at Midtrans. Midtrans monitors both internal and external factors to ensure that your payments are secure.*
------------------

### Midtrans Security

- **PCI DSS**<br>
  PCI-DSS (Payment Card Industry Data Security Standard) is a certificate or license issued by the PCI Security Standards Council to maintain the security of all transaction activities through Midtrans payment systems. Midtrans has implemented all security standards, set by the PCI Standard Council, on network and payment systems to minimize any security risk that could interfere with transaction processes in our system.
  Midtrans has been audited by the QSA (Qualified Security Assessor) certified by PCI Council. Midtrans is PCI compliant with [PCI Service Provider Level 1](http://www.visa.com/splisting/searchGrsp.do?companyNameCriteria=midtrans) certification, which is the most stringent level of certification currently available in the payments industry.

- **ISO 27001**<br>
  ISO27001 (or commonly known as ISO / IEC 27001) is a certificate or license issued by the Internal Standards Organization (ISO) which regulates security management information system. 
  We have implemented the ISO27001 standard on our system and network to maintain the security of our information.

- **AES 256**<br>
  AES (Advanced Encryption Standard) is an encryption standard that was issued by the National Institute of Standards and Technology (NIST). It is generally used to maintain the confidentiality of data. 
  At Midtrans, we use AES-256 as a standard of encryption of all transaction data that goes in and out of our system.

- **Fraud Detection System**<br>At Midtrans, we analyze, process, and manage each transaction in detail with our machine learning tool. After these steps, the behavior patterns are analyzed using details such as payment location, email detail, time, and so on.

  Source: [https://midtrans.com/security](https://midtrans.com/security)

### HTTPS for Secure Connections

We force HTTPS for all services using TLS (SSL), including our public website and Merchant Administration Portal. 
`midtrans.min.js` and `snap.js` are hosted on our Production server, are served only over HTTPS. We suggest merchants not to host these files on their servers. 

Please make sure your system are able to communicate with Midtrans securely by referring to [this article about SSL/TLS](https://blog.midtrans.com/time-to-upgrade-to-tls-version-1-2/).

### Card Data Secure Transmission

By following above points, all the data transmission coming from customer device to Midtrans is encrypted over the network layer via SSL/HTTPS. That means data transmission is end-to-end encrypted (customer-to-Midtrans), and secure from any third-party. Only Customer and Midtrans side can see the real value of data being transmitted, unless a third-party has direct control over the user’s device (which means already compromised anyway) or is able to decrypt SSL/HTTPS.

In order to ensure the customer-to-Midtrans encryption are properly implemented, merchants are required to use official Midtrans provided JavaScript library (midtrans.min.js, snap.js, or Mobile SDK) for card transactions. Merchants are strictly prohibited to record card credentials to their own system, unless PCI DSS certified. 

Some auditors may falsely report to see credentials transmitted in plain text. This is possible when the audit is done on the customer device itself, in which case, the data is expected to be visible from the customer device. Auditor should try to check from non-customer device such as network layer (as third-party between Midtrans and customer), to see the data being encrypted from third party.

Additionally HTTPs GET method encrypts any GET query / request credentials (via TLS/HTTPS). It may expose the destination web domain to proxy, but **will not** expose any parameter.

### Sensitive Data Encryption

Security is a priority at Midtrans and all transactions processed by our system are always securely encrypted. Midtrans never store any sensitive information in the system and all transactions are transmitted and processed via secured networks.

All encryption and security procedures follow the PCI-DSS standards to ensure highest security protection.

### Vulnerability Disclosure

Midtrans is always open to inputs or suggestions related our security processes. If you believe you have found a bug in Midtrans, please contact `security@midtrans.com` or `support@midtrans.com` and we will respond as soon as possible. We thank you for your cooperation in not disclosing these issues publicly.

### Keep Your Server Key Secured

The *Server Key* you obtained from your Midtrans account is strictly informed only to you as a Merchant. The *Server Key* should be kept secret. To learn more about how to secure your *Server Key*, please refer to [this article](https://blog.midtrans.com/bagaimana-cara-menyimpan-server-key-dengan-aman/).

### Others
With the various Security protections provided above,

Implementing SSL certificate pinning on your end is not recommended. If you want to implement SSL certificate pinning, please make sure to [understand the considerations explained in this article.](/en/other/faq/technical.md#what-should-be-considered-when-merchant-want-to-do-ssl-certificate-pinning)

In most cases Mutual (2-way) TLS Authentication (mTLS) should not be needed, and is not recommended due to maintenance complexity. In case you really need to proceed with implementing it, please consult with your Midtrans Business PIC first. 
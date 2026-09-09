# Secure File Encryption & Transfer — AES-256

## Overview

This hands-on cybersecurity lab demonstrates how sensitive data can be protected through encryption, secure key transfer, and least-privilege access controls.

The lab used two Windows systems to simulate securely encrypting a sensitive financial report, transferring the encryption key, restricting access to that key, sending the encrypted file, and successfully decrypting it on the receiving system.

## Security Objective

The objective was to protect sensitive financial information from unauthorized disclosure while maintaining a secure method for transferring and managing the encryption key.

The implementation focused on:

- Data confidentiality
- Secure key management
- Least-privilege access
- Secure file transfer
- Encryption and decryption verification

## Environment & Tools

- Windows
- PowerShell
- OpenSSL
- AES-256-CBC
- SSH / SCP
- Thunderbird

## Implementation

### 1. AES-256 Key Generation

Generated an encryption key named `finance.key` using OpenSSL on the source Windows system.

This key was used to encrypt and later decrypt the sensitive financial report.

### 2. Secure Key Transfer

Transferred `finance.key` from the source system to the destination system using SCP over SSH.

Using SCP provided an encrypted channel for transferring the cryptographic key between hosts.

### 3. Least-Privilege Access Control

Configured permissions on the destination system so the intended user had read-only access to `finance.key`.

This demonstrated the principle of least privilege by limiting access to only what was required to complete the decryption process.

### 4. File Encryption

Encrypted `financialReport.xlsx` using AES-256-CBC with OpenSSL.

The resulting encrypted file was:

`financialReport.xlsx.enc`

The original contents could no longer be read without the appropriate encryption key.

### 5. Encrypted File Transfer

Sent the encrypted financial report to the intended recipient using Thunderbird.

Because the file had already been encrypted, the underlying financial data remained protected during transmission.

### 6. File Decryption

Used `finance.key` on the destination Windows system to decrypt the encrypted report.

Successful decryption verified that the correct key could restore the protected file for the authorized recipient.

## Security Concepts Demonstrated

### Symmetric Encryption
AES-256 was used to protect sensitive data using a shared cryptographic key.

### Key Management
The encryption key was generated separately and transferred through a secure channel.

### Least Privilege
Access to the encryption key was restricted to the permissions required by the intended user.

### Secure File Transfer
SCP and SSH were used to securely transfer the encryption key between Windows systems.

### Defense in Depth
The workflow combined encryption, secure transport, and access controls rather than relying on a single security mechanism.

## Evidence

The repository contains screenshots documenting the major stages of the lab:

- AES-256 key generation
- Secure SCP key transfer
- Key permission configuration
- Financial report encryption
- Encrypted file transmission
- Successful file decryption

## Skills Demonstrated

- AES-256 symmetric encryption
- OpenSSL
- PowerShell
- SSH / SCP
- Secure key management
- Windows file permissions
- Least-privilege access control
- Secure data handling
- Encryption and decryption workflows

## Key Takeaway

This lab demonstrated that protecting sensitive information requires more than encrypting a file. The encryption key must also be securely generated, transferred, stored, and restricted to authorized users.

Combining strong encryption with secure key transfer and least-privilege access provides multiple layers of protection for sensitive data.

## Author

**Stanley Escobar**  
B.S. Cybersecurity and Information Assurance  
Western Governors University

[GitHub](https://github.com/StanleyEscobar99) | [LinkedIn](https://www.linkedin.com/in/stanley-escobar21/)

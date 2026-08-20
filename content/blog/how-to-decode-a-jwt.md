---
title: "How to Decode a JWT (and What Decoding Doesn't Prove)"
description: "Understand the three parts of a JSON Web Token, how to decode them, and why decoding a token is not the same as verifying it."
date: "2025-01-17"
author: "CreatorDevTools Team"
---

JSON Web Tokens (JWTs) are a compact way to represent claims — like "this user is logged in as Ada" — that can be passed between a server and a client. They're widely used for authentication in modern web apps.

## The three parts of a JWT

A JWT is three Base64URL-encoded segments joined by dots:

```
header.payload.signature
```

**The header** typically identifies the signing algorithm and token type, for example `{"alg": "HS256", "typ": "JWT"}`.

**The payload** contains the actual claims — arbitrary data like a user ID, an expiration time (`exp`), or custom fields your application defines.

**The signature** is created by combining the header and payload with a secret key (or private key) and a signing algorithm. It's what allows a server to confirm the token hasn't been tampered with.

## Decoding vs. verifying

This distinction matters: the header and payload are only Base64URL-*encoded*, not encrypted. Anyone can decode them without knowing any secret — that's by design, since a JWT's claims are often meant to be readable by the client. Decoding just reverses the encoding to reveal the JSON underneath.

Verifying is a separate step. It means recomputing the signature using the secret key and confirming it matches the signature in the token. Only someone who holds the correct key can verify (or produce) a valid signature. This is why you should never treat "I can read this token" as "this token is authentic" — decoding proves nothing about trust; only verification does.

## When you'd want to decode a JWT

Common reasons include debugging why a token seems malformed, inspecting what claims your authentication provider is issuing, or checking an expiration timestamp during development.

## Decoding safely

Because a JWT's payload can include personal or sensitive data, avoid pasting production tokens into random online tools. Our [JWT Decoder](/tools/jwt-decoder) decodes entirely in your browser — your token is never sent to a server — and only decodes the header and payload. It explicitly does not verify signatures, so use it for inspection during development, not as proof that a token is valid.

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageContent</a></code>
- <code><a href="./src/resources/messages.ts">MessageResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageRetrieveResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageListResponse</a></code>

Methods:

- <code title="get /api/v2/messages/{message_id}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(messageID) -> MessageRetrieveResponse</code>
- <code title="get /api/v2/messages">client.messages.<a href="./src/resources/messages.ts">list</a>({ ...params }) -> MessageListResponse</code>
- <code title="get /api/status">client.messages.<a href="./src/resources/messages.ts">getStatus</a>({ ...params }) -> MessageResponse</code>
- <code title="post /api/send-message">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageResponse</code>
- <code title="post /api/messages/{message_handle}/update-app-card">client.messages.<a href="./src/resources/messages.ts">updateAppCard</a>(messageHandle, { ...params }) -> MessageResponse</code>

# Groups

Types:

- <code><a href="./src/resources/groups.ts">GroupModifyResponse</a></code>

Methods:

- <code title="post /api/modify-group">client.groups.<a href="./src/resources/groups.ts">modify</a>({ ...params }) -> GroupModifyResponse</code>
- <code title="post /api/send-group-message">client.groups.<a href="./src/resources/groups.ts">sendMessage</a>({ ...params }) -> MessageResponse</code>

# MediaObjects

Types:

- <code><a href="./src/resources/media-objects.ts">MediaObjectUploadResponse</a></code>

Methods:

- <code title="post /api/upload-media-object">client.mediaObjects.<a href="./src/resources/media-objects.ts">upload</a>({ ...params }) -> MediaObjectUploadResponse</code>

# Lookups

Types:

- <code><a href="./src/resources/lookups.ts">LookupLookupNumberResponse</a></code>

Methods:

- <code title="get /api/evaluate-service">client.lookups.<a href="./src/resources/lookups.ts">lookupNumber</a>({ ...params }) -> LookupLookupNumberResponse</code>

# TypingIndicators

Types:

- <code><a href="./src/resources/typing-indicators.ts">TypingIndicatorSendResponse</a></code>

Methods:

- <code title="post /api/send-typing-indicator">client.typingIndicators.<a href="./src/resources/typing-indicators.ts">send</a>({ ...params }) -> TypingIndicatorSendResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts/contacts.ts">Contact</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactCreateResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactRetrieveResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactUpdateResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactListResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactDeleteResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactCountResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactOptOutResponse</a></code>
- <code><a href="./src/resources/contacts/contacts.ts">ContactVerifyResponse</a></code>

Methods:

- <code title="post /api/v2/contacts">client.contacts.<a href="./src/resources/contacts/contacts.ts">create</a>({ ...params }) -> ContactCreateResponse</code>
- <code title="get /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">retrieve</a>(phoneNumber) -> ContactRetrieveResponse</code>
- <code title="put /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">update</a>(phoneNumber, { ...params }) -> ContactUpdateResponse</code>
- <code title="get /api/v2/contacts">client.contacts.<a href="./src/resources/contacts/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">delete</a>(phoneNumber) -> ContactDeleteResponse</code>
- <code title="get /api/v2/contacts/count">client.contacts.<a href="./src/resources/contacts/contacts.ts">count</a>() -> ContactCountResponse</code>
- <code title="post /api/v2/contacts/opt-out">client.contacts.<a href="./src/resources/contacts/contacts.ts">optOut</a>({ ...params }) -> ContactOptOutResponse</code>
- <code title="post /api/v2/contacts/verify">client.contacts.<a href="./src/resources/contacts/contacts.ts">verify</a>({ ...params }) -> ContactVerifyResponse</code>

## Bulk

Types:

- <code><a href="./src/resources/contacts/bulk.ts">BulkCreateResponse</a></code>
- <code><a href="./src/resources/contacts/bulk.ts">BulkDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/contacts/bulk">client.contacts.bulk.<a href="./src/resources/contacts/bulk.ts">create</a>({ ...params }) -> BulkCreateResponse</code>
- <code title="delete /api/v2/contacts">client.contacts.bulk.<a href="./src/resources/contacts/bulk.ts">delete</a>({ ...params }) -> BulkDeleteResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookConfiguration</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /api/account/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="put /api/account/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>({ ...params }) -> WebhookUpdateResponse</code>
- <code title="get /api/account/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /api/account/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>({ ...params }) -> WebhookDeleteResponse</code>

# SendCarousel

Types:

- <code><a href="./src/resources/send-carousel.ts">SendCarouselSendResponse</a></code>

Methods:

- <code title="post /api/send-carousel">client.sendCarousel.<a href="./src/resources/send-carousel.ts">send</a>({ ...params }) -> SendCarouselSendResponse</code>

# V2

## Totp

Types:

- <code><a href="./src/resources/v2/totp/totp.ts">TotpGetCodeResponse</a></code>

Methods:

- <code title="get /api/v2/totp/code/{secret_id}">client.v2.totp.<a href="./src/resources/v2/totp/totp.ts">getCode</a>(secretID) -> TotpGetCodeResponse</code>

### Secrets

Types:

- <code><a href="./src/resources/v2/totp/secrets.ts">SecretCreateResponse</a></code>
- <code><a href="./src/resources/v2/totp/secrets.ts">SecretListResponse</a></code>
- <code><a href="./src/resources/v2/totp/secrets.ts">SecretDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/totp/secrets">client.v2.totp.secrets.<a href="./src/resources/v2/totp/secrets.ts">create</a>({ ...params }) -> SecretCreateResponse</code>
- <code title="get /api/v2/totp/secrets">client.v2.totp.secrets.<a href="./src/resources/v2/totp/secrets.ts">list</a>() -> SecretListResponse</code>
- <code title="delete /api/v2/totp/secrets/{secret_id}">client.v2.totp.secrets.<a href="./src/resources/v2/totp/secrets.ts">delete</a>(secretID) -> SecretDeleteResponse</code>

## Seats

Types:

- <code><a href="./src/resources/v2/seats.ts">SeatRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/seats.ts">SeatListResponse</a></code>
- <code><a href="./src/resources/v2/seats.ts">SeatCountResponse</a></code>

Methods:

- <code title="get /api/v2/seats/{seat_id}">client.v2.seats.<a href="./src/resources/v2/seats.ts">retrieve</a>(seatID) -> SeatRetrieveResponse</code>
- <code title="get /api/v2/seats">client.v2.seats.<a href="./src/resources/v2/seats.ts">list</a>({ ...params }) -> SeatListResponse</code>
- <code title="get /api/v2/seats/count">client.v2.seats.<a href="./src/resources/v2/seats.ts">count</a>({ ...params }) -> SeatCountResponse</code>

## Groups

Types:

- <code><a href="./src/resources/v2/groups.ts">GroupRetrieveResponse</a></code>

Methods:

- <code title="get /api/v2/groups/{group_id}">client.v2.groups.<a href="./src/resources/v2/groups.ts">retrieve</a>(groupID) -> GroupRetrieveResponse</code>

# Lines

## CallForwarding

Types:

- <code><a href="./src/resources/lines/call-forwarding.ts">CallForwardingRetrieveResponse</a></code>
- <code><a href="./src/resources/lines/call-forwarding.ts">CallForwardingUpdateResponse</a></code>
- <code><a href="./src/resources/lines/call-forwarding.ts">CallForwardingDeleteResponse</a></code>

Methods:

- <code title="get /api/lines/{sendblue_number}/call-forwarding">client.lines.callForwarding.<a href="./src/resources/lines/call-forwarding.ts">retrieve</a>(sendblueNumber) -> CallForwardingRetrieveResponse</code>
- <code title="put /api/lines/{sendblue_number}/call-forwarding">client.lines.callForwarding.<a href="./src/resources/lines/call-forwarding.ts">update</a>(sendblueNumber, { ...params }) -> CallForwardingUpdateResponse</code>
- <code title="delete /api/lines/{sendblue_number}/call-forwarding">client.lines.callForwarding.<a href="./src/resources/lines/call-forwarding.ts">delete</a>(sendblueNumber) -> CallForwardingDeleteResponse</code>

# RequestLocation

Types:

- <code><a href="./src/resources/request-location.ts">RequestLocationCreateResponse</a></code>

Methods:

- <code title="post /api/request-location">client.requestLocation.<a href="./src/resources/request-location.ts">create</a>({ ...params }) -> RequestLocationCreateResponse</code>

# Location

Types:

- <code><a href="./src/resources/location.ts">LocationRetrieveResponse</a></code>
- <code><a href="./src/resources/location.ts">LocationListResponse</a></code>
- <code><a href="./src/resources/location.ts">LocationWatchResponse</a></code>

Methods:

- <code title="get /api/location/{number}">client.location.<a href="./src/resources/location.ts">retrieve</a>(number, { ...params }) -> LocationRetrieveResponse</code>
- <code title="get /api/location">client.location.<a href="./src/resources/location.ts">list</a>({ ...params }) -> LocationListResponse</code>
- <code title="get /api/location/{number}/watch">client.location.<a href="./src/resources/location.ts">watch</a>(number, { ...params }) -> LocationWatchResponse</code>

# VerifiedContacts

Types:

- <code><a href="./src/resources/verified-contacts.ts">VerifiedContactCreateResponse</a></code>
- <code><a href="./src/resources/verified-contacts.ts">VerifiedContactRetrieveResponse</a></code>
- <code><a href="./src/resources/verified-contacts.ts">VerifiedContactListResponse</a></code>

Methods:

- <code title="post /v3/verified-contacts">client.verifiedContacts.<a href="./src/resources/verified-contacts.ts">create</a>({ ...params }) -> VerifiedContactCreateResponse</code>
- <code title="get /v3/verified-contacts/{phone_number}">client.verifiedContacts.<a href="./src/resources/verified-contacts.ts">retrieve</a>(phoneNumber) -> VerifiedContactRetrieveResponse</code>
- <code title="get /v3/verified-contacts">client.verifiedContacts.<a href="./src/resources/verified-contacts.ts">list</a>() -> VerifiedContactListResponse</code>

# Auth

## Tokens

Types:

- <code><a href="./src/resources/auth/tokens.ts">TokenCreateResponse</a></code>

Methods:

- <code title="post /v3/auth/tokens">client.auth.tokens.<a href="./src/resources/auth/tokens.ts">create</a>({ ...params }) -> TokenCreateResponse</code>
- <code title="delete /v3/auth/tokens/{token_id}">client.auth.tokens.<a href="./src/resources/auth/tokens.ts">revoke</a>(tokenID) -> void</code>

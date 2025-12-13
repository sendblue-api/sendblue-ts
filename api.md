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
- <code><a href="./src/resources/contacts/contacts.ts">ContactVerifyResponse</a></code>

Methods:

- <code title="post /api/v2/contacts">client.contacts.<a href="./src/resources/contacts/contacts.ts">create</a>({ ...params }) -> ContactCreateResponse</code>
- <code title="get /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">retrieve</a>(phoneNumber) -> ContactRetrieveResponse</code>
- <code title="put /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">update</a>(phoneNumber, { ...params }) -> ContactUpdateResponse</code>
- <code title="get /api/v2/contacts">client.contacts.<a href="./src/resources/contacts/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /api/v2/contacts/{phone_number}">client.contacts.<a href="./src/resources/contacts/contacts.ts">delete</a>(phoneNumber) -> ContactDeleteResponse</code>
- <code title="get /api/v2/contacts/count">client.contacts.<a href="./src/resources/contacts/contacts.ts">count</a>() -> ContactCountResponse</code>
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

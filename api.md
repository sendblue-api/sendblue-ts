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

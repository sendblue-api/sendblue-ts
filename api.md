# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageContent</a></code>
- <code><a href="./src/resources/messages.ts">MessageResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageRetrieveResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageListResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageDeleteResponse</a></code>

Methods:

- <code title="get /api/message/{message_handle}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(messageHandle) -> MessageRetrieveResponse</code>
- <code title="get /api/message">client.messages.<a href="./src/resources/messages.ts">list</a>({ ...params }) -> MessageListResponse</code>
- <code title="delete /api/message/{message_handle}">client.messages.<a href="./src/resources/messages.ts">delete</a>(messageHandle) -> MessageDeleteResponse</code>
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

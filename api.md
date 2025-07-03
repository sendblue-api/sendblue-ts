# SendMessage

Types:

- <code><a href="./src/resources/send-message.ts">MessageResponse</a></code>

Methods:

- <code title="post /api/send-message">client.sendMessage.<a href="./src/resources/send-message.ts">send</a>({ ...params }) -> MessageResponse</code>

# SendGroupMessage

Methods:

- <code title="post /api/send-group-message">client.sendGroupMessage.<a href="./src/resources/send-group-message.ts">send</a>({ ...params }) -> MessageResponse</code>

# ModifyGroup

Types:

- <code><a href="./src/resources/modify-group.ts">ModifyGroupCreateResponse</a></code>

Methods:

- <code title="post /api/modify-group">client.modifyGroup.<a href="./src/resources/modify-group.ts">create</a>({ ...params }) -> ModifyGroupCreateResponse</code>

# UploadMediaObject

Types:

- <code><a href="./src/resources/upload-media-object.ts">UploadMediaObjectCreateResponse</a></code>

Methods:

- <code title="post /api/upload-media-object">client.uploadMediaObject.<a href="./src/resources/upload-media-object.ts">create</a>({ ...params }) -> UploadMediaObjectCreateResponse</code>

# Message

Types:

- <code><a href="./src/resources/message.ts">MessageContent</a></code>
- <code><a href="./src/resources/message.ts">MessageRetrieveResponse</a></code>
- <code><a href="./src/resources/message.ts">MessageListResponse</a></code>
- <code><a href="./src/resources/message.ts">MessageDeleteResponse</a></code>

Methods:

- <code title="get /api/message/{message_handle}">client.message.<a href="./src/resources/message.ts">retrieve</a>(messageHandle) -> MessageRetrieveResponse</code>
- <code title="get /api/message">client.message.<a href="./src/resources/message.ts">list</a>({ ...params }) -> MessageListResponse</code>
- <code title="delete /api/message/{message_handle}">client.message.<a href="./src/resources/message.ts">delete</a>(messageHandle) -> MessageDeleteResponse</code>

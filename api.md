# Shared

Types:

- <code><a href="./src/resources/shared.ts">Order</a></code>

# Pet

Types:

- <code><a href="./src/resources/pet.ts">Category</a></code>
- <code><a href="./src/resources/pet.ts">Pet</a></code>
- <code><a href="./src/resources/pet.ts">PetFindByStatusResponse</a></code>
- <code><a href="./src/resources/pet.ts">PetFindByTagsResponse</a></code>
- <code><a href="./src/resources/pet.ts">PetUploadImageResponse</a></code>

Methods:

- <code title="post /pet">client.pet.<a href="./src/resources/pet.ts">create</a>({ ...params }) -> Pet</code>
- <code title="get /pet/{petId}">client.pet.<a href="./src/resources/pet.ts">retrieve</a>(petID) -> Pet</code>
- <code title="put /pet">client.pet.<a href="./src/resources/pet.ts">update</a>({ ...params }) -> Pet</code>
- <code title="delete /pet/{petId}">client.pet.<a href="./src/resources/pet.ts">delete</a>(petID) -> void</code>
- <code title="get /pet/findByStatus">client.pet.<a href="./src/resources/pet.ts">findByStatus</a>({ ...params }) -> PetFindByStatusResponse</code>
- <code title="get /pet/findByTags">client.pet.<a href="./src/resources/pet.ts">findByTags</a>({ ...params }) -> PetFindByTagsResponse</code>
- <code title="post /pet/{petId}">client.pet.<a href="./src/resources/pet.ts">updateByID</a>(petID, { ...params }) -> void</code>
- <code title="post /pet/{petId}/uploadImage">client.pet.<a href="./src/resources/pet.ts">uploadImage</a>(petID, { ...params }) -> PetUploadImageResponse</code>

# Store

Types:

- <code><a href="./src/resources/store/store.ts">StoreListInventoryResponse</a></code>

Methods:

- <code title="get /store/inventory">client.store.<a href="./src/resources/store/store.ts">listInventory</a>() -> StoreListInventoryResponse</code>

## Order

Methods:

- <code title="post /store/order">client.store.order.<a href="./src/resources/store/order.ts">create</a>({ ...params }) -> Order</code>
- <code title="get /store/order/{orderId}">client.store.order.<a href="./src/resources/store/order.ts">retrieve</a>(orderID) -> Order</code>
- <code title="delete /store/order/{orderId}">client.store.order.<a href="./src/resources/store/order.ts">delete</a>(orderID) -> void</code>

# User

Types:

- <code><a href="./src/resources/user.ts">User</a></code>
- <code><a href="./src/resources/user.ts">UserLoginResponse</a></code>

Methods:

- <code title="post /user">client.user.<a href="./src/resources/user.ts">create</a>({ ...params }) -> User</code>
- <code title="get /user/{username}">client.user.<a href="./src/resources/user.ts">retrieve</a>(username) -> User</code>
- <code title="put /user/{username}">client.user.<a href="./src/resources/user.ts">update</a>(existingUsername, { ...params }) -> void</code>
- <code title="delete /user/{username}">client.user.<a href="./src/resources/user.ts">delete</a>(username) -> void</code>
- <code title="post /user/createWithList">client.user.<a href="./src/resources/user.ts">createWithList</a>([ ...items ]) -> User</code>
- <code title="get /user/login">client.user.<a href="./src/resources/user.ts">login</a>({ ...params }) -> string</code>
- <code title="get /user/logout">client.user.<a href="./src/resources/user.ts">logout</a>() -> void</code>

const showEditContact = () => `
<div>
    <h2>Edit contact</h2>
    <i class="task-desc">Edit data in contact</i>
    <div class="method">
        <span class="method-put">PUT</span><b>/api/edit_contact.php</b>
    </div>
    <div class="desc-block desc-block-header header-param">
        <h3>Headers:</h3>
        <p>Content-Type: application/json</p>
    </div>
    <div class="desc-block desc-block-header">
        <h3>Body:</h3>
        <div class="header-param">
            <h4>id</h4><span>*</span><i>required</i>
        </div>
        <div class="header-param">
            <h4>name</h4><span>*</span><i>required</i>
        </div>
        <div class="header-param">
            <h4>email</h4><span>*</span><i>required</i>
        </div>
        <div class="header-param">
            <h4>category</h4><span>*</span><i>required (one of: home,friends,work,other)</i>
        </div>
<code>{
    "id": "cc9eacdf-62af-11ed-9813-0019d2e2f90a",
    "name": "Adam Brown",
    "email": "adam.brown@mail.com",
    "category": "other"
}</code> 
        </div>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. Contact has been successfully updated</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">200 OK</i>  
<code>{
    "message": "Contact has been updated"
}</code>  
<b>2. Authentication failed</b>
<h4 class="status-header">Status:</h4><i class="status status-unsuccess">401 Unauthorized</i> 
<code>{
    "error": "authentication failed"
}</code>
<b>3. Incorrect category</b>
<h4 class="status-header">Status:</h4><i class="status status-unsuccess">422 Unprocessable Entity</i> 
<code>{
    "error": "incorrect category"
}</code>
<b>4. User doesn\'t exist</b>
<h4 class="status-header">Status:</h4><i class="status status-unsuccess">404 Not Found</i> 
<code>{
    "error": "User doesn\'t exist"
}</code>
</div>
</div>`;
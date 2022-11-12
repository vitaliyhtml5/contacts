const showAddContact = () => `
<div>
    <h2>Add contact</h2>
    <i class="task-desc">Add a new contact</i>
    <div class="method">
        <span class="method-post">POST</span><b>/api/add_contact.php</b>
    </div>
    <div class="desc-block desc-block-header header-param">
        <h3>Headers:</h3>
        <p>Content-Type: application/json</p>
    </div>
    <div class="desc-block desc-block-header">
        <h3>Body:</h3>
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
    "name": "Adam Brown",
    "email": "adam.brown@mail.com",
    "category": "other"
}</code> 
        </div>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. Contact has been successfully added</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">201 Created</i>  
<code>{
    "message": "Contact has been added"
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
</div>
</div>`;
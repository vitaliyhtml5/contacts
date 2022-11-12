const showRemoveContact = () => `
<div>
    <h2>Remove contact</h2>
    <i class="task-desc">Delete a contact</i>
    <div class="method">
        <span class="method-delete">DELETE</span><b>/api/remove_contact.php</b>
    </div>
    <div class="desc-block">
        <h3>Parameters:</h3>
        <div class="header-param">
            <h4>id</h4><span>*</span><i>query (string)</i>
        </div>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. Contact has been successfully removed</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">200 OK</i>  
<code>{
    "message": "Contact has been removed"
}</code>
    <b>2. Authentication failed</b>
    <h4 class="status-header">Status:</h4><i class="status status-unsuccess">401 Unauthorized</i> 
<code>{
    "error": "authentication failed"
}</code>
    <b>3. User doesn\'t exist</b>
    <h4 class="status-header">Status:</h4><i class="status status-unsuccess">404 Not Found</i> 
<code>{
    "error": "User doesn\'t exist"
}</code>
    </div>
</div>`;
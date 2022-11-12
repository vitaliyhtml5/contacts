const showContacts = () => `
<div>
    <h2>Get contacts</h2>
    <i class="task-desc">Get all contacts</i>
    <div class="method">
        <span class="method-get">GET</span><b>/api/get_profile.php</b>
    </div>
    <div class="desc-block">
        <h3>Parameters:</h3>
        <div class="header-param">
            <h4>page</h4><i>query (string)</i>
        </div>
        <div class="header-param">
            <h4>page_size</h4><i>query (string)</i>
        </div>
        <div class="header-param">
            <h4>category</h4><i>query (array: home,friends,work,other)</i>
        </div>
        <div class="header-param">
            <h4>search</h4><i>query (string: name,email)</i>
        </div>
        <div class="header-param">
            <h4>sort</h4><i>query (string:name,-name,email,-email)</i>
        </div>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. At least one contact is found</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">200 OK</i>  
<code>{
    "data": [
        {
            "id": "ff01005d-d66d-4ee6-91d2-edc0546a43f6",
            "name": "John Smith",
            "email": "john.smith@hotmail.com",
            "category": "home"
        }
    ],
    "meta": {
        "total": 1
    }
}</code>
    <b>2. No results found</b>
        <h4 class="status-header">Status:</h4><i class="status status-success">200 OK</i>               
    <code>{
        "message": "no results found"
    }</code>  
    <b>3. Authentication failed</b>
    <h4 class="status-header">Status:</h4><i class="status status-unsuccess">401 Unauthorized</i> 
<code>{
    "error": "authentication failed"
}</code>
    </div>
</div>`;
const checkSession = () => `
<div>
    <h2>Session</h2>
    <i class="task-desc">Check session</i>
    <div class="method">
        <span class="method-get">GET</span><b>/api/session.php</b>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. Logout</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">204 No Content</i>  
    <b>2. Authentication failed</b>
    <h4 class="status-header">Status:</h4><i class="status status-unsuccess">401 Unauthorized</i> 
<code>{
    "error": "authentication failed"
}</code>
    </div>
</div>`;
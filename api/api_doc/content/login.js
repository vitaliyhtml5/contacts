const showLogin = () => `
<div>
    <h2>Login</h2>
    <i class="task-desc">Log in account</i>
    <div class="method"><span class="method-post">POST</span><b>/api/login.php</b></div>
    <div class="desc-block desc-block-header">
        <h3>Headers:</h3>
        <p>Content-Type: application/json</p>
    </div>
    <div class="desc-block desc-block-header">
        <h3>Body:</h3>
        <div class="header-param">
            <h4>email</h4><span>*</span><i>required</i>
        </div>
        <div class="header-param">
            <h4>password</h4><span>*</span><i>required</i>
        </div>
<code>{
    "email": "test@test.com,
    "password": "1"
}</code> 
        </div>
    </div>
    <div class="desc-block response-block">
        <h3>Response:</h3>
        <b>1. User has been successfully logged in</b> 
        <h4 class="status-header">Status:</h4><i class="status status-success">201 Created</i>  
<code>{
    "access": {
        "jwt": &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDVjNDRjMi02MjgzLTExZWQtYWM3YS0wMDE5ZDJlMmY5MGEiLCJleHBpcmVzQXQiOjE2NzYwNTQzODB9.eAZMUi53QwAH16yQSrm5zabCdkka0VV3apk2uMoEg8",
        "expiresAt": "2023-02-10T18:39:40Z"
    }
}</code> 
    <b>2. Authentication failed</b>
    <h4 class="status-header">Status:</h4><i class="status status-unsuccess">401 Unauthorized</i> 
<code>{
    "error": "authentication failed"
}</code>    
</div>`;

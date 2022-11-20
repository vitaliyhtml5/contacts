<?php

require_once './utility/dbc.php';
require_once './utility/secure_data.php';
require_once './utility/send_res.php';
require_once './utility/token.php';
require_once './utility/validation.php';

$data_req = json_decode(file_get_contents('php://input'), true);
$data_field = ['email', 'password'];

if (!check_missed($data_req, $data_field)
    || !check_empty($data_req, $data_field)
    || !check_length($data_req, $data_field, 20)
    || !validate_email($data_req['email'])
    || !check_method('POST')
    || !check_creds($data_req, $dbc)) {
    return false;
}  
else {
    $email = secure_data($data_req['email'], $dbc);
    $pwd = secure_data($data_req['password'], $dbc);
    create_cookies($dbc, $email, $pwd);
}

mysqli_close($dbc);
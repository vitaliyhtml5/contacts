<?php

function check_token() {
    if (isset($_COOKIE['contacts_token']) && compare_token($_COOKIE['contacts_token'])) return true;
    else send_res(array('error'=>'Authentication failed'), 401);
}

function compare_token($token) {
    $user_id = get_token_id($token);
    $expiration = json_decode(base64_decode(explode('.', $token)[1]), true)['expiresAt'];
    $jwt = create_token(array('userId' => $user_id, 'expiresAt' => $expiration));

    if ($jwt === $token) return true;
    else return false;
}

function get_token_id($token) {
    $token_arr = explode('.', $token);
    return json_decode(base64_decode($token_arr[1]), true)['userId'];
}

function create_cookies($dbc, $email, $pwd) {
    $query = "SELECT uuid FROM contacts_users
              WHERE email = '$email' AND password = SHA('$pwd')";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    $user_id = mysqli_fetch_array($result)['uuid'];
    $expiration = time() + (86400 * 90);

    $token = create_token(array('userId' => $user_id, 'expiresAt' => $expiration));
    setcookie('contacts_token', $token, $expiration, '/');
    $access = array(
        'jwt' => $token,
        'expiresAt' => gmdate("Y-m-d\TH:i:s\Z", $expiration)
    );
    
    send_res(array('access' => $access), 201);
}

function create_token($user_id) {
    $header = encode_token(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = encode_token(json_encode($user_id));
    $signature = encode_token(hash_hmac('sha256', $header . '.' . $payload, 'mycontacts', true));
    
    return  $header . '.' . $payload . '.' . $signature;
}

function encode_token($data) {
    return str_replace(['+', '/', '='], ['', '', ''], base64_encode($data));
}
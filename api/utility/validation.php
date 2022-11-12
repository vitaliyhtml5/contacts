<?php

//Login
function check_creds($data, $dbc) {
    $email = secure_data($data['email'], $dbc);
    $pwd = secure_data($data['password'], $dbc);

    $query = "SELECT email, password FROM contacts_users
              WHERE email = '$email' AND password = SHA('$pwd')";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    if (mysqli_num_rows($result) === 1) return true;
    else {
        send_res(array('error' => 'Incorrect credentials'), 401);
        return false;
    }
}

//Field validation
function check_missed($data, $arr) {
    $result = true;
    for ($i = 0; $i < count($arr); $i++) {
        if (!isset($data[$arr[$i]])) {
            $result = false;
            send_res(array('error' => "$arr[$i] is missed"), 422);
            break;
        }
    }
    return $result;
}

function check_empty($data, $arr) {
    $result = true;
    for ($i = 0; $i < count($arr); $i++) {
        if (isset($data[$arr[$i]]) && strlen(trim($data[$arr[$i]])) === 0) {
            $result = false;
            send_res(array('error' => $arr[$i] . ' can\'t be empty'), 422);
            break;
        }
    }
    return $result;
}

function check_length($data, $arr, $length) {
    $result = true;
    for ($i = 0; $i < count($arr); $i++) {
        if (isset($data[$arr[$i]]) && strlen($data[$arr[$i]]) > $length) {
            $result = false;
            send_res(array('error' => 'max length of ' . $arr[$i] . ' is ' . $length . ' chars'), 422);
            break;
        }
    }
    return $result;
}

function validate_email($email) {
    if (!filter_var(trim($email), FILTER_VALIDATE_EMAIL)) {
        send_res(array('error' => 'email is invalid'), 422);
        return false;
    } else {
        return true;
    }
}

//Other
function check_category($data, $dbc) {
    $category = secure_data($data, $dbc);

    $query = "SELECT category FROM contacts_categories
    WHERE category = '$category'";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    if (mysqli_num_rows($result) === 1) return true;
    else {
        send_res(array('error' => 'incorrect category'), 422);
        return false;
    }
}

function check_url_data($param, $name, $dbc) {
    if (!isset($param)) {
        send_res(array('error' => "$name is missed"), 400);
        return false;
    } elseif (empty($param)) {
        send_res(array('error' => "$name is empty"), 400);
        return false;
    }
    return true;
}

function is_exist_user($data, $dbc) {
    $uuid = secure_data($data, $dbc);
    $user_id = get_id(get_token_id($_COOKIE['contacts_token']), 'contacts_users', 'uuid', $dbc);

    $query = "SELECT uuid FROM contacts_people
    WHERE uuid = '$uuid'
    AND users_id = $user_id";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    if (mysqli_num_rows($result) === 1) return true;
    else {
        send_res(array('error' => 'User doesn\'t exist'), 404);
        return false;
    }
}

function check_method($method) {
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        send_res(array('error' => 'incorrect method'), 405);
        return false;
    } else {
        return true;
    }
}
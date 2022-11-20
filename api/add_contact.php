<?php

require_once './utility/dbc.php';
require_once './utility/secure_data.php';
require_once './utility/token.php';
require_once './utility/send_res.php';
require_once './utility/validation.php';
require_once './utility/utility.php';

if (check_token()) add_contact($dbc);

function add_contact($dbc) {
    $data_req = json_decode(file_get_contents('php://input'), true);
    $data_field = ['name', 'email', 'category'];
    $data_length = ['name', 'email'];

    if (!check_missed($data_req, $data_field)
        || !check_empty($data_req, $data_field)
        || !check_length($data_req, $data_length, 20)
        || !validate_email($data_req['email'])
        || !check_method('POST')
        || !check_category($data_req['category'], $dbc)) {
        return false;
    }  
    else {
        $name = secure_data($data_req['name'], $dbc);
        $email = secure_data($data_req['email'], $dbc);
        $category_id = get_id($data_req['category'], 'contacts_categories', 'category', $dbc);
        $user_id = get_id(get_token_id($_COOKIE['contacts_token']), 'contacts_users', 'uuid', $dbc);
      
        $query = "INSERT INTO contacts_people (name, email, uuid, categories_id, users_id)
                  VALUES ('$name', '$email', uuid(), $category_id, $user_id)";
        $result = mysqli_query($dbc, $query) or die(mysqli_error());

        send_res(array('message' => 'Contact has been added'), 201);
    }
}

mysqli_close($dbc);
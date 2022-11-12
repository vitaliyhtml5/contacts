<?php

require_once './utility/dbc.php';
require_once './utility/secure_data.php';
require_once './utility/token.php';
require_once './utility/send_res.php';
require_once './utility/validation.php';
require_once './utility/utility.php';

if (check_token()) edit_contact($dbc);

function edit_contact($dbc) {
    $data_req = json_decode(file_get_contents('php://input'), true);
    $data_field = ['name', 'email', 'category', 'id'];
    $data_length = ['name', 'email'];

    if (!check_missed($data_req, $data_field)
        || !check_empty($data_req, $data_field)
        || !check_length($data_req, $data_length, 20)
        || !validate_email($data_req['email'])
        || !check_method('PUT')
        || !check_category($data_req['category'], $dbc)
        || !is_exist_user($data_req['id'], $dbc)) {
        return false;
    }  
    else {
        $name = secure_data($data_req['name'], $dbc);
        $email = secure_data($data_req['email'], $dbc);
        $uuid = secure_data($data_req['id'], $dbc);
        $category_id = get_id($data_req['category'], 'contacts_categories', 'category', $dbc);
        $user_id = get_id(get_token_id($_COOKIE['contacts_token']), 'contacts_users', 'uuid', $dbc);
      
        $query = "UPDATE contacts_people 
                  SET name = '$name', 
                  email = '$email', 
                  categories_id = $category_id 
                  WHERE uuid = '$uuid'
                  AND users_id = $user_id";
        $result = mysqli_query($dbc, $query) or die(mysqli_error());

        send_res(array('message' => 'Contact has been updated'), 200);
    }
}

mysqli_close($dbc);
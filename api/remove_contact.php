<?php

require_once './utility/dbc.php';
require_once './utility/secure_data.php';
require_once './utility/token.php';
require_once './utility/send_res.php';
require_once './utility/validation.php';
require_once './utility/utility.php';

if (check_token()) remove_contact($dbc);

function remove_contact($dbc) {
    $user_id = get_token_id($_COOKIE['contacts_token']);
    
    if (!check_url_data($_GET['id'], 'id', $dbc)
        || !check_method('DELETE')
        || !is_exist_user($_GET['id'], $dbc)) {
        return false;
    } else {
        $uuid = secure_data($_GET['id'], $dbc);
        $user_id = get_id(get_token_id($_COOKIE['contacts_token']), 'contacts_users', 'uuid', $dbc);
      
        $query = "DELETE FROM contacts_people 
                  WHERE uuid = '$uuid'
                  AND users_id = $user_id";
        $result = mysqli_query($dbc, $query) or die(mysqli_error());

        send_res(array('message' => 'Contact has been removed'), 200);
    }    
}

mysqli_close($dbc);
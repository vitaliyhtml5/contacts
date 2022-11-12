<?php

require_once './utility/dbc.php';
require_once './utility/secure_data.php';
require_once './utility/token.php';
require_once './utility/send_res.php';

if (check_token()) get_contacts($dbc);

function get_contacts($dbc) {
    $user_id = get_token_id($_COOKIE['contacts_token']);
    $page_size = secure_data($_GET['page_size'], $dbc);

    if ($page_size === '') $page = 0;
    else $page = (secure_data($_GET['page'], $dbc) - 1) * $page_size;

    $category = filter_category($dbc);
    $search = search_data($dbc);
    $sort = sort_data($dbc);

    $query = "SELECT p.uuid, p.name, p.email, c.category
              FROM contacts_people AS p 
              JOIN contacts_categories AS c
              ON p.categories_id = c.id
              JOIN contacts_users AS u
              ON p.users_id = u.id
              WHERE u.uuid = '$user_id'
              $category
              $search
              $sort
              LIMIT $page,$page_size";

    if ($page_size === '') {
        $query = substr_replace($query, '', -strlen(substr($query, strpos($query, 'LIMIT'))));
    }

    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    while ($row = mysqli_fetch_array($result)) {
        $data[] = array(
            'id' => $row['uuid'],
            'name' => $row['name'],
            'email' => $row['email'],
            'category' => $row['category']
        );
    }

    $total = count_all($dbc, $query);
    $meta = array('total' => $total);

    if (empty($data)) send_res(array('data' => 'No results found'));
    else send_res(array('data' => $data, 'meta' => $meta));

}

function filter_category($dbc) {
    $category = secure_data($_GET['category'], $dbc);

    if (!empty($category)) {
        $arrCategory = explode(',', $category);
        $result = '';
        foreach ($arrCategory as $i) {
            $result = "$result OR c.category = '$i'"; 
        }
        return 'AND (' . substr($result, 3) . ')';
    } else return null;
}

function search_data($dbc) {
    $search = secure_data($_GET['search'], $dbc);
    if (!empty($search)) {
        return 'AND (p.name LIKE "%' . $search . '%" OR p.email LIKE "%' . $search . '%")';
    }
    else return null;
}

function sort_data($dbc) {
    $sort = secure_data(strtolower($_GET['sort']), $dbc);
   
    if (!empty($sort) && substr($sort, 0, 1) !== '-') {
        return "ORDER BY p.$sort ASC";
    }
    elseif (!empty($sort) && substr($sort, 0, 1) === '-') {
        $sort = substr($sort, 1);
        return "ORDER BY p.$sort DESC";
    }
    else return null;
}

function count_all($dbc, $query) {
    $query_count = 'SELECT COUNT(*) AS count' . substr($query, strpos($query, ' FROM'));

    $query_count = preg_replace('/LIMIT \w{1,},\w{1,}/i', '', $query_count);

    $result = mysqli_query($dbc, $query_count) or die(mysqli_error());
    $count = mysqli_fetch_array($result);
    
    return intval($count['count']);
}

mysqli_close($dbc);
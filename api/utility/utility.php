<?php

function get_id($item, $table, $col, $dbc) {
    $item = secure_data($item, $dbc);

    $query = "SELECT id FROM $table
              WHERE $col = '$item'";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
 
    return  mysqli_fetch_array($result)['id'];
}
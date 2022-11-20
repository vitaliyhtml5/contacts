<?php

function secure_data($data, $dbc) {
    return mysqli_real_escape_string($dbc, trim($data));
}
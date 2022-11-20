<?php

require_once './utility/validation.php';
require_once './utility/send_res.php';
require_once './utility/token.php';

if (!check_method('DELETE')) {
    return false;
} elseif (check_token()) {
    setcookie('contacts_token', '', time() - 3600, '/');
    http_response_code(204);
}
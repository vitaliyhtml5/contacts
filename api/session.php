<?php

require_once './utility/token.php';
require_once './utility/send_res.php';

if (check_token()) http_response_code(204);
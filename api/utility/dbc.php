<?php

error_reporting(E_ALL ^ E_NOTICE);
$dbc = mysqli_connect('localhost', 'root', '', 'test3') or die(mysqli_error());
mysqli_set_charset($dbc, 'utf8');
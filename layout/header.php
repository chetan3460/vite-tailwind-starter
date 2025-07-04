<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LT</title>
    <link rel="canonical" href="" />
    <link rel="shortcut icon" href="images/favicon.ico">

    <!-- <link rel="stylesheet" href="css/theme-styles.min.css"> -->
    <!-- <link rel="stylesheet" href="dist/css/app.min.css"> -->

    <?php
    include_once 'helpers.php';

    // Get the base URL and version separately
    $base_url = get_base_url();
    $version = get_version();
    ?>

    <link rel="stylesheet" href="<?php echo $base_url . 'dist/css/app.min.css?v=' . $version; ?>">


</head>

<body>

    <header id="header" class=" fixed-top d-flex align-items-center">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 col-11 mx-auto">
                    <a href="index.php" class="logo d-flex align-items-center gap-2 flex-nowrap">
                        <img src="assets/images/logo.png">
                        <span class="white"></span>
                        <img src="assets/images/syncordis.png" alt="">
                    </a>
                </div>
            </div>
        </div>
    </header>
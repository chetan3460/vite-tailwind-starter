<footer class="footer--main-footer">
    <div class="container-fluid mx-auto">
        <div class="row">
            <div class="col-lg-10 col-11 mx-auto">
                <div class="footer-section  row">
                    <div class="col-lg-3 col-12">
                        <div class="footer--logo">
                            <img src="assets/images/logo-alt-group.png" />
                        </div>
                    </div>
                    <div class="col-lg-3 col-12 logo-order">
                        <div class="footer--social-logo d-flex">
                            <ul class="d-flex justify-content-center gap-2 p-0 mb-0">
                                <li><img src="assets/images/icon-linkedin.png" />
                                </li>
                                <li><img src="assets/images/icon-facebook.png" />
                                </li>
                                <li><img src="assets/images/icon-twitter.png" />
                                </li>
                                <li><img src="assets/images/icon-youtube.png" />
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="col-lg-6 col-12 links-order">
                        <div class="footer--links d-flex ">
                            <ul class="footer--page-links d-flex justify-content-center  text-white mb-0">
                                <li>Blogs </li>
                                <li>Careers </li>
                                <li>Company </li>
                                <li>Investors </li>
                                <li>Newsletters </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>

</footer>
<?php
include_once 'helpers.php';

// Get the base URL and version separately
$base_url = get_base_url();
$version = get_version();
?>

<!-- <script src="./dist/js/app-1.2.min.js"></script> -->

<!-- <script src="</?php echo $base_url . '/dist/js/app.min.js?v=' . $version; ?>"></script> -->
<script src="<?php echo $base_url . 'dist/js/app-' . $version . '.min.js?v=' . $version; ?>"></script>


</body>

</html>
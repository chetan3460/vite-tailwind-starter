<?php
function get_base_url()
{
    // Get the current URL's components
    $currentUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    // Parse the URL
    $parsedUrl = parse_url($currentUrl);

    // Extract the scheme (http/https), host, and path
    $scheme = $parsedUrl['scheme'];
    $host = $parsedUrl['host'];
    $path = trim($parsedUrl['path'], '/');

    // Split the path into segments
    $pathSegments = explode('/', $path);

    // Identify the target directory based on a condition
    $targetDirectory = null;
    foreach ($pathSegments as $segment) {
        if ($segment !== $host && $segment !== 'www') {
            $targetDirectory = $segment;
            break;
        }
    }

    if ($targetDirectory !== null) {
        // Find the position of the target directory in the path
        $targetIndex = array_search($targetDirectory, $pathSegments);

        // Extract segments up to and including the target directory
        $baseSegments = array_slice($pathSegments, 0, $targetIndex + 1);

        // Construct the base URL
        $base_url = $scheme . '://' . $host . '/' . implode('/', $baseSegments) . '/';
    } else {
        // Fallback base URL (root of the domain)
        $base_url = $scheme . '://' . $host . '/';
    }

    return $base_url;
}

function get_version()
{
    // Fetch the version from a JSON file
    return json_decode(file_get_contents(__DIR__ . '/../config/version.json'), true)['version'];
}

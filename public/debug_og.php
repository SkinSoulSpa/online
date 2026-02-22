<?php
// Debug script to test OG tags for different routes
$route = $_GET['route'] ?? '/';
$_SERVER['REQUEST_URI'] = $route;

// Capture output
ob_start();
include 'index.php';
$html = ob_get_clean();

// Extract meta tags
preg_match('/<meta property="og:title" content="(.*?)" \/>/', $html, $title);
preg_match('/<meta property="og:description" content="(.*?)" \/>/', $html, $description);
preg_match('/<meta property="og:image" content="(.*?)" \/>/', $html, $image);
preg_match('/<meta property="og:image:width" content="(.*?)" \/>/', $html, $width);
preg_match('/<meta property="og:image:height" content="(.*?)" \/>/', $html, $height);

header('Content-Type: application/json');
echo json_encode([
    'route' => $route,
    'title' => $title[1] ?? 'Not found',
    'description' => $description[1] ?? 'Not found',
    'image' => $image[1] ?? 'Not found',
    'width' => $width[1] ?? 'Not found',
    'height' => $height[1] ?? 'Not found'
], JSON_PRETTY_PRINT);
?>

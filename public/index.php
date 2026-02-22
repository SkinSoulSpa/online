<?php
// Prevent caching to ensure fresh metadata is served
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$template_file = 'index.template.html';

// Check if index.html exists and rename it if necessary (runtime fix for deployments)
if (file_exists('index.html')) {
    rename('index.html', $template_file);
}

if (!file_exists($template_file)) {
    // Fallback if template is missing
    http_response_code(500);
    die('Error: index.template.html not found. Deployment incomplete.');
}

$html = file_get_contents($template_file);

if ($html === false) {
    http_response_code(500);
    die('Error: Unable to read template file.');
}

// Split HTML into Head and Body to safely replace metadata only in the Head
$head_end_pos = strpos($html, '</head>');
if ($head_end_pos === false) {
    // If no </head> tag found, treat whole file as content (fallback)
    $head = $html;
    $body = '';
} else {
    $head = substr($html, 0, $head_end_pos);
    $body = substr($html, $head_end_pos);
}

// Default values (Must match index.html exactly)
$default_title = 'Skin Soul Spa | Soul-Deep Restoration';
$default_description = 'A private ritual of self-reverence in a hidden Orchard gem. Experience bespoke facials, body therapies, and soul-deep restoration.';
$default_image = 'https://skinsoulspa.sg/og/default.jpg';
$default_url_str = 'content="https://skinsoulspa.sg/"'; 

// Current Route Logic
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$current_url = 'https://skinsoulspa.sg' . $path;

// Define Page Metadata
$new_title = $default_title;
$new_description = $default_description;
$new_image = $default_image;

if (strpos($path, '/artisans') !== false) {
    $new_title = 'The Artisans | Skin Soul Spa';
    $new_description = 'Meet the hands behind the soul-deep restoration. Our artisans are masters of touch and intuition.';
    $new_image = 'https://skinsoulspa.sg/og/artisans.jpg';
} elseif (strpos($path, '/experiences') !== false) {
    $new_title = 'The Experiences | Skin Soul Spa';
    $new_description = 'Discover our bespoke facials, body therapies, and signature journeys designed to restore your soul.';
    $new_image = 'https://skinsoulspa.sg/og/experiences.jpg';
} elseif (strpos($path, '/journal') !== false) {
    $new_title = 'The Journal | Skin Soul Spa';
    $new_description = 'Reflections on beauty, wellness, and the art of slowing down.';
    $new_image = 'https://skinsoulspa.sg/og/journal.jpg';
} elseif (strpos($path, '/reservations') !== false) {
    $new_title = 'Reservations | Skin Soul Spa';
    $new_description = 'Book your private ritual of self-reverence. We await your presence.';
}

// Perform Replacements in Head
// 1. Image (Replaces og:image and twitter:image if they use the same URL)
$head = str_replace($default_image, $new_image, $head);

// 2. URL (Replaces og:url and twitter:url)
$head = str_replace($default_url_str, 'content="' . $current_url . '"', $head);

// 3. Title (Replaces <title>, og:title, twitter:title)
$head = str_replace($default_title, $new_title, $head);

// 4. Description (Replaces meta description, og:description, twitter:description)
$head = str_replace($default_description, $new_description, $head);

// Reassemble HTML
$final_html = $head . $body;

// Output with correct headers
header('Content-Type: text/html; charset=UTF-8');
header('Content-Length: ' . strlen($final_html));
http_response_code(200); // Explicitly set 200 OK

echo $final_html;
?>
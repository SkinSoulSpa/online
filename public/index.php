<?php
// index.php - Dynamic Open Graph Injection

// Prevent caching
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// 1. Determine the requested path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// 2. Default Metadata
$title = "Skin Soul Spa | Soul-Deep Restoration";
$description = "A private ritual of self-reverence in a hidden Orchard gem. Experience bespoke facials, body therapies, and soul-deep restoration.";
$image = "https://skinsoulspa.sg/og/default.jpg";
$url = "https://skinsoulspa.sg" . $path;

// 3. Route Mapping Logic
if (strpos($path, '/sanctuary') !== false) {
    $title = "The Sanctuary | Skin Soul Spa";
    $description = "A hidden sanctuary amidst the rush of Orchard Road. A private haven where time feels suspended.";
    $image = "https://skinsoulspa.sg/og/default.jpg"; // Using default for now, can be specific if available
} elseif (strpos($path, '/experiences') !== false) {
    $title = "Experiences | Skin Soul Spa";
    $description = "Explore our Signature Journeys, Intensive Journeys, and Enhancements. Bespoke dialogues between your skin and our artisans.";
    $image = "https://skinsoulspa.sg/og/experiences.jpg";
} elseif (strpos($path, '/artisans') !== false) {
    $title = "The Artisans | Skin Soul Spa";
    $description = "Meet the hands behind the magic. Experienced, intuitive, and dedicated to your soul-deep restoration.";
    $image = "https://skinsoulspa.sg/og/artisans.jpg";
} elseif (strpos($path, '/journal') !== false) {
    $title = "The Journal | Skin Soul Spa";
    $description = "Reflections on slow beauty, wellness, and the art of self-reverence.";
    $image = "https://skinsoulspa.sg/og/journal.jpg";
} elseif (strpos($path, '/reservations') !== false) {
    $title = "Reservations | Skin Soul Spa";
    $description = "Book your escape. Secure your appointment for a transformative experience.";
    $image = "https://skinsoulspa.sg/og/default.jpg";
}

// 4. Load the compiled index.html
// Since we want index.php to be the router, we rename the static index.html to index.template.html
// during deployment or runtime initialization.
$template_file = 'index.template.html';

// Check if index.html exists and rename it if necessary (runtime fix)
if (file_exists('index.html')) {
    rename('index.html', $template_file);
}

if (file_exists($template_file)) {
    $html = file_get_contents($template_file);
} else {
    // Fallback if rename failed or file missing
    die('Error: index.template.html not found. Deployment incomplete.');
}

// 5. Replace Metadata Placeholders
// We look for the specific meta tags we want to replace.
// Note: We use regex or string replacement. Since we know the exact format in index.html, we can use str_replace or preg_replace.

// Helper for consistent replacement
function replace_tag($html, $pattern, $replacement) {
    // Try to match the tag, allowing for variations in whitespace
    return preg_replace($pattern, $replacement, $html);
}

// Replace Title
$html = preg_replace('/<title>.*?<\/title>/', "<title>$title</title>", $html);
$html = preg_replace('/<meta property="og:title" content=".*?" \/>/', '<meta property="og:title" content="' . $title . '" />', $html);
$html = preg_replace('/<meta property="twitter:title" content=".*?" \/>/', '<meta property="twitter:title" content="' . $title . '" />', $html);

// Replace Description
$html = preg_replace('/<meta name="description" content=".*?" \/>/', '<meta name="description" content="' . $description . '" />', $html);
$html = preg_replace('/<meta property="og:description" content=".*?" \/>/', '<meta property="og:description" content="' . $description . '" />', $html);
$html = preg_replace('/<meta property="twitter:description" content=".*?" \/>/', '<meta property="twitter:description" content="' . $description . '" />', $html);

// Replace Image
$html = preg_replace('/<meta property="og:image" content=".*?" \/>/', '<meta property="og:image" content="' . $image . '" />', $html);
$html = preg_replace('/<meta property="twitter:image" content=".*?" \/>/', '<meta property="twitter:image" content="' . $image . '" />', $html);

// Replace URL
$html = preg_replace('/<meta property="og:url" content=".*?" \/>/', '<meta property="og:url" content="' . $url . '" />', $html);
$html = preg_replace('/<meta property="twitter:url" content=".*?" \/>/', '<meta property="twitter:url" content="' . $url . '" />', $html);

// Debug Info (Hidden in source)
$html .= "\n<!-- Debug: Path=$path, Image=$image -->";

// 6. Output the modified HTML
echo $html;
?>
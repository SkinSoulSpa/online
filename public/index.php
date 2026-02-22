<?php
// index.php - Dynamic Open Graph Injection

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
// Since index.html might take precedence if present, we renamed it to index.html.template or we read it and then delete it?
// Actually, in our deployment flow, Vite builds index.html.
// We need this PHP script to BE the index.php that gets served.
// But if index.html exists, Apache might serve it first depending on DirectoryIndex.
// We set "DirectoryIndex index.php index.html" in .htaccess, so index.php wins.
// However, we need to read the CONTENT of the built index.html to serve it.
// Let's assume the built file is named 'index.html'.
$html_file = 'index.html';
if (!file_exists($html_file)) {
    // Fallback if index.html is missing (maybe renamed to template)
    $html_file = 'index.template.html';
}

if (file_exists($html_file)) {
    $html = file_get_contents($html_file);
} else {
    die('Error: index.html not found.');
}

// 5. Replace Metadata Placeholders
// We look for the specific meta tags we want to replace.
// Note: We use regex or string replacement. Since we know the exact format in index.html, we can use str_replace or preg_replace.

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

// 6. Output the modified HTML
echo $html;
?>
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
// Improved regex to handle attribute order variations and whitespace

// Helper for consistent replacement using regex
function replace_meta_content($html, $property, $new_content) {
    // Matches <meta property="og:title" content="..." /> OR <meta content="..." property="og:title" />
    // Also handles name="..." for description
    // Also handles single or double quotes
    
    // Pattern 1: property="..." content="..."
    $pattern1 = '/<meta\s+(property|name)=["\']' . preg_quote($property, '/') . '["\']\s+content=["\'].*?["\']\s*\/?>/i';
    // Pattern 2: content="..." property="..."
    $pattern2 = '/<meta\s+content=["\'].*?["\']\s+(property|name)=["\']' . preg_quote($property, '/') . '["\']\s*\/?>/i';
    
    $replacement = '<meta property="' . $property . '" content="' . $new_content . '" />';
    if ($property === 'description') {
        $replacement = '<meta name="description" content="' . $new_content . '" />';
    }

    $html = preg_replace($pattern1, $replacement, $html);
    $html = preg_replace($pattern2, $replacement, $html);
    
    return $html;
}

// Replace Title (Special case for <title> tag)
$html = preg_replace('/<title>.*?<\/title>/i', "<title>$title</title>", $html);
$html = replace_meta_content($html, 'og:title', $title);
$html = replace_meta_content($html, 'twitter:title', $title);

// Replace Description
$html = replace_meta_content($html, 'description', $description);
$html = replace_meta_content($html, 'og:description', $description);
$html = replace_meta_content($html, 'twitter:description', $description);

// Replace Image
$html = replace_meta_content($html, 'og:image', $image);
$html = replace_meta_content($html, 'twitter:image', $image);

// Replace URL
$html = replace_meta_content($html, 'og:url', $url);
$html = replace_meta_content($html, 'twitter:url', $url);

// 6. Output the modified HTML
echo $html;
?>
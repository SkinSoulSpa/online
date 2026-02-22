<?php
// Base URL of the website
$baseUrl = 'https://skinsoulspa.sg';
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);

// Default Metadata
$title = "Skin Soul Spa | Soul-Deep Restoration";
$description = "A private ritual of self-reverence in a hidden Orchard gem. Experience bespoke facials, body therapies, and soul-deep restoration.";
$image = "$baseUrl/og/default.jpg";
$url = $baseUrl . $path;

// Define specific metadata for routes
switch ($path) {
    case '/artisans':
    case '/artisans/':
        $title = "The Artisans | Skin Soul Spa";
        $description = "Meet the skilled hands behind Skin Soul Spa. Technical mastery, intuitive touch, and total respect for your silence.";
        $image = "$baseUrl/og/artisans.jpg";
        break;
        
    case '/experiences':
    case '/experiences/':
        $title = "Experiences | Skin Soul Spa";
        $description = "Curated journeys for face and body. From our signature facials to intensive treatments, discover your path to radiance.";
        $image = "$baseUrl/og/experiences.jpg";
        break;
        
    case '/journal':
    case '/journal/':
        $title = "The Journal | Skin Soul Spa";
        $description = "Notes on slow beauty, self-care rituals, and our curated collection of Maria Galland products.";
        $image = "$baseUrl/og/journal.jpg";
        break;
        
    case '/sanctuary':
    case '/sanctuary/':
        $title = "The Sanctuary | Skin Soul Spa";
        $description = "A world away from the city noise. Step into our sanctuary of silence, trust, and slow beauty.";
        $image = "$baseUrl/og/default.jpg";
        break;
}

// Read the index.html file
$html = file_get_contents('index.html');

if ($html === false) {
    // Fallback if index.html is missing
    header('Content-Type: text/plain');
    echo "Error: index.html not found.";
    exit;
}

// Replace Title
$html = preg_replace('/<title>.*?<\/title>/s', "<title>$title</title>", $html);

// Replace Description
$html = preg_replace('/<meta name="description" content=".*?"\s*\/?>/s', '<meta name="description" content="' . htmlspecialchars($description) . '" />', $html);

// Inject Open Graph and Twitter Meta Tags
$ogTags = "
    <!-- Injected Social Meta Tags -->
    <meta property=\"og:type\" content=\"website\" />
    <meta property=\"og:url\" content=\"$url\" />
    <meta property=\"og:title\" content=\"$title\" />
    <meta property=\"og:description\" content=\"$description\" />
    <meta property=\"og:image\" content=\"$image\" />
    <meta property=\"og:image:width\" content=\"1200\" />
    <meta property=\"og:image:height\" content=\"630\" />
    
    <meta name=\"twitter:card\" content=\"summary_large_image\" />
    <meta name=\"twitter:title\" content=\"$title\" />
    <meta name=\"twitter:description\" content=\"$description\" />
    <meta name=\"twitter:image\" content=\"$image\" />
";

// Insert before </head>
$html = str_replace('</head>', $ogTags . '</head>', $html);

// Output the final HTML
echo $html;
?>
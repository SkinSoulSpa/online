<?php
header('Content-Type: application/json');
$files = [
    'og/artisans.jpg',
    'og/experiences.jpg',
    'og/journal.jpg',
    'og/default.jpg'
];

$results = [];
foreach ($files as $file) {
    if (file_exists($file)) {
        $size = getimagesize($file);
        $results[$file] = [
            'width' => $size[0],
            'height' => $size[1],
            'mime' => $size['mime']
        ];
    } else {
        $results[$file] = 'Not found';
    }
}

echo json_encode($results, JSON_PRETTY_PRINT);
?>
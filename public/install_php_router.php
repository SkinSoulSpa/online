<?php
// install_php_router.php
// This script ensures that index.html is renamed to index.template.html
// so that index.php can serve as the main entry point and inject dynamic tags.

$source = 'index.html';
$target = 'index.template.html';

echo "<h1>PHP Router Installer</h1>";

// 1. Check permissions
if (!is_writable('.')) {
    echo "Warning: Current directory is not writable. Rename might fail.<br>";
}

// 2. Handle index.html -> index.template.html
if (file_exists($source)) {
    if (file_exists($target)) {
        if (unlink($target)) {
            echo "Removed old $target.<br>";
        } else {
            echo "Error: Could not remove old $target.<br>";
        }
    }
    
    if (rename($source, $target)) {
        echo "Success: Renamed $source to $target.<br>";
    } else {
        echo "Error: Failed to rename $source to $target.<br>";
    }
} else {
    echo "Info: $source not found.<br>";
    if (file_exists($target)) {
        echo "Success: $target already exists (good).<br>";
    } else {
        echo "Error: Neither $source nor $target found. Deployment might be incomplete.<br>";
    }
}

// 3. Verify index.php
if (file_exists('index.php')) {
    echo "Success: index.php exists.<br>";
} else {
    echo "Error: index.php is missing!<br>";
}

echo "<br>Done.";
?>
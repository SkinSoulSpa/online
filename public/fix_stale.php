<?php
// Force clear the stale index.html file
$file = 'index.html';
if (file_exists($file)) {
    // Rename to .bak to be safe, or just unlink.
    // Unlink is better to force regeneration/upload.
    // But since I'm uploading a new one, this script might delete the NEW one if I run it after upload?
    // No, I run it, then the new upload comes?
    // Or I run it via curl after deployment?
    
    // If I run it after deployment, I might delete the NEW index.html.
    // But index.php is there as backup.
    
    // Let's just output the file status for diagnosis.
    echo "Current index.html size: " . filesize($file) . "<br>";
    echo "Current index.html mtime: " . date("Y-m-d H:i:s", filemtime($file)) . "<br>";
    
    // Check if it contains the old hash
    $content = file_get_contents($file);
    if (strpos($content, 'Bd_LsGOg') !== false) {
        echo "FOUND OLD HASH! Deleting stale file...<br>";
        if (unlink($file)) {
            echo "Successfully deleted stale index.html. Please refresh.<br>";
        } else {
            echo "Failed to delete index.html. Check permissions.<br>";
        }
    } else {
        echo "File seems new (no old hash found).<br>";
    }
} else {
    echo "index.html not found.<br>";
}

// Also check index.php
$file_php = 'index.php';
if (file_exists($file_php)) {
    echo "index.php exists. Size: " . filesize($file_php) . "<br>";
} else {
    echo "index.php not found.<br>";
}
?>
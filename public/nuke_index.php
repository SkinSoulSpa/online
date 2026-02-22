<?php
// Nuke index.html to force usage of index.php
$file = 'index.html';
if (file_exists($file)) {
    if (unlink($file)) {
        echo "SUCCESS: Deleted index.html. Server should now serve index.php.<br>";
    } else {
        echo "ERROR: Could not delete index.html. Check permissions.<br>";
    }
} else {
    echo "INFO: index.html does not exist.<br>";
}

if (file_exists('index.php')) {
    echo "INFO: index.php exists (good).<br>";
} else {
    echo "WARNING: index.php does NOT exist!<br>";
}
?>
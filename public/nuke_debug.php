<?php
// Delete the debug file
$file = 'debug_og.php';
if (file_exists($file)) {
    if (unlink($file)) {
        echo "Deleted $file";
    } else {
        echo "Failed to delete $file";
    }
} else {
    echo "$file does not exist";
}
// Also delete self
unlink(__FILE__);
?>

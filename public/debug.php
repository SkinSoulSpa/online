<?php
// debug.php
echo "Current directory: " . getcwd() . "<br>";
echo "Files:<br>";
$files = scandir('.');
foreach ($files as $file) {
    echo $file . "<br>";
}
?>
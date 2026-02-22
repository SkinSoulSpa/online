// Cache Patch
// This file exists solely to catch stale browser/proxy requests for the old JS bundle.
// It forces a redirect to index.php with a cache-busting query parameter.
console.warn("Stale cache detected! Redirecting to fresh version...");
try {
  // Use replace to avoid back-button loop
  window.location.replace("/index.php?v=" + Date.now());
} catch (e) {
  window.location.href = "/index.php?v=" + Date.now();
}

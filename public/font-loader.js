var fontPreload = document.getElementById('font-preload');
if (fontPreload) {
  fontPreload.onload = function() {
    fontPreload.onload = null;
    fontPreload.rel = 'stylesheet';
  };
}

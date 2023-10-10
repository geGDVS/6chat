function notify(args) {
  if (localStorageGet("sound-switch") == "true") {
    var soundPromise = document.getElementById("notify-sound").play();
    if (soundPromise) {
      soundPromise.catch(function (error) {
        console.error("Problem playing sound:\n" + error);
      });
    }
  }
}
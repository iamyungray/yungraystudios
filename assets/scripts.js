window.onload = function () {
  updateDuration("b1", "bd1");
  updateDuration("b2", "bd2");

  // Initialisiert die Play-Funktionalität für jedes Audio-Element
  var allAudios = document.getElementsByTagName("audio");
  for (var i = 0; i < allAudios.length; i++) {
    allAudios[i].addEventListener("play", function () {
      stopAllAudio(this);
      this.play();
    });
  }
};

function updateDuration(audioId, durationId) {
  var audio = document.getElementById(audioId);

  function setDuration() {
    var duration = audio.duration;
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    document.getElementById(durationId).textContent =
      "" + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  if (audio.readyState > 0) {
    setDuration();
  } else {
    audio.onloadedmetadata = setDuration;
  }
}

function stopAllAudio(exceptAudio) {
  var sounds = document.getElementsByTagName("audio");
  for (var i = 0; i < sounds.length; i++) {
    if (sounds[i] !== exceptAudio) {
      sounds[i].pause();
      sounds[i].currentTime = 0;
    }
  }
}

function getGPSData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Erstelle ein Objekt mit den GPS-Daten
        const gpsData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Sende eine POST-Anfrage an die PHP-Datei
        fetch("/assets/save_gps_data.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gpsData),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log("Erfolg:", data);
          })
          .catch((error) => {
            console.error("Fehler:", error);
          });
      },
      function (error) {
        console.error("Fehler beim Erhalten der GPS-Daten: ", error);
      }
    );
  } else {
    console.error("Geolocation wird von diesem Browser nicht unterstützt.");
  }
}

// Event-Listener für den Button (Stelle sicher, dass der Button die ID 'save-gps-btn' hat)
document.getElementById("save-gps-btn").addEventListener("click", getGPSData);

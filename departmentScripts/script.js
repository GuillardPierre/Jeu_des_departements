let carteCliquable = document.querySelectorAll("path");
let zoneAffichage = document.getElementById("zoneAffichage");
let zoneScore = document.getElementById("zoneScore");
let btnLancerLeJeu = document.getElementById("lancementJeu");
let chrono = document.getElementById("chronometre");
let consigne = document.getElementById("consigne");
let modeDeJeu = document.getElementById("menuDeroulant");
let btnsAccueil = document.querySelector(".retourAccueil");
let popup = document.querySelector(".popup");
let popupMessage = document.querySelector(".popup p");
let btnOk = document.querySelector(".ok");
let departementCache = "";
let departementAColore = "";
let choixModeDeJeu = "";
let nombreHasard;
let jeuLance = false;
let score = 0;
let aideAffiche = true;
let listeTemporaire = [];
let listeTemporaireNumero = [];
let listeTemporairePrefecture = [];
modeDeJeu.value = "choix";
chrono.style.display = "none";
consigne.style.display = "none";
btnLancerLeJeu.style.display = "none";
popup.style.display = "none";
btnsAccueil.style.display = "none";

function rechargementListes() {
  // permet lors d'un lancement de jeu de charger des listes provisoires.
  listeTemporaire = [];
  listeTemporaireNumero = [];
  listeTemporairePrefecture = [];
  for (let i = 0; i < listeDepartements.length; i++) {
    listeTemporaire.push(listeDepartements[i].id);
    listeTemporaireNumero.push(listeDepartements[i].numero);
    listeTemporairePrefecture.push(listeDepartements[i].pref);
  }
}

modeDeJeu.addEventListener("change", (e) => {
  // choix du mode de jeu
  choixModeDeJeu = modeDeJeu.value;
  if (choixModeDeJeu === "trouve") {
    rechargementListes();
    chrono.style.display = "inline";
    consigne.style.display = "inline";
    btnLancerLeJeu.style.display = "inline";
    modeDeJeu.style.display = "none";
    aideAffiche = false;
    btnsAccueil.style.display = "inline";
  } else if (choixModeDeJeu === "QCM") {
    rechargementListes();
    aideAffiche = false;
    zoneQuestionQCM.style.display = "inline";
    modeDeJeu.style.display = "none";
    btnsAccueil.style.display = "inline";
    lancementQCM();
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

for (let i = 0; i < carteCliquable.length; i++) {
  // a chaque clique sur la carte, on lance la fonction de vérification et on vérifie si le jeu est bientôt fini.
  carteCliquable[i].addEventListener("click", (e) => {
    verifChoixJoueur(carteCliquable[i].getAttribute("id"));
    verifFinDeJeu();
  });
}

function departementAuHasard() {
  // Permet de choisir un département au hasard pour le mode de jeu "trouve le département"
  if (jeuLance === true) {
    nombreHasard = getRandomInt(listeTemporaire.length);
    console.log(nombreHasard);
    departementCache = listeTemporaire[nombreHasard];
    console.log(departementCache);
    zoneAffichage.innerHTML = departementCache;
  }
}

function verifChoixJoueur(cliqueJoueur) {
  //permet de vérifier le choix des joueurs pour le jeu "trouve le département"
  console.log(cliqueJoueur);
  if (cliqueJoueur === departementCache && jeuLance === true) {
    score++;
    zoneScore.innerHTML = score;
    departementAColore = document.getElementById(departementCache);
    departementAColore.style.fill = "green";
    listeTemporaire.splice(nombreHasard, 1);
    departementAuHasard();
  } else if (cliqueJoueur != departementCache && jeuLance === true) {
    departementAColore = document.getElementById(departementCache);
    departementAColore.style.fill = "red";
    listeTemporaire.splice(nombreHasard, 1);
    departementAuHasard();
  }
}

function verifFinDeJeu() {
  //vérifie si tous les départements de la liste temporaire ont été utilisé dans le jeu
  if (listeTemporaire.length === 0 && jeuLance === true) {
    let message = `Félicitations tu as finis le jeu avec un score de ${score}/97 ! Recharge la page pour rejouer`;
    popupMessage.innerHTML = message;
    popup.style.display = "inline";
    stopChrono();
  }
}

// function lancerJeu() {
//   rechargementListes();
//   departementAuHasard();
//   jeuLance = true;
// }

btnLancerLeJeu.addEventListener("click", () => {
  //lance le jeu "trouve le département"
  jeuLance = true;
  btnLancerLeJeu.style.display = "none";
  departementAuHasard();
  demarrerChrono();
});

// chronomètre
let minutes = 0;
let secondes = 0;
let heures = 0;
let timeout;
let estArrete = true;

function demarrerChrono() {
  if (estArrete) {
    estArrete = false;
    defilerTemps();
  }
}

function stopChrono() {
  if (estArrete === false) {
    estArrete = true;
  }
}

function defilerTemps() {
  if (estArrete) return; //exemple vu en vidéo = c'est légal ?
  secondes = parseInt(secondes);
  minutes = parseInt(minutes);
  heures = parseInt(heures);

  secondes++;

  if (secondes === 60) {
    minutes++;
    secondes = 0;
  }
  if (minutes === 60) {
    heures++;
    minutes = 0;
  }

  if (secondes < 10) {
    secondes = "0" + secondes;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (heures < 10) {
    heures = "0" + heures;
  }
  chrono.textContent = `${heures}:${minutes}:${secondes}`;
  timeout = setTimeout(defilerTemps, 1000);
}

// Mise en place de l'infobulle

let bulleInfo = document.getElementById("bulleInfo");
let espaceInfoNom = document.getElementById("nom");
let espaceInfoNumero = document.getElementById("numero");
let espaceInfoPrefecture = document.getElementById("prefecture");
let infoNom = "";
let infoNumero = "";
let infoPrefecture = "";
let k = 0;

for (let i = 0; i < carteCliquable.length; i++) {
  carteCliquable[i].addEventListener("mousemove", (e) => {
    if (aideAffiche === true) {
      infoNom = carteCliquable[i].getAttribute("id");
      espaceInfoNom.innerHTML = infoNom;
      infoNumero = carteCliquable[i].getAttribute("numero");
      espaceInfoNumero.innerHTML = infoNumero;
      infoPrefecture = carteCliquable[i].getAttribute("prefecture");
      espaceInfoPrefecture.innerHTML = infoPrefecture;
      bulleInfo.style.display = "inline";
      bulleInfo.style.left = e.clientX + 1 + "px"; // clientX/Y mieux que pageX/Y pour gérer le scroll de la page
      bulleInfo.style.top = e.clientY + 1 + "px";
    }
  });
  carteCliquable[i].addEventListener("mouseout", () => {
    bulleInfo.style.display = "none";
  });
}

btnsAccueil.addEventListener("click", () => {
  btnsAccueil.style.display = "none";
  if ((popup.style.display = "inline")) {
    popup.style.display = "none";
  }
  minutes = 0;
  secondes = 0;
  heures = 0;
  timeout;
  estArrete = true;
  chrono.textContent = `00:00:00`;
  zoneAffichage.innerHTML = "";
  score = 0;
  zoneScore.innerHTML = score;
  jeuLance = false;
  if (choixModeDeJeu === "trouve") {
    chrono.style.display = "none";
    consigne.style.display = "none";
    btnLancerLeJeu.style.display = "none";
    modeDeJeu.style.display = "inline";
    aideAffiche = true;
  } else if (choixModeDeJeu === "QCM") {
    aideAffiche = false;
    zoneQuestionQCM.style.display = "none";
    modeDeJeu.style.display = "inline";
    listeNombresInterdits = [];
    aideAffiche = true;
  }
  AllDepartements.forEach((element) => {
    element.style.fill = "#ff8c00";
  });
  modeDeJeu.value = "choix";
});

btnOk.addEventListener("click", () => {
  popup.style.display = "none";
});

const AllDepartements = document.querySelectorAll("path[numero]");

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    popup.style.display = "none";
  }
});

//bug lors du QCM = si appuie sur enter la popup ne disparait pas et à la place il valide le QCM suivant.

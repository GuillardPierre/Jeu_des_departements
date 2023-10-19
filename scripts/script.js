let carteCliquable = document.querySelectorAll("path");
let zoneAffichage = document.getElementById("zoneAffichage");
let zoneScore = document.getElementById("zoneScore");
let btnLancerLeJeu = document.getElementById("lancementJeu");
let chrono = document.getElementById("chronometre");
let consigne = document.getElementById("consigne");
let modeDeJeu = document.getElementById("menuDeroulant");
let btnsAccueil = document.querySelectorAll(".retourAccueil");
let departementCache = "";
let departementAColore = "";
let nombreHasard;
let jeuLance = false;
let score = 0;
let aideAffiche = true;
let listeTemporaire = [];
let listeTemporaireNumero = [];
let listeTemporairePrefecture = [];
chrono.style.display = "none";
consigne.style.display = "none";
btnLancerLeJeu.style.display = "none";

function rechargementListes() {
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
  let choixModeDeJeu = modeDeJeu.value;
  if (choixModeDeJeu === "trouve") {
    chrono.style.display = "inline";
    consigne.style.display = "inline";
    btnLancerLeJeu.style.display = "inline";
    modeDeJeu.style.display = "none";
  } else if (choixModeDeJeu === "QCM") {
    rechargementListes();
    aideAffiche = false;
    zoneQuestionQCM.style.display = "inline";
    modeDeJeu.style.display = "none";
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
  nombreHasard = getRandomInt(listeTemporaire.length);
  console.log(nombreHasard);
  departementCache = listeTemporaire[nombreHasard];
  console.log(departementCache);
  zoneAffichage.innerHTML = departementCache;
}

function verifChoixJoueur(cliqueJoueur) {
  console.log(cliqueJoueur);
  if (cliqueJoueur === departementCache && jeuLance === true) {
    score++;
    zoneScore.innerHTML = score;
    departementAColore = document.getElementById(departementCache);
    departementAColore.style.fill = "green";
    listeTemporaire.splice(nombreHasard, 1);
    nouvelleManche();
    // lancerJeu();
  } else if (cliqueJoueur != departementCache && jeuLance === true) {
    departementAColore = document.getElementById(departementCache);
    departementAColore.style.fill = "red";
    listeTemporaire.splice(nombreHasard, 1);
    nouvelleManche();
    // lancerJeu();
  }
}

function verifFinDeJeu() {
  if (listeTemporaire.length === 0) {
    zoneAffichage.innerText = `Félicitations tu as finis le jeu avec un score de ${score}/97 ! Recharge la page pour rejouer`;
    stopChrono();
  }
}

function nouvelleManche() {
  departementAuHasard();
}

function lancerJeu() {
  rechargementListes();
  departementAuHasard();
  jeuLance = true;
}

btnLancerLeJeu.addEventListener("click", () => {
  aideAffiche = false;
  lancerJeu();
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
      bulleInfo.style.left = e.pageX + 1 + "px";
      bulleInfo.style.top = e.pageY + 1 + "px";
    }
  });
  carteCliquable[i].addEventListener("mouseout", () => {
    bulleInfo.style.display = "none";
  });
}

// Sélection de l'écran
const ecran = document.querySelector('.ecran');

// Tous les boutons utiles (chiffres et opérateurs) ont la classe .btn
const boutons = document.querySelectorAll('.btn');

// Ajoute la valeur du bouton dans l'écran
boutons.forEach(b => {
  b.addEventListener('click', () => {
    const val = b.value;

    // Si c'est le bouton "=", on calcule
    if (val === '=') {
      calculer();
      return;
    }

    // Remplacer la virgule par un point si tu veux gérer les décimales en JS
    // et convertir X/÷ en * / pour l'évaluation
    let toAdd = val.replace('X', '*').replace('÷', '/').replace(',', '.');

    ecran.textContent += toAdd;
  });
});

// Bouton C -> tout effacer
const btnC = document.querySelector('input[value="C"]');
if (btnC) {
  btnC.addEventListener('click', () => {
    ecran.textContent = '';
  });
}

// Bouton Suppr -> effacer dernier caractère
const btnSuppr = document.querySelector('input[value="Suppr"]');
if (btnSuppr) {
  btnSuppr.addEventListener('click', () => {
    ecran.textContent = ecran.textContent.slice(0, -1);
  });
}

// Fonction de calcul simple (ATTENTION: use with simple expressions only)
function calculer() {
  try {
    const expr = ecran.textContent;

    // Empêcher l'évaluation d'une chaîne vide
    if (!expr.trim()) return;

    // Sécurité basique : n'autoriser que les caractères 0-9 + opérateurs . * / + - %
    if (!/^[0-9\s\.\+\-\*\/%()]+$/.test(expr)) {
      alert('Expression non valide');
      return;
    }

    // Évaluer l'expression
    const result = eval(expr); // pour un exercice, ok (attention en production)
    ecran.textContent = String(result);
  } catch (err) {
    alert('Erreur dans le calcul');
    console.error(err);
  }
}
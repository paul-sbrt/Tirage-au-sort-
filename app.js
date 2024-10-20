let names = [];
let subjects = [];
let simpleNames = [];

// Fonction pour afficher le tirage complexe
document
  .getElementById("show-complex-draw")
  .addEventListener("click", function () {
    document.getElementById("complex-draw").style.display = "block";
    document.getElementById("simple-draw").style.display = "none";
    document.getElementById("results").innerHTML = ""; // Clear results
    document.getElementById("result-title").style.display = "none"; // Hide result title
    hideErrors(); // Hide previous errors
  });

// Fonction pour afficher le tirage simple
document
  .getElementById("show-simple-draw")
  .addEventListener("click", function () {
    document.getElementById("simple-draw").style.display = "block";
    document.getElementById("complex-draw").style.display = "none";
    document.getElementById("results").innerHTML = ""; // Clear results
    document.getElementById("result-title").style.display = "none"; // Hide result title
    hideErrors(); // Hide previous errors
  });

// Fonction pour masquer les erreurs
function hideErrors() {
  document.getElementById("names-error").style.display = "none";
  document.getElementById("subjects-error").style.display = "none";
  document.getElementById("simple-names-error").style.display = "none";
}

// Ajouter un nom pour le tirage complexe
document.getElementById("add-name-btn").addEventListener("click", function () {
  const nameInput = document.getElementById("name-input").value.trim();
  if (nameInput) {
    names.push(nameInput);
    updateList("names-list", names, "name");
    document.getElementById("name-input").value = "";
  }
});

// Ajouter un sujet pour le tirage complexe
document
  .getElementById("add-subject-btn")
  .addEventListener("click", function () {
    const subjectInput = document.getElementById("subject-input").value.trim();
    if (subjectInput) {
      subjects.push(subjectInput);
      updateList("subjects-list", subjects, "subject");
      document.getElementById("subject-input").value = "";
    }
  });

// Ajouter un nom pour le tirage simple
document
  .getElementById("add-simple-name-btn")
  .addEventListener("click", function () {
    const simpleNameInput = document
      .getElementById("simple-name-input")
      .value.trim();
    if (simpleNameInput) {
      simpleNames.push(simpleNameInput);
      updateList("simple-names-list", simpleNames, "simpleName");
      document.getElementById("simple-name-input").value = "";
    }
  });

// Mettre à jour la liste visible et ajouter un bouton de suppression
function updateList(elementId, array, type) {
  const list = document.getElementById(elementId);
  list.innerHTML = ""; // Vider la liste actuelle
  array.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;

    // Bouton de suppression
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      removeItem(index, type);
    });

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  });
}

// Supprimer un élément de la liste
function removeItem(index, type) {
  if (type === "name") {
    names.splice(index, 1);
    updateList("names-list", names, "name");
  } else if (type === "subject") {
    subjects.splice(index, 1);
    updateList("subjects-list", subjects, "subject");
  } else if (type === "simpleName") {
    simpleNames.splice(index, 1);
    updateList("simple-names-list", simpleNames, "simpleName");
  }
}

// Lancer le tirage complexe
document
  .getElementById("start-complex-draw")
  .addEventListener("click", function () {
    hideErrors(); // Hide previous errors

    if (names.length === 0) {
      document.getElementById("names-error").style.display = "block";
    }

    if (subjects.length === 0) {
      document.getElementById("subjects-error").style.display = "block";
    }

    if (names.length === 0 || subjects.length === 0) {
      return;
    }

    let results = document.getElementById("results");
    results.innerHTML = ""; // Vider les résultats précédents
    document.getElementById("result-title").style.display = "block"; // Afficher le titre "Résultat"

    let subjectIndex = 0;

    while (names.length > 0) {
      let randomNameIndex = Math.floor(Math.random() * names.length);

      let name = names.splice(randomNameIndex, 1)[0];
      let subject = subjects[subjectIndex % subjects.length]; // Réutiliser les sujets si nécessaire

      let listItem = document.createElement("li");
      listItem.textContent = `${name} aura le sujet : ${subject}`;
      results.appendChild(listItem);

      subjectIndex++;
    }
  });

// Lancer le tirage simple
document
  .getElementById("start-simple-draw")
  .addEventListener("click", function () {
    hideErrors(); // Hide previous errors

    if (simpleNames.length === 0) {
      document.getElementById("simple-names-error").style.display = "block";
      return;
    }

    let results = document.getElementById("results");
    results.innerHTML = ""; // Vider les résultats précédents
    document.getElementById("result-title").style.display = "block"; // Afficher le titre "Résultat"

    let randomNameIndex = Math.floor(Math.random() * simpleNames.length);
    let name = simpleNames[randomNameIndex];

    let listItem = document.createElement("li");
    listItem.textContent = `Le nom tiré au sort est : ${name}`;
    results.appendChild(listItem);
  });

// 1. Sélectionner les éléments
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");


// 2. Ajouter une tâche au clic
addBtn.addEventListener("click", addTask);

// 3. Ajouter une tâche si on appuie sur "Entrée"
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// 4. Fonction principale : ajouter une tâche
function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }

  // Créer un élément <li>
  const li = document.createElement("li");
  li.textContent = taskText;

  // Supprimer une tâche
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
  li.remove();

  // ✅ Afficher le message de suppression
  message.textContent = "Tâche supprimée 🗑️";
  message.classList.add("show");

  // 🔁 Cacher le message après 2 secondes
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
  });


  // Marquer comme terminée
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  // Ajouter le bouton à la tâche
  li.appendChild(deleteBtn);

  // Ajouter la tâche à la liste
  taskList.appendChild(li);

  // Réinitialiser le champ
  input.value = "";

  // Afficher un message de confirmation
message.textContent = "Tâche ajoutée avec succès ✅";
message.classList.add("show");

// Cacher le message après 2 secondes
setTimeout(() => {
  message.classList.remove("show");
}, 2000);
}
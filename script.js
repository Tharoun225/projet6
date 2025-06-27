// 1. Sélectionner les éléments
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-btn");
const resetBtn = document.getElementById("reset-filters");
const searchInput = document.getElementById("search-input");
const toggleThemeBtn = document.getElementById("toggle-theme");
const themeToggle = document.getElementById("toggle-theme");


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
  const dateValue = taskDate.value;

  if (taskText === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }

  // Créer un élément <li>
  const li = document.createElement("li");
    let dueText = "";
      if (dateValue) {
        const today = new Date();
        const dueDate = new Date(dateValue);

      if (dueDate < today.setHours(0, 0, 0, 0)) {
        dueText = `<small class="due-date late">🛑 En retard : ${dateValue}</small>`;
      } else {
        dueText = `<small class="due-date">🗓️ ${dateValue}</small>`;
      }
      }

    li.innerHTML = `
      <span>${taskText}</span>
      ${dueText}
    `;


  // Supprimer une tâche
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
    saveTasks();

    // ✅ Afficher le message de suppression
    message.textContent = "Tâche supprimée 🗑️";
    message.classList.add("show");

    setTimeout(() => {
      message.classList.remove("show");
    }, 2000);
  });

  // Marquer comme terminée
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateCounter();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  input.value = "";

  // ✅ Afficher le message de confirmation
  message.textContent = "Tâche ajoutée avec succès ✅";
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
  updateCounter();
  saveTasks();
}

// ✅ 5. Système de filtrage — à l’extérieur de la fonction
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Enlever tous les actifs
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "done":
          task.classList.contains("done") ? task.style.display = "flex" : task.style.display = "none";
          break;
        case "todo":
          task.classList.contains("done") ? task.style.display = "none" : task.style.display = "flex";
          break;
      }
    });
  });
});

resetBtn.addEventListener("click", () => {
  // Supprimer l'état actif des filtres
  filterButtons.forEach(b => b.classList.remove("active"));

  // Afficher toutes les tâches
  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach(task => {
    task.style.display = "flex";
  });

  // Facultatif : ajouter un effet ou message
  message.textContent = "Filtres réinitialisés ♻️";
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
});

function updateCounter() {
  const tasks = document.querySelectorAll("#task-list li");
  const done = document.querySelectorAll("#task-list li.done").length;
  const total = tasks.length;
  const todo = total - done;

  document.getElementById("total").textContent = total;
  document.getElementById("done").textContent = done;
  document.getElementById("todo").textContent = todo;
}

const clearAllBtn = document.getElementById("clear-all");

clearAllBtn.addEventListener("click", () => {
  // Supprimer toutes les tâches de la liste
  taskList.innerHTML = "";

  // Réinitialiser le compteur
  updateCounter();

  // Vider le localStorage
  localStorage.removeItem("tasks");

  // Afficher un message de confirmation
  message.textContent = "Toutes les tâches ont été effacées 🧹";
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(task => {
    tasks.push({
      text: task.firstChild.textContent.trim(), // texte de la tâche
      done: task.classList.contains("done")     // booléen
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      li.remove();
      updateCounter();
      saveTasks();
      message.textContent = "Tâche supprimée 🗑️";
      message.classList.add("show");
      setTimeout(() => {
        message.classList.remove("show");
      }, 2000);
    });

    li.addEventListener("click", () => {
      li.classList.toggle("done");
      updateCounter();
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll("#task-list li");

  tasks.forEach(task => {
    const span = task.querySelector("span");
    const taskText = span ? span.textContent.toLowerCase() : "";

    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});


const body = document.body;

// Vérifier si un thème est déjà stocké
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Mode Clair";
}

// Basculement au clic
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Mémoriser le thème
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️ Mode Clair";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 Mode Sombre";
  }
});
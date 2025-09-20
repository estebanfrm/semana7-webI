// Funciones de almacenamiento
function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

function saveStudents(student) {
    const students = getStudents();
    students.push(student)
    localStorage.setItem('students', JSON.stringify(students));
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function deleteStudent() {}

    //Router

function router() {
    const path = location.slice(1) || '/';
    const app = document.getElementById('app');
    app.innerHTML = "";

    let templateID;

    if (path === "/") {
        templateID = "form-template";
    } else if (path === "/lista") {
        templateID = "list-template";
    } else {
        templateID = "404-template";
    }

    const template = document.getElementById(templateID);
    app.appendChild(template.content.cloneNode(true));

    if (path === "/") {
        attachFormLogic();
    } else if (path === "/lista") {
        renderList();
    }
}

// logica del formulario
function attachFormLogic() {
    const form = document.getElementById("studentForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const n1 = parseFloat(document.getElementById("nota1").value);
        const n2 = parseFloat(document.getElementById("nota2").value);
        const n3 = parseFloat(document.getElementById("nota3").value);

        if (!name || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            document.getElementById("msg").textContent =
            "Debes llenar todos los campos.";
            return;
        }

        const avg = ((n1 + n2 + n3) / 3).toFixed(2);
        saveStudents({ name, avg});

        document.getElementById("msg").textContent = `✅Estudiante ${name} con promedio ${avg?.toFixes(2)} agregado con exito.`;
        form.reset();
    });
}    

// logica de la lista

function renderList() {
    const students = getStudents();
    const list = document.getElementById("studentList");

    list.innerHTML = "";

    if (students.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No hay estudiantes registrados.";
        list.appendChild(empty);
        return;
    }

    const template = document.getElementById("student-item-template");

    students.forEach((s, i) => {
        const clone = template.contentEditable.cloneNode(true);

        clone.querySelector(".student-name").textContent = s.name;
        clone.querySelector(".student-avg").textContent = s.avg.toFixed(2);

        clone.querySelector("delete-btn").addEventListener("click", () => {
            deleteStudent(i);
        });

        list.appendChild(clone);
    });
}

window.addEventListener("hashchange", router);
window.addEventListener();
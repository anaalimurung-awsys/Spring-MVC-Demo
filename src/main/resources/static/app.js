const API_URL = "http://localhost:8080/api/students";

/**
 * Function to create a student.
 */
async function createStudent(studentData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(studentData)
        });

        if(response.ok) {
            alert("Student added successfully");
            resetForm();
        }
        else {
            alert("Error adding student");
        }
    } catch (e) {
        console.error("Error creating student: ", e);
    }
}

/**
 * Event listener for submit button.
 */
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    if(!validateStudentForm()) {
        return;
    }

    const id = document.getElementById("studentId").value;
    const studentData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    if(id) 
        updateStudent(id, studentData);
    else 
        createStudent(studentData);
});

/**
 * Helper function to reset form state.
 */
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentForm").reset();
}

/**
 * Function to validate the data inputted.
 * @returns isValid (boolean; true)
 */
function validateStudentForm() {
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
        
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");

    clearValidationStyles();

    /**
     * For first and last names validation
     */
    if (firstName.value.trim() === "") {
        firstNameError.textContent = "First name is required.";
        firstName.classList.add("invalid");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent = "First name must be at least 2 characters long.";
        firstName.classList.add("invalid");
        isValid = false;
    }

    if (lastName.value.trim() === "") {
        lastNameError.textContent = "Last name is required.";
        lastName.classList.add("invalid");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        lastNameError.textContent = "Last name must be at least 2 characters long.";
        lastName.classList.add("invalid");
        isValid = false;
    }

    /**
     * For email validation
     */
    const emailValue = email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        emailError.textContent = "Email address is required.";
        email.classList.add("invalid");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address (e.g. ex@ample.com)"
        email.classList.add("invalid");
        isValid = false;
    }

    return isValid;
}

/**
 * Function to clean the form.
 */
function clearValidationStyles() {
    const fields = ["firstName", "lastName", "email"];
    
    fields.forEach(fieldId =>{
        const elem = document.getElementById(fieldId);
        const errSpan = document.getElementById(`${fieldId}Error`);

        if (elem) elem.classList.remove("invalid");
        if (errSpan) errSpan.textContent = "";
    });
}

/**
 * Function to get all student data.
 */
async function getAllStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Network response was not ok");

        const studs = await response.json();
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        studs.forEach(stud => {
            const row = `
                <tr>
                    <td>${stud.id}</td>
                    <td>${stud.firstName}</td>
                    <td>${stud.lastName}</td>
                    <td>${stud.email}</td>
                    <td>
                        <button class="btn-edit" onclick="initializeStudentFormById(${stud.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteStudent(${stud.id})">Delete</button>
                    </td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.error("Error fetching data.", e);
        alert("Failed to fetch student data. Is the backend running?");
    }
}

/**
 * Event listener for GET.
 */
document.addEventListener("DOMContentLoaded", getAllStudents);

/**
 * Method to initialize update.
 */
async function initializeStudentFormById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error("Could not fetch student details");

        const stud = await response.json();

        document.getElementById("studentId").value = stud.id;
        document.getElementById("firstName").value = stud.firstName;
        document.getElementById("lastName").value = stud.lastName;
        document.getElementById("email").value = stud.email;

        const submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Update";
        submitBtn.style.backgroundColor = "#007bff";

        clearValidationStyles();

    } catch (e) {
        console.error("Error fetching student details: ", e);
    }
}

/**
 * Method to update student.
 */
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Student updated successfully.");
            resetForm();
            getAllStudents();
        } else {
            alert("Error updating student");
        }

    } catch (e) {
        console.error("Error updating student: ", e);
    }
}

/**
 * Method to delete student.
 */
async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const message = await response.text();
                alert(message);
                getAllStudents();
            } else {
                alert("Error deleteing student.");
            }
        } catch (e) {
            console.error("Error deleting student:", e);
        }
    }
}
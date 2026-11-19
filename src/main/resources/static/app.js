const API_URL = "http://localhost:8080/api/students";

/**
 * Creating a student
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
        console.error("Error creating student: ", error);
    }
}

/**
 * Event listener for submit button.
 */
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const studentData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value
    };

    createStudent(studentData);
});

/**
 * Helper function to reset form state.
 */
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentForm").reset();
}

function validateStudentForm() {
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
        
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
}
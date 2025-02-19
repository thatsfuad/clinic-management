document.addEventListener("DOMContentLoaded", function () {
    loadDashboardData();
    loadPatients();
    loadAppointments();
    loadRecoveryRecords();
});

// -------------------- DASHBOARD DATA --------------------

function loadDashboardData() {
    fetch("/api/dashboard_data")
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalPatients").textContent = data.total_patients;
            document.getElementById("pendingAppointments").textContent = data.pending_appointments;
            document.getElementById("activeEmergencies").textContent = data.active_emergencies;
        })
        .catch(error => console.error("Error loading dashboard data:", error));
}

// -------------------- PATIENT MANAGEMENT --------------------

function loadPatients() {
    fetch("/get_patients")
        .then(response => response.json())
        .then(patients => {
            const tbody = document.getElementById("patientList");
            tbody.innerHTML = "";

            patients.forEach(patient => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.patient_id}</td>
                    <td>${patient.surgery_details || ""}</td>
                    <td>${patient.recovery_progress || ""}</td>
                    <td>
                        <button onclick="deletePatient('${patient.patient_id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading patients:", error));
}

document.getElementById("patientForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        patient_id: document.getElementById("patientId").value,
        patient_name: document.getElementById("patientName").value,
        surgery_details: document.getElementById("surgeryDetails").value,
        recovery_progress: document.getElementById("recoveryProgress").value
    };

    fetch("/add_patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadPatients();
            document.getElementById("patientForm").reset();
        })
        .catch(error => console.error("Error adding patient:", error));
});

function deletePatient(patientId) {
    if (confirm("Are you sure you want to delete this patient?")) {
        fetch("/delete_patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patient_id: patientId })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadPatients();
            })
            .catch(error => console.error("Error deleting patient:", error));
    }
}

// -------------------- APPOINTMENT MANAGEMENT --------------------

function loadAppointments() {
    fetch("/get_appointments")
        .then(response => response.json())
        .then(appointments => {
            const tbody = document.getElementById("appointmentList");
            tbody.innerHTML = "";

            appointments.forEach(appointment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${appointment.patient_name}</td>
                    <td>${appointment.appointment_date}</td>
                    <td>${appointment.time}</td>
                    <td>${appointment.notes || ""}</td>
                    <td>
                        ${appointment.status !== "Completed"
                            ? `<button onclick="completeAppointment(${appointment.id})">Complete</button>`
                            : "<span>Completed</span>"}
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading appointments:", error));
}

function completeAppointment(appointmentId) {
    if (confirm("Mark this appointment as completed?")) {
        fetch("/complete_appointment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appointment_id: appointmentId })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadAppointments();
            })
            .catch(error => console.error("Error completing appointment:", error));
    }
}

// -------------------- RECOVERY MONITORING --------------------

function loadRecoveryRecords() {
    fetch("/get_recovery_records")
        .then(response => response.json())
        .then(records => {
            const tbody = document.getElementById("recoveryList");
            tbody.innerHTML = "";

            records.forEach(record => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.patient_name}</td>
                    <td>${record.wound_details}</td>
                    <td>${record.recovery_status}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading recovery records:", error));
}

document.getElementById("recoveryForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        patient_id: document.getElementById("patientId").value,
        patient_name: document.getElementById("patientName").value,
        wound_details: document.getElementById("woundDetails").value,
        recovery_status: document.getElementById("recoveryStatus").value
    };

    fetch("/update_recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadRecoveryRecords();
            document.getElementById("recoveryForm").reset();
        })
        .catch(error => console.error("Error updating recovery progress:", error));
});

// -------------------- REPORT GENERATION --------------------

document.getElementById("reportForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const reportType = document.getElementById("reportType").value;

    fetch("/download_report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType: reportType })
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "report.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => console.error("Error generating report:", error));
});

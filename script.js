// DOM Element References - Get references to key UI elements
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Database of doctors with their details including availability and time slots
const doctors = [

    { "id": 1, "name": "Dr. Srinivas V K", "specialization": "Cardiologist", "availability": ["Monday", "Wednesday", "Friday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:30 PM", "3:00 PM"] },
    { "id": 2, "name": "Dr. Neha Gupta", "specialization": "Dermatologist", "availability": ["Tuesday", "Thursday", "Saturday"], "timeSlots": ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"] },
    { "id": 3, "name": "Dr. Sarbari Gupta", "specialization": "Pediatrician", "availability": ["Monday", "Wednesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] },
    { "id": 4, "name": "Dr. Mohan M R", "specialization": "Orthopedic", "availability": ["Tuesday", "Thursday", "Saturday"], "timeSlots": ["9:30 AM", "11:30 AM", "1:30 PM", "3:30 PM"] },
    { "id": 5, "name": "Dr. Roopa Bhushan", "specialization": "Gastroenterologist", "availability": ["Monday", "Wednesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM", "8:30 PM"] },
    { "id": 6, "name": "Dr. Rajesh K N", "specialization": "Neurologist", "availability": ["Tuesday", "Thursday", "Saturday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 7, "name": "Dr. Anand Jayaraman", "specialization": "Psychiatrist", "availability": ["Monday", "Wednesday", "Friday"], "timeSlots": ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"] },
    { "id": 8, "name": "Dr. Anil Kamath", "specialization": "Oncologist", "availability": ["Tuesday", "Thursday", "Saturday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] },
    { "id": 9, "name": "Dr. Prabha Ramadorai", "specialization": "General Physician", "availability": ["Monday", "Tuesday", "Wednesday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 10, "name": "Dr. Deepak Kulkarni", "specialization": "Endocrinologist", "availability": ["Monday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 11, "name": "Dr. Meera Patil", "specialization": "Pulmonologist", "availability": ["Monday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 12, "name": "Dr. Arjun Iyer", "specialization": "Rheumatologist", "availability": ["Tuesday", "Saturday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 13, "name": "Dr. Kavitha Ramesh", "specialization": "Urologist", "availability": ["Wednesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] },
    { "id": 14, "name": "Dr. Shalini Rao", "specialization": "Gynecologist", "availability": ["Tuesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] },
    { "id": 15, "name": "Dr. Varun Shetty", "specialization": "Otolaryngologist", "availability": ["Wednesday", "Saturday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 16, "name": "Dr. Preethi Nair", "specialization": "Allergist", "availability": ["Monday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 17, "name": "Dr. Ravi Krishnan", "specialization": "Physiatrist", "availability": ["Tuesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] },
    { "id": 18, "name": "Dr. Sandhya Narayan", "specialization": "Infectious Disease Specialist", "availability": ["Monday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 19, "name": "Dr. Nandini Rao", "specialization": "Ophthalmologist", "availability": ["Monday", "Thursday"], "timeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    { "id": 20, "name": "Dr. Sameer Menon", "specialization": "Orthopedic Surgeon", "availability": ["Tuesday", "Saturday"], "timeSlots": ["9:30 AM", "11:30 AM", "1:30 PM", "3:30 PM"] },
    { "id": 21, "name": "Dr. Lakshmi Krishnan", "specialization": "Geriatrician", "availability": ["Wednesday", "Friday"], "timeSlots": ["8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM"] }


];

/**
 * Adds a message to the chat box
 * @param {string} message - The message to be displayed
 * @param {boolean} isUser - Whether the message is from the user (true) or bot (false)
 */
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = message;

    messageDiv.appendChild(content);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Adds clickable option buttons to the chat interface
 * @param {string[]} options - Array of option texts to be displayed as buttons
 */
function addOptions(options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => {
            handleUserInput(option);
            optionsContainer.remove();
        };
        optionsContainer.appendChild(button);
    });

    chatBox.appendChild(optionsContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email format is valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Stores appointment data in session storage for temporary state management
 * @param {Object} appointment - Appointment details
 * @param {string} mode - Mode of operation ('checkAppointment' by default)
 */
function setAppointmentSession(appointment, mode = 'checkAppointment') {
    const appointmentData = {
        id: appointment.id,
        doctor: appointment.doctor,
        day: appointment.day,
        time: appointment.time,
        originalData: JSON.stringify(appointment)
    };
    sessionStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    sessionStorage.setItem('mode', mode);
}

/**
 * Retrieves appointment data from session storage
 * @returns {Object|null} - Appointment data if exists, null otherwise
 */
function getAppointmentSession() {
    const data = sessionStorage.getItem('appointmentData');
    return data ? JSON.parse(data) : null;
}

/**
 * Checks if a specific time slot is available for a doctor
 * @param {string} doctor - Doctor's name
 * @param {string} day - Day of the week
 * @param {string} time - Time slot
 * @returns {boolean} - True if time slot is available, false if already booked
 */
function isTimeSlotAvailable(doctor, day, time) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
    return !Object.values(appointments).some(appointment =>
        appointment.doctor === doctor &&
        appointment.day === day &&
        appointment.time === time &&
        appointment.status === 'Confirmed'
    );
}

/**
 * Gets available time slots for a doctor on a specific day
 * @param {Object} doctor - Doctor object containing time slots
 * @param {string} day - Day of the week
 * @returns {string[]} - Array of available time slots
 */
function getAvailableTimeSlots(doctor, day) {
    return doctor.timeSlots.filter(time => isTimeSlotAvailable(doctor.name, day, time));
}

/**
 * Main function to process user input and handle different chat scenarios
 * @param {string} input - User's input message
 * @returns {Promise<void>}
 */
async function processInput(input) {
    input = input.toLowerCase().trim();

    // Handle symptom description request
    if (input === "try describing your symptoms again") {
        sessionStorage.setItem('mode', 'symptoms');
        addMessage("Please describe your symptoms:");
        return;
    }

    // Handle viewing all doctors
    if (input === "view all doctors") {
        addMessage("Here are all our available doctors:");
        doctors.forEach(doctor => {
            addMessage(`${doctor.name} - ${doctor.specialization}\nAvailable on: ${doctor.availability.join(', ')}`);
        });
        addMessage("Would you like to book an appointment with any of these doctors?");
        addOptions(doctors.map(doctor => `Book with ${doctor.name} (${doctor.specialization})`));
        return;
    }

    // Handle main menu navigation
    if (input === "go back to main menu") {
        clearSessionStorage();
        addMessage("How can I help you today?");
        addOptions([
            "Describe your symptoms",
            "Book an appointment",
            "View available doctors",
            "Check appointment status",
            "Cancel appointment",
            "Update appointment"
        ]);
        return;
    }

    // Get current session state
    const currentMode = sessionStorage.getItem('mode');
    const selectedDoctor = JSON.parse(sessionStorage.getItem('selectedDoctor'));
    const selectedDay = sessionStorage.getItem('selectedDay');
    const selectedTime = sessionStorage.getItem('selectedTime');

    // Handle doctor selection and day booking
    if (selectedDoctor && !selectedDay && currentMode !== 'updateAppointment' &&
        currentMode !== 'cancelAppointment' && currentMode !== 'checkStatus') {
        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const inputDay = daysOfWeek.find(day => input.toLowerCase() === day);

        if (inputDay && selectedDoctor.availability.includes(inputDay.charAt(0).toUpperCase() + inputDay.slice(1))) {
            const availableTimeSlots = getAvailableTimeSlots(selectedDoctor, inputDay.charAt(0).toUpperCase() + inputDay.slice(1));

            if (availableTimeSlots.length === 0) {
                addMessage(`I apologize, but ${selectedDoctor.name} has no available time slots for ${inputDay}. Please select another day or doctor:`);
                addOptions([
                    ...selectedDoctor.availability.map(day => day.toLowerCase()),
                    "View all doctors",
                    "Go back to main menu"
                ]);
                return;
            }

            sessionStorage.setItem('selectedDay', inputDay);
            addMessage(`Great! Here are the available time slots for ${selectedDoctor.name} on ${inputDay}:`);
            addOptions(availableTimeSlots);
            return;
        }
    }

    // Handle time slot selection
    if (selectedDoctor && selectedDay && !selectedTime) {
        const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s*(AM|PM|am|pm)$/;
        if (timeRegex.test(input)) {
            const normalizedTime = input.toUpperCase();
            if (selectedDoctor.timeSlots.includes(normalizedTime)) {
                if (isTimeSlotAvailable(selectedDoctor.name, selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1), normalizedTime)) {
                    sessionStorage.setItem('selectedTime', normalizedTime);
                    addMessage("Please provide your email to confirm the appointment:");
                    return;
                } else {
                    addMessage("I apologize, but this time slot is no longer available. Please select another time slot:");
                    const availableTimeSlots = getAvailableTimeSlots(selectedDoctor, selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1));
                    addOptions(availableTimeSlots);
                    return;
                }
            } else {
                addMessage("That time slot is not available. Please select from the following time slots:");
                const availableTimeSlots = getAvailableTimeSlots(selectedDoctor, selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1));
                addOptions(availableTimeSlots);
                return;
            }
        }

        if (input.toLowerCase() !== 'back' && input.toLowerCase() !== 'cancel') {
            addMessage("Please select a valid time slot from the options below:");
            const availableTimeSlots = getAvailableTimeSlots(selectedDoctor, selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1));
            addOptions(availableTimeSlots);
            return;
        }
    }

    // Handle appointment confirmation and email sending
    if (selectedDoctor && selectedDay && selectedTime && isValidEmail(input)) {
        const appointmentId = Math.random().toString(36).substr(2, 9);
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};

        appointments[appointmentId] = {
            doctor: selectedDoctor.name,
            day: selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1),
            time: selectedTime,
            email: input,
            status: 'Confirmed'
        };

        localStorage.setItem('appointments', JSON.stringify(appointments));

        fetch('http://localhost:3000/send-appointment-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctor: selectedDoctor.name,
                day: selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1),
                time: selectedTime,
                email: input,
                appointmentId: appointmentId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    addMessage(`Appointment Confirmed!
                    Doctor: ${selectedDoctor.name}
                    Day: ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                    Time: ${selectedTime}
                    Email: ${input}
                    Appointment ID: ${appointmentId}

                  ✅  A confirmation email has been sent to your inbox.`);
                } else {
                    addMessage(`Appointment Confirmed!
                    Doctor: ${selectedDoctor.name}
                    Day: ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                    Time: ${selectedTime}
                    Email: ${input}
                    Appointment ID: ${appointmentId}
                    
                    ⚠️ Note: There was an issue sending the confirmation email.`);
                }
            })
            .catch(error => {
                console.error('Error sending confirmation email:', error);
                addMessage(`Appointment Confirmed!
                Doctor: ${selectedDoctor.name}
                Day: ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                Time: ${selectedTime}
                Email: ${input}
                Appointment ID: ${appointmentId}
                
                ⚠️ Note: There was an issue sending the confirmation email.`);
            });

        addCalendarLinkToConfirmation(selectedDoctor.name, selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1), selectedTime);

        clearSessionStorage();

        setTimeout(() => {
            addMessage("Your appointment is confirmed. We look forward to seeing you!");
        }, 1000);

        return;
    } else if (selectedDoctor && selectedDay && selectedTime) {
        addMessage("Invalid email format. Please provide a valid email address:");
        return;
    }

    // Handle doctor booking requests
    if (input.includes('book with dr.') || input.includes('book with doctor')) {
        const doctorName = input.replace(/book with (dr\.|doctor)\s*/i, '').trim();
        const doctor = doctors.find(doc =>
            doctorName.toLowerCase().includes(doc.name.toLowerCase())
        );

        if (doctor) {
            sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
            addMessage(`Great! Let's schedule your appointment with ${doctor.name}.`);
            addMessage("Please select your preferred day:");
            addOptions(doctor.availability);
            return;
        }
    }

    if (input.toLowerCase().includes('book') || input.toLowerCase().includes('view doctors')) {
        sessionStorage.setItem('mode', 'selectDoctor');
        addMessage("Please select a doctor to proceed:");
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        optionsContainer.setAttribute('data-type', 'doctor-list');

        doctors.forEach(doctor => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.setAttribute('data-type', 'doctor');
            button.textContent = `${doctor.name} (${doctor.specialization})`;
            button.onclick = () => {
                sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
                addMessage(`Great! Let's schedule your appointment with ${doctor.name}.`);
                addMessage("Please select your preferred day:");
                addOptions(doctor.availability);
            };
            optionsContainer.appendChild(button);
        });
        chatBox.appendChild(optionsContainer);
        return;
    }

    if (input.toLowerCase().includes('check appointment')) {
        addMessage("Please provide your Appointment ID to check the status:");
        sessionStorage.setItem('mode', 'checkStatus');
        return;
    }

    if (currentMode === 'checkStatus') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            addMessage(`Here are your appointment details:
                Doctor: ${appointment.doctor}
                Day: ${appointment.day}
                Time: ${appointment.time}
                Status: ${appointment.status}`);
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'cancel appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'cancelAppointment');
        addMessage("Please provide your Appointment ID to cancel your appointment:");
        return;
    }

    if (currentMode === 'cancelAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            delete appointments[input];
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-cancellation-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: input
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment cancelled successfully!
                        Previous details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                       ⚠️ A cancellation confirmation email has been sent to your inbox.`);
                    }

                })
                .catch(error => {
                    console.error('Error sending cancellation email:', error);
                    addMessage(`Appointment cancelled successfully!
                    Previous details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the cancellation email.`);
                });
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'update appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'updateAppointment');
        addMessage("Please provide your Appointment ID to update your appointment:");
        return;
    }
    // Handle Update Appointment
    if (currentMode === 'updateAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            const doctor = doctors.find(d => d.name === appointment.doctor);

            if (doctor) {
                sessionStorage.setItem('appointmentToUpdate', input);
                sessionStorage.setItem('mode', 'selectUpdateOption');
                addMessage(`Current appointment details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    What would you like to update?`);
                addOptions([
                    "Update day",
                    "Update time",
                    "Cancel update"
                ]);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
            clearSessionStorage();
            setTimeout(() => {
                addMessage("What else can I help you with?");
                addOptions([
                    "Describe your symptoms",
                    "Book an appointment",
                    "View available doctors",
                    "Check appointment status",
                    "Cancel appointment",
                    "Update appointment"
                ]);
            }, 1000);
        }
        return;
    }

    // Handle update option selection
    if (currentMode === 'selectUpdateOption') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        if (input.toLowerCase() === 'update day') {
            sessionStorage.setItem('mode', 'updateDay');
            addMessage("Please select a new day:");
            addOptions(doctor.availability);
            return;
        } else if (input.toLowerCase() === 'update time') {
            sessionStorage.setItem('mode', 'updateTime');
            addMessage("Please select a new time:");
            addOptions(doctor.timeSlots);
            return;
        } else if (input.toLowerCase() === 'cancel update') {
            clearSessionStorage();
            addMessage("Update cancelled. What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
            return;
        }
    }

    // Handle day update
    if (currentMode === 'updateDay') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const inputDay = daysOfWeek.find(day => input.toLowerCase() === day);

        if (inputDay && doctor.availability.includes(inputDay.charAt(0).toUpperCase() + inputDay.slice(1))) {
            const oldDay = appointment.day;
            appointment.day = inputDay.charAt(0).toUpperCase() + inputDay.slice(1);
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-update-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    oldDay: oldDay
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid day from the options below:");
            addOptions(doctor.availability);
            return;
        }
    }

    // Handle time update
    if (currentMode === 'updateTime') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const lowercaseTimeSlots = doctor.timeSlots.map(slot => slot.toLowerCase());
        const lowercaseInput = input.toLowerCase().trim();

        if (lowercaseTimeSlots.includes(lowercaseInput)) {
            const oldTime = appointment.time;
            appointment.time = input;
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-appointment-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    type: 'update',
                    oldTime: oldTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid time from the options below:");
            addOptions(doctor.timeSlots);
            return;
        }
    }

    // Handle confirm update
    function handleConfirmUpdate(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        if (input.toLowerCase().includes('yes')) {
            const doctor = doctors.find(doc => doc.name === appointmentData.doctor);

            if (doctor) {
                const updatedAppointmentData = {
                    ...appointmentData,
                    availableTimeSlots: doctor.timeSlots
                };
                setAppointmentSession(updatedAppointmentData, 'selectTime');

                addMessage(`Please select a new time slot for your appointment with ${doctor.name} on ${appointmentData.day}:`);
                addOptions(doctor.timeSlots);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else if (input.toLowerCase().includes('no') || input.toLowerCase().includes('back')) {
            addMessage("Returning to the main menu. What would you like to do?");
            resetToMainMenu();
        }
    }

    // Handle select time
    function handleSelectTime(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData || !appointmentData.availableTimeSlots) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        const newTime = input.trim();

        if (!appointmentData.availableTimeSlots.includes(newTime)) {
            addMessage("Invalid time slot. Please select a valid time slot from the options below:");
            addOptions(appointmentData.availableTimeSlots);
            return;
        }

        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        appointments[appointmentData.id] = {
            ...appointments[appointmentData.id],
            time: newTime
        };
        localStorage.setItem('appointments', JSON.stringify(appointments));

        addMessage(`Appointment updated successfully!
            Doctor: ${appointmentData.doctor}
            Day: ${appointmentData.day}
            Time: ${newTime}`);

        clearSessionStorage();
        setTimeout(() => {
            addMessage("Your appointment is updated. We look forward to seeing you!");
        }, 1000);
    }

    // Reset to main menu
    function resetToMainMenu() {
        clearSessionStorage();
        addOptions([
            "Describe your symptoms",
            "Book an appointment",
            "View available doctors",
            "Check appointment status",
            "Cancel appointment",
            "Update appointment"
        ]);
    }

    if (currentMode === 'symptoms') {
        try {
            const response = await fetch('/analyze_symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms: input })
            });

            if (response.ok) {
                const result = await response.json();
                const recommendation = result.recommendation;
                addMessage(recommendation);

                const matchingDoctors = doctors.filter(doctor =>
                    doctor.specialization.toLowerCase() === result.specialty.toLowerCase()
                );

                if (matchingDoctors.length > 0) {
                    addMessage("Based on your symptoms, here are the recommended specialists:");
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'options-container';
                    optionsContainer.setAttribute('data-type', 'doctor-list');

                    matchingDoctors.forEach(doctor => {
                        const button = document.createElement('button');
                        button.className = 'option-button';
                        button.setAttribute('data-type', 'doctor');
                        button.textContent = `Book with ${doctor.name} (${doctor.specialization})`;
                        button.onclick = () => {
                            sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
                            addMessage(`Great! Let's schedule your appointment with ${doctor.name}.`);
                            addMessage("Please select your preferred day:");
                            addOptions(doctor.availability);
                        };
                        optionsContainer.appendChild(button);
                    });
                    chatBox.appendChild(optionsContainer);
                } else {
                    const generalPhysician = doctors.find(doctor => doctor.specialization.toLowerCase() === "general physician");
                    if (generalPhysician) {
                        addMessage("For your symptoms, I recommend consulting with our General Physician first.");
                        const optionsContainer = document.createElement('div');
                        optionsContainer.className = 'options-container';
                        optionsContainer.setAttribute('data-type', 'doctor-list');

                        const button = document.createElement('button');
                        button.className = 'option-button';
                        button.setAttribute('data-type', 'doctor');
                        button.textContent = `Book with ${generalPhysician.name} (${generalPhysician.specialization})`;
                        button.onclick = () => {
                            sessionStorage.setItem('selectedDoctor', JSON.stringify(generalPhysician));
                            addMessage(`Great! Let's schedule your appointment with ${generalPhysician.name}.`);
                            addMessage("Please select your preferred day:");
                            addOptions(generalPhysician.availability);
                        };
                        optionsContainer.appendChild(button);
                        chatBox.appendChild(optionsContainer);
                    } else {
                        addMessage("I apologize, but we don't have any specialists or general physicians available at the moment.");
                        addMessage("Would you like to see other available doctors?");
                        addOptions(["View all doctors", "Go back to main menu"]);
                    }
                }
            } else {
                addMessage("I'm having trouble analyzing your symptoms. Would you like to:");
                addOptions([
                    "Try describing your symptoms again",
                    "View all doctors",
                    "Go back to main menu"
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage("I apologize, but I'm having trouble processing your request. Please try again.");
        }
        return;
    }

    if (input.includes('view all doctors') || input.includes('see all doctors')) {
        addMessage("Here are all our available doctors:");
        doctors.forEach(doctor => {
            addMessage(`${doctor.name} - ${doctor.specialization}\nAvailable on: ${doctor.availability.join(', ')}`);
        });
        addMessage("Click on a doctor's name to book an appointment:");
        addOptions(doctors.map(doctor => `${doctor.name} (${doctor.specialization})`));
        return;
    }

    if (input.toLowerCase().includes('check appointment')) {
        addMessage("Please provide your Appointment ID to check the status:");
        sessionStorage.setItem('mode', 'checkStatus');
        return;
    }

    if (currentMode === 'checkStatus') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            addMessage(`Here are your appointment details:
                Doctor: ${appointment.doctor}
                Day: ${appointment.day}
                Time: ${appointment.time}
                Status: ${appointment.status}`);
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'cancel appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'cancelAppointment');
        addMessage("Please provide your Appointment ID to cancel your appointment:");
        return;
    }

    if (currentMode === 'cancelAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            delete appointments[input];
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-cancellation-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: input
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment cancelled successfully!
                        Previous details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                       ⚠️ A cancellation confirmation email has been sent to your inbox.`);
                    }

                })
                .catch(error => {
                    console.error('Error sending cancellation email:', error);
                    addMessage(`Appointment cancelled successfully!
                    Previous details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the cancellation email.`);
                });
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'update appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'updateAppointment');
        addMessage("Please provide your Appointment ID to update your appointment:");
        return;
    }
    // Handle Update Appointment
    if (currentMode === 'updateAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            const doctor = doctors.find(d => d.name === appointment.doctor);

            if (doctor) {
                sessionStorage.setItem('appointmentToUpdate', input);
                sessionStorage.setItem('mode', 'selectUpdateOption');
                addMessage(`Current appointment details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    What would you like to update?`);
                addOptions([
                    "Update day",
                    "Update time",
                    "Cancel update"
                ]);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
            clearSessionStorage();
            setTimeout(() => {
                addMessage("What else can I help you with?");
                addOptions([
                    "Describe your symptoms",
                    "Book an appointment",
                    "View available doctors",
                    "Check appointment status",
                    "Cancel appointment",
                    "Update appointment"
                ]);
            }, 1000);
        }
        return;
    }

    // Handle update option selection
    if (currentMode === 'selectUpdateOption') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        if (input.toLowerCase() === 'update day') {
            sessionStorage.setItem('mode', 'updateDay');
            addMessage("Please select a new day:");
            addOptions(doctor.availability);
            return;
        } else if (input.toLowerCase() === 'update time') {
            sessionStorage.setItem('mode', 'updateTime');
            addMessage("Please select a new time:");
            addOptions(doctor.timeSlots);
            return;
        } else if (input.toLowerCase() === 'cancel update') {
            clearSessionStorage();
            addMessage("Update cancelled. What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
            return;
        }
    }

    // Handle day update
    if (currentMode === 'updateDay') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const inputDay = daysOfWeek.find(day => input.toLowerCase() === day);

        if (inputDay && doctor.availability.includes(inputDay.charAt(0).toUpperCase() + inputDay.slice(1))) {
            const oldDay = appointment.day;
            appointment.day = inputDay.charAt(0).toUpperCase() + inputDay.slice(1);
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-update-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    oldDay: oldDay
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid day from the options below:");
            addOptions(doctor.availability);
            return;
        }
    }

    // Handle time update
    if (currentMode === 'updateTime') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const lowercaseTimeSlots = doctor.timeSlots.map(slot => slot.toLowerCase());
        const lowercaseInput = input.toLowerCase().trim();

        if (lowercaseTimeSlots.includes(lowercaseInput)) {
            const oldTime = appointment.time;
            appointment.time = input;
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-appointment-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    type: 'update',
                    oldTime: oldTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid time from the options below:");
            addOptions(doctor.timeSlots);
            return;
        }
    }

    // Handle confirm update
    function handleConfirmUpdate(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        if (input.toLowerCase().includes('yes')) {
            const doctor = doctors.find(doc => doc.name === appointmentData.doctor);

            if (doctor) {
                const updatedAppointmentData = {
                    ...appointmentData,
                    availableTimeSlots: doctor.timeSlots
                };
                setAppointmentSession(updatedAppointmentData, 'selectTime');

                addMessage(`Please select a new time slot for your appointment with ${doctor.name} on ${appointmentData.day}:`);
                addOptions(doctor.timeSlots);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else if (input.toLowerCase().includes('no') || input.toLowerCase().includes('back')) {
            addMessage("Returning to the main menu. What would you like to do?");
            resetToMainMenu();
        }
    }

    // Handle select time
    function handleSelectTime(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData || !appointmentData.availableTimeSlots) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        const newTime = input.trim();

        if (!appointmentData.availableTimeSlots.includes(newTime)) {
            addMessage("Invalid time slot. Please select a valid time slot from the options below:");
            addOptions(appointmentData.availableTimeSlots);
            return;
        }

        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        appointments[appointmentData.id] = {
            ...appointments[appointmentData.id],
            time: newTime
        };
        localStorage.setItem('appointments', JSON.stringify(appointments));

        addMessage(`Appointment updated successfully!
            Doctor: ${appointmentData.doctor}
            Day: ${appointmentData.day}
            Time: ${newTime}`);

        clearSessionStorage();
        setTimeout(() => {
            addMessage("Your appointment is updated. We look forward to seeing you!");
        }, 1000);
    }

    // Reset to main menu
    function resetToMainMenu() {
        clearSessionStorage();
        addOptions([
            "Describe your symptoms",
            "Book an appointment",
            "View available doctors",
            "Check appointment status",
            "Cancel appointment",
            "Update appointment"
        ]);
    }

    if (currentMode === 'symptoms') {
        try {
            const response = await fetch('/analyze_symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms: input })
            });

            if (response.ok) {
                const result = await response.json();
                const recommendation = result.recommendation;
                addMessage(recommendation);

                const matchingDoctors = doctors.filter(doctor =>
                    doctor.specialization.toLowerCase() === result.specialty.toLowerCase()
                );

                if (matchingDoctors.length > 0) {
                    addMessage("Based on your symptoms, here are the recommended specialists:");
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'options-container';
                    optionsContainer.setAttribute('data-type', 'doctor-list');

                    matchingDoctors.forEach(doctor => {
                        const button = document.createElement('button');
                        button.className = 'option-button';
                        button.setAttribute('data-type', 'doctor');
                        button.textContent = `Book with ${doctor.name} (${doctor.specialization})`;
                        button.onclick = () => {
                            sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
                            addMessage(`Great! Let's schedule your appointment with ${doctor.name}.`);
                            addMessage("Please select your preferred day:");
                            addOptions(doctor.availability);
                        };
                        optionsContainer.appendChild(button);
                    });
                    chatBox.appendChild(optionsContainer);
                } else {
                    const generalPhysician = doctors.find(doctor => doctor.specialization.toLowerCase() === "general physician");
                    if (generalPhysician) {
                        addMessage("For your symptoms, I recommend consulting with our General Physician first.");
                        const optionsContainer = document.createElement('div');
                        optionsContainer.className = 'options-container';
                        optionsContainer.setAttribute('data-type', 'doctor-list');

                        const button = document.createElement('button');
                        button.className = 'option-button';
                        button.setAttribute('data-type', 'doctor');
                        button.textContent = `Book with ${generalPhysician.name} (${generalPhysician.specialization})`;
                        button.onclick = () => {
                            sessionStorage.setItem('selectedDoctor', JSON.stringify(generalPhysician));
                            addMessage(`Great! Let's schedule your appointment with ${generalPhysician.name}.`);
                            addMessage("Please select your preferred day:");
                            addOptions(generalPhysician.availability);
                        };
                        optionsContainer.appendChild(button);
                        chatBox.appendChild(optionsContainer);
                    } else {
                        addMessage("I apologize, but we don't have any specialists or general physicians available at the moment.");
                        addMessage("Would you like to see other available doctors?");
                        addOptions(["View all doctors", "Go back to main menu"]);
                    }
                }
            } else {
                addMessage("I'm having trouble analyzing your symptoms. Would you like to:");
                addOptions([
                    "Try describing your symptoms again",
                    "View all doctors",
                    "Go back to main menu"
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage("I apologize, but I'm having trouble processing your request. Please try again.");
        }
        return;
    }

    if (input.includes('view all doctors') || input.includes('see all doctors')) {
        addMessage("Here are all our available doctors:");
        doctors.forEach(doctor => {
            addMessage(`${doctor.name} - ${doctor.specialization}\nAvailable on: ${doctor.availability.join(', ')}`);
        });
        addMessage("Click on a doctor's name to book an appointment:");
        addOptions(doctors.map(doctor => `${doctor.name} (${doctor.specialization})`));
        return;
    }

    if (input.toLowerCase().includes('check appointment')) {
        addMessage("Please provide your Appointment ID to check the status:");
        sessionStorage.setItem('mode', 'checkStatus');
        return;
    }

    if (currentMode === 'checkStatus') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            addMessage(`Here are your appointment details:
                Doctor: ${appointment.doctor}
                Day: ${appointment.day}
                Time: ${appointment.time}
                Status: ${appointment.status}`);
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'cancel appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'cancelAppointment');
        addMessage("Please provide your Appointment ID to cancel your appointment:");
        return;
    }

    if (currentMode === 'cancelAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            delete appointments[input];
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-cancellation-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: input
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment cancelled successfully!
                        Previous details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                       ⚠️ A cancellation confirmation email has been sent to your inbox.`);
                    }

                })
                .catch(error => {
                    console.error('Error sending cancellation email:', error);
                    addMessage(`Appointment cancelled successfully!
                    Previous details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the cancellation email.`);
                });
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
        }

        clearSessionStorage();
        setTimeout(() => {
            addMessage("What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
        }, 1000);
        return;
    }

    if (input.toLowerCase() === 'update appointment') {
        clearSessionStorage();
        sessionStorage.setItem('mode', 'updateAppointment');
        addMessage("Please provide your Appointment ID to update your appointment:");
        return;
    }
    // Handle Update Appointment
    if (currentMode === 'updateAppointment') {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const appointment = appointments[input];

        if (appointment) {
            const doctor = doctors.find(d => d.name === appointment.doctor);

            if (doctor) {
                sessionStorage.setItem('appointmentToUpdate', input);
                sessionStorage.setItem('mode', 'selectUpdateOption');
                addMessage(`Current appointment details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    What would you like to update?`);
                addOptions([
                    "Update day",
                    "Update time",
                    "Cancel update"
                ]);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else {
            addMessage("No appointment found with this ID. Please check the ID and try again.");
            clearSessionStorage();
            setTimeout(() => {
                addMessage("What else can I help you with?");
                addOptions([
                    "Describe your symptoms",
                    "Book an appointment",
                    "View available doctors",
                    "Check appointment status",
                    "Cancel appointment",
                    "Update appointment"
                ]);
            }, 1000);
        }
        return;
    }

    // Handle update option selection
    if (currentMode === 'selectUpdateOption') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        if (input.toLowerCase() === 'update day') {
            sessionStorage.setItem('mode', 'updateDay');
            addMessage("Please select a new day:");
            addOptions(doctor.availability);
            return;
        } else if (input.toLowerCase() === 'update time') {
            sessionStorage.setItem('mode', 'updateTime');
            addMessage("Please select a new time:");
            addOptions(doctor.timeSlots);
            return;
        } else if (input.toLowerCase() === 'cancel update') {
            clearSessionStorage();
            addMessage("Update cancelled. What else can I help you with?");
            addOptions([
                "Describe your symptoms",
                "Book an appointment",
                "View available doctors",
                "Check appointment status",
                "Cancel appointment",
                "Update appointment"
            ]);
            return;
        }
    }

    // Handle day update
    if (currentMode === 'updateDay') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const inputDay = daysOfWeek.find(day => input.toLowerCase() === day);

        if (inputDay && doctor.availability.includes(inputDay.charAt(0).toUpperCase() + inputDay.slice(1))) {
            const oldDay = appointment.day;
            appointment.day = inputDay.charAt(0).toUpperCase() + inputDay.slice(1);
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-update-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    oldDay: oldDay
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid day from the options below:");
            addOptions(doctor.availability);
            return;
        }
    }

    // Handle time update
    if (currentMode === 'updateTime') {
        const appointmentId = sessionStorage.getItem('appointmentToUpdate');
        const appointments = JSON.parse(localStorage.getItem('appointments'));
        const appointment = appointments[appointmentId];
        const doctor = doctors.find(d => d.name === appointment.doctor);

        const lowercaseTimeSlots = doctor.timeSlots.map(slot => slot.toLowerCase());
        const lowercaseInput = input.toLowerCase().trim();

        if (lowercaseTimeSlots.includes(lowercaseInput)) {
            const oldTime = appointment.time;
            appointment.time = input;
            appointments[appointmentId] = appointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            fetch('http://localhost:3000/send-appointment-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: appointment.doctor,
                    day: appointment.day,
                    time: appointment.time,
                    email: appointment.email,
                    appointmentId: appointmentId,
                    type: 'update',
                    oldTime: oldTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        An update confirmation email has been sent to your inbox.`);
                    } else {
                        addMessage(`Appointment updated successfully!
                        New details:
                        Doctor: ${appointment.doctor}
                        Day: ${appointment.day}
                        Time: ${appointment.time}
                        
                        Note: There was an issue sending the update email.`);
                    }
                })
                .catch(error => {
                    console.error('Error sending update email:', error);
                    addMessage(`Appointment updated successfully!
                    New details:
                    Doctor: ${appointment.doctor}
                    Day: ${appointment.day}
                    Time: ${appointment.time}
                    
                    Note: There was an issue sending the update email.`);
                });

            clearSessionStorage();
            setTimeout(() => {
                addMessage("Your appointment is updated. We look forward to seeing you!");
            }, 1000);
            return;
        } else {
            addMessage("Please select a valid time from the options below:");
            addOptions(doctor.timeSlots);
            return;
        }
    }

    // Handle confirm update
    function handleConfirmUpdate(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        if (input.toLowerCase().includes('yes')) {
            const doctor = doctors.find(doc => doc.name === appointmentData.doctor);

            if (doctor) {
                const updatedAppointmentData = {
                    ...appointmentData,
                    availableTimeSlots: doctor.timeSlots
                };
                setAppointmentSession(updatedAppointmentData, 'selectTime');

                addMessage(`Please select a new time slot for your appointment with ${doctor.name} on ${appointmentData.day}:`);
                addOptions(doctor.timeSlots);
            } else {
                addMessage("Error finding the doctor's details. Please try again or contact support.");
                resetToMainMenu();
            }
        } else if (input.toLowerCase().includes('no') || input.toLowerCase().includes('back')) {
            addMessage("Returning to the main menu. What would you like to do?");
            resetToMainMenu();
        }
    }

    // Handle select time
    function handleSelectTime(input) {
        const appointmentData = getAppointmentSession();

        if (!appointmentData || !appointmentData.availableTimeSlots) {
            addMessage("Session expired. Please try again.");
            resetToMainMenu();
            return;
        }

        const newTime = input.trim();

        if (!appointmentData.availableTimeSlots.includes(newTime)) {
            addMessage("Invalid time slot. Please select a valid time slot from the options below:");
            addOptions(appointmentData.availableTimeSlots);
            return;
        }

        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        appointments[appointmentData.id] = {
            ...appointments[appointmentData.id],
            time: newTime
        };
        localStorage.setItem('appointments', JSON.stringify(appointments));

        addMessage(`Appointment updated successfully!
            Doctor: ${appointmentData.doctor}
            Day: ${appointmentData.day}
            Time: ${newTime}`);

        clearSessionStorage();
        setTimeout(() => {
            addMessage("Your appointment is updated. We look forward to seeing you!");
        }, 1000);
    }

    // Reset to main menu
    function resetToMainMenu() {
        clearSessionStorage();
        addOptions([
            "Describe your symptoms",
            "Book an appointment",
            "View available doctors",
            "Check appointment status",
            "Cancel appointment",
            "Update appointment"
        ]);
    }

    // Handle symptom description
    if (input.includes('symptoms') || input.includes('problem') || input.includes('feeling')) {
        sessionStorage.setItem('mode', 'symptoms');
        addMessage("Please describe your symptoms in detail:");
        return;
    }

    // Handle status check
    if (input.includes('status')) {
        sessionStorage.setItem('mode', 'status');
        addMessage("Please enter your appointment ID to check the status:");
        return;
    }

    // Handle cancellation
    if (input.includes('cancel')) {
        sessionStorage.setItem('mode', 'cancel');
        addMessage("Please enter your appointment ID to cancel your appointment:");
        return;
    }

    // Handle update
    if (input.includes('update')) {
        sessionStorage.setItem('mode', 'checkAppointment');
        addMessage("Please enter your appointment ID to check and update the appointment:");
        return;
    }

    // Handle booking
    if (input.includes('book') || input.includes('appointment')) {
        sessionStorage.setItem('mode', 'booking');
        addMessage("Please select a doctor:");
        const doctorOptions = doctors.map(doctor => `${doctor.name} (${doctor.specialization})`);
        addOptions(doctorOptions);
        return;
    }

    // Handle doctor selection
    if (input.includes('doctor') || input.includes('doctors')) {
        addMessage("Available Doctors:");
        doctors.forEach(doctor => {
            addMessage(`${doctor.name} - ${doctor.specialization}\nAvailable on: ${doctor.availability.join(', ')}`);
        });
        addMessage("Click on a doctor's name to book an appointment:");
        addOptions(doctors.map(doctor => `${doctor.name} (${doctor.specialization})`));
        return;
    }

    // Default response
    addMessage("How can I help you? Choose an option:");
    addOptions([
        "Describe your symptoms",
        "Book an appointment",
        "View available doctors",
        "Check appointment status",
        "Cancel appointment",
        "Update appointment"
    ]);
}

/**
 * Handles user input from the chat interface
 * @param {string} input - User's input message
 */
function handleUserInput(input) {
    if (!input.trim()) return;

    addMessage(input, true);
    userInput.value = '';

    processInput(input);
}

// Event listener for the send button
sendBtn.addEventListener('click', () => {
    handleUserInput(userInput.value);
});

// Event listener for the input field
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput(userInput.value);
    }
});

//  * Function to clear all session storage

function clearSessionStorage() {
    try {
        // Clear everything first
        sessionStorage.clear();

        // Double check by removing all keys
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                sessionStorage.removeItem(key);
            }
        }

        console.log('Session storage cleared successfully');
    } catch (error) {
        console.error('Error clearing session storage:', error);
    }
}

/**
 * Initializes the chat interface on page load
 */
window.onload = async () => {
    clearSessionStorage(); // Clear session storage on page load
    chatBox.innerHTML = '';
    const initialMessages = [
        "Hello! I'm your medical appointment assistant. How can I help you today?",
    ];

    initialMessages.forEach(msg => addMessage(msg));
    addOptions([
        "Describe your symptoms",
        "Book an appointment",
        "View available doctors",
        "Check appointment status",
        "Cancel appointment",
        "Update appointment"
    ]);
};

// Event listener for page unload
window.addEventListener('unload', clearSessionStorage);

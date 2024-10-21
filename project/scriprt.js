document.addEventListener('DOMContentLoaded', function() {
    const birthdayForm = document.getElementById('birthdayForm');
    const birthdayList = document.getElementById('birthdayList');


    const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  
    renderBirthdays();

    // Form submission handler
    birthdayForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;

        if (name && dob) {
            const newBirthday = { name, dob };
            birthdays.push(newBirthday);
            localStorage.setItem('birthdays', JSON.stringify(birthdays));
            renderBirthdays();
            birthdayForm.reset();
        }
    });

    // Render birthday list
    function renderBirthdays() {
        birthdayList.innerHTML = '';
        const sortedBirthdays = birthdays.sort((a, b) => new Date(a.dob) - new Date(b.dob));
        
        sortedBirthdays.forEach((birthday, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            // Calculate the countdown
            const today = new Date();
            const birthDate = new Date(birthday.dob);
            const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            const daysRemaining = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

            li.innerHTML = `
                ${birthday.name} (Birthday: ${new Date(birthday.dob).toLocaleDateString()})
                <span class="badge bg-primary rounded-pill countdown">${daysRemaining} days</span>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            `;
            birthdayList.appendChild(li);
        });

        // Add delete functionality
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                birthdays.splice(index, 1);
                localStorage.setItem('birthdays', JSON.stringify(birthdays));
                renderBirthdays();
            });
        });
    }
});

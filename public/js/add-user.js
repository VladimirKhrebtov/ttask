document.addEventListener('DOMContentLoaded', function (e) {
    const formSubmitBtn = document.getElementById('submit-new-user');

    formSubmitBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        const form = document.getElementById('new-user-form');
        const userData = new FormData(form);
        const userInfo = {
            firstname: userData.get('firstname'),
            age: userData.get('age')
        };

        const request = await fetch('http:://localhost:4444/add-user', {
            method: 'POST',
            body: JSON.stringify(userInfo)
        });

        const result = await request.text();
        alert(`User named: ${result.firstname} and age: ${result.age} has been added to DB`);
    });
});
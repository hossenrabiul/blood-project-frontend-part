document.getElementById('create-event-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // is_authticated();

    const form = document.getElementById('create-event-form');
    const formData = new FormData(form);
    const user_id = localStorage.getItem('user_id');

    // document.getElementById('submit-btn').disabled = true;
    // document.getElementById('loading-spinner').classList.remove('hidden');

    const data = {
        "user": user_id,
        "title": formData.get('title'),
        "description": formData.get('description'),
        "event_date": formData.get('date'),
        "event_time": formData.get('time'),
        "blood": formData.get('blood'),
        "location": formData.get('location'),
    };

    fetch('https://blood-project-1das.vercel.app/event/events/create/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", // Corrected header name
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                // If the response is not OK (status code not in the 200-299 range)
                throw new Error('Failed to create event');
            }
            return res.json();
        })
        .then(data => {
            alert('asdf');

            window.location.reload();  // Reload the page after successful creation

        })
        .catch(error => {
            console.error('Error:', error);  // Added error handling
            pushAlert('success',error);

        }); 
});
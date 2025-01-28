 

    document.addEventListener('DOMContentLoaded', async () => {
     
        const user_id = localStorage.getItem('guest_id');
       
  
        // Fetch the user profile data
        try {
            const response = await fetch(`http://blood-project.onrender.com/accounts/profiles/?user_id=${user_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
      
            // Ensure the response contains at least one profile
            if (data && data.length > 0) {
                profileAdd(data[0]); // Assuming the first profile is the one we need
            } else {
                pushAlert('alert','No profile data found.');
            }
        } catch (error) {
            console.error(error); 
        }
    });
  
    // Function to populate profile data in the HTML
    const profileAdd = (profile) => {
        // Log profile data for debugging
        console.log(profile);
  
        // Assuming profile is an object containing user data
        document.getElementById('username').textContent = profile.user || 'N/A';
        document.getElementById('profile-image').src = profile.image || 'default-image.png';
        document.getElementById('blood-group').textContent = `Blood Group: ${profile.blood || 'N/A'}`;
        // Assuming profile doesn't have a 'created_on' field; update according to the actual response structure
        document.getElementById('join-date').textContent = `Joined: ${new Date(profile.created_on).toLocaleDateString() || 'N/A'}`;
        document.getElementById('full-name').textContent = `${profile.first_name} ${profile.last_name}`;
        document.getElementById('user-email').textContent = profile.email || 'N/A';
        document.getElementById('user-phone').textContent = profile.phone || 'N/A';
        document.getElementById('user-location').textContent = `${profile.divition || 'Unknown'}, ${profile.country || 'Unknown'}`;
        document.getElementById('age-gender').textContent = `${profile.age || 'N/A'}, ${profile.gender || 'N/A'}`;
        document.getElementById('total-donations').textContent = profile.donations || '0';
        document.getElementById('fulfilled-requests').textContent = profile.fulfilled_requests || '0';
        document.getElementById('last-donation-date').textContent = profile.last_donation_date || 'N/A';
    };
  

document.addEventListener('DOMContentLoaded', async () => {
    const user_id = localStorage.getItem('guest_id');
  
    // Check if the user_id exists in localStorage
    if (!user_id) {
        pushAlert('alert', 'User ID not found in localStorage');
        return;
    }
  
    try {
        const response = await fetch(`http://blood-project.onrender.com/accounts/profiles/?user_id=${user_id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
  
        const data = await response.json();
  
        // Log the response data to understand its structure
        console.log(data);
        
        // Ensure the response contains the expected data
        if (data && Array.isArray(data) && data.length > 0) {
            profileAdd(data[0]); // Assuming the first profile is the one we need
        } else {
            pushAlert('alert', 'No profile data found or unexpected data structure.');
        }
  
    } catch (error) {
        console.error('Error:', error);
        pushAlert('alert', error.message);
    }
  });
  
    
    // Function to populate profile data in the HTML
    const profileAdd = (profile) => {
      // Log profile data for debugging
      // console.log(profile);
    
      // Assuming profile is an object containing user data
      document.getElementById('username').textContent = profile.user || 'N/A';
      document.getElementById('profile-image').src = profile.image || 'default-image.png';
      document.getElementById('blood-group').textContent = `${profile.blood || 'N/A'}`;
      // Assuming profile doesn't have a 'created_on' field; update according to the actual response structure
      document.getElementById('join-date').textContent = `Joined: ${new Date(profile.created_on).toLocaleDateString() || 'N/A'}`;
      document.getElementById('full-name').textContent = `${profile.first_name} ${profile.last_name}`;
      document.getElementById('user-email').textContent = profile.email || 'N/A';
      document.getElementById('user-phone').textContent = profile.phone || 'N/A';
      document.getElementById('user-location').textContent = `${profile.divition || 'Unknown'}, ${profile.country || 'Unknown'}`;
      document.getElementById('age-gender').textContent = `${profile.age || 'N/A'}, ${profile.gender || 'N/A'}`; 
    
      fetch(`https://blood-project.onrender.com/event/events/?last_donate=${localStorage.getItem('guest_id')}`)
        .then(res => res.json())
        .then(data => {
    
          if (data.length < 1) {
            return;
          }
          const last_donation_event = data[0];  
          document.getElementById('last-donation-date').textContent =  last_donation_event.event_date
        })  
      
        let x = 0;
    
        fetch(`https://blood-project.onrender.com/event/events/?user=${localStorage.getItem('guest_id')}&status=Completed`)
        .then(res => res.json())
          .then(data => {
            let currentValue = parseInt(document.getElementById('total-donations').textContent, 10);
            let requirenmentFullfill = parseInt(document.getElementById('fulfilled-requests').textContent, 10);
    
            currentValue += data.length; 
            
            document.getElementById('total-donations').textContent = currentValue;
            document.getElementById('fulfilled-requests').textContent = currentValue;
    
          })
      
          fetch(`https://blood-project.onrender.com/event/events/?user=${localStorage.getItem('guest_id')}&status=Pending`)
          .then(res => res.json())
            .then(data => {
              let currentValue = parseInt(document.getElementById('total-donations').textContent, 10);
       
              currentValue += data.length;
              console.log(data.length);
              
            document.getElementById('total-donations').textContent = currentValue;
      
          })
      
        
        
      
      
    };
    
    
    
   
     
    
    
    
    
    
    
    
    
    
    
    document.addEventListener('DOMContentLoaded', () => {
      const HistoryHeaderNavControl = () => {
        const donerRequestHeader = document.getElementById('doner_request_header');
        const donateBtn = document.getElementById('donate-btn');
        const requestBtn = document.getElementById('request-btn'); 
    
        const donateDropdown = document.getElementById('donate-dropdown');
        const requestDropdown = document.getElementById('request-dropdown');
        const donateSection = document.getElementById('donate_section');
        const requestSection = document.getElementById('request_section');
    
         
    
        donateBtn.addEventListener('click', () => {
          document.getElementById('donated_blood').classList.remove('hidden');
          document.getElementById('received_blood').classList.add('hidden');
        });
        
        requestBtn.addEventListener('click', () => {
          document.getElementById('request_completed').classList.remove('hidden'); 
          acceptedEventsSection.classList.add('hidden'); // Ensure accepted events stay hidden
    
        });
    
     
     
        // Toggle dropdowns and sections
        const toggleDropdown = (btn, dropdown, sectionToShow, otherDropdown, otherSection) => {
          dropdown.classList.toggle('hidden');
          otherDropdown.classList.add('hidden'); // Always hide the other dropdown
          sectionToShow.classList.remove('hidden'); // Show the selected section
          otherSection.classList.add('hidden'); // Hide the other section
    
        };
     
    
        donateBtn.addEventListener('click', () => {
          
          toggleDropdown(donateBtn, donateDropdown, donateSection, requestDropdown, requestSection);
        });
    
        requestBtn.addEventListener('click', () => {
          toggleDropdown(requestBtn, requestDropdown, requestSection, donateDropdown, donateSection);
     
        });
    
        // Hide dropdowns when hovering outside
        document.addEventListener('mouseover', (e) => {
          if (
            !donerRequestHeader.contains(e.target) &&
            !donateBtn.contains(e.target) &&
            !donateDropdown.contains(e.target) &&
            !requestBtn.contains(e.target) &&
            !requestDropdown.contains(e.target)
          ) {
            donateDropdown.classList.add('hidden');
            requestDropdown.classList.add('hidden');
          }
        });
      };
    
      const History = () => {
        const sections = document.querySelectorAll('#donated_blood, #received_blood, #request_completed');
    
        const toggleVisibility = (targetId) => {
          sections.forEach((section) => {
            section.classList.toggle('hidden', section.id !== targetId); // Show the matching section, hide others
    
            
          });
        };
    
        document.querySelectorAll('[data-target]').forEach((item) => {
          item.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            toggleVisibility(targetId);
            
          });
        });
      };
    
      HistoryHeaderNavControl();
      History();
    });
    
  
    
    const loadBloodHistory = (fieldSelector, userId, type) => {
      const field = document.querySelector(fieldSelector);
      const queryKey = type === "donor" ? "doner" : "user";
      const statusFilter = type === "receiver" ? "&status=Completed" : "";
    
      fetch(`https://blood-project.onrender.com/event/events/?${queryKey}=${userId}${statusFilter}`)
        .then(res => res.json())
        .then(data => {
          data.forEach(event => {
            const li = document.createElement("li");
            li.className = "flex items-center gap-4";
    
            const profileKey = type === "donor" ? event.user : event.doner;
    
            fetch(`http://blood-project.onrender.com/accounts/profiles//?user_id=${profileKey}`)
              .then(res => res.json())
              .then(profileData => {
                const user = profileData[0];
                li.innerHTML = `
                <a onclick="guestProfile(${user.id}); event.stopPropagation()" class="cursor-pointer"> 
                  <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <img 
                      src="${user.image || 'default-image.jpg'}" 
                      alt="${user.name || 'User'}" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                  </a>
                  <div class='w-full md:flex justify-between gap-8'>
                  <a onclick="guestProfile(${data[0].id}); event.stopPropagation()" class="cursor-pointer"> 
                    <div> 
                      <p class="text-gray-800 font-medium">${user.user || "Anonymous"}</p>
                      <p class="text-gray-500 text-sm">Blood Group: ${user.blood || "Unknown"}</p>
                    </div>
                    </a>
                    <div>
                      <p class="text-gray-500 text-sm">Event was: ${event.event_date || "None"}</p>
                    </div>
                  </div>
                `;
                field.appendChild(li);
              });
          });
        });
    };
    
    const userId = localStorage.getItem("user_id");
    
    loadBloodHistory("#donated_blood ul", userId, "donor"); // Load donated blood history
    loadBloodHistory("#received_blood ul", userId, "receiver"); // Load received blood history
    
    
    
    const loadEventHistory = (fieldSelector, userId, status) => {
      const field = document.querySelector(`${fieldSelector} ul`); 
    
    
    
      fetch(`https://blood-project.onrender.com/event/events/?user=${userId}&status=${status}`)
        .then(res => res.json())
        .then(data => {
    
          data.forEach(event => {
  
            fetch(`http://blood-project.onrender.com/accounts/users/?id=${event.user}`)
              .then(res => res.json())
              .then(userData => {
  
                const created_by = userData[0].username;
                console.log(userData.username);
  
                const li = document.createElement("li");
                li.className = "flex items-center gap-4 ";
                li.innerHTML = `
                            <div class="bg-white rounded-lg border-[1px] border-gray-300 shadow-lg p-6 relative"   >
                              <!-- Title -->
                              <h3 class="text-lg font-semibold text-gray-800">${event.title} </h3>
                              <div class="flex justify-between items-center">
                                <p class="text-xs text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
                                <span class="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full  absolute top-2 right-2 ">${event.blood}</span>
                              </div>
                              <p class="text-xs text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
                              <div class="flex justify-between items-center gap-4 pt-2 mt-2 border-t border-gray-200">
                                ${status == 'Pending' ? `
                                  <button  onclick="receivedBloodSubmition('${event.id}','${event.blood}','${event.doner}')" class="px-4 py-2 bg-green-500 text-white text-sm  rounded-lg shadow-md hover:bg-green-600 transition">
                                      Received?
                                  </button>
                                  `: `
                                  <a onclick="guestProfile('${userData[0].id}');" class="cursor-pointer"> 
                                <span class="text-sm text-gray-500">Created by: <b> ${created_by}</b></span>
                                  </a>
                                  `};
                              </div>
                            </div>
                `;
                field.appendChild(li);
  
              });
           
          })
          
        })
        .catch(error => console.log(error));
      
    }
    
    const receivedBloodSubmition = (event_id, event_blood, doner_id) => {
    
      fetch(`https://blood-project.onrender.com/event/events/${event_id}/received/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },  
      })
        .then(res => res.json())
        .then(data => {
        pushAlert('success',`Accepted ${event_blood} form Doner id: ${doner_id}`)
      })
    }
     
    loadEventHistory('#request_completed', userId, 'Completed');
    
    
  
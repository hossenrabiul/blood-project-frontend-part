
const eventGenderator = (filter={}) => {
    const eventCards = document.getElementById('event-cards')
    eventCards.innerHTML = `
    <div class="flex justify-center items-center mt-12">
          <div class="relative">
            <div class="flex space-x-2">
              <div class="w-4 h-4 bg-teal-700 rounded-full animate-bounce"></div>
              <div class="w-4 h-4 bg-teal-700 rounded-full animate-bounce200"></div>
              <div class="w-4 h-4 bg-teal-700 rounded-full animate-bounce400"></div>
            </div>
          </div>
        </div>
    `;
    
    fetch('https://blood-project.onrender.com/event/events/?status=Ongoing')
        .then(res => res.json())
        .then(data => showAllEvent(data,filter))
        .catch(error => console.log(error));
}
const findEventUser =  (user_id) => {
  const username = ''
  fetch(`http://blood-project.onrender.com/accounts/users/?user_id=${user_id}`)
    .then(r => r.json())
    .then(d => username = d[0].username)
  
  console.log(username)
};


const showAllEvent = (data,filter={}) => {
  const user_id = localStorage.getItem('user_id');
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = '';

  for (const event of data)
  {

    let self = (event.user == user_id);
   
    if ('blood' in filter && event.blood != filter['blood'])
      {
        continue;
    }
    if ('event_date' in filter && event.event_date != filter['event_date'])
    {
      continue;
    }

    const created_by = findEventUser(event.user);
          fetch(`http://blood-project.onrender.com/accounts/users/?id=${event.user}`)
            .then(res => res.json())
            .then(data => {

              const created_by = data[0].username;
          
    
              eventCards.innerHTML += ` 
              
               

          <div class="bg-white rounded-lg shadow-lg p-6" onclick="showViewModal('${event.id}','${user_id}')">
          <!-- Title -->
          <h3 class="text-2xl font-semibold text-gray-800">${event.title}</h3>
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
            <span class="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full">${event.blood}</span>
          </div>
          <p class="text-sm text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
          <p class="text-sm text-gray-700 pt-4 pb-2">Your contribution can save a life!</p>
          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
          
          <a onclick="guestProfile(${data[0].id}); event.stopPropagation()" class="cursor-pointer"> 
            <span class="text-sm text-gray-500">Created by: <b>${created_by}</b></span>
            </a>
            ${ self ? `
               <button onclick=" event.stopPropagation()" class="px-4 py-2 bg-gray-200 text-gray-800 text-md font-semibold rounded-lg shadow-md  transition">
                      Self
                </button>
              `: `
                
                 <button onclick="acceptEvent('${event.id}','${user_id}','${event.blood}'); event.stopPropagation()" class="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
                      Accept
                </button>
              `}
           
          </div>
        </div>

          
          `;
              
        })
    }
}

eventGenderator();



function analysisEvent(blood) {
  console.log(`Analyzing events for blood group: ${blood}`);
  filter = {
    'blood': blood,
  }
  eventGenderator(filter);
 
}
 
 const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
 document.getElementById('event-date').value = today;

 // Add click event listener for the search button
 document.getElementById('search-button').addEventListener('click', function () {
   const dateInput = document.getElementById('event-date').value; // Get the selected date
   filter = {
    'event_date': today,
  }
  eventGenderator(filter);


     if (dateInput) {
       filter.event_date = dateInput;
     } else {
      pushAlert('alert', 'Please select a date before searching.'); 
     }
 });

const acceptEvent = (event_id, user_id,event_blood) => {

  fetch(`http://blood-project.onrender.com/accounts/profiles/?user_id=${user_id}`)
    .then(r => r.json())
    .then(data => {
      const user = data[0]; 
      acceptEventSumbit(event_id,event_blood, user_id, user.blood);
    })
  .catch(error=>console.log(error))
  
  

  const acceptEventSumbit = (event_id, event_blood, user_id, user_blood) =>
  {
    if (event_blood != user_blood)
    {
      pushAlert('alert', `The event for ${event_blood}, but your Blood is ${user_blood}`);
      
      // alert(`The event for ${event_blood}, but your Blood is ${user_blood}`);
      return;
    }
      
      const data = {
        'doner_id': user_id,
        'doner_message':'',
      }

      fetch(`https://blood-project.onrender.com/event/events/${event_id}/accepted/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Ensure the request is sent as JSON
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
        pushAlert('success', `Accepted The ${event_blood} event! The event added you profile History`);
           
          console.log('succesfully event accepted! without discription')
          eventGenderator();
        })
        .catch(error => console.log(error))
      
      console.log(event_id," -> ", user_id);
  }
  
}







box = document.getElementById("doner-list") 
box.classList.remove("translate-y-10", "opacity-0");
box.classList.add("translate-y-0", "opacity-100"); 

 

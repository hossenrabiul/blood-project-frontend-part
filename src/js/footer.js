// // header control

// Footer control
const footerControl = () => {
  const footer = document.querySelector('footer');


      footer.innerHTML = `
          <div class="bg-gray-300  py-10" id="invalidFooter">
              <div class="container mx-auto lg:px-20 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
                  
                  <!-- Brand and Description -->
                  <div class="space-y-4">
                      <h2 class="text-2xl font-bold text-red-500">BloodCenter</h2>
                      <p class="text-sm max-w-md">Join us in saving lives through blood donation. Together, we can make a difference.</p>
                      <div class="flex justify-center lg:justify-start space-x-4">
                          <a href="https://web.facebook.com/robiul.hossen.457326" target="_blank" class="hover:text-red-500 transition"><i class="fab fa-facebook"></i></a>
                          <a href="https://github.com/hossenrabiul" target="_blank" class="hover:text-red-500 transition"><i class="fab fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/rabiul-hossen-8249b5297/" target="_blank" class="hover:text-red-500 transition"><i class="fab fa-linkedin"></i></a>
                      </div>
                  </div>
                  
                  <!-- Quick Links -->
                  <div class="space-y-4">
                      <h3 class="text-lg font-semibold border-b border-gray-700 inline-block pb-1">Quick Links</h3>
                      <ul class="space-y-2 text-sm">
                          <li><a href="#" class="hover:text-red-500 transition">About Us</a></li>
                          <li><a href="#" class="hover:text-red-500 transition">FAQ</a></li>
                          <li><a href="#" class="hover:text-red-500 transition">Terms & Conditions</a></li>
                      </ul>
                  </div>

                  <!-- Contact -->
                  <div class="space-y-4">
                      <h3 class="text-lg font-semibold border-b border-gray-700 inline-block pb-1">Contact</h3>
                      <ul class="space-y-2 text-sm">
                          <li class="flex items-center space-x-2">
                              <i class="fas fa-map-marker-alt text-red-500"></i>
                              <span>Chittagong, Bangladesh</span>
                          </li>
                          <li class="flex items-center space-x-2">
                              <i class="fas fa-envelope text-red-500"></i>
                              <span>Robiulhossen0081@gmail.com</span>
                          </li>
                      </ul>
                  </div>
              </div>

              <div class="mt-10 border-t border-gray-700 pt-4">
                  <p class="text-center text-sm text-gray-400">© 2025 Blood Donation Platform. All Rights Reserved.</p>
              </div>
          </div>
      `;
  
}

footerControl();



// const footerControl = () => {
     
//     const footer = document.querySelector('footer');

//     if ('token' in localStorage) { 
//         footer.innerHTML =
//             `
//              <div class=" bottom-0 left-0 right-0  justify-center items-center mt-24" id="validFooter">
//                 <div class="container mx-auto px-4 py-4  text-gray-700 border-t-2">
//                     <!-- Footer Bottom -->
//                     <div class=" pt-2 ">
//                         <div class="container mx-auto text-center text-sm text-gray-500">
//                             Copyright © 2021. All rights reserved.
//                         </div>
//                     </div>
//                 <div>
//             </div>
//             `;
//     }
//     else
//     { 
//         footer.innerHTML =
//             `
//               <div class=" bottom-0 left-0 right-0 text-center  justify-center items-center -mb-4 mt-36" id="invalidFooter"> 
//             <div class="container mx-auto lg:px-20 py-8 text-gray-700 border-t-2 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
//                 <!-- Logo and Social Media -->
//                 <div class="flex flex-col  items-center lg:items-start   text-center lg:text-left space-y-4">
//                   <div class="flex  ">
//                     <div class="text-red-500  ">
                      
//                     </div>
//                     <h2 class="text-xl font-bold text-teal-600">Blood Center</h2>
//                   </div>
//                   <p class="text-sm max-w-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
//                     incidi.</p>
//                     <div class="flex space-x-4">
//                         <!-- Facebook -->
//                         <a href="https://web.facebook.com/robiul.hossen.457326" target="_blank" class="text-gray-500 hover:text-red-500">
//                           <i class="fab fa-facebook"></i>
//                         </a>
//                         <!-- GitHub -->
//                         <a href="https://github.com/hossenrabiul" target="_blank" class="text-gray-500 hover:text-red-500">
//                           <i class="fab fa-github"></i>
//                         </a>
    
//                         <!-- LinkedIn -->
//                         <a href="https://www.linkedin.com/in/rabiul-hossen-8249b5297/" target="_blank" class="text-gray-500 hover:text-red-500">
//                           <i class="fab fa-linkedin"></i>
//                         </a>
//                       </div>
                      
//                 </div>
              
//                 <!-- Quick Links -->
//                 <div class="flex flex-col items-center text-left space-y-4">
//                   <h3 class="text-lg font-bold border-b-[1px] border-gray-600 px-6">Supports</h3>
//                   <ul class="space-y-2 text-sm">
//                     <li><a href="" class="hover:text-red-500">About Us</a></li>
//                     <li><a href="" class="hover:text-red-500">FAQ</a></li>
//                     <li><a href="" class="hover:text-red-500">Term & Condition</a></li>
//                   </ul>
//                 </div>
              
//                 <!-- Useful Links -->
//                 <div class="flex flex-col items-center  space-y-4">
//                   <h3 class="text-lg font-bold border-b-[1px] border-gray-600 px-6">Contact</h3>
//                   <ul class="space-y-2 text-sm">
//                     <li class="flex    space-x-2">
//                       <span class="text-red-500">
//                         <i class="fas fa-map-marker-alt"></i>
//                       </span>
//                       <span>Chittagong, Bangladesh</span>
//                     </li>
                 
//                     <li class="flex   space-x-2">
//                       <span class="text-red-500">
//                         <i class="fas fa-envelope"></i>
//                       </span>
//                       <span>Robiulhossen0081@gmail.com</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div> 
//               <div class="container mx-auto px-8 py-4  text-gray-700 border-t-2">
//                     <!-- Footer Bottom -->
//                     <div class=" pt-2 ">
//                         <div class="container mx-auto text-center text-sm text-gray-500  lg:pl-36">
//                             Copyright © 2021. All rights reserved.
//                         </div>
//                     </div>
//                 <div>

//         </div>
//             `;
            
             
//     }

// }
// footerControl()
window.handleMealRequest =  async (params) => {
  // back button
  const headerNav = document.querySelector('.headerNav')
  const headerH3Tag = document.createElement('h3')
        headerH3Tag.setAttribute('id' , "homeHref")
        headerNav.appendChild(headerH3Tag)
  const meals = `/meals`
        headerH3Tag.innerHTML = `<a href= ${meals}> Meals Option </a>`;

  const firstSection = document.querySelector('.firstSection')
  const div1 = document.createElement('div')
  div1.setAttribute('class', "mealDiv")
  firstSection.appendChild(div1)
  const h3Tage = document.createElement('h3')
        h3Tage.innerHTML = "You are booking for :" 
 
  const ulTage =document.createElement('ul')
        ulTage.setAttribute('class', "mealUl")
        div1.appendChild(h3Tage)
        div1.appendChild(ulTage)


// geting meal with Id
const getParams =   `/api/meals/${params.id}`;
const mealResponse = await fetch(getParams)
const meal = await mealResponse.json()

const ulTag = document.querySelector('ul');
 meal.forEach(meal => {
  const d = new Date(meal.when)
  const date =d.getFullYear()
  const houer = d.getHours()
  const minute = d.getMinutes()
  const seconds = d.getSeconds()
  
        ulTag.innerHTML = `<li> <strong>Title:</strong> ${ meal.title} </li> 
        <li> <strong>Description:</strong> ${meal.description}</li> 
        <li> <strong>Max-reservation:</strong> ${meal.max_reservations}</li> 
        <li><strong>Price:</strong> ${meal.price}.Kr </li>
        <li><strong>Location:</strong> ${meal.location}</li>
        <li><strong>Date:</strong> ${date}/${d.getMonth()}/${d.getDay()} </li>
        <li><strong>When:</strong> ${houer}: ${minute}: ${seconds} </li>`

        const formSection =document.querySelector('.formSection')
        const reservReviewDiv = document.createElement('div')
              reservReviewDiv.setAttribute('class', "reservReviewDiv")
              formSection.appendChild(reservReviewDiv)       
                reservReviewDiv.insertAdjacentHTML("afterbegin" , ` 
              
              <form class="reserveForm" action="../../api/reservations" method ="post">
              <h4>Please fill out reservation form:</h4>
             
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" required>
              <label for="secondName">Last Name:</label>
              <input type="text" id="secondName" name="secondName" required>

              <label for="phoneNum">Phone Number:</label>
              <input type="tel" id="phoneNum" name="phoneNum" pattern="[0-9]{3}-[0-9]{8}" placeholder="000-00000000" required>

              <label for="emailAdd">Email Address:</label>
              <input type="email" id="emailAdd" name="emailAdd" placeholder="enter your email" required>
              <input type ="hidden" name= "meal_Id" value= ${meal.id}>

              <label for="number_of_guests">Number of guests:</label>
              <input type="number" id="number_of_guests" name="number_of_guests" min="1"max="100" required>

              <button type ="submit" value= "Submit" onclick="ValidateEmail();">Submit</button>
              </form>`)


              reservReviewDiv.insertAdjacentHTML("afterbegin" , ` 
              <form class="reviewForm" action="../../api/reviews" method ="post">
              <h4> Want to give a feedback ?:</h4>
              <label for="description">Wrie a short review:</label>
              <input type="text" id="description" name="description" maxlength = "40">
            </select>
              <label for="stars"> Give some stars<span style="color: rgb(255,223,0);"> &#11089;</span>:</label>
              <select id="stars" name="stars">
              <option value="1">&#11089;</option>
              <option value="2">&#11089;&#11089;</option>
              <option value="3">&#11089;&#11089;&#11089;</option>
              <option value="4">&#11089;&#11089;&#11089;&#11089;</option>
              <option value="5">&#11089;&#11089;&#11089;&#11089;&#11089;</option>
            </select>

              <input type ="hidden" name= "meal_Id" value= ${meal.id}>
              <button type ="submit" value= "Submit">Submit</button>
              </form>`)
       
})

  }

  
window.handleHomeRequest = async ( req, res) => {
const body = document.querySelector('body')
const headerNav = document.querySelector('.headerNav')
      const aTag = document.createElement('a')
            aTag.setAttribute('class' , "homeHref")
            headerNav.appendChild(aTag)
      const meals = `/meals`
            aTag.href = meals 
            aTag.innerText ="menu"

const mealsSection = document.getElementsByClassName("firstSection")[0]
      const imagediv = document.createElement("div")
            mealsSection.appendChild(imagediv)

            // image 
            const images = ['../img/1.jpg','./../img/2.jpg','../img/3.jpg','../img/5.jpg', '../img/6.jpg' ]
            const imageRandoom = images[Math.floor(Math.random() * (images.length))];
                    const img = new Image()
                    img.src= imageRandoom
                    img.setAttribute('class', "homeImages")
                    imagediv.appendChild(img)

       const getDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

      const courentDate = setInterval(tick, 1000);
      function tick () {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
            const getcreatedDate = document.getElementById('created_date')
            getcreatedDate.setAttribute('value', date )

            const getWhen = document.getElementById('when')
            getWhen.setAttribute('min', date)
      }
     
             
            const mainDiv = document.querySelector('.mainDiv')
            const formSection =document.createElement('section');
            formSection.setAttribute('class', "formSection")
            mainDiv.appendChild(formSection)

// const formSection = document.querySelector('.formSection')
            const divAbout = document.createElement("div")
            divAbout.setAttribute('class' ,"divAbout")
            formSection.appendChild(divAbout)
            divAbout.insertAdjacentHTML( 'afterend',
                      `
                      <div class="mealSharingForm">
                      <h3>Share A New Meal : </h3>
                    <form class="mealSharingInput" method ="post" action="../../api/meals" enctype="multipart/form-data">
                    <label for="hostName">Host name:</label>
                    <input type="text" id="hostName" name="hostName" required>
                    <label for="title">Meal title:</label>
                    <input type="text" id="title" name="title" required>
                    <label for="description">Meal description:</label>
                    <input type="text" id="description" name="description" required>
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required>
                    <label for="when"> When:</label>
                    <input type="datetime" id="when" name="when" placeholder ="e.g. ${getDate}" required>
                    <label for="max_reservations"> max_reservations:</label>
                    <input type="text" id="max_reservations" name="max_reservations" required>
                    <label for="price">Price:</label>
                    <input type="text" id="price" name="price" required>
                    <label for="created_date">Created Date:</label>
                    <input type="datetime" id="created_date" name="created_date" required> 
                      <button type ="submit" value= "Submit">Submit</button>
                  <h3>Organics : </h3>
                  <p>It is difficult to get organic food in the most restaurants or even at home nowadays, but we are willing to serve you your best organic food choice.</p>
                  </form>
                      </div>`)

//      <label for="image">Meal image (img size:100kb):</label> 
//     <input type="file" id="image" name="image" multiple required> 

        const h3Sabout = document.createElement("h3")
        h3Sabout.innerText= "About This Page:"
        divAbout.appendChild(h3Sabout)
        const myImage = new Image()
        myImage.src="../img/6.jpg"
        myImage.setAttribute('class', "myImage")
        divAbout.appendChild(myImage)

        const aboutP = document.createElement("p")
        aboutP.innerText = "This is a simple web page made for hyf-Copenhagen NodeJS week 4 homework. But you can use this website and share your meal by filling out the Share A New Meal form. People can find your meal in the menus and they will be able to reserve a seat. The registration form limited by maximum space for reservation. please insert your name as a host so, people can know you and please put a correct future date otherwise your meal will not be added to the menu. Your meal will be deleted when its due date expired. If you want to host again you should fillout the form again"
        divAbout.appendChild(aboutP)

// search function for meals
        const mealsResponse = await fetch('/api/available_reserve');
        const resultMmeals = await mealsResponse.json()
        const searchBarSection = document.getElementsByClassName('searchBar')[0];
            searchInput = document.createElement('input')
            searchInput.setAttribute('type', "text")
            searchInput.setAttribute('class', "searchInput")
            searchInput.setAttribute('placeholder' , "Find your favorite meal")
        searchBarSection.appendChild(searchInput)
        const ulSearchTage = document.createElement('ul')
              ulSearchTage.setAttribute('class', "searchUlTage")
                        searchBarSection.appendChild(ulSearchTage)        
                        searchInput.addEventListener('input', (e) =>{
                              const pageLinks = `/meal/`
                              let searchArry=[]
                                    if(e.target.value) {
                                          searchArry = resultMmeals.filter(title=> title.title.toLowerCase().includes(e.target.value))
                                          searchArry=searchArry.map(title=>`<li><a href=${pageLinks.concat(title.id)} > ${title.title}</a></li>`)
                                    } 
                                    showSearch(searchArry)

                        });
                        async function showSearch(searchArry){
                              const eachItem = await !searchArry.length? ' ' : searchArry.join('');
                                    ulSearchTage.innerHTML = eachItem   
                        };    
};

window.handleHomeRequest = async ( req, res) => {
const body = document.querySelector('body')
const headerNav = document.querySelector('.headerNav')
      const h3Tag = document.createElement('h3')
            h3Tag.setAttribute('id' , "homeHref")
            headerNav.appendChild(h3Tag)
      const meals = `/meals`
            h3Tag.innerHTML = `<a href= ${meals}> Meals Option </a>`;

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


const formSection = document.querySelector('.formSection')
            const divAbout = document.createElement("div")
            divAbout.setAttribute('class' ,"divAbout")
            formSection.appendChild(divAbout)
            divAbout.insertAdjacentHTML( 'afterend',
                      `
                      <div class="mealSharingForm">
                      <h3>Share A New Meal : </h3>
                    <form action="../../api/meals" method ="post">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required><br>
                    
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" required>
                    
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required>
                    <label for="when"> When:</label>
                    <input type="text" id="when" name="when" placeholder ="2020-05-22 00:00:00"required>
                    <label for="max_reservations"> max_reservations:</label>
                    <input type="text" id="max_reservations" name="max_reservations" required>
                    <label for="price">Price:</label>
                    <input type="text" id="price" name="price" required>
                    <label for="created_date">Created Date:</label>
                    <input type="text" id="created_date" name="created_date" placeholder ="2020-05-22 00:00:00" required>
                    
                      <button type ="submit" value= "Submit">Submit</button>
                  <h3>Organics : </h3>
                  <p>It is difficult to get organic food in the most restaurants or even at home nowadays, but we are willing to serve you your best organic food choice.</p>
                  </form>
                      </div>`)

        const h3Sabout = document.createElement("h3")
        h3Sabout.innerText= "About This Page:"
        divAbout.appendChild(h3Sabout)
        const myImage = new Image()
        myImage.src="../img/Malek.png"
        myImage.setAttribute('class', "myImage")
        divAbout.appendChild(myImage)

        const aboutP = document.createElement("p")
        aboutP.innerText = "Once upon a time a filmmaker forced to leave his country. He toke his  backpake and went from one country to another one. Finally he found himself in beautifull city of Copenhagen where he soposide to find job as a filmmaker, but didn't ! He wrote tens of appplications and send them to whereever address he found but he didn't recivied any responce! It was the main reason that he decided to become a web developer. He found his way to Hack Your Future-Copenhagen and right now he is in the proccess of hacking his future! This meal sharing website is a kind of home work having magical affect for tasting nations' dishes! Watch pictures for about ten secounds , read the discriptions and try to feel the tasts! "
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


//  // if any links are added to the dom, use this function
//   // make the router handle those links.
// router.updatePageLinks();
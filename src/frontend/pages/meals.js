window.handleMealsRequest = async () => {
  const headerNav = document.querySelector('.headerNav')
      const aTag = document.createElement('a')
            aTag.setAttribute('class' , "homeHref")
            headerNav.appendChild(aTag)
      const home = `/`
            aTag.href = home;
            aTag.innerHTML = " << Back ";


  const section = document.querySelector('.firstSection')
  const h2Tag = document.createElement('h2')
  h2Tag.innerText = "menus: "
  section.appendChild(h2Tag)

  // fetch all meals and only avilble reservations 
  const avilbleResponse = await fetch("/api/available_reserve")
  const availbeRes = await avilbleResponse.json()
  // pushing all input from diffirent arry to one to make ney array
  const reservetTotal =[]
  reservetTotal.push(availbeRes)

  const generalDiv = document.createElement('dive')
  generalDiv.setAttribute("class", 'mealGeneralDive')
section.appendChild(generalDiv)

  const renderMeals = reservetTotal.map(meal => {

    const secondLayer = meal.forEach(meal => {

      // text info
      const dive1 = document.createElement('dive')
      dive1.setAttribute("class", 'childDive')
      generalDiv.appendChild(dive1)
const dive2 = document.createElement('dive')
      dive2.setAttribute("class", 'childDive ')
      generalDiv.appendChild(dive2)
const dive3 = document.createElement('dive')
      dive3.setAttribute("class", 'childDive')
      generalDiv.appendChild(dive3)
 const dive4 = document.createElement('dive')
       dive4.setAttribute("class", 'btnDive')
      generalDiv.appendChild(dive4)
const dive5 = document.createElement('dive')
      dive5.setAttribute("class", 'btnDive')
      generalDiv.appendChild(dive5)
const dive6 = document.createElement('dive')
      dive6.setAttribute("class", 'btnDive')
      generalDiv.appendChild(dive6)

 // meals text section
        const ulTag = document.createElement('ul');
        dive1.appendChild(ulTag)

        // reviews text section
        const revH4Tag = document.createElement('h4');
        revH4Tag.innerHTML = "Reviews:"
        dive3.appendChild(revH4Tag)

        const revUlTag = document.createElement('ul');
        dive3.appendChild(revUlTag)


            // image 
            const images = ['../img/1.jpg','./../img/2.jpg','../img/3.jpg','../img/5.jpg', '../img/6.jpg' ]
            const imageRandoom = images[Math.floor(Math.random() * (images.length))];
                    const img = new Image()
                    img.src= imageRandoom
                    dive2.appendChild(img)

        // date by details
          const d = new Date(meal.when)
          const date =d.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric'})
          const houer = d.toLocaleTimeString()

            //console.log(day)
            ulTag.innerHTML = ` 
            <h4 class="firstLi"> <strong></strong> ${ meal.title} </h4> 
            <li> <strong>Description:</strong> ${meal.mealDescrip}</li> 
            <li> <strong>Max-reservation:</strong> ${meal.max_reservations}</li> 
            <li><strong>Price:</strong> ${meal.price}.Kr </li>
            <li><strong>Location:</strong> ${meal.location}</li>
            <li><strong>Date:</strong> ${date} </li>
            <li><strong>Time:</strong> ${houer} </li> 
            <li> <strong>Host Name:</strong> ${ meal.hostName} </li>`
            // review text Part
            // stars converter 
                        const starsNum = meal.totalStars
                        const STAR= "&#11089;"
                        stars = '';
                        const starOutput= []
                        for ( i= 1; i<=starsNum; i++) {
                              if(i<starsNum) {
                              stars=STAR 
                                    starOutput.push(stars)
                              }
                        }

            if ( meal.revDescrip === null) {
                  revUlTag.innerHTML = `
                  <li> <strong>Description:</strong> No reviews</li>`
            } else {
                  revUlTag.innerHTML = `
                  <li class=" "><span style="color: rgb(255,223,0);">${starOutput.slice(0, 5).join('')}</strong></li>`
                  const pre = document.createElement('pre')
                  pre.insertAdjacentHTML("afterbegin" ,`<li>${meal.revDescrip.split(",").join('\n')}</li>`)
                  dive3.appendChild(pre)
            }
                              // review Section
                              const mealPage = `/meal/`
                              const reviewsBtn = document.createElement("button")
                                    reviewsBtn.innerText = "Give a feedback"
                                    dive6.appendChild(reviewsBtn)
                                    reviewsBtn.addEventListener("click", function (evt) { evt.preventDefault(); window.location.replace(mealPage.concat(meal.id)); return false; })

                if (meal.max_reservations > meal.totalOfGuests) {

                  // book seat button
                  const bookBtn = document.createElement("button")
                  bookBtn.innerText="Book Seat"
                  dive4.appendChild(bookBtn)
                  bookBtn.addEventListener("click", function (evt) { evt.preventDefault(); window.location.replace(mealPage.concat(meal.id)); return false; })

                // button for remain
                      const remained = meal.max_reservations - meal.totalOfGuests
                      const remainBtn = document.createElement("button")
                      dive5.appendChild(remainBtn)
                      const remainPTag = document.createElement('p') 
                      remainPTag.innerText=`${remained} Seat availble`
                      remainBtn.appendChild(remainPTag) 

                    } else {
                      //const table = document.querySelector('section > table')
                      const btn = document.createElement("button")
                      dive4.appendChild(btn)
                      const pTag = document.createElement('p') 
                      pTag.innerText = "Fully booked!"
                      btn.appendChild(pTag)
                    }
                  });
                  return secondLayer
            });
  return renderMeals
};


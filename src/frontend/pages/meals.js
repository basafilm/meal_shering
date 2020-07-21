window.handleMealsRequest = async () => {
  const headerNav = document.querySelector('.headerNav')
      const h3Tag = document.createElement('h3')
            h3Tag.setAttribute('id' , "homeHref")
            headerNav.appendChild(h3Tag)
      const home = `/`
            h3Tag.innerHTML = `<a href= ${home}> << Back </a>`;


  const section = document.querySelector('.firstSection')
  const h2Tag = document.createElement('h2')
  h2Tag.innerText = "Meals: "
  section.appendChild(h2Tag)

  // fetch all meals and only avilble reservations 
  const avilbleResponse = await fetch("/api/available_reserve")
  const availbeRes = await avilbleResponse.json()
  // pushing all input from diffirent arry to one to make ney array
  const reservetTotal =[]
  reservetTotal.push(availbeRes)

  const renderMeals = reservetTotal.map(meal => {

    const secondLayer = meal.forEach(meal => {

      // text info

      const table = document.createElement('table')
      const trFirst = document.createElement('tr')
            table.appendChild(trFirst)
      const th1 = document.createElement('th')
            th1.setAttribute('class', "tabletext")
      const th2 = document.createElement('th')
            th2.setAttribute('class', "tableImage")
      const th3 = document.createElement('th')
            th3.setAttribute('class', "tableReviw")
            trFirst.appendChild(th1)
            trFirst.appendChild(th2)
            trFirst.appendChild(th3)
      
      const trSecond = document.createElement('tr')
            table.appendChild(trSecond)
      const td1 = document.createElement('td')
      const td2 = document.createElement('td')
      const td3 = document.createElement('td')
            td1.setAttribute('class', "tabletext")
            td2.setAttribute('class', "tableImage")
            td3.setAttribute('class', "tableReviw")
            trSecond.appendChild(td1)
            trSecond.appendChild(td2)
            trSecond.appendChild(td3)
                
      const trTirth = document.createElement('tr')
            table.appendChild(trTirth)
      const td4 = document.createElement('td')
      const td5 = document.createElement('td')
      const td6 = document.createElement('td')
            trTirth.appendChild(td4)
            trTirth.appendChild(td5)
            trTirth.appendChild(td6)

            // meals text section
        const ulTag = document.createElement('ul');
        section.appendChild(table)
        td1.appendChild(ulTag)

        // reviews text section
        const revH4Tag = document.createElement('h4');
        revH4Tag.innerHTML = "Reviews:"
        td3.appendChild(revH4Tag)

        const revUlTag = document.createElement('ul');
        td3.appendChild(revUlTag)


            // image 
            const images = ['../img/1.jpg','./../img/2.jpg','../img/3.jpg','../img/5.jpg', '../img/6.jpg' ]
            const imageRandoom = images[Math.floor(Math.random() * (images.length))];
                    const img = new Image()
                    img.src= imageRandoom
                    td2.appendChild(img)

        // date by details
          const d = new Date(meal.when)
          const date =d.getFullYear()
          const houer = d.getHours()
          const minute = d.getMinutes()
          const seconds = d.getSeconds()

            //console.log(day)
            ulTag.innerHTML = `<li> <strong>Title:</strong> ${ meal.title} </li> 
            <li> <strong>Description:</strong> ${meal.mealDescrip}</li> 
            <li> <strong>Max-reservation:</strong> ${meal.max_reservations}</li> 
            <li><strong>Price:</strong> ${meal.price}.Kr </li>
            <li><strong>Location:</strong> ${meal.location}</li>
            <li><strong>Date:</strong> ${date}/${d.getMonth()}/${d.getDay()} </li>
            <li><strong>When:</strong> ${houer}: ${minute}: ${seconds} </li> `

            // review text Part
            // stars converter 
                        const starsNum = meal.totalStars
                        const STAR= "&#11089;"
                        stars = '';
                        const output= []
                        for ( i= 1; i<=starsNum; i++) {
                              if(i<starsNum) {
                              stars=STAR 
                                    output.push(stars)
                              }
                        }

            if ( meal.revDescrip === null) {
                  revUlTag.innerHTML = `
                  <li> <strong>Description:</strong> No reviews</li>`
            } else {
                  revUlTag.innerHTML = `
                  <li class=" "><span style="color: rgb(255,223,0);">${output.slice(0, 5).join('')}</strong></li>
                  <pre><li>${meal.revDescrip.split(",").join('\n')}</li></<pre>`
            }
                              // review Section
                              const reviewsBtn = document.createElement("button")
                              td6.appendChild(reviewsBtn)
                              const revATag = document.createElement('a') 
                              const mealPage = `/meal/`
                              revATag.href = mealPage.concat(meal.id);
                              revATag.innerText = "Give a feedback"
                              reviewsBtn.appendChild(revATag) 


                if (meal.max_reservations > meal.totalOfGuests) {

                  // book seat button
                  const bookBtn = document.createElement("button")
                  td4.appendChild(bookBtn)
                  const aTag = document.createElement('a') 
                  const mealPage = `/meal/`
                  aTag.href = mealPage.concat(meal.id);
                  aTag.innerText = "Book Seat"
                  bookBtn.appendChild(aTag) 

                // button for remain
                      const remained = meal.max_reservations - meal.totalOfGuests
                      const remainBtn = document.createElement("button")
                      td5.appendChild(remainBtn)
                      const remainATag = document.createElement('a') 

                      remainATag.innerText=`${remained} Seat availble`
                      remainBtn.appendChild(remainATag) 

                    } else {
                      //const table = document.querySelector('section > table')
                      const btn = document.createElement("button")
                      td4.appendChild(btn)
                      const aTag = document.createElement('a') 
                      aTag.innerText = "Not Availble!"
                      btn.appendChild(aTag)
                    }
                  });
                  return secondLayer
            });
  return renderMeals
};


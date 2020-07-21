window.handleResRequest = async ( req, res) => {
    const headerNav = document.querySelector('.headerNav')
    const h3Tag = document.createElement('h3')
          h3Tag.setAttribute('id' , "homeHref")
          headerNav.appendChild(h3Tag)
    const home = `/`
          h3Tag.innerHTML = `<a href= ${home}> Main Page </a>`;
          const getMainDiv = document.querySelector('.mainDiv')  
          const responseH4tage =  document.createElement('h4')
                responseH4tage.innerHTML = "Succesfully submited "
                getMainDiv.appendChild(responseH4tage)
                const ulResponse =document.createElement('ul')
                ulResponse.innerHTML = " Thanks for beeing with us"
                getMainDiv.appendChild(ulResponse)

                const returnH3Tage = document.createElement('h4')
                getMainDiv.appendChild(returnH3Tage)
                const meals = `/meals`
                returnH3Tage.innerHTML = `<a href= ${meals}> << Meals Option </a>`;
          

      //     const getReview =   `/api/reviews`;
      //       const reviewRes = await fetch(getReview)
      //       const review = await reviewRes.json()

            // const eachItem = review.map(item => {
            //       const meal_Id = item.meal_Id
            //       const reviewStars = item.stars
            //       const reviewDescrp = item.description
            // ulResponse.innerHTML = `
            // <li><strong>Descripton:</strong> ${reviewDescrp}</li>
            // <li><strong>Stars:</strong> ${reviewStars}</li>
            // <li><strong> For meal Id:</strong> ${meal_Id}</li>
            // <li><strong>Thanks for your feedback.</strong></li>
            // `
 
            // })






}
window.handleResRequest = async ( req, res) => {
    const headerNav = document.querySelector('.headerNav')
    const h3Tag = document.createElement('h3')
          h3Tag.setAttribute('class' , "homeHref")
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
}
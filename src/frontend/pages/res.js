window.handleResRequest = async ( req, res) => {
    const headerNav = document.querySelector('.headerNav')
    const aTag = document.createElement('a')
          aTag.setAttribute('class' , "homeHref")
          headerNav.appendChild(aTag)
    const home = `/`
          aTag.innerHTML = `<a href= ${home}> Home </a>`;

          const firstSection = document.querySelector('.firstSection')
          const resDive = document.createElement('div') 
            resDive.setAttribute('class', "resDiv") 
                firstSection.appendChild(resDive)
          const responseH4tage =  document.createElement('h4')
                responseH4tage.innerHTML = "Succesfully submited "
                resDive.appendChild(responseH4tage)
                const ulResponse =document.createElement('ul')
                ulResponse.insertAdjacentHTML('afterbegin' , `
                <li> Thanks for beeing with us! </li>
                <li> If you want to go back to the menus click on the menu </li>`
                ) 
                resDive.appendChild(ulResponse)

                const returnH3Tage = document.createElement('h4')
                resDive.appendChild(returnH3Tage)
                const meals = `/meals`
                returnH3Tage.innerHTML = `<a href= ${meals}> Menu </a>`;
}
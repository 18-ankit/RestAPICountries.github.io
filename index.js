
const countriesElem = document.querySelector( ".countries" );
const dropDown = document.querySelector( ".dropDown" );
const dropElem = document.querySelector( ".drop" );
const region = document.querySelectorAll( ".region" );
const Search = document.querySelector( ".search" );
const Toggle = document.querySelector( ".toggle" );
const Moon = document.querySelector( ".moon" );



async function getCountry () {
    const url = await fetch( "https://restcountries.com/v2/all" );
    const res = await url.json();
    console.log( res );
    res.forEach(element => {
        showCountry(element ); 
    });
    
}
getCountry();

function showCountry ( data ) {
    const country = document.createElement( "div" );
    country.classList.add( "country" );
    country.innerHTML = `
                        <div class="country-img">
                            <img src="${data.flag}" alt="">
                        </div>
                        <div class="country-info">
                            <h4 class="countryName">${data.name}</h4>
                            <p><strong>Population :</strong> ${data.population}</p>
                            <p class="regionName"><strong>Region :</strong> ${data.region}</p>
                            <p><strong>Capital :</strong> ${data.capital}</p><br>
                            <center><p><strong> <i> 👆  Click to know more</i> </strong></p></center>
                            
                        </div>
    `;
    countriesElem.appendChild( country );

    country.addEventListener( "click", () => { 
        showCountryDetails(data);
    } );
    
}

dropDown.addEventListener( "click", () => { 
    dropElem.classList.toggle( "showDropDown" );
} );

const regionName = document.getElementsByClassName( "regionName" );
const countryName = document.getElementsByClassName( "countryName" );


region.forEach( element => {
    element.addEventListener( "click", () => { 

        Array.from( regionName ).forEach( elem => { 
            
            if ( elem.innerText.includes( element.innerText ) || element.innerText == "All" ) {
                elem.parentElement.parentElement.style.display = "grid";
            } else {
                elem.parentElement.parentElement.style.display = "none";

            }

        } );
    } );
} );

Search.addEventListener( "input", () => { 
    
    Array.from( countryName ).forEach( elem => {

        if ( elem.innerText.toLowerCase().includes( Search.value.toLowerCase() ) ) {
            elem.parentElement.parentElement.style.display = "grid";
        } else {
            elem.parentElement.parentElement.style.display = "none";

        }

    } );
} );

Toggle.addEventListener( "click", () => { 
    document.body.classList.toggle( "dark" );
    Moon.classList.toggle("fas"); 
} );


const countryModel = document.querySelector( ".countryModel" );


function showCountryDetails (data) {
    
    countryModel.classList.toggle( "show" );
    countryModel.innerHTML = `
                            <button class="back"> Back </button>
                               <div class="model">
                                <div class="left-model">
                                    <img src="${data.flag}" class="img-flag" alt="">
                                </div>
                                    <div class="right-model">
                                        <h1>${data.name}</h1>
                                        <div class="model-info">
                                        <div class="inner-left inner">
                                            <p><strong> Native name : </strong> ${data.nativeName}</p>
                                            <p><strong> Population : </strong> ${data.population}</p>
                                            <p><strong> Region : </strong> ${data.region}</p>
                                            <p><strong> Sub-region : </strong> ${data.subregion}</p>
                                        </div>
                                        <div class="inner-right inner">
                                            <p><strong> Capital : </strong> ${data.capital}</p>
                                            <p><strong> Top Level Domain : </strong> ${data.topLevelDomain.map(elem=>elem)}</p>
                                            <p><strong> Currencies : </strong> ${data.currencies.map(elem=>elem.name)}</p>
                                            <p><strong> Languages : </strong> ${data.languages.map( elem => elem.name )}</p>
                                        </div>

                                        </div>
                                    </div>
                                 </div>
    `;

    const Back = countryModel.querySelector( ".back" );


    Back.addEventListener( "click", () => {
        countryModel.classList.toggle( "show" );
    } );

}
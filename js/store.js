function handleSearch(){
    const searchInputElement = document.getElementById('search-input-field');
    const searchInputValue = searchInputElement.value;
   
    loadphone(searchInputValue);
}                                                      

const loadphone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    
    console.log("Server Response: ", res);
   
    const serverData = await res.json();
    
    displayPhone(serverData.data);
};

const displayPhone = (data) => {
    console.log(data);
   const cardContainer = document.getElementById('card-section');

    cardContainer.innerHTML = '';

   data.forEach((phone) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');

    productCard.innerHTML = `
    <div class="card-image">
               <img src=${phone.image} alt="phone-image" />
             </div>

             <h3 class="card-title">${phone.phone_name}</h3>
             <p class="card-description">
               There are many variations of passages of available, but the majority
               have suffered
             </p>

             <div class="card-price">
              <span>$</span>
              <span id="item-price">799</span>
             </div>

             <div class="card-button">
             <button class="btn">Show Details</button>
            </div>
    `;

    cardContainer.appendChild(productCard);
   });
}




                             


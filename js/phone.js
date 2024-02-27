const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    const cartContainer = document.getElementById('phone-container');

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // clear card before add new cart // 
    phones = phones.slice(0, 12)                                        
    cartContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCart = document.createElement('div');
        phoneCart.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCart.innerHTML = `
    <figure>
    <img src="${phone.image}" alt="Phone" />
    </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>`;
                cartContainer.appendChild(phoneCart)
    });
    togglePhoneLoader(false)
};
const searchPhone = () =>{
    togglePhoneLoader(true)
  const searchField = document.getElementById('input-field');
  const search = searchField.value;
//   console.log(search);
  loadPhone(search);
}
// spinner or loader //
const loaderSection = document.getElementById('phones-loader');
const togglePhoneLoader = (isLoading) =>{
 if(isLoading){
    loaderSection.classList.remove('hidden')
 }
 else{
    loaderSection.classList.add('hidden')
 }
}
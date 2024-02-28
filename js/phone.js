const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const cartContainer = document.getElementById('phone-container');

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // clear card before add new cart // 
    if(!isShowAll){
      phones = phones.slice(0, 12);
    }
    cartContainer.textContent = '';
    // handleShowAll();
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
                    <button onclick='showDetailsHandler("${phone.slug}")' class="btn btn-primary">Show Details</button>
                  </div>
                </div>`;
                cartContainer.appendChild(phoneCart)
    });
    togglePhoneLoader(false);

    
};
// show details handler //
const showDetailsHandler = async (id) => {
  // console.log(id);
  // data Load //
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showDetailsphones(phone)
};
// show phone details //
const showDetailsphones = (phone) =>{
  console.log(phone);
  show_details_modal.showModal();
  const showName = document.getElementById('phone-name');
  showName.innerText = phone.name;
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <h2 class='font-semibold text-[20px]'>Storage: ${phone.mainFeatures.storage}</h2>
  <h2 class='font-semibold text-[20px]'>Bluetooth: ${phone?.others?.luetooth}</h2>
  <h2 class='font-semibold text-[20px]'>WLN: ${phone?.others?.WLAN || 'NO WLN available'}</h2>
  `
}
// search phone //
const searchPhone = (isShowAll) =>{
    togglePhoneLoader(true)
  const searchField = document.getElementById('input-field');
  const search = searchField.value;
//   console.log(search);
  loadPhone(search, isShowAll);
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
};
// handle show all phones //
const handleShowAll = () => {
   searchPhone(true);
}
// loadPhone('13');
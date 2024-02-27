const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}
const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
        const cartContainer = document.getElementById('phone-container');
        const phoneCart = document.createElement('div');
        phoneCart.classList = `card w-96 bg-gray-100 p-4 shadow-xl`;
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
    })
}
loadPhone();
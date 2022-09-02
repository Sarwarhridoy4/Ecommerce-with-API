console.log("Hellow World");
//fetching data...
const loadAllproducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
};
//Setting Menu dynamically...
const setAllMenu = async () => {
  const products = await loadAllproducts();
  const Menu = document.getElementById("all-menu");
  const uniqeArray = [];
  for (const product of products) {
    // console.log(product.category);
    //Preventing multiple copying...
    if (uniqeArray.indexOf(product.category) === -1) {
      uniqeArray.push(product.category);

      const li = document.createElement("li");
      li.innerHTML = `
  
      <a>
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              ${product.category}
                          </a>
  
      `;
      Menu.appendChild(li);
    }
  }
};

setAllMenu();

// loadAllproducts();
//search implimentation....
const seaarchField = document.getElementById("search-field");
seaarchField.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    // console.log(seaarchField.value);
    const searchValue = seaarchField.value;
    const Allproducts = await loadAllproducts();
    // console.log(Allproducts);
    const foundProducts = Allproducts.filter((product) =>
      product.category.includes(searchValue)
    );
    console.log(foundProducts);
    // set product card dynamically...
    const productContainer = document.getElementById("products-container");
    productContainer.textContent = "";

    if (foundProducts.length === 0) {
      console.log("Not Found");
      const notFound = document.getElementById("not-found");

      notFound.classList.remove("hidden");
    } else {
      const notFound = document.getElementById("not-found");
      notFound.classList.add("hidden");
    }

    foundProducts.forEach((product) => {
      // console.log(product);

      const { title, category, image } = product;
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src="${image}" alt="Shoes" class="rounded-xl h-60 w-full" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${category}</h2>
    <p>${title.length > 20 ? title.slice(0, 20) + "..." : title}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Show Detailse</button>
    </div>
  </div>
</div>
        
        
        `;
      productContainer.appendChild(div);
    });
  }
});

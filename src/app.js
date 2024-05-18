document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Moon  Pizza Rolls", img: "menu3.jpg", price: 10000 },
      { id: 2, name: "Moon Ppang", img: "menu4.png", price: 8000 },
      { id: 3, name: "Moon Cupcake", img: "menu5.jpg", price: 17000 },
      { id: 4, name: "Moon Croissant", img: "menu6.png", price: 15000 },
      { id: 5, name: "Moon Shortcake", img: "menu7.jpg", price: 20000 },
      { id: 6, name: "Banana Puff", img: "menu8.png", price: 7000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apa barangnya sama di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);
      //jika barangnya belum ada di cart
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //barang udah ada di cart, cek barang itu sama atau nggak
        this.items = this.items.map((item) => {
          //jika barangnya beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barangnya udah ada sebelumnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.items);
    },
    remove(id) {
      //item yang mau diremove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);
      //jika barang lebih dari 1
      if (cartItem.quantity > 1) {
        //map itemnya/barangnya
        this.items = this.items.map((item) => {
          //jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//Form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//kirim data checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6281284557237?text=" + encodeURIComponent(message));
});

//format pesan wa
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
  Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih`;
};

//Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

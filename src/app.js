document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Bun", img: "menu1.jpg", price: 7000 },
      { id: 2, name: "cake", img: "menu2.jpg", price: 19000 },
      { id: 3, name: "cwaffle", img: "menu1.jpg", price: 15000 },
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

//Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

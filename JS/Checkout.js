Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);
Vue.use(window.vuelidate.default)
const { required, email, numeric } = window.validators

const store = new Vuex.Store({
  state: {
    products: [
      {
        id: "727026",
        name: "Relógio Rose",
        image:
          "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/Cole%C3%A7%C3%A3o%20Diamond/Cole%C3%A7%C3%A3o%20Diamond/Produto%208/Foto1.png?raw=true",
        price: 300
      },
      {
        id: "727027",
        name: "Pulseira 13mm",
        image:
          "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/Cole%C3%A7%C3%A3o%20Diamond/Cole%C3%A7%C3%A3o%20Diamond/Produto%203/Foto1.png?raw=true",
        price: 80
      },
      {
        id: "727028",
        name: "Anel Diamond",
        image:
          "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/Cole%C3%A7%C3%A3o%20Diamond/Cole%C3%A7%C3%A3o%20Diamond/Produto%205/Foto1.png?raw=true",
        price: 100
      }
    ],
    shippingMethods: [
      {
        id: "correios",
        name: "Correios",
        desc: "Correios - Entrega em 7 Dias Úteis",
        price: "20",
        type: "private"
      },
      {
        id: "jadlog",
        name: "Jadlog",
        desc: "Jadlog - Entrega em 12 Dias Úteis",
        price: "10",
        type: "private"
      },
      {
        id: "totalexpress",
        name: "Total Express",
        desc: "Total Express - Entrega em 15 Dias Úteis",
        price: "5",
        type: "company"
      }
    ],
    basket: {
      basketId: "234235",
      basketTotal: 0,
      orderlines: [],
      shippingPrice: 10
    }
  },
  mutations: {
    setBasketOrderline(state, product) {
      product.quantity = 1;
      state.basket.orderlines.push(product);
    },
    setShippingPrice(state, price) {
      state.basket.shippingPrice = state.basket.shippingPrice + parseInt(price);
      store.dispatch("reCalculateBasket");
    },
    setOrderlineValues(state, props) {
      var orderline = state.basket.orderlines.find(
        x => x.id === props.productId
      );
      orderline.quantity = parseInt(props.quantity);
      orderline.price = orderline.price * parseInt(props.quantity);
      store.dispatch("reCalculateBasket");
    },
    reCalculateBasket(state) {
      var totalProductPrice = 0;
      state.basket.basketTotal = 0; // Reset basketTotal
      $.each(state.basket.orderlines, function(index, product) {
        totalProductPrice = totalProductPrice + product.price;
      });

      state.basket.basketTotal =
        state.basket.basketTotal +
        totalProductPrice +
        state.basket.shippingPrice;
    },
    removeProduct(state, productId) {
      state.basket.orderlines = $.grep(state.basket.orderlines, function(
        orderline
      ) {
        return orderline.id != productId;
      });
      state.products = $.grep(state.products, function(product) {
        return product.id != productId;
      });
      store.dispatch("reCalculateBasket");
    }
  },
  actions: {
    initializeBasket(context, products) {
      $.each(products, function(index, product) {
        context.commit("setBasketOrderline", product);
        context.commit("reCalculateBasket");
      });
    },
    calculateShipping(context, price) {
      context.commit("setShippingPrice", price);
    },
    updateOrderline(context, props) {
      context.commit("setOrderlineValues", {
        productId: props.productId,
        quantity: props.quantity
      });
    },
    reCalculateBasket(context) {
      context.commit("reCalculateBasket");
    },
    removeProduct(context, productId) {
      context.commit("removeProduct", productId);
    }
  },
  getters: {}
});

// Locally Registered Component
const quantitySelect = {
  name: "quantitySelect",
  props: ["productId"],
  data: function() {
    return {
      quantity: 1
    };
  },
  template: `
    <select v-model="quantity">
      <option value="" disabled>Quantity</option>
      <option v-for="(n, index) in 10" :value="n">{{n}}</option>
    </select>
  `,
  computed: {
    orderlines() {
      return this.$store.state.basket.orderlines;
    }
  },
  watch: {
    quantity: {
      handler: function(quantity) {
        this.changeQuantity(quantity, this.productId);
      },
      deep: true
    }
  },
  methods: {
    changeQuantity(quantity, productId) {
      this.$store.dispatch("updateOrderline", {
        productId: productId,
        quantity: quantity
      });
    }
  }
};

new Vue({
  el: "#app",
  name: "CheckOut",
  components: {
    "quantity-select": quantitySelect
  },
  store,
  data: function() {
    return {
      name: "",
      celular: "",
      email: "",
      cpf: "",
      address: "",
      houseNumber: "",
      floor: "",
      door: "",
      city: "",
      zip: "",
      delName: "",
      altcpf: "",
      delAddress: "",
      delHouseNumber: "",
      delFloor: "",
      delDoor: "",
      delCity: "",
      delZip: "",
      delAddressInput: "",
      addressInput: "",
      showAlternative: false,
      sizes: ["Rose", "Prata", "Ouro"],
      shipping: "correios",
      showVoucher: "",
      consent: "",
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 10,
        roundLengths: true, // fix blurry text
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          2166: {
            slidesPerView: 3.2
          },
          1920: {
            slidesPerView: 3
          },
          1640: {
            slidesPerView: 2.6
          },
          1440: {
            slidesPerView: 2.3
          },
          1250: {
            slidesPerView: 1.8
          },
          640: {
            slidesPerView: 1.6
          }
        },
        on: {
          init: function() {
            // Hide pagination if only one is present
            var paginationBullets = $(".swiper-pagination");
            if (paginationBullets.length == 1) {
              paginationBullets.hide();
            }
          }
        }
      }
    };
  },
  validations: {
  	name: {
    	required
    },
    address: {
    	required
    },
    address: {
    	required
    },
    email: {
      required,
      email
    },
    cpf: {
      required,
      numeric
    }
  },
  created: function() {
    this.$store.dispatch("initializeBasket", this.products);
    this.scrollIndicator();
  },
  mounted: function() {
    var _self = this;
    dawaAutocomplete.dawaAutocomplete(
      document.getElementById("autocomplete-input"),
      {
        select: function(selected) {
          _self.address = selected.data.vejnavn;
          _self.houseNumber = selected.data.husnr;
          _self.floor = selected.data.etage;
          _self.door = selected.data.dør;
          _self.city = selected.data.postnrnavn;
          _self.zip = selected.data.postnr;
          _self.addressInput = selected.tekst;
        }
      }
    );
    this.$nextTick(function() {
      window.addEventListener("resize", this.reorderDiv());
    });
  },
  computed: {
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
    addressComputed() {
      var address = this.address ? this.address + " " : "";
      var houseNumber = this.houseNumber ? this.houseNumber : "";
      var floor = this.floor ? ", " + this.floor + ". " : "";
      var door = this.door ? this.door : "";

      return address + houseNumber + floor + door;
    },
    cityComputed() {
      return this.zip + " " + this.city;
    },
    delAddressComputed() {
      var address = this.delAddress ? this.delAddress + " " : "";
      var houseNumber = this.delHouseNumber ? this.delHouseNumber : "";
      var floor = this.delFloor ? ", " + this.delFloor + ". " : "";
      var door = this.delDoor ? this.delDoor : "";

      return address + houseNumber + floor + door;
    },
    delCityComputed() {
      return this.delZip + " " + this.delCity;
    },
    products() {
      return this.$store.state.products;
    },
    shippingMethods() {
      return this.$store.state.shippingMethods;
    },
    taxTotal() {
      return this.$store.state.basket.basketTotal * 0.5;
    },
    basketTotal() {
      return this.$store.state.basket.basketTotal;
    },
    shippingPrice() {
      return this.$store.state.basket.shippingPrice;
    },
    chosenShippingMethod() {
      return this.shippingMethods.find(x => x.id === this.shipping);
    },
    cartSummary() {
      var cartSummary = [];
      $.each(this.products, function(index, product) {
        cartSummary.push(product.name);
      });

      return cartSummary;
    }
  },
  watch: {
    shipping: {
      handler: function(shipping, oldShipping) {
        var price = this.shippingMethods.find(x => x.id === shipping).price;
        var oldPrice = this.shippingMethods.find(x => x.id === oldShipping)
          .price;
        this.calculateShipping(price, oldPrice);
      },
      deep: true
    }
  },
  methods: {
    fetchData(event) {
      event.preventDefault();
      var _self = this;
      var apiURL = "https://dawa.aws.dk/adresser/autocomplete";

      axios
        .get(apiURL, {
          params: {
            q: _self.addressInput
          }
        })
        .then(function(response) {
          _self.addresses = response.data;
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    converterParaReais(price) {
        // Aqui você pode adicionar lógica para formatar o preço para o formato desejado (R$)
        return 'R$' + price;
      },
    deleteItem(productId) {
      console.log(productId);
      this.$store.dispatch("removeProduct", productId);
    },
    calculateShipping(price, oldPrice) {
      if (oldPrice !== undefined) {
        this.$store.dispatch("calculateShipping", -oldPrice);
      }
      this.$store.dispatch("calculateShipping", price);
    },
    scrollToBottom() {
      if (!this.$v.$invalid) {
        $("html,body").animate({ scrollTop: document.body.scrollHeight }, "slow");  
      }
    },
    reorderDiv() {
      if ($(window).width() < 960) {
        $("#step-3").insertBefore("#step-2");
      }
    },
    scrollIndicator() {
      window.onscroll = function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = winScroll / height * 100;
        
        $(".js-progress-bar").width(scrolled + "%");
      };
    },
    goToPayment(event) {
        event.preventDefault();
      
        // Verifica se campos obrigatórios foram preenchidos
        if (this.$v.name.$pending || this.$v.address.$pending || this.$v.email.$pending || this.$v.cpf.$pending) {
          // Ainda estamos aguardando validação assíncrona, aguarde e tente novamente
          setTimeout(() => {
            this.goToPayment(event);
          }, 200);
          return;
        }
      
        // Verifica se todos os campos obrigatórios foram preenchidos corretamente
        if (this.$v.name.$invalid || this.$v.address.$invalid || this.$v.email.$invalid || this.$v.cpf.$invalid) {
          $('html, body').animate({ scrollTop: ($('#step-1').offset().top) }, "slow");
          return;
        }
      
        // Verifica se o consentimento foi dado
        if (this.$v.consent.$invalid) {
          $('html, body').animate({ scrollTop: document.body.scrollHeight }, "slow");
          return;
        }
      
        // Se todas as verificações passaram, redirecione para o link
        window.location.href = url;
      }
  }
});

$(document).ready(function() {
  $("select").formSelect();
});

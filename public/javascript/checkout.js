//var price = document.getElementById("total").value;
// var x = price.value;
var totalPrice = {{{totalPrice}}};
paypal.Buttons({
  style: {
    layout: 'horizontal'
  },
  // Set up the transaction
  createOrder: function(data, actions) {
    //var totalPrice = JSON.parse(totalPrice);
    //var amt = document.getElementById("total");
      return actions.order.create({
          purchase_units: [{
              amount: {
                  //value: JSON.parse(totalPrice)
                  value: totalPrice
                  //currency_code: 'USD'
              }
          }]
      });
  },
  commit: true,
  // Finalize the transaction
  onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
          // Show a success message to the buyer
          alert('Transaction completed by ' + details.payer.name.given_name + '!');
          // req.cart = null;
          // res.redirect("/")
      });
  }
}).render('#paypal-button-container');

// <% if(cart && cart.items.length > 0) { %>
// <form id="paypal-form" action="<%= paypal.url %>" method="post">
//     <input type="hidden" name="cmd" value="_cart">
//     <input type="hidden" name="upload" value="1">
//     <input type="hidden" name="business" value="<%= paypal.businessEmail %>">
//     <input type="hidden" name="currency_code" value="<%= paypal.currency %>">
//     <% cart.items.forEach(function(product, index) { var n = index + 1; %>
//     <input type="hidden" name="quantity_<%= n %>" value="<%= product.qty%>">
//     <input type="hidden" name="item_name_<%= n %>" value="<%= product.title %>">
//     <input type="hidden" name="item_number_<%= n %>" value="SKU <%= product.title%>">
//     <input type="hidden" name="amount_<%= n %>" value="<%= product.price %>">
//     <% }); %>
//     <input type="image" id="paypal-btn" alt="Pay with PayPal" src="/public/images/paypal.png">
// </form>
// <% } else { %>
// <p class="alert alert-info">Sorry, no products in your cart.</p>
// <% } %>

<script>
  var totalPrice = {{{totalPrice}}};
  paypal.Buttons({
    style: {
      layout: 'horizontal'
    },
    // Set up the transaction
    createOrder: function(data, actions) {
      //var totalPrice = JSON.parse(totalPrice);
        return actions.order.create({
            purchase_units: [{
                amount: {
                    
                    value: totalPrice
                    //currency_code: 'USD'
                }
            }]
            
        });
    },
    // Finalize the transaction
    onApprove: function(data, actions) {
    return fetch("http://localhost:5000/shopping-cart", {
      method: "post",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          orderID: data.orderID
        })
      }).then(function(res) {
        return res.json();
      }).then(function(details) {
        alert('Transaction approved by ' + details.payer_given_name);
      });  

    },  
        //return actions.order.capture().then(function() {
            // Show a success message to the buyer
          //actions.redirect();
          //document.location.href ="http://localhost:5000"
            //alert('Transaction completed by ' + details.payer.name.given_name + '!');ions.redirect();
            //window.location("http://localhost:5000/shopping-cart?orderID"+data.orderID);
            //window.location.href= "/"
        //});
    //}
  }).render('#paypal-button-container');
</script>
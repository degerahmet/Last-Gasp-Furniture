const statesAndZones = {
  "AL": {
    "state": "Alabama",
    "zone": 2
  },
  "AZ": {
    "state": "Arizona",
    "zone": 5
  },
  "AR": {
    "state": "Arkansas",
    "zone": 3
  },
  "CA": {
    "state": "California",
    "zone": 4
  },
  "CO": {
    "state": "Colorado",
    "zone": 4
  },
  "CT": {
    "state": "Connecticut",
    "zone": 1
  },
  "DE": {
    "state": "Delaware",
    "zone": 1
  },
  "DC": {
    "state": "District of Columbia",
    "zone": 2
  },
  "FL": {
    "state": "Florida",
    "zone": 3
  },
  "GA": {
    "state": "Georgia",
    "zone": 2
  },
  "ID": {
    "state": "Idaho",
    "zone": 5
  },
  "IL": {
    "state": "Illinois",
    "zone": 2
  },
  "IN": {
    "state": "Indiana",
    "zone": 2
  },
  "IA": {
    "state": "Iowa",
    "zone": 4
  },
  "KS": {
    "state": "Kansas",
    "zone": 4
  },
  "KY": {
    "state": "Kentucky",
    "zone": 2
  },
  "LA": {
    "state": "Louisiana",
    "zone": 3
  },
  "ME": {
    "state": "Maine",
    "zone": 1
  },
  "MD": {
    "state": "Maryland",
    "zone": 1
  },
  "MA": {
    "state": "Massachusetts",
    "zone": 1
  },
  "MI": {
    "state": "Michigan",
    "zone": 2
  },
  "MN": {
    "state": "Minnesota",
    "zone": 5
  },
  "MS": {
    "state": "Mississippi",
    "zone": 3
  },
  "MO": {
    "state": "Missouri",
    "zone": 4
  },
  "MT": {
    "state": "Montana",
    "zone": 5
  },
  "NE": {
    "state": "Nebraska",
    "zone": 5
  },
  "NV": {
    "state": "Nevada",
    "zone": 5
  },
  "NH": {
    "state": "New Hampshire",
    "zone": 1
  },
  "NJ": {
    "state": "New Jersey",
    "zone": 1
  },
  "NM": {
    "state": "New Mexico",
    "zone": 4
  },
  "NY": {
    "state": "New York",
    "zone": 1
  },
  "NC": {
    "state": "North Carolina",
    "zone": 2
  },
  "ND": {
    "state": "North Dakota",
    "zone": 5
  },
  "OH": {
    "state": "Ohio",
    "zone": 2
  },
  "OK": {
    "state": "Oklahoma",
    "zone": 4
  },
  "OR": {
    "state": "Oregon",
    "zone": 5
  },
  "PA": {
    "state": "Pennsylvania",
    "zone": 1
  },
  "RI": {
    "state": "Rhode Island",
    "zone": 1
  },
  "SC": {
    "state": "South Carolina",
    "zone": 2
  },
  "SD": {
    "state": "South Dakota",
    "zone": 4
  },
  "TN": {
    "state": "Tennessee",
    "zone": 2
  },
  "TX": {
    "state": "Texas",
    "zone": 3
  },
  "UT": {
    "state": "Utah",
    "zone": 5
  },
  "VT": {
    "state": "Vermont",
    "zone": 1
  },
  "VA": {
    "state": "Virginia",
    "zone": 2
  },
  "WA": {
    "state": "Washington",
    "zone": 5
  },
  "WV": {
    "state": "West Virginia",
    "zone": 2
  },
  "WI": {
    "state": "Wisconsin",
    "zone": 5
  },
  "WY": {
    "state": "Wyoming",
    "zone": 5
  }
}


const taxRate = 0.15; // 15% Tax Rate
const noShippingAmt = 100; // Orders over this amount are free of shipping
const shippingZoneFees = {
  1: 0,
  2: 20,
  3: 30,
  4: 35,
  5: 45,
}

const items = {
  'chair': {
    name: 'Chair',
    price: 25.50,
  },
  'table': {
    name: 'Table',
    price: 49.99,
  },
  'recliner': {
    name: 'Recliner',
    price: 200.00,
  },
  'umbrella': {
    name: 'Umbrella',
    price: 15.00,
  }
}

//// Shipping, Tax, and Total Calculation Functions ///

const calculateOrderAmtTotal = (cartItemList) => {
  let total = 0;
  cartItemList.forEach((item) => {
    total += item.price * item.quantity;
  })
  return total;
}

const shippingZone = (state) => {
  return statesAndZones[state].zone;
}

function calculateShippingCost(state, orderAmt) {
  // Calculate shipping cost based on state and order amount
  switch (shippingZone(state)) {
    case (1):
      return orderAmt > noShippingAmt ? 0 : shippingZoneFees[1]; // Free Shipping
    case (2):
      return orderAmt > noShippingAmt ? 0 : shippingZoneFees[2]; // $20 Shipping
    case (3):
      return orderAmt > noShippingAmt ? 0 : shippingZoneFees[3]; // $30 Shipping
    case (4):
      return orderAmt > noShippingAmt ? 0 : shippingZoneFees[4]; // $35 Shipping
    case (5):
      return orderAmt > noShippingAmt ? 0 : shippingZoneFees[5]; // $45 Shipping
  }
}

const calculateSubtotal = (orderAmt, shippingCost) => {
  return orderAmt + shippingCost;
}

const calculateTax = (orderAmt) => {
  return orderAmt * taxRate;
}

const calculateInvoiceTotal = (orderAmt, tax, shippingCost) => {
  return orderAmt + tax + shippingCost;
}

///// Validation Functions ----------------------------

const isItemExists = (item) => {
  const itemLowercase = item.toLowerCase();
  return items[itemLowercase] ? true : false;
}

const isQuantityValid = (quantity) => {
  return quantity > 0 ? true : false;
}

const isStateValid = (state) => {
  const stateUpppercase = state.toUpperCase();
  return statesAndZones[stateUpppercase] ? true : false;
}

const isCartItemExistsBefore = (item, cartItems) => {
  const itemLowercase = item.toLowerCase();
  return cartItems.find(cartItem => cartItem.item === itemLowercase) ? true : false;
}

const continueShopping = () => {
  let continueShopping = prompt('Continue shopping? y/N');
  continueShopping.toLowerCase();
  return continueShopping === 'y' ? true : false;
}

// ------------------------------------------------------ //


/// Display Function ///
const displayInvoice = (cartItemList, orderAmt, shippingCost, state, subtotal, tax, invoiceTotal) => {
  const headerList = ['Item', 'Quantity', 'Unit Price', 'Price'];
  const headerRow = document.createElement('tr');
  const invoice = document.getElementById('invoice');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const tableFooter = document.createElement('tfoot');

  // Header
  headerList.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);
  table.appendChild(tableBody);
  table.appendChild(tableFooter);
  invoice.appendChild(table);

  // Body
  cartItemList.forEach(item => {
    const row = document.createElement('tr');
    const itemName = document.createElement('td');
    itemName.textContent = item.name;

    const itemQty = document.createElement('td');
    itemQty.textContent = item.quantity;

    const itemUnitPrice = document.createElement('td');
    itemUnitPrice.textContent = item.price;

    const itemPrice = document.createElement('td');
    itemPrice.textContent = Number(item.price) * Number(item.quantity);

    row.appendChild(itemName);
    row.appendChild(itemQty);
    row.appendChild(itemUnitPrice);
    row.appendChild(itemPrice);
    tableBody.appendChild(row);
  });

  // Footer (Summary)

  // Order Amount
  let summaryData = `<td><strong>Order Amount:</strong> ${orderAmt.toFixed(2)}</td>`;
  // Shipping Cost
  summaryData += `<tr><td><strong>Shipping to ${state}:</strong> ${shippingCost} </td></tr>`;
  // Subtotal
  summaryData += `<tr><td><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</td></tr>`;
  // Tax
  summaryData += `<tr><td><strong>Tax:</strong> ${tax.toFixed(2)}</td></tr>`;
  // Invoice Total
  summaryData += `<tr><td><strong>Invoice Total:</strong> ${invoiceTotal.toFixed(2)}</td></tr>`;

  tableFooter.innerHTML = summaryData;
};




/// Order Processing Functions /// --------------------------------------

function makePurchase(cartItems) {
  // Taking Cart item input from the user
  let cartItem = prompt('What would you like to purchase?' + '\n' + 'Chair, Table, Recliner, or Umbrella?').toLowerCase();

  // Checking if the item exists in the inventory
  while (!isItemExists(cartItem)) {
    cartItem = prompt('Please enter a valid item.' + '\n' + 'Chair, Table, Recliner, or Umbrella?').toLowerCase();
  }

  // Taking Quantity input from the user
  let quantity = prompt(`How many ${cartItem} would you like to purchase?`)

  // Checking if the quantity is valid
  while (!isQuantityValid(quantity)) {
    quantity = prompt('Please enter a valid quantity.')
  }

  quantity = Number(quantity); // Convert quantity to a number because prompt returns a string

  // Check if cart item exists before adding to cart
  // If it does, increment quantity
  // If it doesn't, add it to cart
  switch (isCartItemExistsBefore(cartItem, cartItems)) {
    case true:
      cartItems.forEach((item) =>
        item.item === cartItem ? item.quantity += quantity : null
      )
      break;
    case false:
      cartItems.push({
        item: cartItem,
        name: items[cartItem].name,
        quantity: quantity,
        price: items[cartItem].price
      })
      break;
  }
}


// Main Function //
function main() {
  const cartItems = []; // Initialize an empty array to store cart items

  // Make Purchase
  makePurchase(cartItems);

  // Make purchase again?
  while (continueShopping()) {
    makePurchase(cartItems)
  }

  // Getting state input from the user
  let state = prompt('Please enter the two letter state abbreviation.').toUpperCase();
  while (!isStateValid(state)) {
    state = prompt('Please enter a valid state.')
  }

  // Calculate Order Amount
  const orderAmt = calculateOrderAmtTotal(cartItems);

  // Calculate Shipping Cost
  const shippingCost = calculateShippingCost(state, orderAmt);

  // Calculate Subtotal
  const subtotal = calculateSubtotal(orderAmt, shippingCost);

  // Calculate Tax
  const tax = calculateTax(orderAmt);

  // Calculate Invoice Total
  const invoiceTotal = calculateInvoiceTotal(orderAmt, tax, shippingCost);

  // Display the invoice
  displayInvoice(cartItems, orderAmt, shippingCost, state, subtotal, tax, invoiceTotal);

  // Manipulate the Make Purchase button
  document.getElementById('p-button').innerText = 'Shop Again';
}
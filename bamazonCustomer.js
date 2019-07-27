var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "oneill",
    database: "bamazon_db"
});

connection.connect(function (error){
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    loadProducts();
})


function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err

       console.log(res);
       promptCustomerForItem(res);
    }); 
}

function promptCustomerForItem(inventory) {
    inquirer.prompt([
        {
            type:"input",
            name: "choice",
            message: "What is the ID of the item you would like to purchase? [Q to exit]",
            validate:function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val) {
        checkForExit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);

        if (product) {
            promptCustomerForQuantity(product);
        }
        else{
            console.log("\nItem not found in inventory");
            loadProducts();
        }
    });
}
function promptCustomerForQuantity(product) {
    inquirer.prompt([
        {
          type:"input",
          name: "quantity",
          message: "How many would you like? [Q to exit]",
          validate: function(val) {
              return val > 0 || val.toLowerCase() === "q";
          }     
        }
    ]).then(function(val) {
        checkForExit(val.quantity);
        var quantity = parseInt(val.quantity);

        if(quantity > product.stock_quantity) {
            console.log("\nInsufficient quantity!");
        }
        else {
            makePurchase(produce, quantity);
        }
    });
}

function makePurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            console.log("\nSuccessfully purchased" + quantity + " " + product.product_name + "'s!");
            loadProducts();
        }
    );
}

function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventoty.length; i++) {
        if (inventory[i].item_id === choiceId) {
            return inventory[i];
        }
    }
    return null;
}

function checkForExit(choice) {
    if(choice.toLowerCase() === "q") {
        console.log("Goodbye!");
    }
}
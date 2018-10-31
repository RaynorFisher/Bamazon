let inquirer = require("inquirer");
let mysql = require("mysql");

console.log("Hehehehe, Welcome to Hagatha's Apothecary! You can find supplies for all of your potion brewing needs!");
var connection = mysql.createConnection
({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "password",
   database: "apothecary_DB"
 });

 //I tried adding in this section that Osei added in class on Saturday but it still didn't help  me connect the database. 

 connection.connect(function(err) {
	if (err) throw err;
	products();
	
});

function products () {
	console.log('\n Welcome to Hagatha Store \n');

	inquirer.prompt([
		{
			type: 'confirm',
			name: 'confirm',
			message: "Type 'y' to see Hagatha's wares",
			default: true
		}
	]).then(function(input) {
		if (input.confirm) {
			displayPotions();
		} else {
			console.log('\n You may need to return, Hallows Eve approaches and many potions must be brewed! Heheheheheh\n');
			connection.end();
		}
	});
}


function whatchaGotThere() {
	inquirer.prompt([
		{   type: 'input',
			name: 'item',
			message: 'Pick a sinister ingredient from the list by the number to buy it!',
			validate: function pickOneAnyONe(item) 
			
			{
                        let reg = /^\d+$/;
						return reg.test(item) || 'Please enter item ID number.';
					}
		},

		{
			type: 'input',
			name: 'itemAmount',
			message: 'How many would you like to purchase?',
			validate: function pickOneAnyONe(itemAmount) {
                    //not sure on the reg here again 
                        const reg = /^\d+$/;
                        return reg.test(itemAmount) || 'Only numbers, please try again.';
                        
					}
		}
	]).then(function(input) {

		let sql = 'SELECT ?? FROM ?? WHERE ?? = ?';
		let buckets = [ '*', 'products', 'item_id', answers.item];
		sql = mysql.format(sql, buckets);
		connection.query(sql, function(err, results) {
			if (answers.itemQuantity <= results[0].stock_quantity) {
				console.log('\nThose will make quite a potent brew my pretty! Heeheheheh\n'
                );
				let adventurerAmount = results[0].stock_quantity - answers.itemQuantity;
				let query = connection.query(
					'UPDATE prodeucts SET ? WHERE ?',
						[
							{
								stock_quantity: adventurerAmount
							},
							{
								item_id: results[0].item_id
							}
						],
					function(err, results) {
						console.log('${results.Rows} the ledger of ingredients has changed my dear`);
					},
				);

				orderTotal = parseFloat((results[0].price * input.itemQuantity).toFixed(2));
				console.log(`Total: $${orderTotal}\n`);


//Hagatha has to show her wares to the adventurer
function displayPotions() {
	let mYsql = 'SELECT ?? FROM ??';
	let buckets = ['*', 'products'];
	sql = mysql.format(mYsql, buckets);
	connection.query(mYsql, function(err, results, fields) {
		if (err) throw err;
		for (let i = 0; i < results.length; i++) {
			console.log(`Item ID: ${results[i].item_id}     Selection ${results[i].product_name}     Gold:  ${results[i].price}`);
		}
		whatchaGotThere();
	});
}

//I wasn't sure how to make the function for displaying a total cumulative amount for the customer. 
            // It needs a math function but I wasn't sure how to apply it properly


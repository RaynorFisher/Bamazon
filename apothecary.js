let inquirer = require("inquirer");
let mysql = require("mysql");

console.log("Hehehehe, Welcome to Hagatha's Apothecary! You can find supplies for all of your potion brewing needs!");
var connection = mysql.createConnection
({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "",
   database: "apothecary_DB"
 });

 //I tried adding in this section that Osei added in class on Saturday but it still didn't help  me connect the database. 

 connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadID);
	afterConnection();
});

function afterConnection(){
    connnection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}
function potions () {
	console.log();

	inquirer.prompt([
		{
			type: 'confirm',
			name: 'confirm',
			message: "What brings you to Hagatha's Apothecary my dear? Are you in search of ingredients for a foul potion?",
			default: true
		}
	]).then(function(answers) {
		if (answers.confirm) {
			displayPotions();
		} else {
			console.log("You may need to return, Hallows Eve approaches and many potions must be brewed! Heheheheheh");
			connection.end();
		}
	});
}


function whatchaGotThere() {
	inquirer.prompt([
		{   type: 'input',
			name: 'item',
			message: 'Pick a sinister ingredient from the list by the number to buy it!',
			validate: function pickOneAnyOne(item) {
                        //This I was not sure on, i don't sure I know exactly what to use for the reg
                        let reg = ;
						return reg.test(item);
					}
		},

		{
			type: 'input',
			name: 'itemQuantity',
			message: 'How many would you like to purchase?',
			validate: function pickOneAnyONe(itemAmount) {
                    //not sure on the reg here again 
                        const reg = ;
                        return reg.test(itemAmount); 
                        console.log("How many would you like my pretty???.");
					}
		}
	]).then(function(answers) {

		let mYsql = 'SELECT from Products';
		let buckets = ['products', 'item_id', answers.item];
		sql = mysql.format(mYsql, buckets);
		connection.query(mYsql, function(err, results) {
			if (answers.itemQuantity <= results[0].stock_quantity) {
				console.log("Those will make quite a potent brew my pretty! Heeheheheh"
                );
				let adventurerAmount = results[0].stock_quantity - answers.itemQuantity;
				let query = connection.query(
					'UPDATE',
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


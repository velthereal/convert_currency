let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

async function getCurrency(url){
	let data = await fetch(url);
	let response = await data.json();
	showCurrency(response);
}
getCurrency(url)

function showCurrency(data){
	let btn = document.querySelector('.block button');
	let currencyName = document.getElementById('currency');
	let uah = document.getElementById('uah');
	let res = document.getElementById('res');
	let info = data.map(element => {
		return `<option value="${element.cc}">${element.txt}, ${element.cc}</option>`;
	});
	currencyName.insertAdjacentHTML('beforeend', info);
	btn.addEventListener('click', function(){
		let text = currencyName.value;
		let currency = null;
		let uahAmount = uah.value;
		data.forEach(element => {
			if(element.cc === text){
				currency = element.rate;
			}
		});
		res.value = (uahAmount * currency).toFixed(2);
	})
}
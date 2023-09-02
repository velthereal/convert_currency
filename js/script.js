let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

async function getCurrency(url){
	let data = await fetch(url);
	let response = await data.json();
	showCurrency(response);
}
getCurrency(url)

function showCurrency(data){
	let btn = document.querySelector('.block button');
	let grn = document.getElementById('grn');
	let currencyName = document.getElementById('currency');
	let uah = document.getElementById('uah');
	let res = document.getElementById('res');
	let change = document.querySelector('i');
	let info = data.map(element => {
		return `<option value="${element.cc}">${element.txt}, ${element.cc}</option>`;
	});
	currencyName.insertAdjacentHTML('beforeend', info);
	btn.addEventListener('click', function(){
		let text = currencyName.value;
		let currency = null;
		let uahAmount = uah.value;
		let resAmount = res.value;
		data.forEach(element => {
			if(element.cc === text){
				currency = element.rate;
			}
		});
		uah.value = (resAmount * currency).toFixed(2);
		res.value = (uahAmount * currency).toFixed(2);
	});
	change.addEventListener('click', function(){
		grn.classList.toggle('select_first');
		currencyName.classList.toggle('select_last');
		uah.classList.toggle('input_first');
		res.classList.toggle('input_last');
		if(uah.hasAttribute('disabled')){
			uah.removeAttribute('disabled');
			uah.setAttribute('placeholder', '100.00');

			res.setAttribute('disabled', 'disabled');
			res.removeAttribute('placeholder');
		} else {
			uah.setAttribute('disabled', 'disabled');
			uah.removeAttribute('placeholder');

			res.removeAttribute('disabled');
			res.setAttribute('placeholder', '100.00');
		}
	})
}
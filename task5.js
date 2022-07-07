(() => {
	'use strict';
	const getDojoData = async () => {
		const query = 'limit 4';
		await axios.get('https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo',
		{params: {
			id: 'dojo',
			query: query,
		}}).then((value) =>{
			const eachNewskeys = Object.keys(value.data); 
			eachNewskeys.forEach((key)=>{ 
				const eachData = value.data[key]

				const table = document.getElementById('cybozuNewsTable')
				const tableRow = document.createElement('tr');
				
				const  rowForDay = document.createElement('td');
				rowForDay.innerHTML = eachData.day.value;
				tableRow.appendChild(rowForDay);

				const rowForCategory = document.createElement('td');
				rowForCategory.innerHTML = eachData.category.value;
				rowForCategory.setAttribute('class',`${eachData.label.value}`)
				tableRow.appendChild(rowForCategory);

				const  rowForContent = document.createElement('td');
				rowForContent.innerHTML = `<a href="${eachData.url.value}" target="${eachData.target.value}">${eachData.content.value}</a>`;			
				tableRow.appendChild(rowForContent);

				table.appendChild(tableRow);
			}) 
		 }).catch( (error) =>{ 
			console.log(error)
		 });
	}
	getDojoData();
})();
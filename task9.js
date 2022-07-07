(() => {
	'use strict';
	kintone.events.on('app.record.create.submit', (event) => {
		const targetRecord = event.record.重複禁止項目.value;
		const query = '重複禁止項目 = "' + targetRecord + '"';
	
		const httpsRequestBody = {
			"app":kintone.app.getId(),
			"query": query
		}
		
		return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', httpsRequestBody).then((resp) => {
		
			const handleDuplication = () => {
				const result = window.confirm('レコードが重複しています。このまま保存しますか？');
			  return result ? true:false;
			}
			
			if (resp.records.length !== 0) {
				return handleDuplication() ? event : false;
			} 

			if (resp.records.length === 0) {
				return event;
			}

		}).catch((error) =>{
			console.log(error)
		});
	});
})();
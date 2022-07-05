(() => {
	'use strict';

	const httpsRequestBody = {
		"app":kintone.app.getId(),
		"fields":["重複禁止項目"]
	}

	kintone.events.on('app.record.create.submit', (event) => {
		const targetRecord = event.record.重複禁止項目.value;
		return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', httpsRequestBody).then((resp) => {
			
			resp.records.forEach((respElem) => {
				const refereceRecord = respElem.重複禁止項目.value
				
				if (refereceRecord === targetRecord) {
					const result = window.confirm('レコードが重複しています。このまま保存しますか？');
					if (!result) {
						event.error = '処理を中断しました。'
					}
				}
			});

			return event;
		}).catch((error) =>{
			console.log(error)
		});
		
	});
})();
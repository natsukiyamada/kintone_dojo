(() => {
  'use strict';
    kintone.events.on('app.record.create.show', (event) => {

		const actionFiveLists = [
			'あくなき探求',
			'不屈の心体',
			'理想への共感',
			'心を動かす',
			'知識を増やす',
			'公明正大',
		]

		for (let index = 0; index < actionFiveLists.length; index++) {
			
			if (actionFiveLists[index] === "あくなき探求") {
				const firstTableRow = event.record['Table']['value'][0]
				firstTableRow['value']['Action5']['value'] = actionFiveLists[0];
				firstTableRow['value']['状況']['value'] = ['未振り返り'];
				continue;
			} 

			event.record['Table'].value.push({
				value: {
					'Action5':{
						value:`${actionFiveLists[index]}`,
						type:'DROP_DOWN'
					},
					'状況':{
						value:['未振り返り'],

						type:'CHECK_BOX'
					},
					'課題':{
						value:'',
						type:'MULTI_LINE_TEXT'
					},
				}
			});
		}
		return event;
	});
})();
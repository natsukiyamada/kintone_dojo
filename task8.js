(() => {
	'use strict';
		kintone.events.on('app.record.create.show', (event) => {

			const httpsRequestBody = {
				"app":kintone.app.getId(),
			}
			return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', httpsRequestBody).then((resp) => {
				const tableFields =  resp['properties']['Table']['fields']
				const actionfiveLists = tableFields['Action5']['options'];
				
				const SortedactionfiveLists = Object.keys(actionfiveLists).map(function(key) {
					return actionfiveLists[key];
				}).sort(function(a, b) {
					return (a.index < b.index) ? -1 : 1; 
				})

				console.log(SortedactionfiveLists);

				for (let i = 0; i < SortedactionfiveLists.length; i++) {
					
					if (SortedactionfiveLists[i].index === '0') {
						const firstTableRow = event.record['Table']['value'][0]
						firstTableRow['value']['Action5']['value'] = SortedactionfiveLists[i].label;
						firstTableRow['value']['状況']['value'] = ['未振り返り'];
						continue;
					}
					
					event.record['Table'].value.push({
						value: {
							'Action5':{
								value:`${SortedactionfiveLists[i].label}`,
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

			}).catch((error) =>{
				console.log(error);
			})
		});
})();
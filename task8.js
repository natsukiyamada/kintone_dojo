(() => {
	'use strict';
		kintone.events.on('app.record.create.show', (event) => {

			const httpsRequestBody = {
				"app":kintone.app.getId(),
			}
			return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', httpsRequestBody).then((resp) => {
				const tableFields =  resp['properties']['Table']['fields']
				const actionFiveLists = tableFields['Action5']['options'];
				
				const SortedActionFiveLists = Object.keys(actionFiveLists).map(function(key) {
					return actionFiveLists[key];
				}).sort(function(a, b) {
					return (a.index < b.index) ? -1 : 1; 
				})

				SortedActionFiveLists.forEach((action) => {
					event.record['Table'].value.push({
						value: {
							'Action5':{
								value:`${action.label}`,
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
				})
				
				event.record['Table']['value'].shift()
				return event;
			}).catch((error) =>{
				console.log(error);
			})
		});
})();
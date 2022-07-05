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
					return (a.index < b.index) ? -1 : 1;  //オブジェクトの昇順ソート
				})

				SortedactionfiveLists.forEach((action) => {
					event.record['Table'].value.push({
						value: {
							'Action5':{
								value:`${action.label}`,
								type:'DROP_DOWN'
							},
							'状況':{
								value:['未振り返り'], //自分用→'状況'のvalueは配列で指定されているので配列を挿入する
								type:'CHECK_BOX'
							},
							'課題':{
								value:'',
								type:'MULTI_LINE_TEXT'
							},
						}
					});
				})
				const TableRow = event.record['Table']['value']
				TableRow.splice(0,1);
				
				return event;

			}).catch((error) =>{
				console.log(error);
			})
		});
})();
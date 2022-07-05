(() => {
  'use strict';
    kintone.events.on('app.record.create.show', (event) => {
		
		//最初の行に値を挿入 →こちらは削除しました。
	/* 	const firstTableRow = event.record['Table']['value'][0]
		firstTableRow['value']['Action5']['value'] = "あくなき探求";
		firstTableRow['value']['状況']['value'] = ['未振り返り']; */
		
		const actionFiveLists = [
			'あくなき探求',
			'不屈の心体',
			'理想への共感',
			'心を動かす',
			'知識を増やす',
			'公明正大',
		]

		actionFiveLists.forEach((action) => {
			event.record['Table'].value.push({
				value: {
					'Action5':{
						value:`${action}`,
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
		
		//テーブル一行目の、アクション５に何も挿入されていない空白行を削除
		const TableRow = event.record['Table']['value']
		TableRow.splice(0,1); //ここがマジックナンバーになってしまう→他の方法でマジックナンバーを避けるべきでしょうか。
		return event;
	});
})();
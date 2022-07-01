(() => {
  'use strict';
    kintone.events.on('app.record.create.show', (event) => {
		
		//最初の行に値を挿入
		event.record['Table']['value'][0]['value']['Action5'].value = "あくなき探求";
		
		//質問：以下のコードは不要という認識でよろしいでしょうか。（初期値ですでに['未振り返り']が設定されているため）
		//event.record['Table']['value'][0]['value']['状況']['value'] = ['未振り返り'];　		
		
		const ActionFiveChoice = {
			0:'不屈の心体',
			1:'理想への共感',
			2:'心を動かす',
			3:'知識を増やす',
			4:'公明正大',
		};

		const keys = Object.keys(ActionFiveChoice);
		keys.forEach((key) => {
			event.record['Table'].value.push({
				value: {
					'Action5':{
						value:`${ActionFiveChoice[key]}`,
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
		return event;
		});
})();
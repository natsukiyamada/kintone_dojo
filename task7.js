(() => {
	'use strict';
	
	//レコード新規作成画面とレコード編集画面では重複禁止項目_文字列の直編集を不可にする
	kintone.events.on(['app.record.create.show','app.record.edit.show'], (event) => {
		event.record.重複禁止項目_文字列.disabled = true;
		return event;
	});

	const targetFieldCode = [
		'app.record.create.change.サイボウズ製品',
		'app.record.create.change.管理番号',
		'app.record.edit.change.サイボウズ製品',
		'app.record.edit.change.管理番号',
	];

	kintone.events.on(targetFieldCode,(event)=>{
		let today = new Date();
		today = dateFns.format(today, 'YYYYMMDD') 

		//管理番号の値があるなら管理番号を、空なら空をManegementNumberに挿入（次行のselectedProductも同じ）
		const ManagementNumber = (event.record.管理番号.value) ? event.record.管理番号.value:"";
		let selectedProduct = (event.record.サイボウズ製品.value) ? event.record.サイボウズ製品.value:"";
	
		//製品名=>製品の略称に変換
    if (selectedProduct === 'kintone') {
			selectedProduct = 'KN'
		}else if(selectedProduct === 'Garoon'){
			selectedProduct = 'GR';		
		}else if(selectedProduct === 'サイボウズ Office'){
			selectedProduct = 'OF';
		}else if(selectedProduct === 'Mailwise'){
			selectedProduct = 'MW';
		}
		event.record.重複禁止項目_文字列.value = `${today}-${selectedProduct}-${ManagementNumber}`;
		return event;
	})

})();
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
		
		const today = dateFns.format(new Date(), 'YYYYMMDD') 

		//管理番号の値があるなら管理番号を、空なら空をManegementNumberに挿入（次行のselectedProductも同じ）
		const ManagementNumber = event.record.管理番号.value ? event.record.管理番号.value : "";
	
		//製品名=>製品の略称に変換
		let selectedProduct = "";
		const getSelectedProductName = (tableValue) => {
			if (tableValue === 'kintone') {
					return selectedProduct = 'KN'
				} 
				if(tableValue === 'Garoon'){
					return selectedProduct = 'GR';		
				}
				if(tableValue === 'サイボウズ Office'){
					return selectedProduct = 'OF';
				}
				if(tableValue === 'Mailwise'){
					return selectedProduct = 'MW';
				}
				return selectedProduct;
		  }

		selectedProduct = getSelectedProductName(event.record.サイボウズ製品.value);
    
		event.record.重複禁止項目_文字列.value = `${today}-${selectedProduct}-${ManagementNumber}`;
		return event;
	})
})();
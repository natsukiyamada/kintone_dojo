(() => {
	'use strict';
	
	kintone.events.on(['app.record.create.show','app.record.edit.show'], (event) => {
		event.record.重複禁止項目_文字列.disabled = true;
		return event;
	});

	const targetFieldCode = [
	  'app.record.create.show',
	  'app.record.edit.show',
		'app.record.create.change.サイボウズ製品',
		'app.record.create.change.管理番号',
		'app.record.edit.change.サイボウズ製品',
		'app.record.edit.change.管理番号',
	];


	kintone.events.on(targetFieldCode,(event)=>{
		
		const today = dateFns.format(new Date(), 'YYYYMMDD') 
		const managementNumber = event.record.管理番号.value ? event.record.管理番号.value : "";
	
		const getSelectedProductName = (productValue) => {
			if (productValue === 'kintone') {
					return 'KN'
				} 
				if(productValue === 'Garoon'){
					return 'GR';		
				}
				if(productValue === 'サイボウズ Office'){
					return 'OF';
				}
				if(productValue === 'Mailwise'){
					return 'MW';
				}
				return "";
		  }

		const selectedProduct = getSelectedProductName(event.record.サイボウズ製品.value);
    
		event.record.重複禁止項目_文字列.value = `${today}-${selectedProduct}-${managementNumber}`;
		return event;
	})
})();
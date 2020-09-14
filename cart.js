let goods = [
{
	name: 'Яблоки',
		picture: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
		cost: 10,
		count: 23,
		identity: 'apple'
	},
	{
		name: 'Груши',
		picture: 'https://prostoest.ru/wp-content/uploads/2013/08/125429195-727x522.jpg',
		cost: 15,
		count: 28,
		identity: 'pears'
	},
	{
		name: 'Персики',
		picture: 'https://i0.wp.com/cms-assets.tutsplus.com/uploads/users/1500/posts/30884/image/two_peach.jpg?w=474&ssl=1',
		cost: 23,
		count: 7,
		identity: 'peaches'
	},
	]

	let cart = [
	{
		name: 'Яблоки',
		picture: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
		count: 0,
		identity: 'apple',
		cost_cart: 0
	},
	{
		name: 'Груши',
		picture: 'https://prostoest.ru/wp-content/uploads/2013/08/125429195-727x522.jpg',
		count: 0,
		identity: 'pears',
		cost_cart: 0
	},
	{
		name: 'Персики',
		picture: 'https://i0.wp.com/cms-assets.tutsplus.com/uploads/users/1500/posts/30884/image/two_peach.jpg?w=474&ssl=1',
		count: 0,
		identity: 'peaches',
		cost_cart: 0
	},
	]

	function goodsGenerating(goods) {
		let startDiv = `<div class="goods">`,
		endDiv = `</div>`,
		result = '';

		for (var index = 0; index < goods.length; index++) {
			const item_gods = goods[index];
			result += `
			<div class="goods-item">
			<div class="goods-item-about">
			<div class="goods-item_name">${item_gods.name}</div>
			<div class="goods-item_picture"><img src="${item_gods.picture}"></div>
			<div class="goods-item_cost">
			<span class="goods-item_cost-title">Цена</span>
			<span class="goods-item_cost-price">${item_gods.cost}</span>
			</div>
			<div class="goods-item_count">
			<span class="goods-item_count-title">на складе</span>
			<span class="goods-item_count-number">${item_gods.count}</span>
			</div>
			</div>
			<div class="goods-item-buy" data-identity="${item_gods.identity}">
			<button class="plus">+</button>
			<button class="sum">0</button>
			<button class="minus" disabled="disabled">-</button>
			<button class="inCart">В корзину</button>
			</div>
			</div>
			`
		}

		return `${startDiv}${result}${endDiv}`
	}
	$('body').prepend(goodsGenerating(goods))


	function cartGenerating(cart) {
		let startDiv2 = `<div id="cart">`,
		endDiv2 = `</div>`,
		result2 = '',
		sum = ``;

		for (var i = 0; i < cart.length; i++) {
			const item_cart = cart[i];
			result2 += `
			<div class="cart-items">
			<div class="cart-item">

			<div class="cart-item_name">${item_cart.name}</div>
			<div class="cart-item_picture"><img src="${item_cart.picture}"></div>
			<div class="cart-item-buy" data-identity = "${item_cart.identity}">
			<button class="cost_cart">${item_cart.cost_cart}</button>
			<button class="cart-item_count">${item_cart.count}</button>
			<button class="minus_cart" disabled="disabled">-</button>
			</div>
			</div><!-- cart-item -->
			</div><!-- cart-items -->
			`
			sum = `
			<div class="cart-sum">
			<div class="cart-sum_title">Общая стоимость: </div>
			<div class="cart-sum_totalSum">0</div>
			</div>
			`
		}

		return `${startDiv2}${result2}${sum}${endDiv2}`

	}
	$('body').prepend(cartGenerating(cart));





	$('.plus').click(function() {
		let identity = $(this).parent().attr('data-identity');

		for (var index = 0; index < goods.length; index++) {

			var item_goods = goods[index];
			if (item_goods.identity === identity) {
				var currentSum = $(this).parent().find('.sum').text();
				var minusIsDisabled = $(this).parent().find('.minus').attr('disabled');
				if (minusIsDisabled) {
					$(this).parent().find('.minus').removeAttr('disabled')
				}
				$(this).parent().prev().find('.goods-item_count-number').text(--item_goods.count);
				$(this).parent().find('.sum').text(++currentSum);
				if (item_goods.count === 0) {
					$(this).attr('disabled', '');
					console.log('Товар закончился на складе')
				}
				break;
			}
		}

		for (var i = 0; i < cart.length; i++) {
			var item_cart = cart[i];
			if (item_cart.identity === identity) {
				item_cart.count = currentSum;
				// $('.cart-item_count').eq(i).text(item_cart.count);	// вариант 1, предполагает полное соответствие порядка элементов массива товаров с массивом корзины
				$(`.cart-item-buy[data-identity=${identity}]`).parent().find('.cart-item_count').text(item_cart.count);	//	вариант 2, элементы могут быть в любом порядке и в разном количестве
				$('.minus_cart').eq(i).removeAttr('disabled');
				item_cart.cost_cart = item_cart.count*item_goods.cost;
				$('.cost_cart').eq(i).text(item_cart.cost_cart);
			}
		}
	})



	$('.minus').click(function() {
		let identity = $(this).parent().attr('data-identity');

		for (var index = 0; index < goods.length; index++) {
			const item_goods = goods[index];
			if (item_goods.identity === identity) {
				let currentSum = $(this).parent().find('.sum').text();
				let plusIsDisabled = $(this).parent().find('.plus').attr('disabled');
				if (plusIsDisabled) {
					$(this).parent().find('.plus').removeAttr('disabled')
				}
				$(this).parent().prev().find('.goods-item_count-number').text(++item_goods.count);
				$(this).parent().find('.sum').text(--currentSum);
				if (currentSum === 0) {
					$(this).attr('disabled', '');
					console.log('Товар весь вернулся на складе')
				}
				else {
					$(this).removeAttr('disabled')
				}
				break;
			}
		}
	}) 


	$('.minus_cart').click(function() {
		let identity = $(this).parent().attr('data-identity');

		for (var i = 0; i < cart.length; i++) {
			var item_cart = cart[i];
			var currentSum = $('.sum').eq(i).text();
			if (item_cart.identity === identity) {
				let currentSum2 = $(this).parent().find('.cart-item_count').text();
				$(this).parent().find('.cart-item_count').text(--currentSum2);
				$('.sum').eq(i).text(--currentSum);
				if (currentSum2 === 0) {
					$(this).attr('disabled', '');
					console.log('Товар весь вернулся на складе')
				}
				break;
			}
		}
		for (var index = 0; index < goods.length; index++) {
			var item_goods = goods[index];
			if (item_goods.identity === identity) {
				$(`.goods-item-buy[data-identity=${identity}]`).parent().find('.goods-item_count-number').text(++item_goods.count);
				$('.cost_cart').eq(i).text((--item_cart.count)*item_goods.cost);
				if (currentSum === 0) {
					$('.minus').attr('disabled', '');
				}
				else {
					$('.minus').removeAttr('disabled')
				}
				break;
			}
		}
	})

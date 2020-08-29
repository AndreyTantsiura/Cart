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
		identity: 'apple'
	},
	{
		name: 'Груши',
		picture: 'https://prostoest.ru/wp-content/uploads/2013/08/125429195-727x522.jpg',
		count: 0,
		identity: 'pears'
	},
	{
		name: 'Персики',
		picture: 'https://i0.wp.com/cms-assets.tutsplus.com/uploads/users/1500/posts/30884/image/two_peach.jpg?w=474&ssl=1',
		count: 0,
		identity: 'peaches'
	},
]

function goodsGenerating(goods) {
	let startDiv = `<div class="goods">`,
	endDiv = `</div>`,
	result = '';

	for (var index = 0; index < goods.length; index++) {
				const item = goods[index];
				result += `
					<div class="goods-item">
						<div class="goods-item-about">
							<div class="goods-item_name">${item.name}</div>
							<div class="goods-item_picture"><img src="${item.picture}"></div>
							<div class="goods-item_cost">
								<span class="goods-item_cost-title">Цена</span>
								<span class="goods-item_cost-price">${item.cost}</span>
							</div>
							<div class="goods-item_count">
								<span class="goods-item_count-title">на складе</span>
								<span class="goods-item_count-number">${item.count}</span>
							</div>
						</div>
						<div class="goods-item-buy" data-identity="${item.identity}">
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
		const item2 = cart[i];
		result2 += `
		<div class="cart-items">
			<div class="cart-item">

				<div class="cart-item_name">${item2.name}</div>
				<div class="cart-item_picture"><img src="${item2.picture}"></div>
				<div class="cart-item-buy" data-identity = "${item2.identity}">
					<button class="plus_carts">+</button>
					<button class="cart-item_count">${item2.count}</button>
					<button class="minus_carts" disabled="disabled">-</button>
				</div>
			</div><!-- cart-item -->
		</div><!-- cart-items -->
		`
		sum = `
		<div class="cart-sum">
			<div class="cart-sum_title">Общая стоимость: </div>
			<div class="cart-sum_totalSum">${item2.sum}</div>
		</div>
		`
	}

	return `${startDiv2}${result2}${sum}${endDiv2}`

}
	$('body').prepend(cartGenerating(cart));





$('.plus').click(function() {
	let identity = $(this).parent().attr('data-identity');

	for (var index = 0; index < goods.length; index++) {

				const item = goods[index];
				if (item.identity === identity) {
					var currentSum = $(this).parent().find('.sum').text();
					var minusIsDisabled = $(this).parent().find('.minus').attr('disabled');
					if (minusIsDisabled) {
						$(this).parent().find('.minus').removeAttr('disabled')
					}
					$(this).parent().prev().find('.goods-item_count-number').text(--item.count);
					$(this).parent().find('.sum').text(++currentSum);
					if (item.count === 0) {
						$(this).attr('disabled', '');
						console.log('Товар закончился на складе')
					}
					break;
				}

		}

					for (var i = 0; i < cart.length; i++) {
					const item2 = cart[i];
								if (item2.identity === identity) {
									item2.count = currentSum;
									$('.cart-item_count').text(item2.count);
									console.log(item2.count)
								}

						}
					// let cartItem = {
					// 	count_cart: currentSum,
					// 	identity: identity
					// }

					// cart.push(cartItem)
					// console.log(cartItem)



}) 









$('.minus').click(function() {
	let identity = $(this).parent().attr('data-identity');

	for (var index = 0; index < goods.length; index++) {
		const item = goods[index];
		if (item.identity === identity) {
			let currentSum = $(this).parent().find('.sum').text();
			let plusIsDisabled = $(this).parent().find('.plus').attr('disabled');
			if (plusIsDisabled) {
				$(this).parent().find('.plus').removeAttr('disabled')
			}
			$(this).parent().prev().find('.goods-item_count-number').text(++item.count);
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



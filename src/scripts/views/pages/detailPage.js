/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable no-return-await */
import UrlParser from '../../routes/url-parser';
import FavoriteRestoIdb from '../../data/resto-idb';
import getApi from '../../data/getApi';

const detailPage = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    return await getApi(`detail/${url.id}`).then((e) => `
	<div class="detail-page"> 
		<img tabindex="0" src="https://restaurant-api.dicoding.dev/images/small/${e.restaurant.pictureId}" class="detail-image" alt="Pulau Lebong">
		<ul class="detail-info">
			<li class="detail-restaurant">${e.restaurant.name}</li>
			<li class="detail-address">${e.restaurant.address}</li>
			<li class="detail-address">${e.restaurant.city}</li>
			<li class="detail-rating">Rating ${e.restaurant.rating}</li>
			<li class="detail-desc">${e.restaurant.description}</li>
			<button href="#" title="Love it" class="button-favorite" data-count="0"> 
			<p>Favorite</p>
			</button>
			<li class="kategori-header">Kategori</li>
		 	<span class="kategori">
		 	</span>
		</ul> 
	</div>

	<h4>Menu</h4>
	<div class="detail-menu">
		<div class="detail-food">
			<h2 class="title-food">Food</h2>
			<ul class="foods">
			
			
			</ul>

		</div>
		<div class="detail-drink">
			<h2 class="title-drink">Drink</h2>
			<ul class="drinks">
				
			</ul>
		</div>
	</div>

	<div class="detail-review">
		<h2>Review</h2>
		<ul class="reviews">
		
		</ul>
	</div>
	
	`);
  },

  async afterRender() {
    await this.proseKategori();
    await this.prosesFoods();
    await this.prosesDrinks();
    await this.prosesReviews();
    await this.prosesSelectFunc();
  },

  async proseKategori() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const kategori = document.querySelector('.kategori');
    await getApi(`detail/${url.id}`).then((e) => {
      e.restaurant.categories.forEach((e) => {
        kategori.innerHTML += `
		<li class="detail-kategori">${e.name}</li>
		`;
      });
    });
  },

  async prosesFoods() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const foods = document.querySelector('.foods');
    await getApi(`detail/${url.id}`).then((e) => {
      e.restaurant.menus.foods.forEach((e) => {
        foods.innerHTML += `
		<li>${e.name}</li>`;
      });
    });
  },

  async prosesDrinks() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const drinks = document.querySelector('.drinks');
    await getApi(`detail/${url.id}`).then((e) => {
      e.restaurant.menus.drinks.forEach((e) => {
        drinks.innerHTML += `
		<li>${e.name}</li>`;
      });
    });
  },

  async prosesReviews() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const reviews = document.querySelector('.reviews');
    await getApi(`detail/${url.id}`).then((e) => {
      e.restaurant.customerReviews.forEach((e) => {
        reviews.innerHTML += `
		<li>${e.name} - ${e.review}</li>`;
      });
    });
  },
  async prosesSelectFunc() {
    const favorite = document.querySelector('.button-favorite');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    favorite.addEventListener('click', async () => {
      // eslint-disable-next-line eqeqeq
      if (await FavoriteRestoIdb.getResto(url.id) != undefined) {
        await this.prosesDelete(favorite);
      } else {
        await this.prosesFavorite(favorite);
      }
    });
  },
  async prosesFavorite(favorite) {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const data = await getApi(`detail/${url.id}`).then((e) => e.restaurant);
    FavoriteRestoIdb.putResto(data);
    // eslint-disable-next-line no-param-reassign
    favorite.innerText = 'Unfavorite';
  },

  async prosesDelete(favorite) {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    FavoriteRestoIdb.deleteResto(url.id);
    favorite.innerText = 'Favorite';
  },
};

export default detailPage;

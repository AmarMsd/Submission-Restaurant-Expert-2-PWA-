/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import FavoriteRestoIdb from '../../data/resto-idb';

const favorite = {
  async init() {
    return `
    <section>
    <div class="main-content">
      <h1>Favorite</h1>
      <div class="list" id="list-items"></div>
    </div>
  </section>`;
  },

  async showAllItem() {
    const favorite = document.querySelector('#list-items');
    await FavoriteRestoIdb.getAllResto().then((e) => {
      e.forEach((data) => {
        favorite.innerHTML += `
            <div class="list_item">
					  <img class="list_item_like" src="https://restaurant-api.dicoding.dev/images/small/${data.pictureId}" alt="${data.name}" title="${data.name}">
					  <div class="city">${data.city}</div>
					  <div class="list_item_content">
						  <p class="list_item_rating">
							  Rating :
							  <span class="list_item_rating_value">${data.rating}</span>
						  </p>
						  <h1 class="list_item_title"><a href="./#/detailpage/${data.id}">${data.name}</a></h1>

						  <div class="list_item_desc">${data.description.slice(0, 150)}...</div>
					  </div>
					  <button id="${data.id}" class="delete-favorite">Delete</button>
				  </div>
        `;
      });
    });
  },
  async prosesDelete() {
    const deleteFavorite = document.querySelector('.delete-favorite');
    deleteFavorite.addEventListener('click', async (e) => {
      await FavoriteRestoIdb.deleteResto(e.path[0].id);
      location.reload();
    });
  },
  async afterRender() {
    await this.showAllItem();
    await this.prosesDelete();
  },
};

export default favorite;

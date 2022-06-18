/* eslint-disable no-tabs */
import hero from '../components/hero';
import getApi from '../../data/getApi';

const homePage = {
  async init() {
    return `
	${await hero.init()}
	<section>
        <div class="main-content">
          <h1>Find Your Restaurant</h1>
          <div class="list" id="list-items"></div>
        </div>
      </section>`;
  },

  async afterRender() {
    let dataList = '';
    await getApi('list').then((e) => {
      e.restaurants.forEach((data) => {
        dataList += `
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
					  <a href="./#/detailpage/${data.id}"></a>
				  </div>
				  `;
      });
      document.querySelector('#list-items').innerHTML = dataList;
    });
  },
};

export default homePage;

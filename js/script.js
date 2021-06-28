let posts = [];

async function getAPIData() {
  try {
    const response = await fetch(
      "https://60d94dabeec56d00174776a2.mockapi.io/api/v1/post"
    );
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

function buildList() {
    for (const post of posts) {
        let main = document.getElementById("main");
  
        let description = document.createElement("p");
        description.appendChild(document.createTextNode(post.description));
        let main_card_description = document.createElement("div");
        main_card_description.classList.add("main__card__description");
        main_card_description.appendChild(description);
  
        let title = document.createElement("p");
        title.appendChild(document.createTextNode(post.title));
        let main_card_title = document.createElement("div");
        main_card_title.classList.add("main__card__title");
        main_card_title.appendChild(title);
  
        let post_date = document.createElement("p");
        post_date.classList.add("main__card__header_text");
        let created_at = moment(post.created_at).locale('pt-br').format('ll')
        post_date.appendChild(document.createTextNode(created_at));
        let favorite_icon = document.createElement("span");
        favorite_icon.classList.add("material-icons", "main__card__header_icon");
        favorite_icon.appendChild(document.createTextNode(`${post.favorite ? 'favorite' : 'favorite_border'}`));
        let main_card_header = document.createElement("div");
        main_card_header.classList.add("main__card__header");
        main_card_header.appendChild(post_date);
        main_card_header.appendChild(favorite_icon);
  
        let main_card = document.createElement("div");
        main_card.classList.add(
          "main__card", "animate__animated", "animate__backInLeft"
        );
        main_card.appendChild(main_card_header);
        main_card.appendChild(main_card_title);
        main_card.appendChild(main_card_description);
  
        let container = document.createElement("div")
        container.classList.add("container");
        container.appendChild(main_card);
  
        main.appendChild(container);
      }
}

getAPIData()
  .then((data) => {
    posts = data;
    buildList()
  })
  .catch((error) => {
    console.error(error);
  });

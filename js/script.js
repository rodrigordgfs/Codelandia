let posts = [];

let search = document.getElementById("search");
let backToTop = document.getElementById("back_to_top");

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

function buildList(data) {
  for (const post of data) {
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
    let created_at = moment(post.created_at).locale("pt-br").format("ll");
    post_date.appendChild(document.createTextNode(created_at));
    let favorite_icon = document.createElement("span");
    favorite_icon.classList.add("material-icons", "main__card__header_icon");
    favorite_icon.appendChild(
      document.createTextNode(
        `${post.favorite ? "favorite" : "favorite_border"}`
      )
    );
    let main_card_header = document.createElement("div");
    main_card_header.classList.add("main__card__header");
    main_card_header.appendChild(post_date);
    main_card_header.appendChild(favorite_icon);

    let main_card = document.createElement("div");
    main_card.classList.add(
      "main__card",
      "animate__animated",
      "animate__fadeIn"
    );
    main_card.appendChild(main_card_header);
    main_card.appendChild(main_card_title);
    main_card.appendChild(main_card_description);

    let container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(main_card);

    main.appendChild(container);
  }

  favorite_actions()
}

function favorite_actions() {
  favorite_buttons = document.querySelectorAll('.main__card__header_icon')
  favorite_buttons.forEach(item => {
    item.addEventListener("click", () => {
      if (item.innerHTML === 'favorite') {
        item.innerHTML = 'favorite_border'
      } else {
        item.innerHTML = 'favorite'
      }
    })
  });
}

getAPIData()
  .then((data) => {
    posts = data;
    buildList(posts);
  })
  .catch((error) => {
    console.error(error);
  });

function clearSearch() {
  if (search.value) {
    search.value = null;
    search.focus();
    let main = document.getElementById("main");
    main.innerHTML = null;
    buildList(posts);
  }
}

function searchPost() {
  const searchPost = posts.filter((post) => {
    return String(post.title)
      .toLowerCase()
      .includes(String(search.value).toLowerCase());
  });
  if (searchPost.length > 0) {
    let main = document.getElementById("main");
    main.innerHTML = null;
    buildList(searchPost);
  }
}

// Seach posts on press enter
search.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    searchPost();
  }
});

// Show/Hide Back to top button
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    backToTop.classList.remove("animate__fadeOutDown");
    backToTop.classList.add("animate__animated", "animate__fadeInUp");
    backToTop.style.display = "block";
  } else {
    backToTop.classList.remove("animate__fadeInUp");
    backToTop.classList.add("animate__fadeOutDown");
  }
});

backToTop.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Theme switch
var checkbox = document.querySelector("input[name=mode]");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    trans();
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
  }
});

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

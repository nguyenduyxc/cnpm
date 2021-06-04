import xhr, { createPagination, createPost } from "./common.js";

let url = new URL(window.location.href);
let currentPage = +url.searchParams.get("page") || 1;
let limit = +url.searchParams.get("limit") || 6;


xhr({
    method: "GET",
    url: `/cart?title_like=i&_expand=cart`,
    responseType: "json",
    contentType: "application/json",
    body: null,
})
    .then((data) => {
        let carts = document.getElementById("cart");

        data.json.forEach((cart) => {
            let html = createPost(cart);
            carts.insertAdjacentHTML("beforeend", html);
        });
        
        // let total = Math.ceil(+data.headers["x-total-count"] / limit);

        // let pagination = document.getElementById("pagination");
        // createPagination(currentPage, total, limit, pagination);
    })
    .catch((error) => console.log(error));

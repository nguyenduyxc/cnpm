export default function xhr({ method, url, responseType, contentType, body }) {
    return new Promise((resolve, reject) => {
        let xxx = new XMLHttpRequest();

        xxx.responseType = responseType;
        xxx.open(method, url);

        xxx.setRequestHeader("Content-Type", contentType);
        xxx.send(body);

        xxx.onerror = () => reject("Không thể gửi request");

        xxx.onload = () => {
            if (xxx.status >= 200 && xxx.status < 300) {
                let data = {};
                data.json = xxx.response;
                data.headers = {};
                xxx.getAllResponseHeaders()
                    .split("\r\n")
                    .forEach((header) => {
                        let [key, value] = header.split(": ");
                        data.headers[key] = value;
                    });

                resolve(data);
            } else {
                reject("Không tìm thấy tài nguyên");
            }
        };
    });
}
export function createPost(cart) {
    let html = `
    <div class="col-lg-4 col-md-6 mb-2 mt-2">

    <div class="card">
      <div class="car-image ">
        <a href="cart.html?id=${cart.car-id}" class="">

          <img width="267" height="200" src="${cart.img}"
         
            class="card-img-top lazyload wp-post-image wp-stateless-item" class="card-img-top lazyload"
            alt="${cart.title}" title="${cart.title}"/> </a>
        <span class="address">
          <i class="fa fa-map-marker-alt"></i>
          <span>${cart.address}</span>
        </span>
        <span class="car-id">${cart.car-id}</span>
      </div>
      <div class="card-body p-2">
        <h5 class="card-title">
          <a href="cart.html?id=${cart.car-id}" class="text-dark "
            title="${cart.title}">${cart.title}
           </a>
        </h5>
        <div class="h6 three-dots">
        ${cart.parameter}
      </div>
      <div class="card-footer p-2">
        <div class="float-left text-black-50 text-center price-list">
          <span class="h2 font-weight-bold" style="color: #da202c;">${cart.price}</span> triệu
        </div>
        <div class="float-right text-black-50 w-50" id="hidden_phone_1">
          <small class="d-md-inline d-none tra-truoc">
            <i class="fas fa-dollar-sign"></i> ${cart.prepay} </small>
          <a class="btn btn-primary d-md-none w-100 call-tracking" data-id="1
          "
            href=""><i class="fa fa-phone"></i> Gọi điện</a>
        </div>
      </div>
    </div>
  </div>
    `;
    return html;
}

// export function createPagination(current, total, limit, el) {
//     for (let i = 1; i <= total; i++) {
//         if (i == 1) {
//             el.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                     <li class="page-item">
//                         <a class="page-link" href="index.html?page=1&limit=${limit}"
//                             >First</a
//                         >
//                     </li>
//             `
//             );
//         }

//         if (i == current - 1) {
//             el.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                     <li class="page-item">
//                         <a class="page-link" href="index.html?page=${
//                             current - 1
//                         }&limit=${limit}"
//                             >Previous</a
//                         >
//                     </li>
//             `
//             );
//         }

//         if (i == current) {
//             el.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                     <li class="page-item">
//                         <a class="page-link current"
//                             >${current}</a
//                         >
//                     </li>
//             `
//             );
//         }

//         if (i == current + 1) {
//             el.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                     <li class="page-item">
//                         <a class="page-link" href="index.html?page=${
//                             current + 1
//                         }&limit=${limit}"
//                             >Next</a
//                         >
//                     </li>
//             `
//             );
//         }

//         if (i == total) {
//             el.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                     <li class="page-item">
//                         <a class="page-link" href="index.html?page=${total}&limit=${limit}"
//                             >Last</a
//                         >
//                     </li>
//             `
//             );
//         }
//     }
// }

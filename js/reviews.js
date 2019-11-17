var REVIEWS = [
  {
    name: "Heriberto",
    timeStamp: "Jan 5, 2019",
    rating: 4,
    comment: 'Great spot. Treehouse itself is magical, the grounds are peaceful, host kind, and location to Firenze and local restaurants convenient.'
  },
  {
    name: "Nancy Molina",
    timeStamp: "Jan 2, 2019",
    rating: 5,
    comment: 'Great spot. Treehouse itself is magical, the grounds are peaceful, host kind, and location to Firenze and local restaurants convenient.'
  },
  {
    name: "Karina",
    timeStamp: "Jan 2, 2019",
    rating: 5,
    comment: 'Great spot. Treehouse itself is magical, the grounds are peaceful, host kind, and location to Firenze and local restaurants convenient.'
  }
];

$(document).ready(function () {
  getReviews(function (error, reviews) {
    if (error !== null) {
      console.log("There was an error.");
      return;
    }
    setReviews(reviews);
    setModalReviews(reviews);
  });
});

function getReviews(completionHandler) {
  //completionHandler(null, REVIEWS);

  $.ajax({
    url: 'get-reviews',
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      completionHandler(null, res);
    },
    error: function (res, error) {
    }
  });
}

/*  

<div class="user-rating col-lg-6 col-md-6 col-sm-12">
  <!-- Username Header -->
  <h5>Nancy</h5>
  <h6>1 Day Ago</h6>
  <!-- User Star Rating -->
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <!-- User Comment Section -->
  <p>Great spot. Treehouse itself is magical, the grounds are peaceful, host kind, and location to Firenze and local restaurants convenient.</p>
</div>

*/
function setReviews(reviews) {
  var ratingSection = document.getElementById('rating-container-section');
  ratingSection.innerHTML = '';

  var nReviews = reviews.length < 2 ? reviews.length : 2;

  for (var i = 0; i < nReviews; i++) {
    var review = reviews[i];
    var reviewContainer = createReviewContainer(review);
    ratingSection.appendChild(reviewContainer);
  }
}

function createReviewContainer(review) {
  var name = review.name;
  var timeStamp = review.created;
  var rating = review.rating;
  var comment = review.review;

  var containerDiv = document.createElement('DIV');
  containerDiv.setAttribute('class', 'user-rating col-lg-6 col-md-6 col-sm-12');

  var nameHeader = document.createElement('H5');
  nameHeader.innerHTML = name;

  var stars = createStarRating(rating);

  var commentP = document.createElement('P');
  commentP.innerHTML = comment;

  containerDiv.appendChild(nameHeader);

  for (var s = 0; s < stars.length; s++) {
    var star = stars[s];
    containerDiv.appendChild(star);
  }

  containerDiv.appendChild(commentP);

  return containerDiv;
}

function createStarRating(rating) {
  var stars = [];
  var maxStars = 5;

  // Create Checked Stars
  for (var checkedIndex = 0; checkedIndex < rating; checkedIndex++) {
    var checkedStar = document.createElement('SPAN');
    checkedStar.setAttribute('class', 'fa fa-star checked');
    stars.push(checkedStar);
  }

  // Create Unchecked Stars
  for (var uncheckedIndex = rating; uncheckedIndex < maxStars; uncheckedIndex++) {
    var uncheckedStar = document.createElement('SPAN');
    uncheckedStar.setAttribute('class', 'fa fa-star');
    stars.push(uncheckedStar);
  }
  return stars;
}

function setModalReviews(reviews) {
  var nReviews = reviews.length;

  var modal = document.getElementById('reviews-modal');
  var modalBody = modal.getElementsByClassName('modal-body')[0];
  modalBody.innerHTML = '';

  // Set title for button that displays modal
  setReviewsCount(nReviews);

  for (var i = 0; i < nReviews; i++) {
    console.log("rating.");
    var review = reviews[i];
    var ratingContainer = createModalRatingContainer(review);

    if (i === nReviews - 1) {
      ratingContainer.style.borderBottom = 'none';
    }

    modalBody.appendChild(ratingContainer);
  }
  
}

function createModalRatingContainer(review) {
  var name = review.name;
  var timeStamp = review.created;
  var rating = review.rating;
  var comment = review.review;

  var view = document.createElement('DIV');
  view.setAttribute('class', 'row rating-container');

  var nameTitle = document.createElement('H5');
  nameTitle.innerHTML = name;

  var dateSpan = document.createElement('SPAN');
  dateSpan.innerHTML = timeStamp;

  nameTitle.appendChild(dateSpan);

  var nameDiv = document.createElement('DIV');
  nameDiv.setAttribute('class', 'col-sm-12 col-md-12 col-lg-12');
  nameDiv.appendChild(nameTitle);

  var commentPar = document.createElement('P');
  commentPar.innerHTML = comment;

  var commentDiv = document.createElement('DIV');
  commentDiv.setAttribute('class', 'col-sm-12 col-md-12 col-lg-12');
  commentDiv.appendChild(commentPar);
  
  var starRatings = createModalStarRating(rating);
  
  view.appendChild(nameDiv);
  view.appendChild(starRatings);
  view.appendChild(commentDiv);

  return view;
}

/*  

      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>

*/
function createModalStarRating(rating) {
  var ratingDiv = document.createElement('DIV');
  ratingDiv.setAttribute('class', 'col-sm-12 col-md-12 col-lg-12');
  var maxStars = 5;

  // Create Checked Stars
  for (var checkedIndex = 0; checkedIndex < rating; checkedIndex++) {
    var checkedStar = document.createElement('SPAN');
    checkedStar.setAttribute('class', 'fa fa-star checked');
    ratingDiv.appendChild(checkedStar);
  }

  // Create Unchecked Stars
  for (var uncheckedIndex = rating; uncheckedIndex < maxStars; uncheckedIndex++) {
    var uncheckedStar = document.createElement('SPAN');
    uncheckedStar.setAttribute('class', 'fa fa-star');
    ratingDiv.appendChild(uncheckedStar);
  }
  return ratingDiv;
}

function setReviewsCount(n) {
  var btn = document.getElementById('reviews-display-btn');
  if (n === 0) {
    btn.innerHTML = "No Reviews."
    return;
  }
  btn.innerHTML = 'Read all ' + n + ' reviews';
}

function displayAllReviews() {
  $('#reviews-modal').modal();
  $.ajax({
    type: 'GET',
    url: window.location.origin + '/reviews',
    success: function (response) {
    },
    error: function (response) {

    }
  })
}

function sendEmail() {
  var emailInput = document.getElementById('inputEmail');
  var phoneInput = document.getElementById('inputPhone');
  var email = emailInput.value;
  var phone = phoneInput.value;
  $.ajax({
    type: 'GET',
    url: window.location.origin + '/emailrequest',
    data: {
      email: email,
      phone: phone
    },
    contentType: 'application/json',
    success: function (response) {
      console.log("Reponse: " + JSON.stringify(response));
    },
    error: function (response) {
    }
  })
}
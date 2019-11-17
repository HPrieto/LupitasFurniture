
function presentAddReviewModal() {
    $('#add-review-modal').modal('show');
}

function hideAddReviewModal() {
    $('#add-review-modal').modal('hide');
}

function createNewReview() {
	var nameInput = document.getElementById('add-review-name');
	var reviewInput = document.getElementById('add-review-review');
	var starSection = document.getElementById('add-review-star-rating');

	var name = nameInput.value;
	var review = reviewInput.value;
	var rating = starSection.getAttribute('rating');

	$.ajax({
    	url: 'submit-review',
    	type: 'GET',
    	dataType: 'json',
    	data: {
    		name: name,
    		rating: rating,
    		review: review
    	},
    	success: function (res) {
      		hideAddReviewModal();

      		getReviews(function (error, reviews) {
    			if (error !== null) {
      				console.log("There was an error.");
      				return;
    			}
    			setReviews(reviews);
    			setModalReviews(reviews);
  			});
    	},
    	error: function (res, error) {
      		console.log('gettingReviews: ' + error);
    	}
  	});

	/*
	$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  		var dataString = JSON.stringify(data, null, 2);
  		var object = JSON.parse(dataString);
  		var ip = object.ip;
  		var ipURL = ip.replace(/./g,"-");

  		if (typeof ip === 'undefined' || typeof ipURL === 'undefined') {
  			return;
  		}

  		firebase.database().ref('reviews/').set({
			name: name,
			review: review,
			rating: rating
		});

	});
	*/
}

function setRating(rating) {
	var starSection = document.getElementById('add-review-star-rating');
	var stars = starSection.getElementsByTagName('SPAN');

	starSection.setAttribute('rating', rating);

	for (var i = 0; i < stars.length; i++) {
		var star = stars[i];
		if (i < rating) {
			star.setAttribute('class', 'fa fa-star checked');
		} else {
			star.setAttribute('class', 'fa fa-star');
		}
	}
}
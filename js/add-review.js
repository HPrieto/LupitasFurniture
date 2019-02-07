
function presentAddReviewModal() {
    $('#add-review-modal').modal('show');
}

function createNewReview() {
	var nameInput = document.getElementById('add-review-name');
	var reviewInput = document.getElementById('add-review-review');
	var starSection = document.getElementById('add-review-star-rating');

	var name = nameInput.value;
	var review = reviewInput.value;
	var rating = starSection.getAttribute('rating');

	console.log("Name: " + name);
	console.log("Review: " + review);
	console.log("Rating: " + rating);
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
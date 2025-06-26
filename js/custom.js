
(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()

document.addEventListener('DOMContentLoaded', function() {
    const books = [
        // Fiction Books (ยังคงเป็นข้อมูลเดิม)
        { title: "The Great Gatsby", category: "fiction", price: "15.00", img: "Book11.jpg" },
        { title: "To Kill a Mockingbird", category: "fiction", price: "12.50", img: "Book2.jpg" },
        { title: "The Catcher in the Rye", category: "fiction", price: "18.00", img: "Book3.jpg" },
        { title: "Little Fires Everywhere", category: "fiction", price: "14.25", img: "Book4.jpg" },
        { title: "Normal People", category: "fiction", price: "16.75", img: "Book5.jpg" },

        // Sci-Fi (ยังคงเป็นข้อมูลเดิม)
        { title: "Dune", category: "sci-fi", price: "20.00", img: "Book6.jpg" },
        { title: "Ender's Game", category: "sci-fi", price: "22.50", img: "Book7.jpg" },
        { title: "Neuromancer", category: "sci-fi", price: "19.00", img: "Book8.jpg" },
        { title: "The Martian", category: "sci-fi", price: "21.50", img: "Book9.jpg" },
        { title: "Snow Crash", category: "sci-fi", price: "24.00", img: "Book10.jpg" },

        // Historical (ยังคงเป็นข้อมูลเดิม)
        { title: "All the Light We Cannot See", category: "historical", price: "17.00", img: "Book111.jpg" },
        { title: "The Book Thief", category: "historical", price: "19.50", img: "Book12.jpg" },
        { title: "The Pillars of the Earth", category: "historical", price: "16.00", img: "Book13.jpg" },
        { title: "War and Peace", category: "historical", price: "18.50", img: "Book14.jpg" },
        { title: "The Nightingale", category: "historical", price: "17.75", img: "Book15.jpg" },

        // Thriller (เปลี่ยนชื่อหนังสือที่แสดงผล และใช้ไฟล์รูปภาพ Book16.jpg - Book20.jpg)
        { title: "Gone Girl", category: "thriller", price: "14.00", img: "Book16.jpg" },
        { title: "The Girl with the Dragon Tattoo", category: "thriller", price: "15.50", img: "Book17.jpg" },
        { title: "The Silent Patient", category: "thriller", price: "13.00", img: "Book18.jpg" },
        { title: "The Da Vinci Code", category: "thriller", price: "16.25", img: "Book19.jpg" },
        { title: "Before I Go to Sleep", category: "thriller", price: "14.75", img: "Book20.jpg" }
    ];

    const bookListContainer = document.getElementById('bookListContainer');
    const bookSearchInput = document.getElementById('bookSearchInput');
    const searchButton = document.getElementById('searchButton');
    const bookCategories = document.getElementById('bookCategories');

    function displayBooks(filterCategory = 'all', searchTerm = '') {
        bookListContainer.innerHTML = ''; // Clear current books

        let filteredBooks = books;

        // Filter by category
        if (filterCategory !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.category === filterCategory);
        }

        // Filter by search term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredBooks = filteredBooks.filter(book =>
                book.title.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        if (filteredBooks.length === 0) {
            bookListContainer.innerHTML = '<p class="col-12 text-center">No books found matching your criteria.</p>';
            return;
        }

        filteredBooks.forEach(book => {
            const bookItemHtml = `
                <div class="col-12 col-md-6 col-lg-4 mb-5">
                    <a class="product-item" href="cart.html">
                        <img src="images/${book.img}" class="img-fluid product-thumbnail" alt="${book.title}">
                        <h3 class="product-title">${book.title}</h3>
                        <strong class="product-price">$${book.price}</strong>
                        <span class="icon-cross">
                            <img src="images/cross.svg" class="img-fluid">
                        </span>
                    </a>
                </div>
            `;
            bookListContainer.innerHTML += bookItemHtml;
        });
    }

    // Event listener for category clicks
    bookCategories.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target;
        if (target.tagName === 'A') {
            // Remove 'active' class from all category links
            const currentActive = bookCategories.querySelector('.list-group-item.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            // Add 'active' class to the clicked category
            target.classList.add('active');

            const selectedCategory = target.dataset.category;
            bookSearchInput.value = ''; // Clear search input when category is clicked
            displayBooks(selectedCategory);
        }
    });

    // Event listener for search button click
    searchButton.addEventListener('click', function() {
        const searchTerm = bookSearchInput.value.trim();
        // Remove 'active' class from all category links when searching
        const currentActive = bookCategories.querySelector('.list-group-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        // Set 'All Books' as active (optional, you can choose to leave none active)
        bookCategories.querySelector('[data-category="all"]').classList.add('active');
        displayBooks('all', searchTerm);
    });

    // Event listener for Enter key in search input
    bookSearchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click(); // Simulate a click on the search button
        }
    });

    // Initial load: display all books
    displayBooks('all');
});
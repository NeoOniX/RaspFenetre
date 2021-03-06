// Show password input :
const userListElements = document.querySelectorAll("#userlistelement");

userListElements.forEach((userListElement) =>
    userListElement.querySelector(".informations").addEventListener("click", () => {
        if (!userListElement.classList.contains("active")) {
            document.querySelectorAll("#userlistelement").forEach((e) => e.classList.remove("active"));
        }
        userListElement.classList.toggle("active");
    })
);

// Show & Hide password :
const showPasswordBtns = document.querySelectorAll("#show_password");

showPasswordBtns.forEach((showPasswordBtn) =>
    showPasswordBtn.addEventListener("click", (e) => {
        e.preventDefault();

        showPasswordBtn.classList.toggle("show");

        // Change SVG & Input type :
        if (showPasswordBtn.classList.contains("show")) {
            showPasswordBtn.innerHTML = `
                <svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.60714C9.21023 4.6122 8.45429 4.9186 7.89583 5.46003C7.33737 6.00145 7.02133 6.73433 7.01611 7.5C7.01611 9.08336 8.36682 10.3929 10 10.3929C11.6322 10.3929 12.9839 9.08336 12.9839 7.5C12.9839 5.91761 11.6322 4.60714 10 4.60714Z"/>
                    <path d="M10 0.75C2.408 0.75 0.126318 7.13068 0.105431 7.19529L0 7.5L0.104436 7.80471C0.126318 7.86932 2.408 14.25 10 14.25C17.592 14.25 19.8737 7.86932 19.8946 7.80471L20 7.5L19.8956 7.19529C19.8737 7.13068 17.592 0.75 10 0.75ZM10 12.3214C4.67774 12.3214 2.61587 8.61279 2.11657 7.5C2.61786 6.38336 4.68072 2.67857 10 2.67857C15.3223 2.67857 17.3841 6.38721 17.8834 7.5C17.3821 8.61664 15.3193 12.3214 10 12.3214Z"/>
                </svg>
                `;
            showPasswordBtn.parentElement.querySelector("input").setAttribute("type", "text");
        } else {
            showPasswordBtn.innerHTML = `
                <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.6974 17.7113C11.6719 17.7113 12.562 17.6052 13.3738 17.4218L11.5638 15.6118C11.2825 15.6334 10.9972 15.6509 10.6974 15.6509C5.18487 15.6509 3.04929 11.6888 2.53214 10.5C2.92047 9.63342 3.44493 8.83454 4.08566 8.13367L2.64546 6.69347C1.06104 8.41079 0.460441 10.1405 0.449109 10.1745C0.378048 10.386 0.378048 10.615 0.449109 10.8266C0.470743 10.8946 2.83399 17.7113 10.6974 17.7113ZM10.6974 3.28871C8.80493 3.28871 7.25039 3.69666 5.95441 4.29932L2.15406 0.5L0.697384 1.95668L19.2407 20.5L20.6974 19.0433L17.2782 15.6241C19.9711 13.6142 20.9323 10.8698 20.9467 10.8266C21.0177 10.615 21.0177 10.386 20.9467 10.1745C20.924 10.1054 18.5608 3.28871 10.6974 3.28871ZM15.8195 14.1654L13.4706 11.8166C13.6664 11.4148 13.7879 10.9729 13.7879 10.5C13.7879 8.80947 12.3879 7.40945 10.6974 7.40945C10.2245 7.40945 9.78258 7.53101 9.38184 7.72777L7.51926 5.8652C8.54174 5.51433 9.61642 5.33981 10.6974 5.34908C16.2099 5.34908 18.3455 9.31117 18.8626 10.5C18.5515 11.2129 17.6614 12.9127 15.8195 14.1654Z"
                    />
                </svg>
                `;
            showPasswordBtn.parentElement.querySelector("input").setAttribute("type", "password");
        }
    })
);

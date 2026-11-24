
function openInvitation() {

    document.getElementById("cover").style.display = "none";

    document.getElementById("mainPage").style.display = "block";

    window.scrollTo(0, 0);

    // Play wedding music
    const music = document.getElementById("weddingMusic");

    music.play().catch(error => {
        console.log("Music could not play:", error);
    });

}


// WEDDING COUNTDOWN

const weddingDate = new Date("2027-01-09T12:00:00+08:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.querySelector(".countdown").innerHTML =
            "<h3>Today is our special day! ❤️</h3>";

        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

const countdownTimer = setInterval(updateCountdown, 1000);

// RSVP FORM - LOCAL DEMO


// GOOGLE SHEETS RSVP CONNECTION

const scriptURL = "https://script.google.com/macros/s/AKfycbzsHKLG20HjlPfZ2zydL-JUQK6qpLninWW-pi_FXzxv-ecbivrJsbHqIyDvdwpFmhqn/exec";

document.getElementById("rsvpForm")
.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton = this.querySelector("button");

    const guest = {
        name: document.getElementById("guestName").value,
        phone: document.getElementById("guestPhone").value,
        attendance: document.getElementById("attendance").value,
        guests: document.getElementById("guestCount").value
    };

    submitButton.disabled = true;
    submitButton.textContent = "SUBMITTING...";

    try {

        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(guest)
        });

        alert(
            "Your RSVP request has been sent! " +
            "Thank you for your response."
        );

        this.reset();

    } catch (error) {

        alert("Unable to send RSVP. Please try again.");

        console.error(error);

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "SUBMIT RSVP";

    }

});


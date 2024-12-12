async function ping() {
    const response = await fetch("https://roast-my-resume.onrender.com");
    console.log(response.status)
}

setInterval(() => {
    ping();
}, 1000 * 60);
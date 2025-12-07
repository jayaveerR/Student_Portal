
async function checkEvents() {
    try {
        const res = await fetch('http://localhost:5003/api/events/all');
        const data = await res.json();
        data.forEach(e => {
            console.log(`ID: ${e._id}, Title: ${e.title}, Course: ${e.course}`);
        });
    } catch (error) {
        console.error(error);
    }
}

checkEvents();

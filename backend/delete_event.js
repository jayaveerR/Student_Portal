
async function deleteEvent(id) {
    try {
        const res = await fetch(`http://localhost:5003/api/events/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

deleteEvent('6933b99d8feb6f219f73dd80');

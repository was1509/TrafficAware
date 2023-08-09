async function fetchData() {
    const url = 'https://waze.p.rapidapi.com/alerts-and-jams?bottom_left=40.66615391742187%2C-74.13732147216798&top_right=40.772787404902594%2C-73.76818084716798&max_alerts=20&max_jams=20';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'api-key',
            'X-RapidAPI-Host': 'waze.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        //console.log(result);
        const alerts = result.data.alerts;
        const formattedAlerts = formatAlerts(alerts);

        const concertsElement = document.getElementById("concerts");
        concertsElement.innerHTML = formattedAlerts;
    } catch (error) {
        console.error(error);
    }
}

const formatAlerts = (alerts) => {
    return alerts.map(alert => {
        const {
            alert_id,
            type,
            subtype,
            description,
            publish_datetime_utc,
            country,
            city,
            street,
            num_thumbs_up,
            num_comments
        } = alert;

        return `
            <div>
                <strong>Alert ID:</strong> ${alert_id}<br>
                <strong>Type:</strong> ${type}<br>
                <strong>Subtype:</strong> ${subtype}<br>
                <strong>Description:</strong> ${description}<br>
                <strong>Publish Date:</strong> ${publish_datetime_utc}<br>
                <strong>Country:</strong> ${country}<br>
                <strong>City:</strong> ${city}<br>
                <strong>Street:</strong> ${street}<br>
                <strong>Thumbs Up:</strong> ${num_thumbs_up}<br>
                <strong>Number of Comments:</strong> ${num_comments}<br>
            </div><br>
        `;
    }).join('');
};

fetchData();
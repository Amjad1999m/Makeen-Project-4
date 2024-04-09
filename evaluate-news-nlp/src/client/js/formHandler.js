function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value
    checkForName(formText)
    if (checkForURL(formText)) {
        console.log("::: Form Submitted :::")
        // fetch('http://localhost:8080/test')
        // .then(res => res.json())
        postData('http://localhost:8080/api', { url: formText })
            .then(function (res) {
                document.getElementById('results').innerHTML = res.score_tag;
            })
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}
const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit };


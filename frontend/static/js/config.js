fetch('http://backend:8000/api/v1/resources')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error adding resources', error))